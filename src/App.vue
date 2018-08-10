<template>
  <div id="app">
    <sidebar />
    <div class="page-container">
      <topbar />
      <main class='main-content bgc-grey-100'>
        <div id='mainContent'>
          <div class="container-fluid">
            <router-view/>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export default {
  components: {
    Sidebar,
    Topbar
  }
}
</script>


<style lang="scss">
@import "./scss/index.scss";

.link {
  cursor: pointer;
}

.data-table thead th {
  position: sticky;
  position: -webkit-sticky;
  top: 65px;
  z-index: 10;
  background-color: white;
}
</style>
