if (process.browser) {
    var Tone = require('tone')
}

var _ = require('lodash')

export const state = () => ({
  strict: false,
  meta: {
    title: ''
  },
  tone: {
    synth: '',
    synthMemberValues: {},
    filter: false,
    filterMemberValues: {},
    effects: []
  },
  visuals: {
    video: {

    },
    colorFilter: []
  }

})

export const mutations = {
  // ===== //
  // SYNTH //
  // ===== //
  SET_SYNTH (context, synth) {
    context.tone.synth = synth
  },
  SET_SYNTH_MEMBER_VALUES (context, payload) {
    // Using _.cloneDeep because something about complex objects: https://github.com/vuejs/vue/issues/971

    context.tone.synthMemberValues = _.cloneDeep(payload.values)
    payload.synth.set(payload.values)
  },
  // ====== //
  // FILTER //
  // ====== //
  TOGGLE_ACTIVE_FILTER (context) {
    context.tone.filter = !context.tone.filter
  },
  SET_FILTER_MEMBER_VALUES (context, payload) {
    context.tone.filterMemberValues = _.cloneDeep(payload.values)
    payload.filter.set(payload.values)
  },
  SET_COLORS (context, colorValues) {
    context.visuals.colorFilter = colorValues
  }
}

export const actions = {
  // ===== //
  // SYNTH //
  // ===== //
  UPDATE_SYNTH (context, synth) {
    context.commit('SET_SYNTH', synth)
  },
  UPDATE_SYNTH_MEMBER_VALUES (context, values) {
    context.commit('SET_SYNTH_MEMBER_VALUES', {synth: context.getters.constructed_synth, values: values})
  },
  // ====== //
  // FILTER //
  // ====== //
  UPDATE_FILTER_MEMBER_VALUES (context, values) {
    context.commit('SET_FILTER_MEMBER_VALUES', {filter: context.getters.constructed_filter, values: values})
  }

}


export const getters = {
  constructed_synth: state => {
    return new Tone.PolySynth(8, Tone[state.tone.synth])
  },
  constructed_filter: state => {
    if (state.tone.filter) {
      return new Tone.Filter()
    } else {
      return new Tone.Gain()
    }
  }

}
