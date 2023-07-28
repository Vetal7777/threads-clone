<template>
  <div class="bottom-0 z-50 h-full w-full">
    <div class="w-full py-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center text-white">
          <img :src="post.image" class="h-[35px] rounded-full" />

          <div class="ml-2 text-[18px] font-semibold">
            {{ post.name }}
          </div>
        </div>

        <div @click="isMenu = !isMenu" class="relative">
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

        <div
          class="w-[calc(100%-50px)] w-full rounded-lg bg-black text-sm font-light"
        >
          <div class="py-2 text-gray-300">{{ post.text }}</div>

          <img
            v-if="post && post.picture"
            class="mx-auto mt-2 w-full rounded pr-2"
            :src="post.picture"
          />

          <div class="absolute ml-2 mt-2 w-full">
            <button :disabled="isLike" class="flex items-center gap-1">
              <Icon
                name="mdi:cards-heart-outline"
                size="28"
                class="cursor-pointer rounded-full p-1 text-white hover:bg-gray-800"
              />
            </button>

            <div class="relative text-sm text-gray-500">
              <div>
                <span>4</span>
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

    <div class="mt-3 h-[1px] w-full bg-gray-800"></div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { PostItem } from '@/interfaces'

const userStore = useUserStore()
const runtimeConfig = useRuntimeConfig()
const isMenu = ref(false)
const isLike = ref(false)
const isDeleting = ref(false)

const emit = defineEmits(['isDeleted'])
const props = defineProps({
  post: {
    type: Object as PropType<PostItem>,
    required: true
  }
})

// const client = useSupabaseClient();
// const user = useSupabaseUser();
</script>
