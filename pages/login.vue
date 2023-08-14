<template>
  <div id="AuthPage" class="h-screen w-full pt-32">
    <div class="w-full">
      <div class="flex w-full items-center justify-center gap-2.5 p-2">
        <img class="w-[35px]" src="/threads-logo.png" />
        <span class="text-2xl font-bold text-white">Threads</span>
      </div>

      <div class="mx-auto max-w-[350px] px-2 text-white">
        <div class="mb-6 mt-4 text-center">Login / Register</div>

        <button
          @click="login('github')"
          class="flex w-full items-center justify-center gap-3 rounded-full border p-1.5 text-lg font-semibold"
        >
          <div class="flex items-center justify-center gap-2">
            <img
              class="w-full max-w-[30px] rounded-full"
              src="/github-logo.png"
            />
            Github
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ROUTES } from '@/routes'

const { auth } = useSupabaseClient()
const user = useSupabaseUser()
const redirectTo = `${useRuntimeConfig().public.baseUrl}/`

watchEffect(() => {
  if (user.value) {
    return navigateTo(ROUTES.home)
  }
})

const login = async (provider) => {
  await auth.signInWithOAuth({
    provider
  })
  if (error) console.log(error)
}
</script>
