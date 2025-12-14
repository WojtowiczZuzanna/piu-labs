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

  <slot name="image"></slot>
  <div class="name"><slot name="name"></slot></div>
  <div class="price"><slot name="price"></slot></div>
  <div class="promo"><slot name="promo"></slot></div>
  <div class="details"><slot name="colors"></slot></div>
  <div class="details"><slot name="sizes"></slot></div>
  <button><slot name="button">Do koszyka</slot></button>
`;

class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
  }
}

customElements.define("product-card", ProductCard);
