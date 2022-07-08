/**
 * Create Map web component.
 * Use this component to render Map element
 */

if (!customElements.get("sht-map")) {
  class SHTMap extends HTMLElement {
    /**
     * Constructor
     */
    constructor() {
      super();
      this.iframe = this.querySelector(".js-map-iframe");
      this.bindEventHandlers();
    }
    /**
     * Load Iframe Content
     */
    loadIframeContent() {
      let observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.dispatchEvent(
                new CustomEvent("loadingStart", {
                  detail: {
                    ele: this.iframe,
                    parent: this,
                  },
                })
              );
              this.execute();
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: "0px 0px -100px 0px",
        }
      );
      observer.observe(this);
    }
    /**
     * bind event handler to web component elements
     */
    bindEventHandlers() {
      this.iframe.addEventListener(
        "load",
        function () {
          this.dispatchEvent(
            new CustomEvent("loadingEnd", {
              detail: {
                ele: this.iframe,
                parent: this,
              },
            })
          );
          this.setAttribute("loaded", true);
        }.bind(this)
      );
    }

    execute() {
      this.setIframeSrc();
    }
    /**
     * Apply Src top iframe
     */
    setIframeSrc() {
      let url = `https://maps.google.com/maps?z=${this.dataZoom}&t=${
        this.dataType
      }&q=${this.dataLocation.replace(/"/g, "")}&ie=UTF8&&output=embed`;
      this.iframe.src = url;
      this.iframe.removeAttribute("srcdoc");
    }
    /**
     * observe Attributes
     */
    static get observedAttributes() {
      return ["data-zoom", "data-type", "data-location"];
    }
    /**
     * check Attributes get changed or not
     */
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        if (Shopify.designMode) {
          this.execute();
        } else {
          this.loadIframeContent();
        }
      }
    }
    /**
     * When the element is added to the DOM, the connectedCallback method is triggered
     */
    connectedCallback() {}
    /**
     * When the element is removed from the DOM, the disconnectedCallback method is triggered
     */
    disconnectedCallback() {}
    /**
     * get zoom prop
     */
    get dataZoom() {
      return this.getAttribute("data-zoom");
    }
    /**
     * get type prop
     */
    get dataType() {
      return this.getAttribute("data-type");
    }
    /**
     * get location prop
     */
    get dataLocation() {
      return this.getAttribute("data-location");
    }

    /**
     * Set zoom prop
     */
    set dataZoom(newValue) {
      this.setAttribute("data-zoom", newValue);
    }
    /**
     * Set type prop
     */
    set dataType(newValue) {
      this.setAttribute("data-type", newValue);
    }
    /**
     * Set location prop
     */
    set dataLocation(newValue) {
      this.setAttribute("data-location", newValue);
    }
  }
  customElements.define("sht-map", SHTMap);
}
