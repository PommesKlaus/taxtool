<template>
<div class="container">
  <div class="row">
    <div class="col-md-10">
      <h4 class="c-grey-900 mT-10 mB-30">Berechnung öffnen</h4>
    </div>
    <div col-md-2>
      <router-link :to="{name:'versionNew'}" tag="button" class="btn cur-p btn-outline-primary mT-10">
        Neue Version anlegen
      </router-link>
      <!-- <button type="button" class="btn cur-p btn-outline-primary mT-10">Neue Version anlegen</button> -->
    </div>
  </div>
  <div class="row">
    <div class="col-md-6">
      <div class="bgc-white bd bdrs-3 p-20 mB-20">
        <h6 class="c-grey-900 mB-20">Gesellschaft wählen</h6>
        <div class="mT-30">
          <div class="list-group">
            <span
              :class="['link list-group-item list-group-item-action', selectedCompany === company.shortname ? 'active' : '']"
              v-for="company in companies"
              :key="company.shortname"
              @click="selectCompany(company.shortname)"
            >
              {{ company.shortname }} {{ company.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="bgc-white bd bdrs-3 p-20 mB-20" v-if="selectedCompany">
        <h6 class="c-grey-900 mB-20">Version wählen</h6>
        <div class="mT-30">
          <div class="list-group">
            <router-link
              class="link list-group-item list-group-item-action"
              v-for="version in versions"
              :key="version.id"
              :to="{name: 'dashboard', params: {versionId: version.id}}"
            >
              {{ version.reportingDate }} // {{ version.shortname }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// TODO: Loading-Indicator for companies and versions
// TODO: Error Handling

import axios from 'axios'

export default {
  name: "versionSelect",
  data() {
    return {
      companies: [],
      selectedCompany: null,
      versions: []
    }
  },
  methods: {
    selectCompany (companyId) {
      this.selectedCompany = companyId
      this.versions = []
      const query = {
        query: `{
          company(id:"${companyId}") {
            shortname,
            versions {
              id,
              reportingDate,
              shortname
            }
          }
        }`
      }
      axios.post(this.$baseApiUrl, query)
      .then(res => {
        this.versions = res.data.data.company.versions
      })
    }
  },
  mounted () {
    const query = {
      query: '{ companies { shortname, name } }'
    }
    axios.post(this.$baseApiUrl, query)
    .then(res => {
      this.companies = res.data.data.companies
    })
  }
};
</script>

<style lang="scss" scoped>
</style>
