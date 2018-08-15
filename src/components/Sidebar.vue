<template>
  <div class="sidebar">
    <div class="sidebar-inner">
      <div class="sidebar-logo">
        <div class="peers ai-c fxw-nw">
          <div class="peer peer-greed">
            <a class="sidebar-link td-n" href="/">
              <div class="peers ai-c fxw-nw">
                <div class="peer">
                  <div class="logo">
                    <!-- <img src="assets/static/images/logo.png" alt=""> -->
                  </div>
                </div>
                <div class="peer peer-greed">
                  <h5 class="lh-1 mB-0 logo-text">Tax Tool</h5>
                </div>
              </div>
            </a>
          </div>
          <div class="peer">
            <div class="mobile-toggle sidebar-toggle">
              <a href="" class="td-n">
                <i class="ti-arrow-circle-left"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <ul class="sidebar-menu scrollable pos-r" v-if="showSidebar">

        <!-- DASHBOARD LINK ###### -->
        <router-link
          tag="li"
          class="nav-item mT-30"
          :to="{ name: 'dashboard', params: { versionId: $route.params.versionId }}"
          exact-active-class="active"
        >
          <a class="sidebar-link">
            <span class="icon-holder">
              <font-awesome-icon icon="compass"></font-awesome-icon>
            </span>
            <span class="title">Dashboard</span>
          </a>
        </router-link>

        <!-- LOCALGAAP LINK ###### -->
        <li :class="['nav-item', 'dropdown', 'open']">
          <a class="sidebar-link dropdown-toggle link">
            <span class="icon-holder">
              <font-awesome-icon icon="balance-scale"></font-awesome-icon>
            </span>
            <span class="title">HB/StB</span>
            <span class="arrow">
              <font-awesome-icon icon="angle-right"></font-awesome-icon>
            </span>
          </a>
          <ul class="dropdown-menu">
            <router-link tag="li" :to="{ name: 'localgaapDifferences', params: { versionId: $route.params.versionId }}" exact-active-class="active">
              <a class='sidebar-link'>Veränderung StAPs</a>
            </router-link>
            <router-link tag="li" :to="{ name: 'localgaapDifferences', params: { versionId: $route.params.versionId }}" exact-active-class="active">
              <a class='sidebar-link'>Latente Steuer</a>
            </router-link>
          </ul>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import { showSidebar } from "../helper";

export default {
  computed: {
    showSidebar() { return showSidebar(this.$route.name) }
  }
};
</script>