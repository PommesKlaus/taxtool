<template>
<div>
  <h4 class="c-grey-900 mT-10 mB-30">Veränderung Steuerliche Ausgleichsposten (StAP)</h4>
  <div class="row">
    <div class="col-md-12">
      <div class="bgc-white bd bdrs-3 p-20 mB-20">
        <h6 class="c-grey-900 mB-20">HGB-Bilanz/Steuerbilanz</h6>
        <router-link tag="button" :to="{name: 'localgaapDifferenceNew', params: {versionId: $route.params.versionId}}" class="btn btn-outline-primary">Neu</router-link>
        <table class="table table-striped table-bordered data-table" cellspacing="0" width="100%">
            <thead>
              <tr>
                <th>Bezeichnung</th>
                <th class="col-width">Delta <abbr :title="getDisplayVersions.current.shortname">lfd. Jahr</abbr><br /><small>{{ getDisplayVersions.current.reportingDate }}</small></th>
                <th class="col-width">Delta <abbr :title="getDisplayVersions.matching.shortname">Vorjahr</abbr><br /><small>{{ getDisplayVersions.matching.reportingDate }}</small></th>
                <th rowspan="2" class="col-width">darin enthaltenes <abbr :title="getDisplayVersions.matching.shortname">Matching</abbr></th>
                <th class="col-width">Veränderung neutral</th>
                <th class="col-width">Veränderung erfolgswirksam</th>
              </tr>
            </thead>
            <tbody v-for="group in getGroupedDifferences.groupedData" :key="group.category">
              <tr>
                <th>{{ group.category }}</th>
                <th>{{ group.sums.cyDifference | numberFormat }}</th>
                <th>{{ group.sums.tuDifference | numberFormat }}</th>
                <th>{{ group.sums.tuMovement | numberFormat }}</th>
                <th>{{ group.sums.cyNeutralMovement | numberFormat }}</th>
                <th>{{ group.sums.cyMovement | numberFormat }}</th>
              </tr>
              <router-link
                tag="tr"
                v-for="d in group.differences"
                :key="d.oar"
                class="link"
                :to="{name: 'localgaapDifferenceDetail', params: {versionId: $route.params.versionId, oar: d.oar}}"
              >
                <td>{{ d.name }}</td>
                <td>{{ d.cyDifference | numberFormat }}</td>
                <td>{{ d.tuDifference | numberFormat }}</td>
                <td>{{ d.tuMovement | numberFormat }}</td>
                <td>{{ d.cyNeutralMovement | numberFormat }}</td>
                <td>{{ d.cyMovement | numberFormat }}</td>
              </router-link>
            </tbody>
            <tfoot>
              <tr>
                <th>SUMME</th>
                <th>{{ getGroupedDifferences.totals.cyDifference | numberFormat }}</th>
                <th>{{ getGroupedDifferences.totals.tuDifference | numberFormat }}</th>
                <th>{{ getGroupedDifferences.totals.tuMovement | numberFormat }}</th>
                <th>{{ getGroupedDifferences.totals.cyNeutralMovement | numberFormat }}</th>
                <th>{{ getGroupedDifferences.totals.cyMovement | numberFormat }}</th>
              </tr>
            </tfoot>
          </table>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import { mapActions, mapGetters } from "vuex";
// @ is an alias to /src

export default {
  name: 'differences',
  components: {
  },
  computed: {
    ...mapGetters('localgaap', ['getDisplayVersions', 'getGroupedDifferences'])
  },
  methods: {
    ...mapActions('localgaap', ['fetchData'])
  },
  watch: {
    $route: {
      immediate: true,
      handler () {
        this.fetchData(this.$route.params.versionId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
th {
  vertical-align: middle!important;
  min-width: 150px;
}

.col-width {
  width: 12%;
  text-align: center;
}

.data-table > tbody > tr > th:nth-child(n+2), .data-table > tbody > tr > td:nth-child(n+2), .data-table > tfoot > tr > th:nth-child(n+2) {
  text-align: right;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.9em;
}

.data-table tbody::before, .data-table tfoot::before {
  content: '';
  display: block;
  height: 35px;
}
</style>
