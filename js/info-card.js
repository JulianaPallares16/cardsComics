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
        <slot name="año">[Sin año]</slot>
        <slot name="info">[Sin información]</slot>


        `;
        const style = document.createElement('style');
        style.textContent = `
        div {
          border: 1px solid #232677;
          border-radius: 10px;
          padding: 12px;
          width: 250px;
          text-align: center;
          font-family: sans-serif;
          background: #fbf7e9;
          color: #232677;
        }
        img {
          width: 250px;
          border-radius: 10px 10px 10px 10px;
        }
      `;
        shadow.append(container, style)
    }
    connectedCallback() {
        const slot = this.querySelector('[slot="imagen"]');
        const imgNombre = slot?.textContent?.trim() || 'default.png';
        const imgElement = this.shadowRoot.querySelector('#portada-img');
        imgElement.src = `img/${imgNombre}`;
      }
}
customElements.define('info-card', InfoCard)