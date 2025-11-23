import { randomColor } from "./helpers.js";

export function initUI(store) {
    const addSquareBtn = document.getElementById("addSquare");
    const addCircleBtn  = document.getElementById("addCircle");
    const recolorSquaresBtn = document.getElementById("colorSquares");
    const recolorCirclesBtn  = document.getElementById("colorCircles");
    const cntSquares = document.getElementById("cntSquares");
    const cntCircles = document.getElementById("cntCircles");
    const board = document.getElementById("board");


    function addShapeToDOM(shape) {
        const el = document.createElement("div");
        el.className = `shape ${shape.type}`;
        el.style.backgroundColor = shape.color;
        el.dataset.id = shape.id;
        board.appendChild(el);
    }

    function removeShapeFromDOM(id) {
        const el = board.querySelector(`[data-id="${id}"]`);
        if (el) el.remove();
    }

    function updateColors(state) {
        state.shapes.forEach((s) => {
        const el = board.querySelector(`[data-id="${s.id}"]`);
        if (el) el.style.backgroundColor = s.color;
        });
    }



    store.subscribe((state) => {
        cntSquares.textContent = store.count("square");
        cntCircles.textContent = store.count("circle");

        const currentIds = new Set([...board.children].map((c) => c.dataset.id));
        const stateIds = new Set(state.shapes.map((s) => s.id));

        state.shapes.forEach((s) => {
        if (!currentIds.has(s.id)) addShapeToDOM(s);
        });

        [...currentIds].forEach((id) => {
        if (!stateIds.has(id)) removeShapeFromDOM(id);
        });

        updateColors(state);
    });


    addSquareBtn.onclick = () => store.addShape("square", randomColor());
    addCircleBtn .onclick = () => store.addShape("circle", randomColor());

    recolorSquaresBtn.onclick = () =>
        store.recolor("square", () => randomColor());

    recolorCirclesBtn .onclick = () =>
        store.recolor("circle", () => randomColor());

    board.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        if (id) store.removeShape(id);
    });
}
