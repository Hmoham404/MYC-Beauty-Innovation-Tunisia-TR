import { motion } from 'framer-motion';
import { Zap, Globe2, Layout } from 'lucide-react';

const Features = () => {
  const capabilities = [
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Format Integrity",
      desc: "We rebuild DOCX, XLSX and PPTX files from the document structure so styles and layout stay close to the original."
    },
    {
      icon: <Globe2 className="w-6 h-6" />,
      title: "Google Intelligence",
      desc: "Powered by the world's most advanced neural translation engine for natural-sounding results."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Batch Processing",
      desc: "Our high-speed engine translates large documents in seconds using intelligent batching technology."
    }
  ];

  return (
    <section id="features" className="section-padding bg-gray-50/50">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Engineered for <span className="text-brand-red">Precision</span>.</h2>
        <p className="text-gray-500 max-w-2xl mx-auto font-medium">Beyond simple translation—we deliver a document that feels original.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {capabilities.map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10 }}
            className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/20 hover:shadow-2xl transition-all"
          >
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
