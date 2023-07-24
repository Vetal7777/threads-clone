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
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const runtimeConfig = useRuntimeConfig()
const isMenu = ref(false)
const isLike = ref(false)
const isDeleting = ref(false)

const emit = defineEmits(['isDeleted'])
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

// const client = useSupabaseClient();
// const user = useSupabaseUser();
</script>
