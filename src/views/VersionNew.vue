<template>
  <div class="container">
    <h4 class="c-grey-900 mT-10 mB-30">Neue Version anlegen</h4>

    <div class="bgc-white p-20 bd">
      <form @submit.prevent="createVersion()">

        <div class="form-group row">
          <label for="inputReportingDate" class="col-sm-3 col-form-label">Stichtag</label>
          <div class="col-sm-8">
            <input
              type="date"
              class="form-control"
              id="inputReportingDate"
              required
              v-model.lazy="newVersion.reportingDate"
            />
          </div>
          <div class="col-sm-1"></div>
        </div>

        <div class="form-group row">
          <label for="inputCompany" class="col-sm-3 col-form-label">Gesellschaft</label>
          <div class="col-sm-8">
            <select class="form-control" required v-model="newVersion.company">
              <option disabled value="">Bitte auswählen</option>
              <option v-for="company in companies" :key="company.shortname" :value="company.shortname">{{ company.shortname }} {{ company.name }}</option>
            </select>
          </div>
          <div class="col-sm-1"></div>
        </div>

        <div class="form-group row">
          <label for="inputShortname" class="col-sm-3 col-form-label">Bezeichnung</label>
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="inputShortname"
              placeholder="z.B. 'Q4 Version 1'"
              required
              v-model="newVersion.shortname"
            >
          </div>
          <div class="col-sm-1"></div>
        </div>

        <div class="form-group row">
          <label for="inputCompany" class="col-sm-3 col-form-label">Version Vergleich</label>
          <div class="col-sm-8">
            <select class="form-control" v-model="newVersion.compareVersion">
              <option :value="-1">Keine</option>
              <option v-for="version in versions" :key="version.id" :value="version.id">{{ version.reportingDate }} {{ version.shortname }}</option>
            </select>
          </div>
          <div class="col-sm-1"></div>
        </div>

        <div class="form-group row">
          <label for="inputCompany" class="col-sm-3 col-form-label">Version Matching</label>
          <div class="col-sm-8">
            <select class="form-control" v-model="newVersion.matchingVersion">
              <option :value="-1">Keine</option>
              <option v-for="version in versions" :key="version.id" :value="version.id">{{ version.reportingDate }} {{ version.shortname }}</option>
            </select>
          </div>
          <div class="col-sm-1"></div>
        </div>

        <div class="form-group row">
          <label for="inputCompany" class="col-sm-3 col-form-label">Werte kopieren aus</label>
          <div class="col-sm-8">
            <select class="form-control" v-model="newVersion.copyVersion">
              <option :value="-1">Keine</option>
              <option v-for="version in versions" :key="version.id" :value="version.id">{{ version.reportingDate }} {{ version.shortname }}</option>
            </select>
          </div>
          <div class="col-sm-1"></div>
        </div>

        <div class="form-group row">
          <label for="inputDescription" class="col-sm-3 col-form-label">Beschreibung</label>
          <div class="col-sm-8">
            <textarea class="form-control" id="inputDescription" v-model="newVersion.description"></textarea>
          </div>
          <div class="col-sm-1"></div>
        </div>

        <div class="form-group row">
          <div class="col-sm-10">
            <button type="submit" class="btn btn-primary">Speichern</button>
          </div>
        </div>

      </form>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import { mutationParametersFromObject } from "@/helper";

export default {
  name: "versionNew",
  data() {
    return {
      companies: [],
      versions: [],
      newVersion: {
        company: '',
        reportingDate: null,
        shortname: '',
        description: '',
        compareVersion: null,
        matchingVersion: null,
        copyVersion: null
      }
    };
  },
  methods: {
    getVersions() {
      if (this.newVersion.reportingDate && this.newVersion.company !== "") {
        const year = new Date(this.newVersion.reportingDate).getFullYear() - 1
        const query = {
          query: `{ allVersionsForCompanyAndYearGt(companyId:"${this.newVersion.company}", year:${year}) {
            shortname,
            id,
            reportingDate
            }
          }`
        };
        axios.post(this.$baseApiUrl, query).then(res => {
          this.versions = res.data.data.allVersionsForCompanyAndYearGt;
        });
      }
    },
    createVersion() {
      const mutation = { query: `mutation {
          createVersion(${mutationParametersFromObject(this.newVersion)}) {
              version {
                id
              }
              errors {
                field
                messages
              }
            }
        }`
      }
      axios.post(this.$baseApiUrl, mutation).then(res => {
        this.$router.push({name: 'dashboard', params: {versionId: res.data.data.mutateVersion.version.id}});
      });
    }
  },
  mounted() {
    this.newVersion.reportingDate = new Date().getFullYear() + "-12-31"
    const query = {
      query: "{ allCompanies { shortname, name } }"
    };
    axios.post(this.$baseApiUrl, query).then(res => {
      this.companies = res.data.data.allCompanies;
    });
  },
  watch: {
    'newVersion.company': function() { this.getVersions() },
    'newVersion.reportingDate': function () {
      this.newVersion.company = ""
      this.getVersions()
    }
  }
};
</script>
