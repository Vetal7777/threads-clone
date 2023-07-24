<template>
  <div id="MainLayout" class="h-screen">
    <div class="mx-auto w-full max-w-[500px]">
      <div
        id="TopMenu"
        class="my-2 flex h-10 w-full items-center justify-center px-2"
      >
        <img src="/threads-logo.png" class="w-[35px]" />
      </div>
    </div>
    <div class="mx-auto flex h-screen w-full max-w-[500px]">
      <slot />
    </div>
    <div
      id="ButtomNav"
      class="fixed bottom-0 z-50 flex h-[70px] w-full border-t border-t-gray-700 bg-black"
    >
      <div
        class="mx-auto flex w-full max-w-[500px] items-center justify-around"
      >
        <button @click="navigateTo('/')" class="h-full w-full">
          <Icon
            name="material-symbols:home-outline"
            size="35"
            color="#ffffff"
          />
        </button>
        <button @click="isMenuOverlay = true" class="h-full w-full">
          <Icon
            name="material-symbols:edit-square-outline-rounded"
            size="32"
            color="#ffffff"
          />
        </button>
        <button @click="isLogoutOverlay = true" class="h-full w-full">
          <Icon name="ph:sign-out" size="32" color="#ffffff" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { isMenuOverlay, isLogoutOverlay } = storeToRefs(userStore)
</script>
