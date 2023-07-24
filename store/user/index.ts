import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const post = ref([]);
  const isMenuOverlay = ref(false);
  const isLogoutOverlay = ref(false);

  return {
    post,
    isMenuOverlay,
    isLogoutOverlay,
  };
});
