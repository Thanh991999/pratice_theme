class SHTCartNotificationPanel extends HTMLElement{constructor(){super(),this.elms={notification_wrapper:this.querySelector(".js-cart-notification-panel-wrapper"),notification_container:this.querySelector(".js-cart-notification-panel-container"),close_buttons:this.querySelectorAll(".js-cart-notification-panel-close-btn")},this.dismiss_timeout=null,this.bindEventHandlers()}bindEventHandlers(){this.elms.close_buttons.forEach(t=>t.addEventListener("click",this.close.bind(this)))}open(){this.togglePanel(!0),this.elms.notification_container.focus(),this.addEventListener("mouseover",this.onMouseOverHandle.bind(this)),this.addEventListener("mouseout",this.onMouseOutHandle.bind(this)),this.setDismissTimeout(),SHThemeHelper.trapFocus(this)}close(){this.clearDismissTimeout(),this.togglePanel(!1),this.dispatchEvent(new Event("closed")),SHThemeHelper.removeTrapFocus()}clearDismissTimeout(){clearTimeout(this.dismiss_timeout)}renderContents(e){this.productId=e.id,this.getSectionsToRender().forEach(t=>{(new DOMParser).parseFromString(e.sections[t.id],"text/html");document.querySelector(t.space_selector).innerHTML=this.getSectionInnerHTML(e.sections[t.id],t.selector)}),this.open()}getSectionsToRender(){return[{id:"cart-notification-panel-product",selector:".js-cart-notification-panel-product-"+this.productId,space_selector:".js-cart-notification-panel-content"},{id:"free-shipping-notification",selector:".js-free-shipping-notification",space_selector:".js-cart-notification-free-shipping"},{id:"header-cart-status",section:"header-cart-status",space_selector:"#headerCartStatus"},{id:"cart-notification-panel-product",selector:".js-cart-notification-panel-item-count",space_selector:".js-cart-notification-panel-item-count-content"}]}getSectionInnerHTML(t,e=".shopify-section"){return(new DOMParser).parseFromString(t,"text/html").querySelector(e).innerHTML}onMouseOverHandle(t){this.clearDismissTimeout()}onMouseOutHandle(t){this.setDismissTimeout()}togglePanel(t){t?this.toggleAttribute("hidden",!1):this.setAttribute("hidden",!0)}setDismissTimeout(){this.dismiss_timeout=setTimeout(function(){this.close()}.bind(this),5e3)}}customElements.define("sht-cart-notification-panel",SHTCartNotificationPanel);