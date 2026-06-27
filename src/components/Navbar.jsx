import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">ResumeIQ</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {['Features', 'How it works', 'Pricing'].map(l => (
            <button key={l}
              onClick={() => document.getElementById(l.toLowerCase().replace(/ /g,'-'))?.scrollIntoView({behavior:'smooth'})}
              className="px-4 py-2 rounded-lg text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all font-medium">
              {l}
            </button>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl hover:border-slate-300 transition-all">
            Sign In
          </button>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('analyzer')?.scrollIntoView({behavior:'smooth'})}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
            style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>
            Get Started Free
          </motion.button>
        </div>

        <button className="md:hidden p-2 text-slate-600" onClick={() => setOpen(!open)}>
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
            className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-2">
            {['Features','How it works','Pricing'].map(l => (
              <button key={l} onClick={() => { document.getElementById(l.toLowerCase().replace(/ /g,'-'))?.scrollIntoView({behavior:'smooth'}); setOpen(false); }}
                className="text-left py-2.5 text-slate-700 text-sm font-medium border-b border-slate-50">
                {l}
              </button>
            ))}
            <button onClick={() => { document.getElementById('analyzer')?.scrollIntoView({behavior:'smooth'}); setOpen(false); }}
              className="mt-2 py-3 rounded-xl text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>
              Get Started Free
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
