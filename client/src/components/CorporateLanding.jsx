import { motion } from 'framer-motion';
import {
  ArrowRight, Factory, Cpu, ShieldCheck, Globe2, 
  Settings, Users, Zap, Award, Microscope, MonitorSmartphone,
  ArrowUpRight
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const CorporateLanding = ({ onNavigateToTranslation }) => {
  return (
    <div className="bg-white min-h-screen text-brand-black overflow-hidden font-sans selection:bg-brand-red selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('/ChatGPT Image 9 mai 2026, 10_42_56.png')" }}></div>
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-red/5 rounded-full blur-[100px]"></div>
        </div>

        {/* Logo in top left */}
        <div className="absolute top-8 left-8 z-20">
            <img src="/MYC LOGO BLALK.png" alt="MYC Logo" className="h-12 drop-shadow-sm" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full mt-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-8">
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-brand-red/20 shadow-sm shadow-brand-red/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Excellence Industrielle</span>
              </motion.div>

              <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter text-brand-black">
                MYC <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-red to-red-500">Beauty</span> <br />
                <span className="text-brand-black">Innovation</span> Tunisia
              </motion.h1>

              <motion.p variants={fadeIn} className="text-xl text-gray-700 font-bold tracking-wide">
                Industrial Excellence • Packaging Innovation • Smart Manufacturing
              </motion.p>

              <motion.p variants={fadeIn} className="text-lg text-gray-600 max-w-xl leading-relaxed">
                At MYC Beauty Innovation Tunisia, we believe innovation is built by people. Our company is more than an industrial leader — it is a united family of engineers, technicians, creators, and innovators working together to shape the future of cosmetic packaging and smart manufacturing with passion, precision, and excellence.
              </motion.p>
              
              <motion.p variants={fadeIn} className="text-lg text-gray-600 max-w-xl leading-relaxed">
                We combine technology, teamwork, and industrial expertise to create a modern work environment focused on growth, innovation, and international quality standards.
              </motion.p>

              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-5 pt-4">
                <button 
                  onClick={onNavigateToTranslation} 
                  className="group relative px-8 py-4 bg-white text-brand-red rounded-full font-black text-lg border border-transparent hover:border-brand-red/30 transition-all shadow-[0_0_15px_rgba(217,4,41,0.15)] hover:shadow-[0_0_25px_rgba(217,4,41,0.3)] hover:bg-red-50 flex items-center justify-center gap-3 overflow-hidden"
                >
                  <span className="absolute inset-0 rounded-full border-2 border-transparent bg-linear-to-r from-brand-red to-red-400 mask-[linear-gradient(#fff_0_0)] mask-exclude [-webkit-mask-image:linear-gradient(#fff_0_0)] [-webkit-mask-composite:destination-out] p-[2px]"></span>
                  <span className="relative z-10 flex items-center gap-2">Translation Space <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                </button>
              </motion.div>
            </div>

            {/* Floating Stats UI */}
            <motion.div variants={fadeIn} className="relative hidden lg:block">
              <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 relative border border-brand-red/10 shadow-2xl shadow-brand-red/5">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-red/10 rounded-full blur-2xl"></div>
                <div className="grid grid-cols-2 gap-6 relative z-10">
                  {/* Floating Stats Cards */}
                  <div className="bg-white rounded-2xl p-6 border border-brand-red/10 hover:border-brand-red hover:shadow-[0_0_15px_rgba(217,4,41,0.15)] hover:-translate-y-1 transition-all group">
                    <Factory className="w-8 h-8 text-brand-red mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-black text-brand-black">3</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mt-1 group-hover:text-brand-red transition-colors">Industrial Sites</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-brand-red/10 hover:border-brand-red hover:shadow-[0_0_15px_rgba(217,4,41,0.15)] hover:-translate-y-1 transition-all group">
                    <Globe2 className="w-8 h-8 text-brand-red mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-black text-brand-black">Global</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mt-1 group-hover:text-brand-red transition-colors">International Group</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-brand-red/10 hover:border-brand-red hover:shadow-[0_0_15px_rgba(217,4,41,0.15)] hover:-translate-y-1 transition-all group">
                    <ShieldCheck className="w-8 h-8 text-brand-red mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-black text-brand-black">ISO</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mt-1 group-hover:text-brand-red transition-colors">Certified</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-brand-red/10 hover:border-brand-red hover:shadow-[0_0_15px_rgba(217,4,41,0.15)] hover:-translate-y-1 transition-all group">
                    <Settings className="w-8 h-8 text-brand-red mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-black text-brand-black">Smart</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mt-1 group-hover:text-brand-red transition-colors">Industrial Solutions</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. COMPANY OVERVIEW */}
      <section id="overview" className="py-24 relative z-10 bg-brand-gray/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto space-y-6 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-brand-black">About <span className="text-brand-red">MYC Beauty Innovation</span></h2>
            <div className="h-1 w-20 bg-brand-red mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 leading-relaxed font-medium">
              MYC Beauty Innovation Tunisia is part of an international industrial group specialized in cosmetic packaging innovation and advanced manufacturing technologies. The company combines engineering excellence, smart production systems, automation, and sustainable innovation to deliver premium packaging solutions for global markets.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              At MYC, teamwork and innovation are at the heart of everything we build. We create an inspiring environment where talent, creativity, and industrial expertise grow together as one family.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Engineering Excellence", icon: Cpu, desc: "State-of-the-art machinery and precision engineering." },
              { title: "Smart Production", icon: Settings, desc: "Advanced automation and intelligent manufacturing systems." },
              { title: "Sustainable Innovation", icon: Zap, desc: "Eco-friendly materials and forward-thinking beauty solutions." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-brand-red/20 transition-all duration-300 text-center group relative overflow-hidden"
              >
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-red/5 rounded-full blur-2xl group-hover:bg-brand-red/10 transition-colors"></div>
                <div className="w-16 h-16 mx-auto bg-brand-red/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-red/10 transition-colors relative z-10">
                  <item.icon className="w-8 h-8 text-brand-red" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand-black relative z-10">{item.title}</h3>
                <p className="text-gray-500 text-sm relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MANAGEMENT & TEAM */}
      <section className="py-24 bg-brand-gray/30 relative z-10 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-brand-black">Leadership & <br/><span className="text-brand-red">Technical Team</span></h2>
              <p className="text-gray-600">A multidisciplinary international family working together to build the future of industrial beauty innovation.</p>
            </div>
          </div>

          <div className="space-y-12">
            {[
              {
                category: "General Management & Executive",
                members: [
                  { name: "Sami Ladjimi", role: "General Manager", isDG: true },
                  { name: "Chaima Trimech", role: "Administrative & Executive Assistant" }
                ]
              },
              {
                category: "Department Leaders",
                members: [
                  { name: "Mouna Jabnoun", role: "Supply Chain Manager" },
                  { name: "Walid Abbes", role: "Production Manager" },
                  { name: "H. Gargouch", role: "Technical Engineering Manager (Interim)" },
                  { name: "Sami Ladjimi", role: "Quality Manager" },
                  { name: "S. Ben Lamine", role: "Finance Manager (Interim)" },
                  { name: "Zoubaier Berrebeh", role: "HR Manager" }
                ]
              },
              {
                category: "Technical Engineering Team",
                members: [
                  { name: "Seif Zaidi", role: "Project Launch & Process Injection Team Leader" },
                  { name: "Slah Dridi", role: "Process Metallization & Assembly Team Leader" },
                  { name: "Anouar Laayouni", role: "Injection Maintenance Technician" },
                  { name: "Acref Hdeya", role: "Mold Maintenance Technician" }
                ]
              },
              {
                category: "Quality & Laboratory Team",
                members: [
                  { name: "Safa Jedda", role: "IQC & Quality Laboratory Supervisor" },
                  { name: "Chaima Massoudi", role: "Injection Quality Tech & OQC" },
                  { name: "Naoures Zaag", role: "Quality Assurance" },
                  { name: "Souhir Korbi", role: "Quality Laboratory Technician" }
                ]
              },
              {
                category: "Production Technical Team",
                members: [
                  { name: "Ali Amamou", role: "Injection Supervisor" },
                  { name: "Taoufi Dhibi", role: "Spray & Metallization Supervisor" },
                  { name: "Abir Toui", role: "Team Leader & Technician" },
                  { name: "Hassen Ezazedini", role: "Technical Team" },
                  { name: "Mokhles Ferjani", role: "Technical Team" },
                  { name: "Abdelmajid Tlili", role: "Technical Team" }
                ]
              }
            ].map((dept, deptIndex) => (
              <motion.div 
                key={deptIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: deptIndex * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-2xl font-black text-brand-black">{dept.category}</h3>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {dept.members.map((member, i) => (
                    <div 
                      key={i}
                      className={`bg-white border p-5 rounded-2xl flex flex-col justify-between transition-all group ${member.isDG ? 'border-brand-red/50 shadow-md bg-red-50/30' : 'border-gray-100 shadow-sm hover:border-brand-red/30 hover:shadow-md'}`}
                    >
                      <div className="flex items-start gap-4 mb-2">
                        <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center overflow-hidden border ${member.isDG ? 'bg-brand-red border-brand-red text-white' : 'bg-gray-50 border-gray-200 text-gray-400 group-hover:bg-red-50 group-hover:text-brand-red group-hover:border-brand-red/20 transition-colors'}`}>
                          <Users className="w-5 h-5 relative z-10" />
                        </div>
                        <div>
                          <h4 className="font-bold text-brand-black text-sm leading-tight mb-1">{member.name}</h4>
                          <p className="text-xs text-gray-500 font-medium">{member.role}</p>
                        </div>
                      </div>
                      
                      {member.isDG && (
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-red-100">
                          <a href="https://www.linkedin.com/company/myc-packaging-innovation/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            LinkedIn
                          </a>
                          <span className="text-gray-300">|</span>
                          <a href="mailto:sami.ladjimi@myc-innovation.com" className="text-xs font-bold text-brand-red hover:text-red-700 hover:underline flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            Email
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TECHNOLOGY & EXPERTISE */}
      <section className="py-24 relative z-10 bg-brand-gray/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-16 text-brand-black">Advanced Industrial <span className="text-brand-red">Technologies</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Smart Manufacturing", icon: Factory },
              { name: "Plastic Injection", icon: Settings },
              { name: "Automation Systems", icon: Cpu },
              { name: "Industrial Quality Control", icon: ShieldCheck },
              { name: "Packaging Innovation", icon: Zap },
              { name: "Sustainable Production", icon: Globe2 },
              { name: "R&D Engineering", icon: Microscope },
              { name: "Industrial Digitalization", icon: MonitorSmartphone }
            ].map((tech, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-gray-200 p-6 rounded-2xl hover:bg-brand-red/5 hover:border-brand-red/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-40 shadow-sm"
              >
                <tech.icon className="w-8 h-8 text-gray-400 group-hover:text-brand-red transition-colors" />
                <h4 className="font-bold text-lg text-brand-black group-hover:text-brand-red transition-colors">{tech.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CERTIFICATIONS */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-12 text-brand-black">International Standards & <span className="text-brand-red">Certifications</span></h2>
          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {[
              { name: "ISO 9001", desc: "Quality Management" },
              { name: "ISO 14001", desc: "Environmental" },
              { name: "ISO 45001", desc: "Health & Safety" },
              { name: "ISO 27001", desc: "Information Security" },
              { name: "Ecovadis", desc: "Sustainability" },
              { name: "SA8000", desc: "Social Accountability" }
            ].map((cert, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white w-40 p-6 rounded-2xl border border-gray-100 flex flex-col items-center gap-4 shadow-sm hover:shadow-xl hover:border-brand-red transition-all relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 group-hover:bg-brand-red transition-colors"></div>
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-red-50 transition-colors border border-gray-100 group-hover:border-red-100">
                  <Award className="w-8 h-8 text-gray-400 group-hover:text-brand-red transition-colors" />
                </div>
                <div className="text-center">
                  <h4 className="font-black tracking-widest uppercase text-brand-black text-sm mb-1">{cert.name}</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider group-hover:text-brand-red/80 transition-colors">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="py-32 relative overflow-hidden z-10 bg-brand-gray/50 border-t border-gray-100">
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-brand-red/5"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-12 md:p-20 rounded-[3rem] border border-brand-red/10 shadow-xl relative overflow-hidden"
          >
             {/* Subtle overlay */}
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMjcsIDMwLCAzNiwgMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')" }}></div>

            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 relative z-10 text-brand-black">
              Start Your Industrial <br/><span className="text-brand-red">Innovation Journey</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 relative z-10">
              Join the future of beauty packaging and industrial excellence.
            </p>
            <button 
              onClick={onNavigateToTranslation}
              className="relative z-10 px-10 py-5 bg-white text-brand-red rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_10px_25px_rgba(217,4,41,0.15)] hover:shadow-[0_10px_35px_rgba(217,4,41,0.3)] border border-brand-red/20 hover:border-brand-red hover:bg-red-50 flex items-center justify-center gap-4 mx-auto group overflow-hidden w-fit cursor-pointer"
            >
              <span className="absolute inset-0 rounded-full border-2 border-transparent bg-linear-to-r from-brand-red to-red-400 mask-[linear-gradient(#fff_0_0)] mask-exclude [-webkit-mask-image:linear-gradient(#fff_0_0)] [-webkit-mask-composite:destination-out] p-[2px]"></span>
              <span className="relative">Translation Space</span>
              <ArrowRight className="w-6 h-6 relative group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 8. LOCATION & MAP */}
      <section className="py-24 bg-white relative z-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-brand-black mb-4">Visit Our <span className="text-brand-red">Headquarters</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Discover our state-of-the-art industrial facilities where innovation meets precision in the heart of Tunisia.</p>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden border border-gray-200 shadow-xl bg-gray-50 h-[400px] w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3243.682855734563!2d10.747612576404112!3d35.72731247257321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13020d001063bfb5%3A0x6b898891dc8ddc6!2sMYC%20Beauty%20innovation%20TUNISIA!5e0!3m2!1sen!2s!4v1715096123456!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 9. TECHNICAL DEVELOPMENT & FOOTER */}
      <footer className="bg-white pt-20 pb-10 border-t-4 border-brand-red relative z-10 overflow-hidden text-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <img src="/MYC LOGO BLALK.png" alt="MYC Logo" className="h-8 drop-shadow-sm" />
                <span className="font-bold text-xl tracking-tighter">
                  MYC <span className="text-brand-red italic font-black">BEAUTY INNOVATION</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm max-w-sm">
                Engineering innovation through passion, teamwork, and industrial excellence.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 uppercase tracking-wider text-xs text-brand-black">Navigation</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-brand-red transition-colors">Home</a></li>
                <li><a href="#overview" className="hover:text-brand-red transition-colors">Company</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault(); onNavigateToTranslation();}} className="text-brand-red hover:text-brand-red/80 transition-colors flex items-center gap-1 font-bold">Translation Area <ArrowUpRight className="w-3 h-3"/></a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 uppercase tracking-wider text-xs text-brand-black">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-brand-red transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-brand-red transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-brand-red transition-colors">ISO Standards</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 order-2 md:order-1">
              <a href="#" className="w-10 h-10 rounded-full bg-brand-gray flex items-center justify-center text-gray-500 hover:bg-brand-red hover:text-white transition-all hover:-translate-y-1 hover:shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-gray flex items-center justify-center text-gray-500 hover:bg-brand-red hover:text-white transition-all hover:-translate-y-1 hover:shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-gray flex items-center justify-center text-gray-500 hover:bg-brand-red hover:text-white transition-all hover:-translate-y-1 hover:shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
              </a>
            </div>
            
            <p className="text-gray-500 text-sm order-3 md:order-2">
              &copy; {new Date().getFullYear()} MYC Beauty Innovation Tunisia. All rights reserved.
            </p>
            
            {/* 6. TECHNICAL DEVELOPMENT BADGE */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-gray rounded-full border border-gray-200 hover:border-brand-red/50 hover:bg-red-50 transition-colors cursor-default order-1 md:order-3">
              <Cpu className="w-4 h-4 text-brand-red animate-pulse" />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Developed by the <span className="text-brand-red">Technical Team</span> of MYC Beauty Innovation
              </span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default CorporateLanding;
