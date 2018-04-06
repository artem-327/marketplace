import scrollToElement from 'scroll-to-element'

export function scrollToComponent(e){
    scrollToElement('#'+e.target.name, {
        offset: -69,
        duration: 500
    });

}