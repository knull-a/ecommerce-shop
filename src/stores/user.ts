import { ref } from "vue";
import { defineStore } from "pinia";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export const useUsersStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const auth = ref(getAuth());

  const checkAuthState = () => {

    onAuthStateChanged(getAuth(), (user) => {
      user ? (isLoggedIn.value = true) : (isLoggedIn.value = false);
    });
  }


  return { isLoggedIn, checkAuthState };
});
