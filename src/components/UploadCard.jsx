import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X, Loader2, Sparkles, AlertCircle, Shield } from 'lucide-react';
import { extractTextFromFile } from '../utils/parser';
import { analyzeResume } from '../services/gemini';

export default function UploadCard({ onResult }) {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) { setError('File must be under 5 MB.'); return; }
    setError(''); setFile(f);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true); setError('');
    try {
      const text = await extractTextFromFile(file);
      if (!text.trim()) throw new Error('Could not read file. Try saving your resume as a .txt file first.');
      const result = await analyzeResume(text, jobDesc);
      onResult(result, file.name);
    } catch (err) {
      setError(err.message || 'Analysis failed. Please check your API key in .env');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Drop zone */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
        onClick={() => !file && inputRef.current?.click()}
        className={`rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 border-2 border-dashed ${
          dragging ? 'border-indigo-400 bg-indigo-50' :
          file ? 'border-emerald-300 bg-emerald-50' :
          'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30'
        }`}
      >
        <input ref={inputRef} type="file" accept=".pdf,.txt" className="hidden"
          onChange={(e) => handleFile(e.target.files[0])} />

        <AnimatePresence mode="wait">
          {file ? (
            <motion.div key="file" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                <FileText size={32} className="text-emerald-600"/>
              </div>
              <p className="text-slate-900 font-bold text-lg mb-1">{file.name}</p>
              <p className="text-slate-500 text-sm mb-4">{(file.size/1024).toFixed(1)} KB · Ready to analyze</p>
              <button onClick={(e) => { e.stopPropagation(); setFile(null); }}
                className="inline-flex items-center gap-1.5 text-red-500 hover:text-red-600 text-sm font-medium transition-colors">
                <X size={14}/> Remove
              </button>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all ${dragging ? 'bg-indigo-100 border-indigo-200' : 'bg-slate-100 border-slate-200'} border`}>
                <Upload size={30} className={dragging ? 'text-indigo-600' : 'text-slate-400'}/>
              </div>
              <p className="text-slate-800 font-bold text-lg mb-1">Drop your resume here or choose a file</p>
              <p className="text-slate-400 text-sm mb-4">PDF & TXT only · Max 5MB</p>
              <span className="px-5 py-2.5 rounded-xl text-sm font-bold text-white inline-block"
                style={{background:'linear-gradient(135deg, #10b981, #06b6d4)'}}>
                Browse Files
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Job description */}
      <div className="mt-4">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Job Description <span className="font-normal text-slate-400">(optional — enables job match score)</span>
        </label>
        <textarea
          value={jobDesc} onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste the job description to get a match score..."
          rows={4}
          className="w-full rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-300 resize-none border border-slate-200 bg-white focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all"
        />
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}} exit={{opacity:0}}
            className="flex items-start gap-2.5 px-4 py-3 rounded-xl text-red-700 text-sm bg-red-50 border border-red-200 mt-3">
            <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5"/>
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <motion.button
        onClick={handleAnalyze} disabled={!file || loading}
        whileHover={{ scale: file && !loading ? 1.02 : 1 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-4 rounded-xl font-bold text-white text-lg flex items-center justify-center gap-2.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', boxShadow: file ? '0 8px 30px rgba(16,185,129,0.35)' : 'none' }}>
        {loading ? <><Loader2 size={22} className="animate-spin"/> Analyzing with Gemini AI...</>
                 : <><Sparkles size={22}/> Check My Resume</>}
      </motion.button>

      {/* Privacy note */}
      <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1.5">
        <Shield size={12} className="text-emerald-500"/>
        Privacy guaranteed — your resume is never stored or shared
      </p>
    </div>
  );
}
