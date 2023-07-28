<template>
  <MainLayout>
    <div id="IndexPage" class="w-full overflow-auto">
      <div class="mx-auto max-w-[500px] overflow-auto">
        <div id="Posts" class="mx-auto max-w-[600px] px-4">
          <div v-if="isPosts" v-for="post in posts" :key="post">
            <Post :post="post" @isDeleted="posts = []" />
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import { useUserStore } from '@/store/user'
import { PostItem } from '@/interfaces'

const userStore = useUserStore()
// const user = useSupabaseUser();

const posts = ref<PostItem[]>([])
const isPosts = ref(true)
const isLoading = ref(false)

onBeforeMount(() => {
  posts.value = [
    {
      name: 'John Weeks Developer',
      image: 'https://placehold.co/500',
      text: 'This is the title',
      picture: 'https://placehold.co/500'
    }
  ]
})
</script>
