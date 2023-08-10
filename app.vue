<template>
  <VitePwaManifest />

  <div class="fixed flex h-full w-[calc(100%+1px)] bg-black">
    <NuxtPage />

    <CreatePost
      :class="[
        {
          'visible max-h-[100vh] transition-all duration-200 ease-in':
            userStore.isMenuOverlay
        },
        {
          'invisible max-h-0 transition-all duration-200 ease-out':
            !userStore.isMenuOverlay
        }
      ]"
    />

    <Modal
      :class="[
        {
          'visible max-h-[100vh] transition-all duration-200 ease-in':
            userStore.isLogoutOverlay
        },
        {
          'invisible max-h-0 transition-all duration-200 ease-out':
            !userStore.isLogoutOverlay
        }
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>
