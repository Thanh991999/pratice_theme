if(!customElements.get("sht-announcement-bar")){class a extends HTMLElement{constructor(){super(),this.items=this.querySelectorAll(".js-anmb-item"),this.container=this.querySelector(".js-anmb-items"),this.linkItems=this.querySelectorAll(".js-anmb-link-items"),this.totalItems=this.items.length,this.previousButton=this.querySelector(".js-anmb-control-prev"),this.nextButton=this.querySelector(".js-anmb-control-next"),this.props=JSON.parse(this.dataset.props),this.delayTime=this.props.duration,this.interval=null,this.currentItemIndex=1,this.smoothScrollSupported="scrollBehavior"in document.documentElement.style,!this.smoothScrollSupported&&SHThemeHelper.isSafari()&&window.requestAnimationFrame(()=>{this.items.forEach(t=>{t.classList.add("anmb-br__msg-itm--sfri")})}),this.items.forEach(t=>{t.setAttribute("aria-hidden","true")}),this.bindEventHandlers(),this.showMessages(),this.autoPlay()}bindEventHandlers(){this.previousButton.addEventListener("click",t=>{t.currentTarget.focus(),this.onPrevButtonClickHandler()}),this.nextButton.addEventListener("click",t=>{t.currentTarget.focus(),this.onNextButtonClickHandler()}),this.onObserverHandler()}onPrevButtonClickHandler(){this.currentItemIndex--,this.showMessages()}onNextButtonClickHandler(){this.currentItemIndex++,this.showMessages()}autoPlay(){!this.props.autoPlay||this.totalItems<2||this.currentItemIndex===this.totalItems?(this.interval&&clearInterval(this.interval),this.container.setAttribute("aria-live","polite")):(this.container.setAttribute("aria-live","off"),this.interval=setInterval(function(){this.onNextButtonClickHandler()}.bind(this),this.delayTime))}onObserverHandler(){let e=new IntersectionObserver((t,e)=>{t.forEach(e=>{if(e.isIntersecting){this.linkItems.forEach(t=>{t.setAttribute("tabindex","-1")}),window.requestAnimationFrame(()=>{var t=this.querySelector(".anmb-item--active");t&&(t.classList.remove("anmb-item--active"),t.setAttribute("aria-hidden","true"))});let t=e.target;this.currentItemIndex=parseInt(t.dataset.itemIndex),t.setAttribute("aria-hidden","false"),window.requestAnimationFrame(()=>t.classList.add("anmb-item--active"));e=t.querySelector(".js-anmb-link-items");e&&e.removeAttribute("tabindex"),this.dispatchEvent(new CustomEvent("messageChanged",{detail:{currentItemIndex:this.currentItemIndex,currentItem:this.items[t.dataset.itemIndex-1],container:this}})),this.setButtonStates(),this.interval&&(clearInterval(this.interval),this.autoPlay())}})},{root:this.container,rootMargin:"0px",threshold:.5});this.items.forEach(t=>{e.observe(t)})}showMessages(){let t=this.querySelector(`[data-item-index="${this.currentItemIndex}"]`);window.requestAnimationFrame(()=>t&&this.container.scrollTo({left:t.offsetLeft,behavior:!this.smoothScrollSupported&&SHThemeHelper.isSafari()?"auto":"smooth"}))}setButtonStates(){this.totalItems<2||(this.currentItemIndex===this.totalItems?this.nextButton.disabled=!0:this.nextButton.disabled=!1,1===this.currentItemIndex?this.previousButton.disabled=!0:this.previousButton.disabled=!1)}}customElements.define("sht-announcement-bar",a)}