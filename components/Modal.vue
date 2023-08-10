<template>
  <div
    id="Modal"
    class="fixed bottom-0 z-50 grid h-screen h-screen w-full place-items-center bg-black bg-opacity-50 backdrop-blur-md"
  >
    <div
      class="w-full max-w-[300px] rounded-lg border border-gray-600 bg-black p-2 text-white"
    >
      <button
        @click="userStore.isLogoutOverlay = false"
        class="flex w-full items-center justify-between bg-black p-3"
      >
        <div>Close Modal</div>
        <Icon name="mdi:close" size="25" />
      </button>
      <div class="my-1 border-b border-b-gray-700" />
      <button
        @click="logout()"
        class="flex w-full items-center justify-between bg-black p-3"
      >
        <div>Log Out</div>
        <Icon name="ph:sign-out" size="25" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ROUTES } from '@/routes'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const { auth } = useSupabaseClient()

const logout = () => {
  auth.signOut()
  userStore.isLogoutOverlay = false
  navigateTo(ROUTES.auth)
}
</script>
