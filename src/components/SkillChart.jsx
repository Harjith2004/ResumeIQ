import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Lightbulb, Star, MessageSquare, TrendingUp } from 'lucide-react';

function Section({ icon: Icon, title, color, bg, border, children }) {
  return (
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
      className="bg-white rounded-2xl border p-5" style={{borderColor:border,boxShadow:'0 4px 24px rgba(0,0,0,0.04)'}}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background:bg}}>
          <Icon size={16} style={{color}}/>
        </div>
        <h3 className="text-sm font-bold text-slate-800">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

export default function SkillChart({ data }) {
  const { detectedSkills=[], missingSkills=[], topStrengths=[], aiSuggestions=[], overallFeedback='', experience='' } = data;

  return (
    <div className="space-y-4">
      {/* AI Assessment */}
      {overallFeedback && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}}
          className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare size={15} className="text-indigo-600"/>
            <span className="text-sm font-bold text-indigo-700">AI Assessment</span>
            {experience && <span className="ml-auto text-xs text-slate-400 font-mono">~{experience}</span>}
          </div>
          <p className="text-slate-700 text-sm leading-relaxed">{overallFeedback}</p>
        </motion.div>
      )}

      {/* Detected skills */}
      <Section icon={CheckCircle2} title={`Skills Detected (${detectedSkills.length})`}
        color="#10b981" bg="#f0fdf4" border="#d1fae5">
        <div className="flex flex-wrap gap-2">
          {detectedSkills.length > 0
            ? detectedSkills.map(s => (
                <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 size={11}/>{s}
                </span>
              ))
            : <p className="text-slate-400 text-sm">No skills detected.</p>}
        </div>
      </Section>

      {/* Missing skills */}
      <Section icon={XCircle} title={`Missing Skills to Add (${missingSkills.length})`}
        color="#ef4444" bg="#fff1f2" border="#fecdd3">
        <div className="flex flex-wrap gap-2">
          {missingSkills.length > 0
            ? missingSkills.map(s => (
                <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                  <XCircle size={11}/>{s}
                </span>
              ))
            : <p className="text-slate-400 text-sm">No major skill gaps — great work!</p>}
        </div>
      </Section>

      {/* Strengths */}
      {topStrengths.length > 0 && (
        <Section icon={Star} title="Top Strengths" color="#f59e0b" bg="#fffbeb" border="#fde68a">
          <ul className="space-y-2">
            {topStrengths.map((s,i) => (
              <motion.li key={i} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.08}}
                className="flex items-start gap-2 text-sm text-slate-700">
                <Star size={13} className="text-amber-500 mt-0.5 flex-shrink-0 fill-amber-400"/>{s}
              </motion.li>
            ))}
          </ul>
        </Section>
      )}

      {/* AI Tips */}
      {aiSuggestions.length > 0 && (
        <Section icon={Lightbulb} title="AI Improvement Tips" color="#6366f1" bg="#eef2ff" border="#c7d2fe">
          <ul className="space-y-3">
            {aiSuggestions.map((tip,i) => (
              <motion.li key={i} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.1}}
                className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 bg-indigo-100 text-indigo-700">
                  {i+1}
                </span>
                {tip}
              </motion.li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
