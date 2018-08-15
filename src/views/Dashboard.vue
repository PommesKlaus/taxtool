<template>
<div>
  <h4 class="c-grey-900 mT-10 mB-30">Dashboard</h4>
  <div class="row">
    <div class="col-md-5">
      <version-display id="pyVersDiv" :version="version.compareVersion">
        Vorjahresversion
      </version-display>

      <version-display id="tuVersDiv" :version="version.matchingVersion">
        Matchingversion
      </version-display>

    </div>
    <div class="col-md-5 offset-md-1">
      <version-display
        id="curVersDiv"
        :version="version"
        :localgaapSettings="localgaapSettings"
      >
        Aktuelle Version
      </version-display>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import VersionDisplay from "@/components/VersionDisplay";
// @ is an alias to /src

export default {
  name: 'dashboard',
  components: {
    VersionDisplay
  },
  computed: {
    ...mapState('localgaap', ['version', 'localgaapSettings', 'company']),
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
svg {
  width: 100%;
  height: 100vh;
  z-index: 1000;
  position: absolute;
}
</style>
