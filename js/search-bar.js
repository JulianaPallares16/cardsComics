class SearchBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
        <style>
        input {
            width: 100%;
            max-width: 900px;
            padding: 10px;
            font-size: 22px;
            border-radius: 5px;
            border: 2px solid #ccc;
            margin: 0 auto;
            display:block;
            margin-bottom: 40px;
            background-color: #fbf7e9;
        }
        </style>
        <input type="text" placeholder="Buscar comic...">
        `;
    }

    connectedCallback() {
        const input = this.shadowRoot.querySelector('input');
        input.addEventListener('input', () => {
            const search = input.value.toLowerCase();
            const cards = document.querySelectorAll('info-card');
            let encontrada = false;

            const noDisponible = document.getElementById("no-disponible");
            noDisponible.style.display = "none";  

            cards.forEach(card => {
                const nombre = card.querySelector('[slot="nombre"]').textContent.toLowerCase();
                const clave = card.querySelector('[slot="clave"]').textContent.toLowerCase();

                if (nombre.includes(search) || clave.includes(search)) {
                    card.style.display = 'block';
                    encontrada = true;
                } else {
                    card.style.display = 'none';
                }
            });

            if (!encontrada) {
                noDisponible.style.display = "block"; 
            }
        });
    }
}

customElements.define('search-bar', SearchBar);