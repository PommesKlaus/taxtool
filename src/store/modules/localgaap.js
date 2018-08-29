import axios from "axios";
import _ from 'lodash'
import Vue from "../../../node_modules/vue";
import { aggregateData } from "../../helper";
import router from "@/router"

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
};

const getters = {
  getDisplayVersions: state => {
    return {
      current: {
        reportingDate: state.version.reportingDate,
        shortname: state.version.shortname
      },
      matching: {
        reportingDate:
          state.version.matchingVersion === null
            ? "-"
            : state.version.matchingVersion.reportingDate,
        shortname:
          state.version.matchingVersion === null
            ? ""
            : state.version.matchingVersion.shortname
      },
      compare: {
        reportingDate:
          state.version.compareVersion === null
            ? "-"
            : state.version.compareVersion.reportingDate,
        shortname:
          state.version.compareVersion === null
            ? "-"
            : state.version.compareVersion.shortname
      }
    };
  },

  getGroupedDifferences: state => {
    const keys = [
      "cyDifference",
      "tuDifference",
      "tuMovement",
      "cyNeutralMovement",
      "cyMovement"
    ];
    return aggregateData(state.differences, "category", keys);
  },

  getDifferenceByOar: state => oar => {
    return state.differences.find(difference => difference.oar === oar);
  }
};

const calculationFields = `
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
  tuMovementDeferredTax`;

const actions = {
  fetchData({ commit, state }, versionId, force = false) {
    if (force || versionId !== state.version.id) {
      return new Promise((resolve, reject) => {
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
              ${calculationFields}
            }
          }`
        };
        axios
          .post(Vue.prototype.$baseApiUrl, query)
          .then(res => {
            const {
              company,
              localgaapSettings,
              ...version
            } = res.data.data.version;
            commit("updateCompany", company);
            commit("updateLocalgaapSettings", localgaapSettings);
            commit("updateVersion", version);
            commit("updateCalculation", res.data.data.calculation);
            resolve();
          })
          .catch(error => {
            console.error(error.response);
            reject(error);
          });
      });
    }
  },

  updateDifferences({ commit }, {versionId, difference}) {
    let mutationString = `
      version: ${versionId},
      oar: "${difference.oar}",
      category: "${difference.category}",
      name: "${difference.name}",
      local: ${difference.cyLocal},
      difference: ${difference.cyDifference},
      neutralMovement: ${difference.cyNeutralMovement},
      permanentQuota: ${difference.cyPermanentQuota},
      `;
      mutationString =
      difference.cyId === 0
        ? mutationString
        : mutationString + `id: ${difference.cyId}`;

    const mutation = { query: `mutation {
        mutateTransaction(${mutationString}) {
            calculation {
              ${calculationFields}
            }
            errors {
              field
              messages
            }
          }
      }`
    }
    axios.post(Vue.prototype.$baseApiUrl, mutation)
    .then(res => {
      commit("updateDifferenceCalculation", res.data.data.mutateTransaction.calculation);
      return res.data.data.mutateTransaction.calculation.oar
    })
    .then(oar => router.push({name: 'localgaapDifferenceDetail', params: {versionId, oar}}))
    .catch(err => console.log(err));
  }
};

const mutations = {
  updateCompany(state, company) {
    state.company = company;
  },
  updateLocalgaapSettings(state, localgaapSettings) {
    state.localgaapSettings = localgaapSettings;
  },
  updateVersion(state, version) {
    state.version = version;
  },
  updateCalculation(state, calculation) {
    state.differences = calculation;
  },
  updateDifferenceCalculation(state, differenceCalculation) {
    let updatePos = _.findIndex(state.differences, d => d.oar === differenceCalculation.oar)
    updatePos = updatePos === -1 ? state.differences.length : updatePos
    state.differences = [
      ...state.differences.slice(0, updatePos),
      differenceCalculation,
      ...state.differences.slice(updatePos + 1),
    ]
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
