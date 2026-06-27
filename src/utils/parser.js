// Read file as plain text — works for .txt; PDF gives raw bytes (good enough for demo)
export async function extractTextFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result || '');
    reader.onerror = () => reject(new Error('Failed to read file. Try a .txt version of your resume.'));
    reader.readAsText(file);
  });
}

export function getScoreColor(score) {
  if (score >= 80) return { text: '#10b981', bg: 'from-emerald-500 to-teal-400', label: 'Excellent' };
  if (score >= 65) return { text: '#f59e0b', bg: 'from-amber-500 to-orange-400', label: 'Good' };
  return { text: '#ef4444', bg: 'from-red-500 to-rose-400', label: 'Needs Work' };
}
