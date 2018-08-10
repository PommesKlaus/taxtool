const state = {
  openedMenu: null
}

const getters = {}

const actions = {
  changeOpenedMenu ({ state, commit }, menuName) {
    const newStatus = menuName === state.openedMenu ? null : menuName
    commit('setOpenedMenu', newStatus)
  }
}

const mutations = {
  setOpenedMenu(state, status) {
    state.openedMenu = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
