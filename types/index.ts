import { type Provider } from '@supabase/gotrue-js/src/lib/types'

export interface FileElement extends HTMLElement {
  files: [Blob]
}

export type DeletePostFunc = (id: string, picture: string) => void

export type LikePostFunc = (postId: string) => void

export type UnlikePostFunc = (id: string) => void

export type LoginFunc = (provider: Provider) => Promise<void>

export interface Post extends CreatePostRequestBody {
  likes: PostLike[]
  id: number
}

export type PostLike = {
  userId: string
  postId: number
}

export type GetAllPostsRensponse = { data: Post[] }

export type DeletePostProps = { id: string }

export type LikePostRequestBody = { id: string }

export type CreatePostRequestBody = {
  userId: string
  name: string
  image: string
  text: string
  picture: string
}
