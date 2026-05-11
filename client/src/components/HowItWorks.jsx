import { Upload, Settings, Download } from 'lucide-react';

const Step = ({ number, icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-16 h-16 bg-brand-red text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand-red/20 relative">
      <Icon className="w-8 h-8" />
      <div className="absolute -top-3 -right-3 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold border-4 border-white">
        {number}
      </div>
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-500 text-sm max-w-[250px]">{description}</p>
  </div>
);

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">How it <span className="text-brand-red">Works</span></h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Get your documents ready in three simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {/* Connecting lines for desktop */}
        <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-gray-100 -z-10"></div>
        
        <Step 
          number="1" 
          icon={Upload} 
          title="Upload Document" 
          description="Select your PDF, Word or Excel file from your computer."
        />
        <Step 
          number="2" 
          icon={Settings} 
          title="Configure Options" 
          description="Choose between simple conversion or AI-powered translation."
        />
        <Step 
          number="3" 
          icon={Download} 
          title="Download PDF" 
          description="Preview your result and download your professional PDF."
        />
      </div>
    </section>
  );
};

export default HowItWorks;
