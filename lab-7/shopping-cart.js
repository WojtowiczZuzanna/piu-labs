const template = document.createElement("template");

template.innerHTML = `
  <style>
    :host {
        display: block;
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
    }

    h2 {
        margin: 0 0 20px 0;
        color: var(--green-dark);
        font-size: 1.3rem;
        text-align: center;
    }
    
    .empty {
        text-align: center;
        color: #666;
        padding: 20px;
        font-style: italic;
        font-size: 0.9rem;
    }

    .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        margin-bottom: 10px;
        background: #f9f9f9;
        border-radius: 6px;
        border: 1px solid #e0e0e0;
    }

    .item-info {
        margin-bottom: 8px;
    }

    .item-name {
        font-weight: bold;
        font-size: 0.95rem;
        margin-bottom: 4px;
        word-wrap: break-word;
    }

    .item-price {
        color: var(--green-dark);
        font-size: 0.9rem;
    }

    .remove-btn {
        justify-item: right;
        padding: 6px;
        background-color: #d32f2f;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.85rem;
        transition: background 0.15s;
    }

    .remove-btn:hover {
        background-color: #b71c1c;
    }

    .total {
        margin-top: 20px;
        padding-top: 15px;
        border-top: 2px solid var(--green);
        text-align: center;
        font-size: 1.2rem;
        font-weight: bold;
        color: var(--green-dark);
    }
  </style>

  <h2>🛒 Koszyk</h2>
  <div id="items"></div>
  <div class="total" id="total"></div>
`;

class ShoppingCart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
    this.cartItems = [];
  }

  connectedCallback() {
    this.render();
  }

  addItem(product) {
    this.cartItems.push(product);
    this.render();
  }

  removeItem(index) {
    this.cartItems.splice(index, 1);
    this.render();
  }

  render() {
    const itemsContainer = this.shadowRoot.getElementById('items');
    const totalContainer = this.shadowRoot.getElementById('total');

    if (this.cartItems.length === 0) {
      itemsContainer.innerHTML = '<div class="empty">Koszyk jest pusty</div>';
      totalContainer.textContent = '';
      return;
    }

    itemsContainer.innerHTML = '';
    
    this.cartItems.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
      
      itemDiv.innerHTML = `
        <div class="item-info">
          <div class="item-name">${item.name}</div>
          <div class="item-price">${item.price.toFixed(2)} zł</div>
        </div>
        <button class="remove-btn" data-index="${index}">Usuń</button>
      `;
      
      const removeBtn = itemDiv.querySelector('.remove-btn');
      removeBtn.addEventListener('click', () => {
        this.removeItem(index);
      });
      
      itemsContainer.appendChild(itemDiv);
    });

    const total = this.cartItems.reduce((sum, item) => sum + item.price, 0);
    totalContainer.textContent = `Suma: ${total.toFixed(2)} zł`;
  }
}

customElements.define("shopping-cart", ShoppingCart);