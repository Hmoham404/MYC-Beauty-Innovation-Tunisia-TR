import Header from './Header';
import UploadBox from './UploadBox';
import PreviewPanel from './PreviewPanel';
import Footer from './Footer';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const TranslationWorkspace = ({ onBack, processedData, onProcessed, onReset }) => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-gray transition-colors duration-300">
      <Header isWorkspace={true} onBack={onBack} />
      
      <main className="grow pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-brand-red transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Corporate Site
          </button>
        </div>

        {!processedData ? (
          <UploadBox onProcessed={onProcessed} />
        ) : (
          <div id="preview" className="min-h-[80vh]">
            <div className="section-padding pt-0">
              <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-xs font-bold uppercase tracking-widest border border-green-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                  Mission Accomplished
                </div>
                <h2 className="text-5xl font-bold mb-4 tracking-tighter text-brand-black">Your Document is <span className="text-brand-red">Ready</span></h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  We've successfully processed your file. Review the results below and export your professional document.
                </p>
              </div>
              <PreviewPanel data={processedData} onReset={onReset} />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TranslationWorkspace;
