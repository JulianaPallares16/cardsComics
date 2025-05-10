class InfoCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const card = document.createElement('div');
    card.innerHTML = `
      <div id="card">
        <slot name="nombre">[Sin nombre]</slot>
        <img id="portada-img" src="" alt="Portada">
        <slot name="clave">[Sin nombre clave]</slot>
        <slot name="casa">[Sin casa]</slot>
        <slot name="año">[Sin año]</slot>
        <slot name="info">[Sin información]</slot>
        <button id="verMasBtn">Ver más</button>
      </div>
      <div id="modal" class="modal">
        <span id="cerrarModal" class="close"></span>
        <div class="modal-content">
          <img id="modalImagen" src="" alt="Imagen grande">
          <div id="text">
            <h2 id="modalNombre"></h2>
            <p id="modalDescripcion"></p>
          </div>
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      #card {
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
      #card:hover{
        transform: translateY(-10px);
          
      }
      img {
        height: 200px;
        width: 200px;
        border-radius: 12px;
      }
      button {
        background-color: #232677;
        color: #f0f0f0;
        border-radius: 10px;
        padding: 5px;
        cursor: pointer;
      }
      button:active {
        background-color: rgb(83, 87, 200);
      }
      .modal {
        display: none;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.5);
      }
      .modal-content {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        margin: 10% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        max-width: 500px;
        text-align: center;
        border-radius: 10px;
        font-family: sans-serif;
        background: #fbf7e9;
        color: #232677;
        box-shadow: 0 4px 8px #020313;
      }
      .modal-content img {
        width: 220px;
        height: 300px;
        border-radius: 40px;
      }
      @media screen and (max-width: 768px) {
        .modal-content {
          grid-template-columns: 1fr;
          width: 90%;
          padding: 10px;
        }
        .modal-content img {
          width: 100%;
          height: auto;
          margin-bottom: 10px;
        }

        #text {
          text-align: center;
        }
      }
    `;
    shadow.append(card, style);
  }

  connectedCallback() {
    const slotImagen = this.querySelector('[slot="imagen"]');
    const imgNombre = slotImagen?.textContent?.trim() || 'default.png';
    const imgElement = this.shadowRoot.querySelector('#portada-img');
    imgElement.src = `img/${imgNombre}`;

    const verMasBtn = this.shadowRoot.querySelector('#verMasBtn');
    const modal = this.shadowRoot.querySelector('#modal');
    const cerrarModal = this.shadowRoot.querySelector('#cerrarModal');

    verMasBtn.addEventListener('click', () => {
      const nombre = this.querySelector('[slot="nombre"]')?.textContent || '';
      const descripcion = this.querySelector('[slot="descripcion"]')?.textContent 
                 || this.querySelector('[slot="info"]')?.textContent 
                 || '';
      const imagen = `img/${slotImagen?.textContent?.trim() || 'default.png'}`;

      this.shadowRoot.querySelector('#modalNombre').textContent = nombre;
      this.shadowRoot.querySelector('#modalDescripcion').textContent = descripcion;
      this.shadowRoot.querySelector('#modalImagen').src = imagen;

      modal.style.display = 'block';
    });

    cerrarModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    this.shadowRoot.querySelector('#modal').addEventListener('click', (e) => {
      if (e.target.id === 'modal') {
        modal.style.display = 'none';
      }
    });
  }
}

customElements.define('info-card', InfoCard);