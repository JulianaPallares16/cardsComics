class InfoCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const card = document.createElement('div');
        card.innerHTML = `
        <slot name="nombre">[Sin nombre]</slot>
        <img id="portada-img" src="" alt="Portada">
        <slot name="clave">[Sin nombre clave]</slot>
        <slot name="casa">[Sin casa]</slot>
        <slot name="año">[Sin año]</slot>
        <slot name="info">[Sin información]</slot>
        <button>Ver más</button>


        `;
        const style = document.createElement('style');
        style.textContent = `
        div {
          border: 1px solid #232677;
          border-radius: 12px;
          padding: 16px;
          width: 250px;
          text-align: center;
          font-family: sans-serif;
          background: #fbf7e9;
          color: #232677;
          box-shadow: 0 4px 8px #020313;
        }
        img {
          height: 200px;
          width: 200px;
          border-radius: 12px;
        }
        button {
          background-color: #232677;
          color:  #f0f0f0;
          border-radius: 10px;
          padding: 5px;
        }
        button:active{
           background-color:rgb(83, 87, 200);
        }
      `;
        shadow.append(card, style)
    }
    connectedCallback() {
        const slot = this.querySelector('[slot="imagen"]');
        const imgNombre = slot?.textContent?.trim() || 'default.png';
        const imgElement = this.shadowRoot.querySelector('#portada-img');
        imgElement.src = `img/${imgNombre}`;
      }
}
customElements.define('info-card', InfoCard)