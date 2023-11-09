import { isChrome } from '../methods/checkBrowser';
import type { App } from 'vue';

declare module 'vue' {
  interface ComponentCustomProperties {    
    $hideScroll: () => void;
    $setScroll: () => void;
    // $Scroll: (key: 'hideScroll' | 'setScroll') => (() => void)
  }
}

const body: HTMLBodyElement | null = document.querySelector('body');    

const hideScroll = (): void => {    
  if (document.documentElement.scrollHeight > window.innerHeight && !body?.classList.contains('hide_scroll')){
    if (isChrome()) {    
    body?.classList.add('body-p-right');
  }  
  body?.classList.add('hide_scroll');    
  }  
};

const setScroll = (): void => {
  if (document.documentElement.scrollHeight > window.innerHeight && body?.classList.contains('hide_scroll')) {    
    if (isChrome()) {    
    body?.classList.remove('body-p-right');
  }  
  body?.classList.remove('hide_scroll');      
  }        
};

export const scrollToggle = {
  install: (app: App, options = {hideScroll, setScroll}): void => {    
    app.config.globalProperties.$hideScroll = hideScroll;
    app.config.globalProperties.$setScroll = setScroll;
    // app.config.globalProperties.$Scroll = (key: 'hideScroll' | 'setScroll') => {
    //   return options[key]
    // }
    // app.provide('Scroll', options);
  }  
}
