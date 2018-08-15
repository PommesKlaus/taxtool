<template>
  <div class="bgc-white bd bdrs-3 p-20 mB-20">
    <h6 class="c-grey-900 mB-20"><slot></slot></h6>
    <div v-if="version">
      <div class="row">
        <div class="col-md-4">Stichtag</div>
        <div class="col-md-8">{{ version.reportingDate }}</div>
      </div>
      <div class="row">
        <div class="col-md-4">Bezeichnung</div>
        <div class="col-md-8">{{ version.shortname }}</div>
      </div>
      <div class="row">
        <div class="col-md-4">Status</div>
        <div class="col-md-8">
          {{ version.locked ? 'Geschlossen' : 'Offen' }}
        </div>
      </div>

      <!-- Optional Elements -->
      <div class="row" v-if="version.description">
        <div class="col-md-4">Beschreibung</div>
        <div class="col-md-8">
          {{ version.description }}
        </div>
      </div>
      <div class="row" v-if="version.createdAt">
        <div class="col-md-4">Angelegt am</div>
        <div class="col-md-8">
          {{ new Date(version.createdAt).toLocaleString() }}
        </div>
      </div>
      <div class="row" v-if="version.updatedAt">
        <div class="col-md-4">Zuletzt geändert</div>
        <div class="col-md-8">
          {{ new Date(version.updatedAt).toLocaleString() }}
        </div>
      </div>
      <div class="row" v-if="localgaapSettings">
        <hr />
        <div class="col-md-4">Steuersatz latent</div>
        <div class="col-md-8">
          {{ localgaapSettings.deferredTaxRate * 100 }}%
        </div>
      </div>

    </div>
    <div v-else>
      <div class="container text-center">
        Keine Version gesetzt.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    version: {
      type: Object,
      default: null
    },
    localgaapSettings: {
      type: Object,
      default: null
    }
  }
}
</script>
