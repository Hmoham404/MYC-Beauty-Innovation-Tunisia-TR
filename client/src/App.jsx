import { useState } from 'react';
import CorporateLanding from './components/CorporateLanding';
import TranslationWorkspace from './components/TranslationWorkspace';

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'translation'
  const [processedData, setProcessedData] = useState(null);

  const handleProcessed = (data) => {
    setProcessedData(data);
    const timer = setTimeout(() => {
      const element = document.getElementById('preview');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    return () => clearTimeout(timer);
  };

  const handleReset = () => {
    setProcessedData(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTranslation = () => {
    setCurrentView('translation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLanding = () => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-sans antialiased bg-brand-dark text-white min-h-screen">
      {currentView === 'landing' ? (
        <CorporateLanding onNavigateToTranslation={navigateToTranslation} />
      ) : (
        <TranslationWorkspace 
          onBack={navigateToLanding}
          processedData={processedData}
          onProcessed={handleProcessed}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;
