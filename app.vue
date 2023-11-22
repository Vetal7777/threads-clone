<template>
  <VitePwaManifest />

  <div class="bg-black fixed w-[calc(100%+1px)] h-full">
    <NuxtPage />

    <CreatePost
      :class="[
        {
          'max-h-[100vh] transition-all duration-200 ease-in visible':
            isMenuOverlay
        },
        {
          'max-h-0 transition-all duration-200 ease-out invisible':
            !isMenuOverlay
        }
      ]"
    />

    <Modal
      :class="[
        {
          'max-h-[100vh] transition-all duration-200 ease-in visible':
            isLogoutOverlay
        },
        {
          'max-h-0 transition-all duration-200 ease-out invisible':
            !isLogoutOverlay
        }
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { isLogoutOverlay, isMenuOverlay } = storeToRefs(userStore)
</script>
