import { readFileSync } from 'fs';
import { stopWordsPath } from '../index.js';

const customerFormList = ['АО', 'АКЦИОНЕРНОЕ ОБЩЕСТВО', 'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ', 'ООО', 'АНО ДПО', 'ЧУ', 'АВТОНОМНАЯ НЕКОММЕРЧЕСКАЯ ОРГАНИЗАЦИЯ'];

export const txtFilterByStopWords = (data) => {
  const stopWords = JSON.parse(readFileSync(stopWordsPath, 'utf-8'));

  if (typeof data == 'string') {
    const text = data.toLowerCase();
    for (const word of stopWords) {
      if (text.indexOf(word) != -1) return false;
    }
  } else if (typeof data != 'string') {
    return false;
  }
  return true;
};

export const delCustomerNameForm = (data) => {  
  
  if (typeof data == 'string') {
    let text = data.toUpperCase();
    for (const word of customerFormList) {
      if (text.indexOf(word) != -1) {        
        text = text.replace(word, '').trim()
      }
    } 
    return text
  }   
};