if (process.browser) {
    var Tone = require('tone')
}

var _ = require('lodash')

export const state = () => ({
  meta: {
    title: 'Before we say goodnight',
    knobtwister: 'brokyo',
    length: 180000
  },
  tone: {
    synth: 'AMSynth',
    synthMemberValues: {
      oscillator: {
        type: 'sine'
      },
      volume: 0,
      harmonicity: 3,
      detune: 0,
      portamento: 0,
      modulation: {
        type: 'square'
      },
      envelope: {
        attack: 0.01,
        attackCurve: 'linear',
        decay: 0.01,
        sustain: 1,
        release: 5,
        releaseCurve: 'linear'
      },
      modulationEnvelope: {
        attack: 0.5,
        attackCurve: 'linear',
        decay: 0,
        sustain: 1,
        release: 0.5,
        releaseCurve: 'linear'
      }
    },
    filter: false,
    filterMemberValues: {},
    effects: []
  },
  scale: [
    { id: 0, keyCode: 'q', note: 'D', octave: 4 },
    { id: 1, keyCode: 'w', note: 'E', octave: 4 },
    { id: 2, keyCode: 'e', note: 'G', octave: 4 },
    { id: 3, keyCode: 'r', note: 'A', octave: 4 },
    { id: 4, keyCode: 't', note: 'B', octave: 4 },
    { id: 5, keyCode: 'h', note: 'D', octave: 5 },
    { id: 6, keyCode: 'j', note: 'E', octave: 5 },
    { id: 7, keyCode: 'k', note: 'G', octave: 5 },
    { id: 8, keyCode: 'l', note: 'A', octave: 5 },
    { id: 9, keyCode: ';', note: 'B', octave: 5 }
  ],
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
  overlay: {
    colorConfig: [
      {
        name: 'octave1',
        config: {
          'display': 'flex',
          'flex-direction': 'column',
          'justify-content': 'flex-start'
        },
        styles: [
          {id: 0, grow: 1, order: 1, offset: 0, color: '#E583B4', startOpacity: 0, endOpacity: 1},
          {id: 1, grow: 1, order: 2, offset: 0, color: '#FAEE31', startOpacity: 0, endOpacity: 1},
          {id: 2, grow: 1, order: 3, offset: 0, color: '#67CAF4', startOpacity: 0, endOpacity: 1},
          {id: 3, grow: 1, order: 4, offset: 0, color: '#F2A172', startOpacity: 0, endOpacity: 1},
          {id: 4, grow: 1, order: 5, offset: 0, color: '#0F1A23', startOpacity: 0, endOpacity: 1}
        ]
      },
      {
        name: 'octave2',
        config: {
          'display': 'flex',
          'flex-direction': 'column',
          'justify-content': 'flex-start'
        },
        styles: [
          {id: 5, grow: 1, order: 1, offset: 0, color: '#CE5814', startOpacity: 0, endOpacity: 1},
          {id: 6, grow: 1, order: 2, offset: 0, color: '#72F2C2', startOpacity: 0, endOpacity: 1},
          {id: 7, grow: 1, order: 3, offset: 0, color: '#A472F2', startOpacity: 0, endOpacity: 1},
          {id: 8, grow: 1, order: 4, offset: 0, color: '#E4F272', startOpacity: 0, endOpacity: 1},
          {id: 9, grow: 1, order: 5, offset: 0, color: '#C7F272', startOpacity: 0, endOpacity: 1}
        ]
      }
    ]
  },
  mutation: {
    type: 'play',
    config: [
      {
        type: 'synth',
        time: 20,
        synthName: '',
        synthParams: '',
        amount: 1
      },
      {
        type: 'corruption',
        time: 40,
        amount: 10
      }
    ]
  }
})

export const mutations = {
  // ===== //
  // VIDEO //
  // ===== //
  SET_VIDEO_PARAMS (context, param) {
    _.merge(context.video, param)
  },
  // ======= //
  // OVERlAY //
  // ======= //
  SET_OVERLAY_BAND_PARAMS (context, param) {
    var bandStyle = _.find(context.overlay.colorConfig[param.meta.arrayIndex].styles, {id: param.meta.id})
    _.merge(bandStyle, param.payload)
  },
  SET_OVERLAY_GROUP_PARAMS (context, param) {
    _.merge(context.overlay.colorConfig[param.meta.arrayIndex].config, param.payload)
  },
  RANDOM_OVERLAY_BAND (context, update) {
    _.merge(context.overlay.colorConfig[update.meta.arrayIndex].styles[update.meta.bandIndex], update.band)
  },
  RANDOM_OVERLAY_GROUP (context, update) {
    _.merge(context.overlay.colorConfig[update.meta.arrayIndex].config, update.config)
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
  SET_PATCH_CONFIG (context, toneConfig) {
    console.log('got tru')
    context.tone = toneConfig
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
  },
  // ==== //
  // META //
  // ==== //
  UPDATE_META (context, payload) {
    _.merge(context.meta, payload)
  },
  // ======= //
  // GENERAL //
  // ======= //
  MOUNT_TRIGGERS (context) {
    context.meta.triggersMounted = true
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
