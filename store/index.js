export const state = () => ({
  meta: {
    title: ''
  },
  tone: {
    patch: {},
    synthOut: {},
    synth: {},
    filter: {},
    effects: []
  },
  visuals: {
    video: {

    },
    colorFilter: []
  }

})

export const mutations = {
  SET_COLORS (context, colorValues) {
    context.visuals.colorFilter = colorValues
  }
}
