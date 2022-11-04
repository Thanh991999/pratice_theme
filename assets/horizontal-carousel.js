if(!customElements.get("sht-horizontal-carousel")){class a extends HTMLElement{constructor(){super(),this.sectionID=this.dataset.sectionId,this.carousels=this.querySelectorAll(".js-carousel-item"),this.container=this.querySelector(".js-carousel-items"),this.totalItems=this.carousels.length,this.prevBtnElement=this.querySelector(".js-carousel-prev-btn"),this.nextBtnElement=this.querySelector(".js-carousel-next-btn"),this.currentElement=this.querySelector(".js-carousel-counter-current"),this.totalElement=this.querySelector(".js-carousel-counter-total"),this.init(),this.bindEventHandlers()}init(){this.itemsToShow=Array.from(this.carousels).filter(t=>0<t.clientWidth),this.itemsToShow.length<2||(this.gutter=parseFloat(window.getComputedStyle(this.itemsToShow[1],null).getPropertyValue("padding-left"))+parseFloat(window.getComputedStyle(this.itemsToShow[1],null).getPropertyValue("padding-right")),this.itemOffset=this.itemsToShow[1].offsetLeft-this.itemsToShow[0].offsetLeft,this.itemsPerPage=Math.floor((this.container.clientWidth-this.itemsToShow[0].offsetLeft)/this.itemOffset),this.totalPages=this.itemsToShow.length-this.itemsPerPage+1,this.updateCarousel())}updateCarousel(){var t=this.currentPage;this.currentPage=Math.round(this.container.scrollLeft/this.itemOffset)+1,0<this.currentPage&&0<this.totalPages&&(this.totalElement&&(this.totalElement.textContent=this.totalPages),this.currentElement)&&(this.currentElement.innerHTML=this.currentPage+`<span class="visually-hidden">${this.currentElement.dataset.accessibilityMessage}</span>`),this.currentPage!=t&&this.dispatchEvent(new CustomEvent("itemChanged",{detail:{currentPage:this.currentPage,currentElement:this.itemsToShow[this.currentPage-1],container:this}})),this.isItemVisible(this.itemsToShow[0])&&0===this.container.scrollLeft?this.prevBtnElement.setAttribute("disabled","disabled"):this.prevBtnElement.removeAttribute("disabled"),this.isItemVisible(this.itemsToShow[this.itemsToShow.length-1])?this.nextBtnElement.setAttribute("disabled","disabled"):this.nextBtnElement.removeAttribute("disabled")}isItemVisible(t,e=0){e=this.container.clientWidth+this.container.scrollLeft-e;return t.offsetLeft+t.clientWidth<=e&&t.offsetLeft>=this.container.scrollLeft}onButtonClick(t){t.preventDefault();let e=1,i=0;window.matchMedia("(min-width: 769px)").matches&&(e=t.currentTarget.dataset.step),0!=this.container.scrollLeft&&!this.isItemVisible(this.itemsToShow[this.itemsToShow.length-1])||(i=this.gutter),this.itemScrollPosition="next"===t.currentTarget.name?this.container.scrollLeft-i+e*this.itemOffset:this.container.scrollLeft+i-e*this.itemOffset,window.requestAnimationFrame(()=>this.container.scrollTo({left:this.itemScrollPosition,behavior:"smooth"}))}bindEventHandlers(){new ResizeObserver(t=>this.init()).observe(this.container);new IntersectionObserver(((t,e)=>{t[0].isIntersecting&&(this.init(),e.unobserve(this))}).bind(this)).observe(this),this.prevBtnElement&&this.prevBtnElement.addEventListener("click",this.onButtonClick.bind(this)),this.nextBtnElement&&this.nextBtnElement.addEventListener("click",this.onButtonClick.bind(this)),this.container.addEventListener("scroll",SHThemeHelper.debounce(this.updateCarousel.bind(this),100))}}customElements.define("sht-horizontal-carousel",a)}if(!customElements.get("sht-horizontal-carousel-item")){class p extends HTMLElement{constructor(){super(),this.hyperLinks=this.querySelectorAll("a, button"),this.container=this.closest(".js-carousel-items"),this.bindEventHandlers()}bindEventHandlers(){}observeCarouselItem(){new IntersectionObserver((t,e)=>{t.forEach(t=>{t.isIntersecting?this.setCarouselItemVisibility(!0):this.setCarouselItemVisibility(!1)})},{root:this.container,threshold:.5}).observe(this)}setCarouselItemVisibility(t){t?this.setAttribute("aria-hidden","false"):this.setAttribute("aria-hidden","true"),this.setHyperLinkVisibility(t)}setHyperLinkVisibility(e){this.hyperLinks&&this.hyperLinks.forEach(t=>{e?t.removeAttribute("tabindex"):t.setAttribute("tabindex","-1")})}}customElements.define("sht-horizontal-carousel-item",p)}