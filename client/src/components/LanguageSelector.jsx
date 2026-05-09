import React from 'react';

const languages = [
  { code: 'fr', name: 'FR', flag: 'fi-fr' },
  { code: 'en', name: 'EN', flag: 'fi-gb' },
  { code: 'ar', name: 'AR', flag: 'fi-tn' }, // Tunisia flag for Arabic
  { code: 'zh', name: '中文', flag: 'fi-cn' },
  { code: 'it', name: 'IT', flag: 'fi-it' }
];

const LanguageSelector = ({ selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3 my-6">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onSelect(lang.code)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
            selected === lang.code
              ? 'bg-brand-red border-brand-red text-white'
              : 'bg-white border-gray-200 text-gray-600 hover:border-brand-red hover:text-brand-red'
          }`}
        >
          <span className={`fi ${lang.flag}`}></span>
          <span className="text-sm font-bold">{lang.name}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
