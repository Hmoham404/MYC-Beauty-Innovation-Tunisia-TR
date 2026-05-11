import { useState } from 'react';
import { AlertCircle, FileText, Globe, Languages, Loader2, Upload } from 'lucide-react';
import api from '../services/api';

const languages = [
  { id: 'fr', name: 'Francais', badge: 'FR' },
  { id: 'ar', name: 'Arabe', badge: 'AR' },
  { id: 'en', name: 'English', badge: 'EN' },
  { id: 'it', name: 'Italiano', badge: 'IT' },
  { id: 'zh', name: 'Chinese', badge: 'ZH' }
];

const formats = [
  { label: 'PDF', detail: 'Preview direct' },
  { label: 'DOCX', detail: 'Word XML' },
  { label: 'XLSX', detail: 'Excel cells' },
  { label: 'PPTX', detail: 'Slides XML' }
];

const UploadBox = ({ onProcessed }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [targetLang, setTargetLang] = useState('fr');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const allowed = ['pdf', 'docx', 'xlsx', 'pptx'];
    const ext = selected.name.split('.').pop()?.toLowerCase();
    if (!allowed.includes(ext)) {
      setError('Format non supporte. Utilisez PDF, DOCX, XLSX ou PPTX.');
      setFile(null);
      return;
    }

    setFile(selected);
    setError(null);
  };

  const handleProcess = async () => {
    if (!file) return;
    setIsUploading(true);
    setError(null);
    setStatus('Uploading, translating and rebuilding the document...');

    try {
      const processRes = await api.processUpload(file, targetLang);
      setStatus('Preparing preview and download...');
      onProcessed(processRes);
    } catch (err) {
      console.error(err);
      const backendError = err.response?.data?.error;
      const backendDetails = err.response?.data?.details;
      setError(
        backendError
          ? `${backendError}${backendDetails ? `: ${backendDetails}` : ''}`
          : 'Processing failed. Please check your connection and try again.'
      );
    } finally {
      setIsUploading(false);
      setStatus('');
    }
  };

  return (
    <section id="upload" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-xl shadow-gray-200/50">
          <div className="text-center mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-red-50 text-brand-red text-xs font-black uppercase tracking-widest">
              <Languages className="w-4 h-4" />
              Smart document translation
            </div>
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-brand-black">
              Translate without losing the <span className="text-brand-red">structure</span>
            </h3>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
              Upload a business document, choose the target language, and download the rebuilt file in the same format.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {formats.map((format) => (
              <div key={format.label} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 flex items-center gap-3">
                <FileText className="w-5 h-5 text-brand-red shrink-0" />
                <div>
                  <p className="font-black text-brand-black text-sm">{format.label}</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{format.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10">
            <div className="lg:col-span-7">
              <div className="relative group h-full">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  accept=".pdf,.docx,.xlsx,.pptx"
                />
                <div className={`h-full min-h-[300px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-6 transition-all ${file ? 'border-brand-red bg-brand-red/5' : 'border-gray-200 hover:border-brand-red/50 bg-gray-50'}`}>
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${file ? 'bg-brand-red text-white shadow-xl shadow-brand-red/20' : 'bg-white text-gray-400 shadow-sm'}`}>
                    <Upload className="w-10 h-10" />
                  </div>
                  <div className="text-center px-8">
                    <p className="text-xl font-bold text-gray-700 truncate max-w-sm">
                      {file ? file.name : 'Drop your file here'}
                    </p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">
                      PDF, DOCX, XLSX, PPTX up to 10 MB
                    </p>
                  </div>
                  {file && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                      className="px-4 py-2 bg-white border border-gray-100 rounded-full text-[10px] font-black text-brand-red uppercase tracking-widest hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      Change File
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between px-2 gap-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Target Language</label>
                  <span className="text-[10px] font-bold text-brand-red bg-brand-red/5 px-2 py-1 rounded">
                    Selected: {languages.find((l) => l.id === targetLang)?.name}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => setTargetLang(lang.id)}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 font-bold transition-all text-sm group ${targetLang === lang.id ? 'border-brand-red bg-white text-brand-black shadow-xl shadow-brand-red/10' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}
                    >
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-colors ${targetLang === lang.id ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-red-50 group-hover:text-brand-red'}`}>
                        {lang.badge}
                      </span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <button
                  type="button"
                  disabled={!file || isUploading}
                  onClick={handleProcess}
                  className="btn-primary w-full py-6 text-lg md:text-xl flex items-center justify-center gap-4 disabled:opacity-50 relative overflow-hidden"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Processing</span>
                    </>
                  ) : (
                    <>
                      <Globe className="w-6 h-6" />
                      <span>Start translation</span>
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
