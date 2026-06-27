import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function ScoreArc({ score }) {
  const [animated, setAnimated] = useState(0);
  useEffect(() => { const t = setTimeout(() => setAnimated(score), 200); return () => clearTimeout(t); }, [score]);
  const r = 54; const circ = 2 * Math.PI * r;
  const col = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';
  const label = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Work';
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{width:140,height:140}}>
        <svg width={140} height={140} className="-rotate-90" style={{position:'absolute'}}>
          <circle cx={70} cy={70} r={r} fill="none" stroke="#f1f5f9" strokeWidth={12}/>
          <circle cx={70} cy={70} r={r} fill="none" stroke={col} strokeWidth={12}
            strokeLinecap="round" strokeDasharray={circ}
            style={{strokeDashoffset: circ-(circ*animated/100), transition:'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)'}}/>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-slate-900">{score}</span>
          <span className="text-xs text-slate-400 font-medium">/ 100</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-bold px-3 py-1 rounded-full"
        style={{ background: score>=80?'#f0fdf4':score>=60?'#fffbeb':'#fff1f2',
                 color: score>=80?'#15803d':score>=60?'#b45309':'#be123c' }}>
        {label}
      </span>
    </div>
  );
}

export default function ATSScore({ atsScore, jobMatchScore }) {
  const dims = [
    { label:'Formatting & Structure', pct: Math.min(100, atsScore+6),  color:'#10b981' },
    { label:'Keyword Density',        pct: Math.max(30, atsScore-14),  color:'#6366f1' },
    { label:'Experience Relevance',   pct: Math.min(100, atsScore+2),  color:'#06b6d4' },
    { label:'Skills Match',           pct: Math.max(40, atsScore-8),   color:'#f59e0b' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6" style={{boxShadow:'0 4px 24px rgba(0,0,0,0.06)'}}>
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Resume Score</p>

      {/* Score rings */}
      <div className="flex justify-center gap-8 mb-6 flex-wrap">
        <motion.div initial={{scale:0.7,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:0.5}}>
          <div className="text-center">
            <ScoreArc score={atsScore}/>
            <p className="text-xs text-slate-400 mt-2 font-medium">ATS Score</p>
          </div>
        </motion.div>
        {jobMatchScore != null && (
          <motion.div initial={{scale:0.7,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:0.5,delay:0.15}}>
            <div className="text-center">
              <ScoreArc score={jobMatchScore}/>
              <p className="text-xs text-slate-400 mt-2 font-medium">Job Match</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Breakdown bars */}
      <div className="space-y-4">
        {dims.map(({label,pct,color},i) => (
          <div key={label}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-slate-600 font-medium">{label}</span>
              <span className="font-bold" style={{color}}>{pct}%</span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full"
                style={{background:color}}
                initial={{width:0}} animate={{width:`${pct}%`}}
                transition={{duration:1,delay:0.3+i*0.1,ease:'easeOut'}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
