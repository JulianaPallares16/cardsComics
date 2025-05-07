class InfoCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const container = document.createElement('div');
        container.innerHTML = `
        <slot name="nombre">[Sin nombre]</slot>
        <img id="portada-img" src="" alt="Portada">
        <slot name="clave">[Sin nombre clave]</slot>
        <slot name="casa">[Sin casa]</slot>


        `;
        const style = document.createElement('style');
        shadow.append(container)
    }
    connectedCallback() {
        const slot = this.querySelector('[slot="imagen"]');
        const imgNombre = slot?.textContent?.trim() || 'default.png';
        const imgElement = this.shadowRoot.querySelector('#profile-img');
        imgElement.src = `img/${imgNombre}`;
      }
}
customElements.define('info-card', InfoCard)