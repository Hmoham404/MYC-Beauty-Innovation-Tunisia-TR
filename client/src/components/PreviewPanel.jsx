import { useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Download, Eye, File, FileSpreadsheet, FileText, Layout, Loader2, RefreshCw } from 'lucide-react';
import { renderAsync } from 'docx-preview';

const PreviewPanel = ({ data, onReset }) => {
  const [loading, setLoading] = useState(false);
  const docRef = useRef(null);

  const { viewUrl, downloadUrl, rawUrl, translatedFile } = data || {};
  const extension = translatedFile?.split('.').pop().toLowerCase();
  const isExcel = extension === 'xlsx';
  const isWord = extension === 'docx';
  const isPowerPoint = extension === 'pptx';
  const isPDF = extension === 'pdf';

  useEffect(() => {
    if (!data) return;

    const loadWordDoc = async () => {
      setLoading(true);
      try {
        const response = await fetch(rawUrl);
        const blob = await response.blob();
        if (docRef.current) {
          docRef.current.innerHTML = '';
          await renderAsync(blob, docRef.current);
        }
      } catch (err) {
        console.error('Word preview failed', err);
      } finally {
        setLoading(false);
      }
    };

    if (isWord && rawUrl) {
      loadWordDoc();
    }
  }, [data, isWord, isExcel, rawUrl]);

  const getFormatIcon = () => {
    if (isExcel) return <FileSpreadsheet className="w-10 h-10 text-green-600" />;
    if (isWord) return <FileText className="w-10 h-10 text-blue-600" />;
    if (isPowerPoint) return <FileText className="w-10 h-10 text-orange-600" />;
    return <File className="w-10 h-10 text-brand-red" />;
  };

  if (!data) return null;

  return (
    <div className="max-w-6xl mx-auto my-12 animate-in fade-in zoom-in-95 duration-700">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="bg-linear-to-r from-green-50 to-emerald-50 px-6 md:px-10 py-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-green-100">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-green-800">Your {extension?.toUpperCase()} file is ready</h3>
              <p className="text-green-600 font-medium">The translated document was rebuilt and is ready to preview or download.</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4 bg-white/50 backdrop-blur-sm px-5 py-3 rounded-2xl border border-green-200">
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Format</p>
              <p className="text-xs font-bold text-green-600">Structure preserved</p>
            </div>
            <Layout className="w-6 h-6 text-green-500" />
          </div>
        </div>

        <div className="p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between px-2 gap-4">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <Eye className="w-6 h-6 text-brand-red" />
                  {isWord ? 'Word Viewer' : isExcel ? 'Excel PDF Preview' : isPowerPoint ? 'PowerPoint Preview' : 'PDF Viewer'}
                </h3>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  <span className="px-4 py-2 bg-white rounded-lg text-xs font-bold shadow-sm">Native Result</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-3xl overflow-auto border border-gray-100 shadow-inner h-[700px] relative">
                {loading && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-brand-red" />
                    <p className="font-bold text-gray-500">Rendering {extension?.toUpperCase()}...</p>
                  </div>
                )}

                {isWord && <div ref={docRef} className="p-8 min-h-full bg-white"></div>}

                {(isPDF || isExcel || isPowerPoint) && viewUrl && (
                  <iframe
                    src={viewUrl}
                    title={`${extension?.toUpperCase()} Preview`}
                    aria-label={`${extension?.toUpperCase()} preview`}
                    className="w-full h-full border-none"
                  />
                )}

                {(isPDF || isExcel || isPowerPoint) && !viewUrl && (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
                    <AlertCircle className="w-12 h-12" />
                    <p className="font-bold uppercase tracking-widest text-[10px]">Preview Unavailable</p>
                    <p className="text-sm font-medium text-center px-6">The translated file is ready for download.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-8">
                <div className="flex items-center gap-4">
                  {getFormatIcon()}
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Document Format</p>
                    <p className="text-lg font-black text-brand-black truncate max-w-[180px]">{extension?.toUpperCase()}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-xs font-bold text-gray-500">Original structure preserved</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-4">
                    <div className="w-2 h-2 bg-brand-red rounded-full"></div>
                    <p className="text-xs font-bold text-gray-500">Same output format</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href={downloadUrl}
                  className="flex flex-col items-center gap-1 w-full py-5 bg-brand-red text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-95 shadow-2xl shadow-brand-red/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-6 h-6" />
                    <span>Download {extension?.toUpperCase()}</span>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={onReset}
                  className="w-full py-4 text-xs font-bold text-gray-400 hover:text-brand-red transition-colors uppercase tracking-[0.3em] mt-4 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  New Document
                </button>
              </div>

              <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex gap-4">
                <AlertCircle className="w-6 h-6 text-blue-500 shrink-0" />
                <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
                  <strong>Structure-aware rebuild:</strong> The system updates document text while keeping the original format as closely as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
