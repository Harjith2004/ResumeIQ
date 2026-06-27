import { motion } from 'framer-motion';
import { FileText, PenTool, Flag, Target, Lightbulb, BarChart3, CheckCircle2 } from 'lucide-react';

const categories = [
  {
    icon: FileText, color:'#10b981', bg:'#f0fdf4', border:'#bbf7d0',
    title: 'ATS Essentials',
    checks: ['File format and size', 'ATS-friendly design', 'Professional email address', 'Phone number present', 'LinkedIn profile link'],
  },
  {
    icon: PenTool, color:'#6366f1', bg:'#eef2ff', border:'#c7d2fe',
    title: 'Content Quality',
    checks: ['ATS parse rate', 'Quantifying impact with AI', 'Repetition detection', 'Spelling & grammar', 'Action verb usage'],
  },
  {
    icon: Flag, color:'#f59e0b', bg:'#fffbeb', border:'#fde68a',
    title: 'Recruiter Red Flags',
    checks: ['Resume credibility', 'Interview risk signals', 'Peer benchmarking', 'Bias & discrimination check', 'Seniority fit analysis'],
  },
];

const howItWorks = [
  { num:'01', title:'Upload your resume', desc:'Drop your PDF or TXT file. We extract and read your full resume content instantly.', color:'#6366f1' },
  { num:'02', title:'AI runs 27 checks',  desc:'Our Gemini AI analyses your resume across ATS compatibility, content, skills, and red flags.', color:'#10b981' },
  { num:'03', title:'Get your score',     desc:'See your ATS score, detected skills, missing keywords, and specific improvement tips.', color:'#f59e0b' },
];

const fadeUp = (delay=0) => ({
  initial:{opacity:0,y:28},
  whileInView:{opacity:1,y:0},
  viewport:{once:true},
  transition:{duration:0.6,delay,ease:[0.22,1,0.36,1]}
});

export default function Features() {
  return (
    <>
      {/* ── Dark section header ── */}
      <section id="features" className="dark-section py-24 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <motion.h2 {...fadeUp()} className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            The AI-powered Resume Checker<br/>goes beyond typos and punctuation
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
            We've built-in various AI models to help you create a resume that's tailored to the position you're applying for and pass both ATS and human checks. The tool checks for <strong className="text-white">27 crucial things</strong> across seven different categories.
          </motion.p>
        </div>

        {/* Category cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(({icon:Icon,color,bg,border,title,checks},i) => (
            <motion.div key={title} {...fadeUp(i*0.1)}
              className="bg-white rounded-2xl p-7 card-shadow hover:scale-[1.02] transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{background:bg, border:`1px solid ${border}`}}>
                <Icon size={24} style={{color}}/>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {checks.map(c => (
                  <li key={c} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 size={15} style={{color}} className="flex-shrink-0"/>
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.p {...fadeUp()} className="text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">
              How It Works
            </motion.p>
            <motion.h2 {...fadeUp(0.1)} className="text-4xl md:text-5xl font-extrabold text-slate-900">
              Three steps to a better resume
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map(({num,title,desc,color},i) => (
              <motion.div key={num} {...fadeUp(i*0.15)} className="text-center group">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{background:`${color}15`, border:`2px solid ${color}30`}}>
                  <span className="text-2xl font-black" style={{color}}>{num}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ATS Understanding section ── */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — visual */}
          <motion.div {...fadeUp()} className="relative">
            <div className="bg-white rounded-2xl card-shadow p-6 max-w-sm mx-auto">
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-4">ATS PARSE RATE</p>
              <div className="space-y-3 mb-6">
                {[
                  {label:'Contact Info',    pct:100, color:'#10b981'},
                  {label:'Work Experience', pct:95,  color:'#10b981'},
                  {label:'Education',       pct:90,  color:'#6366f1'},
                  {label:'Skills Section',  pct:72,  color:'#f59e0b'},
                  {label:'Certifications',  pct:60,  color:'#f59e0b'},
                ].map(({label,pct,color},i) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">{label}</span>
                      <span className="font-bold" style={{color}}>{pct}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full"
                        style={{background:color}}
                        initial={{width:0}}
                        whileInView={{width:`${pct}%`}}
                        viewport={{once:true}}
                        transition={{duration:1,delay:i*0.1,ease:'easeOut'}}/>
                    </div>
                  </div>
                ))}
              </div>
              {/* Keywords tags */}
              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-400 mb-2 font-medium">Detected Keywords</p>
                <div className="flex flex-wrap gap-1.5">
                  {['React','TypeScript','Node.js','REST API','Agile','Git'].map(t => (
                    <span key={t} className="px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating label */}
            <motion.div initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0.5}}
              className="absolute -left-4 top-1/3 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-2.5 float2">
              <p className="text-xs text-slate-400">Keywords</p>
              <p className="text-lg font-black text-indigo-600">34 found</p>
            </motion.div>
          </motion.div>

          {/* Right — text */}
          <motion.div {...fadeUp(0.15)}>
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-4">ATS Understanding</p>
            <h2 className="text-4xl font-extrabold text-slate-900 leading-tight mb-6">
              Get an ATS understanding check
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              Part of the resume checker score is based on the parsability rate of your resume. We've reverse-engineered the most popular applicant tracking systems — including BambooHR, Greenhouse, Lever, and Workday — and look for signs of ATS compatibility.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              For each resume uploaded, we look for skills and keywords, readable contact information, date format, links, file type, and length. Then we give you suggestions on how to improve.
            </p>
            <button
              onClick={() => document.getElementById('analyzer')?.scrollIntoView({behavior:'smooth'})}
              className="px-6 py-3 rounded-xl font-bold text-white text-sm transition-all"
              style={{background:'linear-gradient(135deg, #10b981, #06b6d4)'}}>
              Check my resume →
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
