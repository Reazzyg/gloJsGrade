export class Debouncer {
  constructor() {
    this.lastCall = 0;
  }

  debounce(callee, timeoutMs) {
    return (...args) => {
      const previousCall = this.lastCall;
      this.lastCall = Date.now();

      if (previousCall && this.lastCall - previousCall <= timeoutMs) {
        clearTimeout(this.lastCallTimer);
      }

      this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
    };
  }
}
