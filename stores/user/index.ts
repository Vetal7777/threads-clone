import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const posts = ref([])
  const isMenuOverlay = ref(false)
  const isLogoutOverlay = ref(false)

  const getAllPosts = async () => {
    const { data } = await useFetch('/api/get-all-posts')
    posts.value = data.value
  }

  return {
    posts,
    isMenuOverlay,
    isLogoutOverlay,
    getAllPosts
  }
})
