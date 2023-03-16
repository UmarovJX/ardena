import axios from "axios";

export const actions = {
  async nuxtServerInit(ctx) {
    return [
      await axios.get(process.env.VUE_APP_URL_BASE_URL + 'common/information/system')
        .then((response) => {
          ctx.commit('updateSettings', response.data.settings)
        }),

      await axios.get(process.env.VUE_APP_URL_BASE_URL + 'website/section/layout')
        .then((response) => {
          ctx.commit('updateLayout', response.data)
        })
    ]
  }
}

export const state = () => ({
  settings: {},
  layout: {}
})

export const mutations = {
  updateSettings(state, settings) {
    state.settings = settings
  },

  updateLayout(state, layout) {
    state.layout = layout
  }
}

export const getters = {
  getSettings: (state) => {
    return state.settings
  },

  getLayout: (state) => {
    return state.layout
  }
}


