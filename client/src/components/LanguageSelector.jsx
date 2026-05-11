const languages = [
  { code: 'fr', name: 'FR' },
  { code: 'en', name: 'EN' },
  { code: 'ar', name: 'AR' },
  { code: 'zh', name: 'ZH' },
  { code: 'it', name: 'IT' }
];

const LanguageSelector = ({ selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3 my-6">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => onSelect(lang.code)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
            selected === lang.code
              ? 'bg-brand-red border-brand-red text-white'
              : 'bg-white border-gray-200 text-gray-600 hover:border-brand-red hover:text-brand-red'
          }`}
        >
          <span className="text-sm font-bold">{lang.name}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
