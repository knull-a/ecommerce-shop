import { ref } from "vue";
import { defineStore } from "pinia";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

type UserObject = {
  id: string
  username: string
  cart: string[]
  wishlist: string[]
}

export const useUsersStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const currentUser = ref<User>()
  const auth = ref(getAuth());
  const user = ref<UserObject>()

  return { isLoggedIn, currentUser, user };
});
