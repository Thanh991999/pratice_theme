document.addEventListener("shopify:section:load",function(e){var t=document.querySelector(".shopify-design-mode").querySelectorAll('script[data-asset="script"]:not([loaded="true"])');for(Array.from(t).forEach(e=>{const t=document.createElement("script");Array.from(e.attributes).forEach(e=>{t.setAttribute(e.name,e.value),t.setAttribute("loaded",!0)}),t.appendChild(document.createTextNode(e.innerHTML)),e.parentNode.replaceChild(t,e)});SHTDefer.length;)SHTDefer.shift().call()});