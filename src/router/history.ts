
export default {
    history: [] as any,
  
    push<T>(route: T) {
      this.history.push(route);
    },
  
    pop() {
      return this.history.pop();
    },
  
    get() {
      return this.history;
    }
};