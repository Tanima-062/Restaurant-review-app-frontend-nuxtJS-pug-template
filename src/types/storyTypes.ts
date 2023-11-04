type Image = {
  id: number
  imageCd: string
  imageUrl: string
}

type StoryType = {
  id: number
  title: string
  appCd: string
  guideUrl: string
  image: Image
}

export namespace StoryTypes {
  export type StoryTO = StoryType
  export type StoryRS = StoryType
}
