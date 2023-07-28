import { defineStore } from 'pinia'
import { UserStore } from './types'

export const useUserStore = defineStore('user', (): UserStore => {
  const post = ref([])
  const isMenuOverlay = ref(false)
  const isLogoutOverlay = ref(false)

  return {
    post,
    isMenuOverlay,
    isLogoutOverlay
  }
})
