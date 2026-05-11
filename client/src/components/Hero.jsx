import { motion } from 'framer-motion';
import { ArrowRight, Zap, ShieldCheck, Globe2 } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-white">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-red/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-full">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-brand-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">v2.0 High-Fidelity Engine</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-brand-black">
            Rebuild <br />
            <span className="text-brand-red">Documents</span> <br />
            with AI.
          </h1>

          <p className="text-xl text-gray-500 max-w-xl leading-relaxed font-medium">
            Translate business documents while keeping their original structure, tables, and styles as close as possible.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
            <a href="#upload" className="btn-primary px-12 py-5 text-lg shadow-2xl shadow-brand-red/30 hover:shadow-brand-red/50">
              Start Building
            </a>
            <a href="#features" className="group flex items-center gap-2 font-bold text-gray-400 hover:text-brand-black transition-colors">
              Explore Tech <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="pt-8 flex flex-wrap justify-center lg:justify-start gap-8 opacity-50">
             <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Secure</span>
             </div>
             <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all">
                <Globe2 className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Global</span>
             </div>
             <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all">
                <Zap className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Fast</span>
             </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 relative"
        >
          <div className="relative z-10 glass p-5 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-white">
             <div className="bg-gray-50 rounded-[2.5rem] p-10 aspect-square flex flex-col justify-between border border-gray-100">
                <div className="space-y-4">
                   {[80, 60, 40].map((w, i) => (
                     <div key={i} className="h-3 bg-gray-200 rounded-full" style={{ width: `${w}%` }}></div>
                   ))}
                </div>
                
                <div className="flex justify-center relative py-12">
                   <div className="w-32 h-32 bg-brand-red/10 rounded-full flex items-center justify-center">
                      <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center text-white shadow-xl">
                         <Zap className="w-8 h-8 fill-current" />
                      </div>
                   </div>
                   {/* Animated particles */}
                   <div className="absolute top-0 left-0 w-full h-full animate-spin-slow">
                      <div className="absolute top-0 left-1/2 w-2 h-2 bg-brand-red rounded-full"></div>
                      <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-blue-500 rounded-full"></div>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                   <div className="flex justify-between items-center">
                      <div className="h-3 bg-brand-red/20 rounded-full w-1/2"></div>
                      <div className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">PROCESSED</div>
                   </div>
                </div>
             </div>

             {/* Floating Badge */}
             <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl border border-gray-50 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                   <Globe2 className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Translation</div>
                   <div className="text-lg font-bold text-brand-black">100+ Languages</div>
                </div>
             </div>
          </div>
          
          {/* Decorative Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-gray-100 rounded-full -z-10"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
