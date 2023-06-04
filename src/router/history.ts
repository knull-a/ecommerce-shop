import { RouteLocationNormalized } from "vue-router";

export default {
    history: [] as RouteLocationNormalized[],
  
    push(route: RouteLocationNormalized) {
      this.history.push(route);
    },
  
    pop() {
      return this.history.pop();
    },
  
    get() {
      return this.history;
    }
};