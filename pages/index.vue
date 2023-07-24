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

<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
// const user = useSupabaseUser();

const posts = ref([])
const isPosts = ref(true)
const isLoading = ref(false)

onBeforeMount(() => {
  posts.value = [
    {
      name: 'John Weeks Developer',
      image: 'https://placehold.co/100',
      text: 'This is the title',
      picture: 'https://placehold.co/100'
    }
  ]
})
</script>
