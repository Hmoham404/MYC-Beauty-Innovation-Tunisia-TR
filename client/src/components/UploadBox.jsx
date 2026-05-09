import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Globe, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '../services/api';

const UploadBox = ({ onProcessed }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [targetLang, setTargetLang] = useState('fr');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setError(null);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setIsUploading(true);
    setError(null);
    setStatus('Uploading file...');

    try {
      // 1. Upload
      const uploadRes = await api.upload(file);
      const fileId = uploadRes.file.id;

      setStatus('Translating content and rebuilding format...');
      // 2. Process
      const processRes = await axios.post('/api/documents/process', {
        fileId,
        mode: 'translate',
        targetLanguage: targetLang
      });

      setStatus('Finalizing document...');
      onProcessed(processRes.data);
    } catch (err) {
      console.error(err);
      const backendError = err.response?.data?.error;
      const backendDetails = err.response?.data?.details;
      
      if (backendError) {
        setError(`${backendError}${backendDetails ? `: ${backendDetails}` : ''}`);
      } else {
        setError('Processing failed. Please check your internet connection and try again.');
      }
    } finally {
      setIsUploading(false);
      setStatus('');
    }
  };

  const languages = [
    { id: 'fr', name: 'Français', flag: 'fi-fr' },
    { id: 'ar', name: 'العربية', flag: 'fi-tn' },
    { id: 'en', name: 'English', flag: 'fi-gb' },
    { id: 'it', name: 'Italiano', flag: 'fi-it' },
    { id: 'zh', name: '中文', flag: 'fi-cn' }
  ];

  return (
    <section id="upload" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-4xl p-12 border border-gray-100 shadow-2xl shadow-gray-200/50 relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-red/5 rounded-full blur-3xl"></div>
          
          <div className="text-center mb-12 space-y-3">
            <h3 className="text-4xl font-black tracking-tighter text-brand-black">Start Your <span className="text-brand-red">Translation</span></h3>
            <p className="text-gray-500 font-medium max-w-lg mx-auto">Upload any document and get a high-fidelity translation while keeping everything in place.</p>
          </div>

          {/* Process Diagram */}
          <div className="hidden md:flex items-center justify-between max-w-3xl mx-auto mb-16 relative">
             <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
             
             {[
               { icon: Upload, title: "1. Upload", desc: "Original File" },
               { icon: Globe, title: "2. Translate", desc: "AI Engine" },
               { icon: CheckCircle2, title: "3. Reconstruct", desc: "Keep Formatting" }
             ].map((step, i) => (
               <div key={i} className="relative z-10 flex flex-col items-center gap-3 group">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${i === 0 ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20' : 'bg-white text-gray-400 border border-gray-200 group-hover:border-brand-red group-hover:text-brand-red'}`}>
                   <step.icon className="w-6 h-6" />
                 </div>
                 <div className="text-center">
                   <p className="font-bold text-sm text-brand-black">{step.title}</p>
                   <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{step.desc}</p>
                 </div>
               </div>
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-10">
            {/* Left: File Drop */}
            <div className="lg:col-span-7">
               <div className="relative group h-full">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  accept=".pdf,.docx,.xlsx,.pptx"
                />
                <div className={`h-full min-h-[300px] border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center gap-6 transition-all ${file ? 'border-brand-red bg-brand-red/5' : 'border-gray-200 hover:border-brand-red/50 bg-gray-50'}`}>
                  <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-transform group-hover:scale-110 ${file ? 'bg-brand-red text-white shadow-xl shadow-brand-red/20' : 'bg-white text-gray-400 shadow-sm'}`}>
                    <Upload className="w-10 h-10" />
                  </div>
                  <div className="text-center px-8">
                    <p className="text-xl font-bold text-gray-700 truncate max-w-sm">{file ? file.name : 'Drop your file here'}</p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">Compatible with DOCX, XLSX, PPTX, PDF</p>
                  </div>
                  {file && (
                     <button 
                      onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      className="px-4 py-2 bg-white border border-gray-100 rounded-full text-[10px] font-black text-brand-red uppercase tracking-widest hover:bg-gray-50 transition-colors shadow-sm"
                     >
                       Change File
                     </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Language & Action */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Target Language</label>
                  {targetLang && <span className="text-[10px] font-bold text-brand-red bg-brand-red/5 px-2 py-1 rounded">Selected: {languages.find(l => l.id === targetLang)?.name}</span>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setTargetLang(lang.id)}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 font-bold transition-all text-sm group ${targetLang === lang.id ? 'border-brand-red bg-white text-brand-black shadow-xl shadow-brand-red/10' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}
                    >
                      <span className={`fi ${lang.flag} rounded-sm shadow-sm text-xl transition-transform group-hover:scale-125`}></span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <button
                  disabled={!file || isUploading}
                  onClick={handleProcess}
                  className="btn-primary w-full py-6 text-xl flex items-center justify-center gap-4 disabled:opacity-50 relative overflow-hidden"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Globe className="w-6 h-6" />
                      <span>Start Translation</span>
                    </>
                  )}
                </button>
                {isUploading && (
                   <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4 animate-pulse">
                     {status}
                   </p>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-8 p-5 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4 animate-shake">
              <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
              <div>
                <p className="text-sm text-red-600 font-black">Translation Error</p>
                <p className="text-xs text-red-500 mt-1">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UploadBox;
