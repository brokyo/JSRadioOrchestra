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
  triggers: {

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
  SET_SYNTH (context, payload) {
    context.tone.synth = payload.synth
    context.tone.synthMemberValues = payload.defaults
  },
  SET_SYNTH_MEMBER_VALUES (context, payload) {
    // Update relevant param
    Object.assign(context.tone.synthMemberValues, payload.update)

    // Update synth
    payload.synth.set(context.tone.synthMemberValues)
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
  MUNGE_SYNTH_UPDATE (context, payload) {
    let update = {}

    if (payload.subfield) {
      update = {
        [payload.field]: {
          [payload.subfield]: payload.value
        }
      }
    } else {
      update = {
        [payload.field]: payload.value
      }
    }

    context.commit('SET_SYNTH_MEMBER_VALUES', {synth: context.getters.constructed_synth, update: update})
  },
  // UPDATE_SYNTH_MEMBER_VALUES (context, values) {
  //   context.commit('SET_SYNTH_MEMBER_VALUES', {synth: context.getters.constructed_synth, values: values})
  // },
  // ====== //
  // FILTER //
  // ====== //
  UPDATE_FILTER_MEMBER_VALUES (context, values) {
    context.commit('SET_FILTER_MEMBER_VALUES', {filter: context.getters.constructed_filter, values: values})
  }

}


export const getters = {
  constructed_synth: state => {
    return new Tone.PolySynth(8, Tone[state.tone.synth]).toMaster()
  },
  constructed_filter: state => {
    if (state.tone.filter) {
      return new Tone.Filter()
    } else {
      return new Tone.Gain()
    }
  }
}
