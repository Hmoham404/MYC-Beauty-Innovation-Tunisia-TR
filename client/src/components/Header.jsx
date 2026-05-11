import { useState, useEffect } from 'react';

const Header = ({ isWorkspace, onBack }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onBack) {
      onBack();
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'py-6 bg-transparent'} text-brand-black`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={handleLogoClick} className="flex items-center gap-3 group bg-transparent border-0 cursor-pointer">
          <img 
            src="/MYC LOGO BLALK.png" 
            alt="MYC Logo" 
            className="h-8 md:h-12 w-auto transition-transform group-hover:scale-105 drop-shadow-sm"
          />
          <span className="font-bold text-xl tracking-tighter hidden sm:block">
            MYC <span className="text-brand-red italic font-black">BEAUTY INNOVATION</span> TUNISIA
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {!isWorkspace && (
            <>
              <a href="#overview" className="text-sm font-bold text-gray-600 hover:text-brand-red transition-all">Company</a>
              <a 
                href="https://www.google.com/maps/place/MYC+Beauty+innovation+TUNISIA/@35.7273125,10.7501875,17z/data=!3m1!4b1!4m6!3m5!1s0x13020d001063bfb5:0x6b898891dc8ddc6!8m2!3d35.7273125!4d10.7501875!16s%2Fg%2F11z1gmhy9p?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-white text-brand-red font-bold text-sm rounded-full border border-brand-red/30 hover:border-brand-red hover:bg-red-50 hover:shadow-[0_0_15px_rgba(217,4,41,0.2)] transition-all flex items-center gap-2"
              >
                Get Started
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
