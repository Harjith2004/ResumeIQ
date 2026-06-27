import { Zap, GitBranch, ExternalLink, Link } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)'}}>
                <Zap size={16} className="text-white"/>
              </div>
              <span className="font-bold text-xl">ResumeIQ</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              A free AI-powered resume analyzer that helps you beat ATS filters and land more interviews.
            </p>
            <div className="flex gap-3 mt-6">
              {[GitBranch, ExternalLink, Link].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                  <Icon size={17}/>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Product</p>
            <ul className="space-y-3">
              {['Resume Checker','ATS Score','Job Matcher','Skill Analysis'].map(l => (
                <li key={l}><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Company</p>
            <ul className="space-y-3">
              {['About','Blog','GitHub','Privacy Policy'].map(l => (
                <li key={l}><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© 2025 ResumeIQ · Built with Gemini AI · Free & Open Source</p>
          <p className="text-slate-600 text-xs">Made for job seekers everywhere ❤️</p>
        </div>
      </div>
    </footer>
  );
}
