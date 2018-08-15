import axios from 'axios'
import Vue from '../../../node_modules/vue';
import { aggregateData } from "../../helper";

const state = {
  version: {
    id: null,
    shortname: "",
    reportingDate: null,
    compareVersion: null,
    matchingVersion: null,
    description: "",
    locked: false,
    createdAt: "2018-07-26T22:00:27.952926+00:00",
    updatedAt: "2018-07-26T22:00:27.952926+00:00"
  },
  company: {
    shortname: "",
    name: ""
  },
  localgaapSettings: {
    deferredTaxRate: 0
  },
  differences: []
}

const getters = {
  getDisplayVersions: (state) => {
    return {
      current: state.version.reportingDate,
      matching: state.version.matchingVersion === null ? "-" : state.version.matchingVersion.reportingDate,
      compare: state.version.compareVersion === null ? "-" : state.version.compareVersion.reportingDate
    }
  },

  getGroupedDifferences: (state) => {
    const keys = [
      "cyDifference",
      "tuDifference",
      "tuMovement",
      "cyNeutralMovement",
      "cyMovement"
    ]
    return aggregateData(state.differences, 'category', keys)
  }
}

const actions = {
  fetchData ({ commit }, versionId) {
    const query = {
      query: `{
        version(id:${versionId}) {
          id,
          shortname,
          reportingDate,
          company {
            shortname,
            name
          },
          compareVersion {
            id,
            reportingDate,
            shortname,
            locked
          },
          matchingVersion {
            id,
            reportingDate,
            shortname,
            locked
          },
          description,
          locked,
          createdAt,
          updatedAt,
          localgaapSettings {
            deferredTaxRate
          }
        },
        calculation(versionId:${versionId}) {
          oar,
          name,
          category,
          cyId,
          cyLocal,
          cyTax,
          cyDifference,
          cyPermanentQuota,
          cyDeferredTax,
          cyNeutralMovement,
          pyLocal,
          pyTax,
          pyDifference,
          pyPermanentQuota,
          pyDeferredTax,
          pyNeutralMovement,
          tuLocal,
          tuTax,
          tuDifference,
          tuPermanentQuota,
          tuNeutralMovement,
          cyMovement,
          cyMovementDeferredTax,
          tuMovement,
          tuMovementDeferredTax
        }
      }`
    }
    axios.post(Vue.prototype.$baseApiUrl, query)
    .then(res => {
      const {company, localgaapSettings, ...version} = res.data.data.version
      commit('updateCompany', company)
      commit('updateLocalgaapSettings', localgaapSettings)
      commit('updateVersion', version)
      commit('updateCalculation', res.data.data.calculation)
    })
  }
}

const mutations = {
  updateCompany(state, company) {
    state.company = company
  },
  updateLocalgaapSettings(state, localgaapSettings) {
    state.localgaapSettings = localgaapSettings
  },
  updateVersion(state, version) {
    state.version = version
  },
  updateCalculation(state, calculation) {
    state.differences = calculation
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
