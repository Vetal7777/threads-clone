<template>
  <div id="MainLayout" class="h-screen w-full">
    <div class="mx-auto w-full max-w-[500px]">
      <div
        id="TopMenu"
        class="my-2 flex h-10 w-full items-center justify-center px-2"
      >
        <img class="w-[35px]" src="/threads-logo.png" />
      </div>
    </div>

    <div class="mx-auto flex h-screen w-full max-w-[500px]">
      <slot />
    </div>

    <div
      id="BottomNav"
      class="fixed bottom-0 z-50 flex h-[70px] w-full border-t border-t-gray-700 bg-black"
    >
      <div
        class="mx-auto flex w-full max-w-[500px] items-center justify-around"
      >
        <button @click="navigateTo(ROUTES.home)" class="h-full w-full">
          <Icon
            name="material-symbols:home-outline"
            size="35"
            color="#ffffff"
          />
        </button>
        <button @click="userStore.isMenuOverlay = true" class="h-full w-full">
          <Icon
            class="mb-1"
            name="material-symbols:edit-square-outline-rounded"
            size="32"
            color="#ffffff"
          />
        </button>
        <button @click="userStore.isLogoutOverlay = true" class="h-full w-full">
          <Icon class="mb-1" name="ph:sign-out" size="32" color="#ffffff" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ROUTES } from '@/routes'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>
