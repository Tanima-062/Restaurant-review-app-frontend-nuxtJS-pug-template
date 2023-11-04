import { StoryTypes } from '~/types/storyTypes'
export default {
  setAmpsTO(state, data: StoryTypes.StoryTO) {
    state.ampStoryTO = data
  },
  setAmpsRS(state, data: StoryTypes.StoryRS) {
    state.ampStoryRS = data
  }
}
