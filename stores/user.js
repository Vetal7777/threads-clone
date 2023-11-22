import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const posts = ref([])
  const isMenuOverlay = ref(false)
  const isLogoutOverlay = ref(false)

  async function getAllPosts() {
    let { data } = await useFetch('/api/get-all-posts')

    posts.value = data

    return data
  }

  async function deletePost(id) {
    await useFetch(`/api/unlike-post/${id}`, { method: 'DELETE' })
  }

  async function likePost(body) {
    await useFetch(`/api/like-post/`, { method: 'POST', body })
  }

  async function createPost(body) {
    await useFetch(`/api/create-post/`, { method: 'POST', body })
  }

  return {
    posts,
    isMenuOverlay,
    isLogoutOverlay,
    getAllPosts,
    deletePost,
    likePost,
    createPost
  }
})
