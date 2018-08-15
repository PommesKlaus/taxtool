<template>
  <div class="header navbar">
    <div class="header-container">
      <ul class="nav-left">
        <li>
          <a id='sidebar-toggle' class="sidebar-toggle" href="javascript:void(0);">
            <font-awesome-icon icon="bars"></font-awesome-icon>
          </a>
        </li>
      </ul>
      <ul class="nav-left" v-if="showSidebar">
        <li>
          <a class="no-after peers fxw-nw ai-c lh-1">
            <div class="peer">
              {{ company.shortname }}
            </div>
          </a>
        </li>
        <li>
          <a class="no-after peers fxw-nw ai-c lh-1">
            <div class="peer">
              {{ company.name }}
            </div>
          </a>
        </li>
        <li>
          <a class="no-after peers fxw-nw ai-c lh-1">
            <div class="peer">
              {{ version.reportingDate }}
            </div>
          </a>
        </li>
        <li>
          <a class="no-after peers fxw-nw ai-c lh-1">
            <div class="peer">
              {{ version.shortname }}
            </div>
          </a>
        </li>
      </ul>
      <ul class="nav-right">
        <li class="dropdown">
          <a href="" class="dropdown-toggle no-after peers fxw-nw ai-c lh-1" data-toggle="dropdown">
            <div class="peer mR-10">
              <img class="w-2r bdrs-50p" src="https://randomuser.me/api/portraits/men/10.jpg" alt="">
            </div>
            <div class="peer">
              <span class="fsz-sm c-grey-900">John Doe</span>
            </div>
          </a>
          <ul class="dropdown-menu fsz-sm">
            <li>
              <a href="" class="d-b td-n pY-5 bgcH-grey-100 c-grey-700">
                <i class="ti-settings mR-10"></i>
                <span>Setting</span>
              </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
              <a href="" class="d-b td-n pY-5 bgcH-grey-100 c-grey-700">
                <i class="ti-power-off mR-10"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import { mapActions, mapState } from "vuex";
import { showSidebar } from "../helper";

export default {
  computed: {
    showSidebar() { return showSidebar(this.$route.name) },
    ...mapState('localgaap', ['version', 'company']),
  },
}
</script>
