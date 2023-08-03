const body: HTMLBodyElement | null = document.querySelector('body');

export const hideScroll = (): void =>{	
	if(body && body.scrollHeight > window.innerHeight){    
    body.classList.add('hide_scroll');
  }
}

export const setScroll = (): void => {  
  body?.classList.remove('hide_scroll');  
}