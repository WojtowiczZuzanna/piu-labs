import productsData from './data.json' with { type: 'json' };

const template = document.createElement("template");

template.innerHTML = `
    <style>
    :host {
        display: block;
    }

    .products-grid {
        margin-top: 30px;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        padding: 20px;
        border: 2px dashed var(--green-dark);
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
        background: #fafafa;
        border-radius: 10px;
    }
    </style>

    <div class="products-grid" id="grid"></div>
`;

class ProductList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
        this.render();
  }

  render() {
    const grid = this.shadowRoot.getElementById('grid');
    grid.innerHTML = '';

    productsData.forEach(product => {
        const card = document.createElement('product-card');
        card.product = product;
        grid.appendChild(card);
    });
  }
}

customElements.define("product-area", ProductList);
