import { motion } from 'framer-motion';
import { Shield, ArrowRight, CheckCircle2 } from 'lucide-react';

const stagger = {
  container: { hidden:{}, show:{ transition:{ staggerChildren:0.1 } } },
  item: { hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:0.6,ease:[0.22,1,0.36,1]}} }
};

function DashboardMockup() {
  const bars = [
    { label:'Content',        pct:90, color:'#10b981' },
    { label:'Format & Style', pct:75, color:'#6366f1' },
    { label:'Skills',         pct:60, color:'#f59e0b' },
    { label:'Sections',       pct:82, color:'#06b6d4' },
  ];
  return (
    <motion.div initial={{opacity:0,x:40,y:20}} animate={{opacity:1,x:0,y:0}}
      transition={{duration:0.8,delay:0.3,ease:[0.22,1,0.36,1]}}
      className="relative float">
      {/* Browser chrome */}
      <div className="bg-white rounded-2xl card-shadow-lg overflow-hidden border border-slate-100 max-w-md w-full">
        {/* Top bar */}
        <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 border border-slate-200">
            resumeiq.app/results
          </div>
        </div>
        {/* App header */}
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold tracking-widest text-indigo-600">RESUMEIQ</span>
          <div className="flex gap-3 text-xs text-slate-400">
            <span className="text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-0.5">Overview</span>
            <span>Skills</span><span>Tips</span>
          </div>
        </div>
        {/* Body */}
        <div className="p-5">
          {/* Score arc */}
          <div className="flex items-center gap-5 mb-5">
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
                <circle cx="40" cy="40" r="32" fill="none" stroke="#f1f5f9" strokeWidth="8"/>
                <motion.circle cx="40" cy="40" r="32" fill="none"
                  stroke="url(#sg)" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray="201" initial={{strokeDashoffset:201}}
                  animate={{strokeDashoffset:201-(201*0.92)}}
                  transition={{duration:1.5,delay:0.8,ease:'easeOut'}}/>
                <defs>
                  <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981"/>
                    <stop offset="100%" stopColor="#06b6d4"/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
                <span className="text-xl font-black text-slate-900">92</span>
                <span className="text-[9px] text-slate-400 font-medium">/ 100</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 mb-0.5">Resume Score</p>
              <p className="text-xs text-slate-400 mb-2">24 checks completed</p>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200">
                ✓ ATS Compatible
              </span>
            </div>
          </div>
          {/* Bars */}
          <div className="space-y-3">
            {bars.map(({label,pct,color},i) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500 font-medium">{label}</span>
                  <span className="font-bold" style={{color}}>{pct}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full"
                    style={{background:color}}
                    initial={{width:0}} animate={{width:`${pct}%`}}
                    transition={{duration:1,delay:0.6+i*0.1,ease:'easeOut'}}/>
                </div>
              </div>
            ))}
          </div>
          {/* Issues list */}
          <div className="mt-4 space-y-1.5">
            {['ATS Parse Rate','Quantifying Impact','Contact Info Complete'].map(t => (
              <div key={t} className="flex items-center gap-2 text-xs text-slate-600">
                <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0"/>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badge 1 */}
      <motion.div initial={{opacity:0,scale:0.7}} animate={{opacity:1,scale:1}}
        transition={{delay:1,duration:0.4}}
        className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-2.5 float2">
        <p className="text-xs text-slate-400 font-medium">ATS Score</p>
        <p className="text-2xl font-black text-indigo-600">92<span className="text-sm font-semibold text-slate-400">/100</span></p>
      </motion.div>

      {/* Floating badge 2 */}
      <motion.div initial={{opacity:0,scale:0.7}} animate={{opacity:1,scale:1}}
        transition={{delay:1.2,duration:0.4}}
        className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-2.5 float">
        <p className="text-xs text-slate-400 font-medium">Skills found</p>
        <p className="text-2xl font-black gradient-text-green">14 <span className="text-sm font-semibold text-slate-400">skills</span></p>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="hero-gradient min-h-screen pt-24 pb-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

          {/* LEFT */}
          <motion.div variants={stagger.container} initial="hidden" animate="show">
            <motion.div variants={stagger.item}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 mb-6 uppercase tracking-widest">
              RESUME CHECKER
            </motion.div>

            <motion.h1 variants={stagger.item}
              className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6">
              Is your resume<br/>
              <span className="gradient-text">good enough?</span>
            </motion.h1>

            <motion.p variants={stagger.item}
              className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
              A free and fast AI resume checker doing <strong className="text-slate-800">27 crucial checks</strong> to ensure your resume is technically compatible with applicant tracking systems and gets you interview callbacks.
            </motion.p>

            <motion.div variants={stagger.item} className="flex flex-col sm:flex-row gap-3 mb-8">
              <motion.button
                whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                onClick={() => document.getElementById('analyzer')?.scrollIntoView({behavior:'smooth'})}
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-white text-base green-glow transition-all"
                style={{background:'linear-gradient(135deg, #10b981, #06b6d4)'}}>
                Upload Your Resume
                <ArrowRight size={18}/>
              </motion.button>
              <button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({behavior:'smooth'})}
                className="px-7 py-4 rounded-xl font-semibold text-slate-700 text-base border-2 border-slate-200 hover:border-slate-300 hover:text-slate-900 transition-all bg-white">
                See how it works
              </button>
            </motion.div>

            <motion.div variants={stagger.item} className="flex items-center gap-2 text-sm text-slate-500">
              <Shield size={15} className="text-emerald-500"/>
              Privacy guaranteed — your resume is never stored
            </motion.div>

            {/* Mini stats */}
            <motion.div variants={stagger.item} className="grid grid-cols-3 gap-4 mt-10">
              {[
                {val:'50K+', label:'Resumes checked'},
                {val:'92%',  label:'ATS pass rate'},
                {val:'4.9★', label:'User rating'},
              ].map(({val,label}) => (
                <div key={label} className="bg-white rounded-xl p-4 card-shadow border border-slate-50">
                  <p className="text-xl font-extrabold text-slate-900">{val}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — Dashboard mockup */}
          <div className="flex justify-center lg:justify-end">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
