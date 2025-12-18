const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
      display: block;
      width: 240px;
      border: 2px solid var(--green);
      border-radius: 10px;
      padding: 16px;
      background: white;
      font-family: system-ui, sans-serif;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }

    .image {
      width: 100%;
      height: 230px;
      object-fit: cover;
      border-radius: 6px;
      margin-bottom: 10px;
    }

    .name {
      font-size: 1.2rem;
      font-weight: bold;
      margin: 6px 0;
    }

    .price {
      font-size: 1rem;
      color: var(--green-dark);
      margin-bottom: 8px;
    }

    .promo {
      display: inline-block;
      padding: 4px 8px;
      font-size: 0.85rem;
      background-color: #fff3c4;
      color: #8a5b00;
      border-radius: 5px;
      margin-bottom: 10px;
    }

    .details {
      font-size: 0.9rem;
      margin-bottom: 6px;
    }

    button {
      width: 100%;
      padding: 10px;
      background-color: var(--green);
      color: white;
      font-size: 1rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.15s;
    }

    button:hover {
      background-color: var(--green-dark);
    }
  </style>

  <img class="image" id="image">
  <div class="name" id="name"></div>
  <div class="price" id="price"></div>
  <div class="promo" id="promo"></div>
  <div class="details" id="colors"></div>
  <div class="details" id="sizes"></div>
  <button id="addBtn">Do koszyka</button>
`;

class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
    this._product = null;
  }

  connectedCallback() {
    this.shadowRoot.getElementById('addBtn').addEventListener('click', () => {
      if (this._product) {
        this.dispatchEvent(new CustomEvent('add-to-cart', {
          detail: this._product,
          bubbles: true,
          composed: true
        }));
      }
    });
  }

  set product(data) {
    this._product = data;
    this.render();
  }

  render() {
    if (!this._product) return;

    const img = this.shadowRoot.getElementById('image');
    const name = this.shadowRoot.getElementById('name');
    const price = this.shadowRoot.getElementById('price');
    const promo = this.shadowRoot.getElementById('promo');
    const colors = this.shadowRoot.getElementById('colors');
    const sizes = this.shadowRoot.getElementById('sizes');

    img.src = this._product.image;
    img.alt = this._product.name;
    name.textContent = this._product.name;
    price.textContent = `${this._product.price.toFixed(2)} zł`;
    
    if (this._product.promo) {
      promo.textContent = this._product.promo;
      promo.style.display = 'inline-block';
    } else {
      promo.style.display = 'none';
    }

    if (this._product.colors) {
      colors.textContent = this._product.colors;
      colors.style.display = 'block';
    } else {
      colors.style.display = 'none';
    }

    if (this._product.sizes) {
      sizes.textContent = this._product.sizes;
      sizes.style.display = 'block';
    } else {
      sizes.style.display = 'none';
    }
  }
}

customElements.define("product-card", ProductCard);