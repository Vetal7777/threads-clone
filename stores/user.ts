import { defineStore } from 'pinia'
import type {
  CreatePostRequestBody,
  DeletePostProps,
  GetAllPostsRensponse,
  LikePostRequestBody,
  Post
} from '~/types'

export const useUserStore = defineStore('user', () => {
  const posts = ref<Post[]>([])
  const isMenuOverlay = ref(false)
  const isLogoutOverlay = ref(false)

  async function getAllPosts() {
    let { data }: GetAllPostsRensponse = await useFetch('/api/get-all-posts')

    posts.value = data

    return data
  }

  async function deletePost(id: DeletePostProps) {
    await useFetch(`/api/unlike-post/${id}`, { method: 'DELETE' })
  }

  async function likePost(body: LikePostRequestBody) {
    await useFetch(`/api/like-post/`, { method: 'POST', body })
  }

  async function createPost(body: CreatePostRequestBody) {
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
