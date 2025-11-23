class Store {
  constructor() {
    const saved = JSON.parse(localStorage.getItem("shapes-state"));
    this.state = saved || { shapes: [] };
    this.listeners = [];
  }

  subscribe(fn) {
    this.listeners.push(fn);
  }

  notify() {
    localStorage.setItem("shapes-state", JSON.stringify(this.state));
    this.listeners.forEach((fn) => fn(this.state));
  }

  addShape(type, color) {
    this.state.shapes.push({
      id: crypto.randomUUID(),
      type,
      color,
    });
    this.notify();
  }

  removeShape(id) {
    this.state.shapes = this.state.shapes.filter((s) => s.id !== id);
    this.notify();
  }

  recolor(type, callback) {
    this.state.shapes.forEach((s) => {
      if (s.type === type) s.color = callback();
    });
    this.notify();
  }

  count(type) {
    return this.state.shapes.filter((s) => s.type === type).length;
  }
}

export const store = new Store();
