document.addEventListener("DOMContentLoaded", () => {
  const addButtons = document.querySelectorAll(".add");
  const colorButtons = document.querySelectorAll(".colorize");
  const sortButtons = document.querySelectorAll(".sort");

  // Przywrócenie stanu z localStorage
  let board = JSON.parse(localStorage.getItem("kanbanBoard")) || {
    todo: [],
    doing: [],
    done: [],
  };

  const randomColor = () =>
    `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;

  function createCard(card, colName) {
    const div = document.createElement("div");
    div.className = "card";
    div.style.backgroundColor = card.color;
    div.dataset.id = card.id;

    const content = document.createElement("div");
    content.className = "card-content";
    content.contentEditable = true;
    content.textContent = card.text;

    const buttons = document.createElement("div");
    buttons.className = "card-buttons";
    
    div.appendChild(content);
    div.appendChild(buttons);


    const del = document.createElement("button");
    del.textContent = "x";
    del.className = "delete";

    const left = document.createElement("button");
    left.textContent = "←";
    left.className = "move-left";

    const right = document.createElement("button");
    right.textContent = "→";
    right.className = "move-right";

    const cardColor = document.createElement("button");
    cardColor.textContent = "Koloruj kartę";
    cardColor.className = "card-color";

    buttons.appendChild(del);
    buttons.appendChild(left);
    buttons.appendChild(right);
    buttons.appendChild(cardColor);

    
    content.addEventListener("input", () => {
      updateCardText(colName, card.id, content.textContent);
    });

    buttons.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete")) {
        deleteCard(colName, card.id);
      } else if (e.target.classList.contains("move-left")) {
        moveCard(colName, card.id, -1);
      } else if (e.target.classList.contains("move-right")) {
        moveCard(colName, card.id, 1);
      } else if (e.target.classList.contains("card-color")) {
        const newColor = randomColor();
        div.style.backgroundColor = newColor;
        updateCardColor(colName, card.id, newColor);
      }
    });

    return div;
  }

  function renderBoard() {
    ["todo", "doing", "done"].forEach((col) => {
      const columnEl = document.getElementById(col);
      columnEl.innerHTML = "";
      board[col].forEach((card) => {
        columnEl.appendChild(createCard(card, col));
      });
      document.getElementById(`count_${col}`).textContent = board[col].length;
    });
    saveBoard();
  }

  function saveBoard() {
    localStorage.setItem("kanbanBoard", JSON.stringify(board));
  }

  addButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      const col = btn.dataset.col;
      const card = {
        id: Date.now(),
        text: "Nowa karta",
        color: randomColor(),
      };
      board[col].push(card);
      renderBoard();
    })
  );

  colorButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      const col = btn.dataset.col;
      board[col].forEach((card) => (card.color = randomColor()));
      renderBoard();
    })
  );

  sortButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      const col = btn.dataset.col;
      board[col].sort((a, b) => a.text.localeCompare(b.text));
      renderBoard();
    })
  );

  function deleteCard(col, id) {
    board[col] = board[col].filter((c) => c.id !== id);
    renderBoard();
  }

  function moveCard(col, id, dir) {
    const order = ["todo", "doing", "done"];
    const idx = order.indexOf(col);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= order.length) return;
    const card = board[col].find((c) => c.id === id);
    board[col] = board[col].filter((c) => c.id !== id);
    board[order[newIdx]].push(card);
    renderBoard();
  }

  function updateCardText(col, id, text) {
    const card = board[col].find((c) => c.id === id);
    if (card) card.text = text;
    saveBoard();
  }

  function updateCardColor(col, id, color) {
    const card = board[col].find((c) => c.id === id);
    if (card) card.color = color;
    saveBoard();
  }

  renderBoard();
});
