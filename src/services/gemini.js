const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

async function callGemini(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('VITE_GEMINI_API_KEY not set in .env');

  const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 2048 }
    })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || 'Gemini API error');
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

function parseJSON(raw) {
  const cleaned = raw.replace(/```json\n?|\n?```/g, '').trim();
  return JSON.parse(cleaned);
}

export async function analyzeResume(resumeText, jobDescription = '') {
  const jobSection = jobDescription
    ? `\nJob Description to match:\n${jobDescription.slice(0, 1200)}`
    : '';

  const prompt = `You are an expert ATS resume analyst. Analyze this resume and return ONLY a raw JSON object — no markdown, no code fences, no explanation.

Resume Text:
${resumeText.slice(0, 3000)}
${jobSection}

Return exactly this JSON shape:
{
  "atsScore": 82,
  "jobMatchScore": ${jobDescription ? 75 : null},
  "detectedSkills": ["React", "JavaScript", "Node.js"],
  "missingSkills": ["Docker", "AWS", "TypeScript"],
  "experience": "3 years",
  "topStrengths": ["Strong frontend skills", "Good project descriptions"],
  "aiSuggestions": [
    "Add quantifiable achievements like 'Reduced load time by 40%'",
    "Include cloud technologies such as AWS or GCP",
    "Add a professional summary at the top of your resume"
  ],
  "overallFeedback": "2-3 sentence honest assessment."
}`;

  const raw = await callGemini(prompt);
  return parseJSON(raw);
}
