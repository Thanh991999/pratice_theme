customElements.get("sht-pickup-availability")||customElements.define("sht-pickup-availability",class extends HTMLElement{constructor(){super(),this.hasAttribute("available")&&(this.errorHtml=this.querySelector("template").content.firstElementChild.cloneNode(!0),this.onClickRefreshListHandleEvent=this.onClickRefreshListHandleEvent.bind(this),this.fetchAvailability(this.dataset.variantId))}fetchAvailability(e){let t=routes.root_url;t.endsWith("/")||(t+="/");e=t+`variants/${e}/?section_id=pickup-availability`;fetch(e).then(e=>e.text()).then(e=>{e=(new DOMParser).parseFromString(e,"text/html").querySelector(".shopify-section");this.renderPreview(e)}).catch(e=>{var t=this.querySelector("button");t&&t.removeEventListener("click",this.onClickRefreshListHandleEvent),this.renderError()})}onClickRefreshListHandleEvent(e){this.fetchAvailability(this.dataset.variantId)}renderError(){this.innerHTML="",this.appendChild(this.errorHtml),this.querySelector("button").addEventListener("click",this.onClickRefreshListHandleEvent)}renderPreview(e){var t=document.querySelector("#drawerPickupAvailability"),i=e.querySelector("sht-pickup-availability-preview");t&&t.remove(),i?(this.innerHTML=i.outerHTML,this.setAttribute("available",""),this.classList.add("d-block"),this.classList.remove("d-none"),document.body.appendChild(e.querySelector("#drawerPickupAvailability")),(t=this.querySelector("button"))&&t.addEventListener("click",e=>{document.querySelector("#drawerPickupAvailability").openDrawer(e.target)})):(this.innerHTML="",this.removeAttribute("available"),this.classList.remove("d-block"),this.classList.add("d-none"))}});