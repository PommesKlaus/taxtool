<template>
  <div>
    <h4 class="c-grey-900 mT-10 mB-30">Sachverhalt anzeigen</h4>
    <form @submit.prevent="updateDifferences({versionId: $route.params.versionId, difference: updateDifference})">
      <div class="bgc-white bd bdrs-3 p-20 mB-20" v-if="createMode">
        <label for="inputCategory">Kategorie</label>
        <input
          type="text"
          id="inputCategory"
          :value="difference.category"
          @input="(e) => this.updateDifference.category = e.target.value"
          class="form-control form-control-lg"
          required
        >
        <label for="inputName" class="mT-20">Transaktionsbezeichnung</label>
        <input
          type="text"
          name="inputName"
          :value="difference.name"
          @input="(e) => this.updateDifference.name = e.target.value"
          class="form-control form-control-lg"
          required
        >
      </div>
      <div class="bgc-white bd bdrs-3 p-20 mB-20" v-else>
        <h6>{{ difference.category }}</h6>
        <h5>{{ difference.name }}</h5>
        <small class="float-right text-muted c-grey-500">Ref: {{ difference.oar }}</small>
      </div>
      <div class="bgc-white bd bdrs-3 p-20 mB-20">

        <div class="table-responsive-md">
          <table class="table table-sm">
            <thead>
              <tr>
                <th></th>
                <th class="text-center">
                  <abbr :title="getDisplayVersions.compare.reportingDate + ' // ' + getDisplayVersions.compare.shortname">Vorjahr alt</abbr>
                </th>
                <th class="text-center">Matching</th>
                <th class="text-center">
                  <abbr :title="getDisplayVersions.matching.reportingDate + ' // ' + getDisplayVersions.matching.shortname">Vorjahr neu</abbr>
                </th>
                <th class="text-center">Veränderung</th>
                <th class="text-center">
                  <abbr :title="getDisplayVersions.current.reportingDate + ' // ' + getDisplayVersions.current.shortname">Aktuell</abbr>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Local GAAP (HGB)</td>
                <td class="text-right">{{ difference.pyLocal | numberFormat }}</td>
                <td></td>
                <td class="text-right">{{ difference.tuLocal | numberFormat }}</td>
                <td></td>
                <td class="text-right">
                  <input
                    type="text"
                    :value="difference.cyLocal"
                    @input="(e) => this.updateDifference.cyLocal = e.target.value"
                    class="form-control form-control-sm text-right"
                  >
                  <!-- {{ difference.cyLocal | numberFormat }} -->
                </td>
              </tr>

              <tr>
                <td>Tax GAAP (StB)</td>
                <td class="text-right">{{ difference.pyTax | numberFormat }}</td>
                <td></td>
                <td class="text-right">{{ difference.tuTax | numberFormat }}</td>
                <td></td>
                <td class="text-right">{{ difference.cyTax | numberFormat }}</td>
              </tr>

              <tr>
                <td>Differenz (§ 60 II EStDV)</td>
                <td class="text-right">{{ difference.pyDifference | numberFormat }}</td>
                <th></th>
                <td class="text-right">{{ difference.tuDifference | numberFormat }}</td>
                <th></th>
                <td class="text-right">
                  <input
                    type="text"
                    :value="difference.cyDifference"
                    @input="(e) => this.updateDifference.cyDifference = e.target.value"
                    class="form-control form-control-sm text-right"
                  >
                  <!-- {{ difference.cyDifference | numberFormat }} -->
                </td>
              </tr>
            </tbody>

            <tbody>
              <tr class="empty">
                <td>&nbsp;</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <td>Erfolgsneutrale Veränderungen</td>
                <td></td>
                <td class="text-right">{{ difference.tuNeutralMovement | numberFormat }}</td>
                <td></td>
                <td class="text-right">
                  <input
                    type="text"
                    :value="difference.cyNeutralMovement"
                    @input="(e) => this.updateDifference.cyNeutralMovement = e.target.value"
                    class="form-control form-control-sm text-right"
                  >
                  <!-- {{ difference.cyNeutralMovement | numberFormat }} -->
                </td>
                <td></td>
              </tr>
              <tr>
                <th>Erfolgwirksame Veränderungen</th>
                <td></td>
                <th class="text-right">{{ difference.tuMovement | numberFormat }}</th>
                <td></td>
                <th class="text-right">{{ difference.cyMovement | numberFormat }}</th>
                <td></td>
              </tr>
            </tbody>

            <tbody>
              <tr class="empty">
                <td>&nbsp;</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <td>Permanenter Anteil</td>
                <td class="text-right">{{ difference.pyPermanentQuota | numberFormat }}</td>
                <td></td>
                <td class="text-right">{{ difference.tuPermanentQuota | numberFormat }}</td>
                <td></td>
                <td class="text-right">
                  <input
                    type="text"
                    :value="difference.cyPermanentQuota"
                    @input="(e) => this.updateDifference.cyPermanentQuota = e.target.value"
                    class="form-control form-control-sm text-right"
                  >
                  <!-- {{ difference.cyPermanentQuota | numberFormat }} -->
                </td>
              </tr>
              <tr>
                <th>Latente Steuer</th>
                <th class="text-right">{{ difference.pyDeferredTax | numberFormat }}</th>
                <th class="text-right">{{ difference.tuMovementDeferredTax | numberFormat }}</th>
                <td></td>
                <th class="text-right">{{ difference.cyMovementDeferredTax | numberFormat }}</th>
                <th class="text-right">{{ difference.cyDeferredTax | numberFormat }}</th>
              </tr>
            </tbody>

          </table>
        </div>
        <button type="submit" class="btn btn-primary">Speichern</button>

      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import _ from 'lodash'

const dummyDifference = {
        category: "",
        cyDeferredTax: 0,
        cyDifference: 0,
        cyId: 0,
        cyLocal: 0,
        cyMovement: 0,
        cyMovementDeferredTax: 0,
        cyNeutralMovement: 0,
        cyPermanentQuota: 0,
        cyTax: 0,
        name: "",
        oar: "",
        pyDeferredTax: 0,
        pyDifference: 0,
        pyLocal: 0,
        pyNeutralMovement: 0,
        pyPermanentQuota: 0,
        pyTax: 0,
        tuDifference: 0,
        tuLocal: 0,
        tuMovement: 0,
        tuMovementDeferredTax: 0,
        tuNeutralMovement: 0,
        tuPermanentQuota: 0,
        tuTax: 0
      }

export default {
  name: "differenceDetail",
  data () {
    return {
      updateDifference: {
        category: "",
        name: "",
        oar: "",
        cyId: 0,
        cyLocal: 0,
        cyDifference: 0,
        cyNeutralMovement: 0,
        cyPermanentQuota: 0,
      }
    }
  },
  computed: {
    ...mapGetters('localgaap', ['getDifferenceByOar', 'getDisplayVersions']),
    difference() {
      if ("oar" in this.$route.params) {
        return this.getDifferenceByOar(this.$route.params.oar)
      } else {
        return dummyDifference
      }
    },
    createMode() { return !("oar" in this.$route.params)}
  },
  methods: {
    ...mapActions('localgaap', ['fetchData', 'updateDifferences'])
  },
  watch: {
    $route: {
      immediate: true,
      handler () {
        this.fetchData(this.$route.params.versionId)
        .then(() => {
          if ("oar" in this.$route.params) {
            _.assign(this.updateDifference, _.pick(this.getDifferenceByOar(this.$route.params.oar), _.keys(this.updateDifference)));
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

