const body: HTMLBodyElement | null = document.querySelector('body');

function isChrome() {
  const userAgent = navigator.userAgent.toLowerCase();

  return (
    userAgent.includes('chrome') ||
    userAgent.includes('chromium')
  );
}


export const hideScroll = (): void => {  
  if (isChrome() && document.body.offsetHeight > document.documentElement.clientHeight) {    
    body?.classList.add('body-p-right');
  }
  if (body && body.scrollHeight > window.innerHeight) {
    body.classList.add('hide_scroll');
  }  
};

export const setScroll = (): void => {
  body?.classList.remove('hide_scroll');    
  body?.classList.remove('body-p-right');  
};
