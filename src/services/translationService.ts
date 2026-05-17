/**
 * Translation Service using MyMemory API
 * Documentation: https://mymemory.translated.net/doc/spec.php
 */

const BASE_URL = 'https://api.mymemory.translated.net/get';

export const translateText = async (text: string, targetLang: string, sourceLang: string = 'en'): Promise<string> => {
  if (targetLang.toLowerCase() === sourceLang.toLowerCase()) return text;
  
  try {
    const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`);
    const data = await response.json();
    
    if (data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
    }
    
    return text; // Fallback to original text
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};
