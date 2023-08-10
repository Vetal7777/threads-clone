<template>
  <MainLayout>
    <div id="IndexPage" class="w-full overflow-auto">
      <div class="mx-auto max-w-[500px] overflow-hidden">
        <div id="Posts" class="mx-auto max-w-[600px] px-4">
          <div v-if="isPosts" v-for="post in posts" :key="post">
            <Post :post="post" @isDeleted="userStore.getAllPosts()" />
          </div>
          <div v-else>
            <client-only>
              <div
                v-if="isLoading"
                class="mx-auto mt-20 flex w-full items-center justify-center"
              >
                <div
                  class="mx-auto flex flex-col items-center justify-center text-white"
                >
                  <Icon
                    name="eos-icons:bubble-loading"
                    size="50"
                    color="#ffffff"
                  />
                  <div class="mt-1 w-full">Loading...</div>
                </div>
              </div>
              <div
                v-if="!isLoading"
                class="mx-auto mt-20 flex w-full items-center justify-center"
              >
                <div
                  class="mx-auto flex flex-col items-center justify-center text-white"
                >
                  <Icon name="tabler:mood-empty" size="50" color="#ffffff" />
                  <div class="w-full">Make the first post!</div>
                </div>
              </div>
            </client-only>
          </div>
          <div class="mt-60" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import { storeToRefs } from 'pinia'

import { ROUTES } from '@/routes'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const { posts } = storeToRefs(userStore)
const user = useSupabaseUser()

let isPosts = ref(false)
let isLoading = ref(false)

watchEffect(async () => {
  if (!user.value) {
    return navigateTo(ROUTES.login)
  } else {
    await userStore.getAllPosts()
  }
})

onMounted(() => {
  watchEffect(() => {
    if (posts.value && posts.value.length) {
      isPosts.value = true
    }
  })
})

watch(
  () => posts.value,
  () => {
    if (posts.value && posts.value.length) {
      isPosts.value = true
    }
  },
  { deep: true }
)
</script>
