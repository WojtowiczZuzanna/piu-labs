const api = new Ajax({
    baseURL: "https://jsonplaceholder.typicode.com"
});

const btnLoad = document.getElementById("btnLoad");
const btnError = document.getElementById("btnError");
const btnReset = document.getElementById("btnReset");

const list = document.getElementById("list");
const loader = document.getElementById("loader");
const errorBox = document.getElementById("error");

const showLoader = () => loader.classList.remove("hidden");
const hideLoader = () => loader.classList.add("hidden");

const showError = msg => errorBox.textContent = msg;
const clearError = () => errorBox.textContent = "";

const addItems = (items) => {
    list.innerHTML = "";
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.title;
        list.appendChild(li);
    });
};

btnLoad.onclick = async () => {
    clearError();
    showLoader();

    try {
        const data = await api.get("/posts");
        addItems(data.slice(0, 10));
    } catch (err) {
        showError("Błąd: " + err.message);
    } finally {
        hideLoader();
    }
};

btnError.onclick = async () => {
    clearError();
    showLoader();
    list.innerHTML = "";
    try {
        await api.get("/nie-istnieje"); 
    } catch (err) {
        showError("Błąd (oczekiwany): " + err.message);
    } finally {
        hideLoader();
    }
};

btnReset.onclick = () => {
    list.innerHTML = "";
    clearError();
};
