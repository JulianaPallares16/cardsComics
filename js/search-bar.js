class SearchBar extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open'}):

        this.shadowRoot.innerHTML = `
        <style>
        input {
            width:100%;
            max-width: 800px;
            padding: 10px;
            font-size: 22px;
            border-radius: 5px;
            border: 2px solid #ccc;
            margin: 20px auto;
            display:block;
            margin-bottom: 40px;
        }
        </style>
        <input type="text" placeholder="Buscar comic...">
        `
    }
    connectedCallback() {
        const input = this.shadowRoot.querySelector('input');
        input.addEventListener['input',() => {
            const search = input.value.toLowerCase();
            const card = document.querySelectorAll('info-card');
            card.forEach(cards => {
                const nombre = cards.getAttritube('nombre','clave').toLowerCase();
                const ver = nombre.includes(search);
                cards.style.display = ver ? 'block' : 'none';

            }];
        };
    }
}
customElements.define('search-bar', SearchBar);