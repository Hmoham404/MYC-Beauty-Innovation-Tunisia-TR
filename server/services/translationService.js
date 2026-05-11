const axios = require('axios');

class TranslationService {
    constructor() {
        this.cache = new Map();
        this.supportedLanguages = new Set(['fr', 'ar', 'en', 'it', 'zh']);
    }

    async translateText(text, targetLanguage) {
        if (!text || text.trim().length === 0) return text;
        if (!this.supportedLanguages.has(targetLanguage)) {
            throw new Error('Unsupported target language.');
        }
        const cacheKey = `${targetLanguage}:${text}`;
        if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);

        try {
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;
            const response = await axios.get(url, { timeout: 15000 });
            if (response.data && response.data[0]) {
                const translated = response.data[0].map(x => x[0]).join('');
                this.cache.set(cacheKey, translated);
                return translated;
            }
            return text;
        } catch (error) {
            console.error("Single translation failed:", error.message);
            return text;
        }
    }

    async translateBatch(texts, targetLanguage) {
        if (!texts || texts.length === 0) return {};
        
        const results = {};
        const toTranslate = [];
        
        texts.forEach(t => {
            const cacheKey = `${targetLanguage}:${t}`;
            if (this.cache.has(cacheKey)) {
                results[t] = this.cache.get(cacheKey);
            } else {
                toTranslate.push(t);
            }
        });

        if (toTranslate.length === 0) return results;

        console.log(`Translating batch of ${toTranslate.length} unique items...`);

        // Smaller batches to be safe
        const BATCH_SIZE = 10;
        for (let i = 0; i < toTranslate.length; i += BATCH_SIZE) {
            const batch = toTranslate.slice(i, i + BATCH_SIZE);
            
            // We'll translate them one by one but in parallel groups to be faster but reliable
            // Google Public API doesn't like huge combined strings with markers
            const batchPromises = batch.map(async (txt) => {
                const res = await this.translateText(txt, targetLanguage);
                results[txt] = res;
            });

            await Promise.all(batchPromises);
            
            // Small delay between batches to avoid 429
            await new Promise(r => setTimeout(r, 300));
        }

        return results;
    }
}

module.exports = new TranslationService();
