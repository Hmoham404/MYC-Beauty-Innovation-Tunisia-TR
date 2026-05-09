import React, { useState, useEffect, useRef } from 'react';
import { Eye, Download, FileText, CheckCircle2, Layout, AlertCircle, FileSpreadsheet, File, Loader2 } from 'lucide-react';
import { renderAsync } from 'docx-preview';
import * as XLSX from 'xlsx';

const PreviewPanel = ({ data, onReset }) => {
  const [activeTab, setActiveTab] = useState('preview');
  const [excelData, setExcelData] = useState(null);
  const [loading, setLoading] = useState(false);
  const docRef = useRef(null);
  
  if (!data) return null;

  const { viewUrl, downloadUrl, rawUrl, metadata, translatedFile } = data;
  const extension = translatedFile?.split('.').pop().toLowerCase();
  const isExcel = extension === 'xlsx';
  const isWord = extension === 'docx';
  const isPDF = extension === 'pdf';

  useEffect(() => {
    if (isWord && rawUrl) {
      loadWordDoc();
    } else if (isExcel && rawUrl) {
      loadExcelDoc();
    }
  }, [isWord, isExcel, rawUrl]);

  const loadWordDoc = async () => {
    setLoading(true);
    try {
      const response = await fetch(rawUrl);
      const blob = await response.blob();
      if (docRef.current) {
        await renderAsync(blob, docRef.current);
      }
    } catch (err) {
      console.error("Word preview failed", err);
    } finally {
      setLoading(false);
    }
  };

  const loadExcelDoc = async () => {
    setLoading(true);
    try {
      const response = await fetch(rawUrl);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });
      const firstSheet = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheet];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setExcelData(jsonData);
    } catch (err) {
      console.error("Excel preview failed", err);
    } finally {
      setLoading(false);
    }
  };

  const getFormatIcon = () => {
    if (isExcel) return <FileSpreadsheet className="w-10 h-10 text-green-600" />;
    if (isWord) return <FileText className="w-10 h-10 text-blue-600" />;
    return <File className="w-10 h-10 text-brand-red" />;
  };

  return (
    <div className="max-w-6xl mx-auto my-12 animate-in fade-in zoom-in-95 duration-700">
      <div className="bg-white rounded-4xl border border-gray-100 shadow-2xl overflow-hidden">
        
        {/* Status Header */}
        <div className="bg-linear-to-r from-green-50 to-emerald-50 px-10 py-8 flex items-center justify-between border-b border-green-100">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-green-800">Direct {extension.toUpperCase()} Rendering</h3>
              <p className="text-green-600 font-medium">Viewing actual file structure without intermediate conversion.</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4 bg-white/50 backdrop-blur-sm px-5 py-3 rounded-2xl border border-green-200">
             <div className="text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Type Match</p>
                <p className="text-xs font-bold text-green-600">Perfect Fidelity</p>
             </div>
             <Layout className="w-6 h-6 text-green-500" />
          </div>
        </div>

        <div className="p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left: Interactive Preview */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <Eye className="w-6 h-6 text-brand-red" />
                  {isWord ? 'Word Viewer' : isExcel ? 'Excel Viewer' : 'PDF Viewer'}
                </h3>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  <button className="px-4 py-2 bg-white rounded-lg text-xs font-bold shadow-sm">Native Result</button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-[2.5rem] overflow-auto border border-gray-100 shadow-inner h-[700px] relative">
                {loading && (
                   <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-4">
                      <Loader2 className="w-10 h-10 animate-spin text-brand-red" />
                      <p className="font-bold text-gray-500">Rendering {extension.toUpperCase()}...</p>
                   </div>
                )}

                {isWord && <div ref={docRef} className="p-8 min-h-full bg-white"></div>}
                
                {isExcel && excelData && (
                  <div className="p-4 bg-white min-w-full">
                    <table className="border-collapse border border-gray-200 w-full text-sm">
                      <tbody>
                        {excelData.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="border border-gray-200 p-2 whitespace-nowrap min-w-[100px]">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {isPDF && viewUrl && (
                  <iframe 
                    src={viewUrl} 
                    title="PDF Preview"
                    className="w-full h-full border-none"
                  />
                )}

                {isPDF && !viewUrl && (
                   <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
                      <AlertCircle className="w-12 h-12" />
                      <p className="font-bold uppercase tracking-widest text-[10px]">Preview Unavailable</p>
                      <p className="text-sm font-medium">Native PDF preview failed, but your translation is ready for download.</p>
                   </div>
                )}
                
                {(!isWord && !isExcel && !isPDF) && (
                   <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
                      <File className="w-12 h-12" />
                      <p className="font-bold uppercase tracking-widest text-[10px]">No Preview Available</p>
                      <p className="text-sm font-medium">Preview is not supported for this format.</p>
                   </div>
                )}
              </div>
            </div>

            {/* Right: Smart Actions */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 space-y-8">
                <div className="flex items-center gap-4">
                   {getFormatIcon()}
                   <div>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Document Format</p>
                      <p className="text-lg font-black text-brand-black truncate max-w-[180px]">{extension.toUpperCase()}</p>
                   </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-xs font-bold text-gray-500">Same Structure preserved</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-4">
                    <div className="w-2 h-2 bg-brand-red rounded-full"></div>
                    <p className="text-xs font-bold text-gray-500">Direct {extension.toUpperCase()} Edit</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <a 
                  href={downloadUrl}
                  className="flex flex-col items-center gap-1 w-full py-5 bg-brand-red text-white rounded-[2rem] font-bold hover:scale-[1.02] active:scale-95 shadow-2xl shadow-brand-red/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-6 h-6" />
                    <span>Download {extension.toUpperCase()}</span>
                  </div>
                </a>
                
                <button 
                  onClick={onReset}
                  className="w-full py-4 text-xs font-bold text-gray-400 hover:text-brand-red transition-colors uppercase tracking-[0.3em] mt-4"
                >
                  ← New Document
                </button>
              </div>

              <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex gap-4">
                 <AlertCircle className="w-6 h-6 text-blue-500 shrink-0" />
                 <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
                   <strong>Fidelity Guaranteed:</strong> We modified your original {extension.toUpperCase()} file's XML. What you see is exactly what you get.
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
