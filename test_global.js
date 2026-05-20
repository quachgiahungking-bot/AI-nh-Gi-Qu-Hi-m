try {
  Object.defineProperty(globalThis, "fetch", {
    get() { return () => {}; },
    set() { throw new TypeError("Cannot set property fetch of #<Window> which has only a getter"); }
  });
} catch (e) {
  console.log(e);
}
console.log(globalThis.constructor.name === "Window");
