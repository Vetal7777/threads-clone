<template>
  <div
    id="CreatePost"
    class="fixed bottom-0 z-50 h-full w-full overflow-hidden"
  >
    <div class="h-full w-full overflow-auto bg-black text-white">
      <div
        class="mx-auto flex max-w-[500px] items-center justify-start border-b border-b-gray-700 py-4"
      >
        <button
          @click="
            () => {
              userStore.isMenuOverlay = false
              clearData()
            }
          "
          class="rounded-full px-2"
        >
          <Icon name="mdi:close" size="25" />
        </button>

        <div class="text-[16px] font-semibold">New Thread</div>
      </div>

      <div
        id="Post"
        class="bottom-0 z-40 mx-auto max-h-[100vh-200px] w-full max-w-[500px] px-3"
      >
        <div class="w-full py-2">
          <div class="flex items-center">
            <div class="flex items-center text-white">
              <img
                class="h-[35px] rounded-full"
                src="https://picsum.photos/id/223/50"
              />

              <div class="ml-2 text-[18px] font-semibold">John Weeks Dev</div>
            </div>
          </div>

          <div class="relative flex w-full items-center">
            <div class="mx-auto w-[42px]">
              <div
                class="absolute top-0 ml-4 mt-1 h-full w-[1px] bg-gray-700"
              ></div>
            </div>

            <div
              class="text w-[calc(100%-50px)] w-full rounded-lg bg-black font-light"
            >
              <div class="w-full bg-black pt-2 text-gray-300">
                <textarea
                  v-model="text"
                  style="resize: none"
                  placeholder="Start a thdread..."
                  id="textarea"
                  @input="adjustTextareaHeight"
                  class="w-full bg-black outline-none"
                />
              </div>

              <div class="w-full">
                <div class="flex flex-col gap-2 py-1">
                  <div v-if="fileDisplay">
                    <img
                      class="mx-auto mr-2 mt-2 w-full rounded-lg"
                      :src="fileDisplay"
                    />
                  </div>

                  <label for="fileInput">
                    <Icon
                      name="clarity:paperclip-line"
                      color="#ffffff"
                      size="25"
                    />

                    <input
                      ref="file"
                      type="file"
                      id="fileInput"
                      @input="onChange"
                      hidden
                      accept=".jpg,.jpeg,.png"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        v-if="text"
        :disabled="isLoading"
        class="fixed bottom-0 float-right inline-block w-full border-t border-t-gray-700 bg-black p-2 p-4 text-lg"
        :class="isLoading ? 'text-gray-600' : 'text-blue-600'"
      >
        <div v-if="!isLoading">Post</div>

        <div v-else class="flex items-center justify-center gap-2">
          <Icon size="25" name="eos-icons:bubble-loading" />
          Please wait...
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { PostItem } from '@/interfaces'
import { fileURLToPath } from 'url'

const userStore = useUserStore()

// const client = useSupabaseClient();
// const user = useSupabaseUser();

const text = ref(null)
const isLoading = ref(false)
const file = ref(null)
const fileDisplay = ref(null)
const fileData = ref(null)

const adjustTextareaHeight = (): void => {
  const textarea = document.getElementById('textarea') as HTMLTextAreaElement
  textarea.style.height = 'auto'
  textarea.style.height = `${textarea.scrollHeight}px`
}

const clearData = () => {
  text.value = null
  file.value = null
  fileDisplay.value = null
  fileData.value = null
}

const onChange = () => {
  fileDisplay.value = URL.createObjectURL(file.value.files[0])
  fileData.value = file.value.files[0]
}
</script>
