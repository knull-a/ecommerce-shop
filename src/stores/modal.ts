import { defineStore } from "pinia"
import { useToggle } from "@vueuse/core";
export const useModalsStore = defineStore('modals', () => {
  const [authModalStatus, toggleAuthModal] = useToggle()
  return {authModalStatus, toggleAuthModal}
})
