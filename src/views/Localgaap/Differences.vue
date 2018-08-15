<template>
<div>
  <h4 class="c-grey-900 mT-10 mB-30">Veränderung Steuerliche Ausgleichsposten (StAP)</h4>
  <div class="row">
    <div class="col-md-12">
      <div class="bgc-white bd bdrs-3 p-20 mB-20">
        <h6 class="c-grey-900 mB-20">HGB-Bilanz/Steuerbilanz</h6>
        <table class="table table-striped table-bordered data-table" cellspacing="0" width="100%">
            <thead>
              <tr>
                <th>Bezeichnung</th>
                <th class="col-width">Delta lfd. Jahr<br /><small>{{ getDisplayVersions.current }}</small></th>
                <th class="col-width">Delta Vorjahr<br /><small>{{ getDisplayVersions.matching }}</small></th>
                <th rowspan="2" class="col-width">darin enthaltenes Matching</th>
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
              <tr
                v-for="d in group.differences"
                :key="d.oar"
                class="row-link"
              >
                <td>{{ d.name }}</td>
                <td>{{ d.cyDifference | numberFormat }}</td>
                <td>{{ d.tuDifference | numberFormat }}</td>
                <td>{{ d.tuMovement | numberFormat }}</td>
                <td>{{ d.cyNeutralMovement | numberFormat }}</td>
                <td>{{ d.cyMovement | numberFormat }}</td>
              </tr>
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
  created () {
    this.fetchData(this.$route.params.versionId)
  },
  watch: {
    '$route' (to, from) {
      this.fetchData(this.$route.params.versionId)
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
  font-size: 0.8em;
}

.data-table tbody::before, .data-table tfoot::before {
  content: '';
  display: block;
  height: 35px;
}
</style>
