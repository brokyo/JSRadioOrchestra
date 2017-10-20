if (process.browser) {
    var Tone = require('tone')
}

var _ = require('lodash')

export const state = () => ({
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
  scale: {},
  video: {
    title: 'measure twice cut once',
    // DkozMJBsH3U
    videoId: '',
    params: {
      start: 20,
      end: 0,
      mute: false
    }
  },
  visuals: {
    video: {

    },
    colorFilter: []
  }

})

export const mutations = {
  // ===== //
  // VIDEO //
  // ===== //
  SET_VIDEO_PARAMS (context, param) {
    console.log(param)
    _.merge(context.video, param)
  },
  // ===== //
  // SYNTH //
  // ===== //
  SET_SYNTH (context, payload) {
    context.tone.synth = payload.synth
    context.tone.synthMemberValues = payload.defaults
  },
  SET_SYNTH_MEMBER_VALUES (context, payload) {
    // Update relevant param
    _.merge(context.tone.synthMemberValues, payload.update)

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
  // ======== //
  // TRIGGERS //
  // ======== //
  SET_SCALE_CONFIG (context, scale) {
    context.scale = scale
  },
  // ======= //
  // OVERLAY //
  // ======= //
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

    if (payload.subsubfield) {
      update = {
        [payload.field]: {
          [payload.subfield]: {
            [payload.subsubfield]: payload.value
          }
        }
      }
    } else if (payload.subfield) {
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
