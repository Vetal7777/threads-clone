<template>
  <div class="bottom-0 z-50 h-full w-full">
    <div class="w-full py-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center text-white">
          <img class="h-[35px] rounded-full" :src="post.image" />
          <div class="ml-2 text-[18px] font-semibold">{{ post.name }}</div>
        </div>
        <div
          v-if="
            user && user.identities && user.identities[0].user_id == post.userId
          "
          @click="isMenu = !isMenu"
          class="relative"
        >
          <button
            :disabled="isDeleting"
            class="flex h-[24px] w-[24px] cursor-pointer items-center rounded-full p-1 text-white hover:bg-gray-800"
            :class="isMenu ? 'bg-gray-800' : ''"
          >
            <Icon
              v-if="!isDeleting"
              name="bi:three-dots"
              color="#ffffff"
              size="18"
            />
            <Icon
              v-else
              name="eos-icons:bubble-loading"
              color="#ffffff"
              size="18"
            />
          </button>

          <div
            v-if="isMenu"
            class="absolute right-0 z-20 mt-1 rounded border border-gray-600"
          >
            <button
              @click="deletePost(post.id, post.picture)"
              class="flex w-full items-center justify-between gap-2 rounded bg-black py-1 pl-4 pr-3 text-red-500 hover:bg-gray-900"
            >
              <div>Delete</div>
              <Icon name="solar:trash-bin-trash-broken" size="20" />
            </button>
          </div>
        </div>
      </div>

      <div class="relative flex w-full items-center">
        <div class="mx-auto w-[42px]">
          <div class="absolute top-0 ml-4 mt-1 h-full w-[1px] bg-gray-700" />
        </div>
        <div class="w-full rounded-lg bg-black text-sm font-light">
          <div class="py-2 text-gray-300">{{ post.text }}</div>
          <img
            v-if="post && post.picture"
            class="mx-auto mt-2 w-full rounded pr-2"
            :src="runtimeConfig.public.bucketUrl + post.picture"
          />

          <div class="absolute ml-2 mt-2 w-full">
            <button
              :disabled="isLike"
              @click="likesFunc()"
              class="flex items-center gap-1"
            >
              <Icon
                v-if="!hasLikedComputed"
                class="cursor-pointer rounded-full p-1 text-white hover:bg-gray-800"
                name="mdi:cards-heart-outline"
                size="28"
              />
              <Icon
                v-else
                class="cursor-pointer rounded-full p-1 text-red-500 hover:bg-gray-800"
                name="mdi:cards-heart"
                size="28"
              />
            </button>
            <div class="relative text-sm text-gray-500">
              <div>
                <span v-if="!isLike">{{ post.likes.length }}</span>
                <span v-else>
                  <Icon
                    name="eos-icons:bubble-loading"
                    color="#ffffff"
                    size="13"
                  />
                </span>
                likes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative inline-block pb-1.5 pt-1 text-gray-500">
      <div class="flex items-center">
        <div class="flex w-[42px] flex-wrap items-center gap-1 text-white">
          <div class="flex gap-0.5">
            <img
              class="mt-2 h-[14px] rounded-full"
              src="https://picsum.photos/id/202/50"
            />
            <img
              class="h-[17px] rounded-full"
              src="https://picsum.photos/id/223/50"
            />
          </div>
          <div class="flex items-center">
            <img
              class="ml-4 h-[11px] rounded-full"
              src="https://picsum.photos/id/99/50"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-3 h-[1px] w-full bg-gray-800" />
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const runtimeConfig = useRuntimeConfig()
let isMenu = ref(false)
let isLike = ref(false)
let isDeleting = ref(false)

const emit = defineEmits(['isDeleted'])
const props = defineProps({ post: Object })

const client = useSupabaseClient()
const user = useSupabaseUser()

const hasLikedComputed = computed(() => {
  if (!user.value) return
  let res = false
  props.post.likes.forEach((like) => {
    if (
      like.userId == user.value.identities[0].user_id &&
      like.postId == props.post.id
    ) {
      res = true
    }
  })

  return res
})

const deletePost = async (id, picture) => {
  let res = confirm('Are you sure you want to delete this post?')

  if (!res) return

  try {
    isMenu.value = false
    isDeleting.value = true
    await client.storage.from('threads-c-files').remove([picture])

    await useFetch(`/api/delete-post/${id}`, { method: 'DELETE' })
    emit('isDeleted', true)

    isDeleting.value = false
  } catch (error) {
    console.log(error)
    isDeleting.value = false
  }
}

const likePost = async (id) => {
  isLike.value = true
  try {
    await useFetch(`/api/like-post/`, {
      method: 'POST',
      body: {
        userId: user.value.identities[0].user_id,
        postId: id
      }
    })
    await userStore.getAllPosts()
    isLike.value = false
  } catch (error) {
    console.log(error)
    isLike.value = false
  }
}

const unlikePost = async (id) => {
  isLike.value = true
  try {
    await useFetch(`/api/unlike-post/${id}`, { method: 'DELETE' })
    await userStore.getAllPosts()
    isLike.value = false
  } catch (error) {
    console.log(error)
    isLike.value = false
  }
}

const likesFunc = () => {
  let likePostObj = null

  if (props.post.likes.length < 1) {
    likePost(props.post.id)
    return null
  } else {
    props.post.likes.forEach((like) => {
      if (
        like.userId == user.value.identities[0].user_id &&
        like.postId == props.post.id
      ) {
        likePostObj = like
      }
    })
  }

  if (likePostObj) {
    unlikePost(likePostObj.id)
    return null
  }

  likePost(props.post.id)
}
</script>
