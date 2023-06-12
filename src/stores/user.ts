import { ref } from "vue";
import { defineStore } from "pinia";
import { db } from "@/data";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  type DocumentData,
} from "firebase/firestore";

export type UserObject = {
  id: string;
  username: string;
  cart: number[];
  wishlist: number[];
};

export const useUsersStore = defineStore("user", () => {
  const isLoggedIn = ref(false);
  const currentUser = ref<User>();
  const auth = ref(getAuth());
  const user = ref<UserObject>();

  const updateUser = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      if (doc.data().id === currentUser.value?.uid) {
        user.value = {
          id: doc.data().id,
          username: doc.data().username,
          wishlist: doc.data().wishlist,
          cart: doc.data().cart,
        };
      }
    });
  };

  return { isLoggedIn, currentUser, user, updateUser };
});
