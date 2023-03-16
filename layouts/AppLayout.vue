<template>
  <div>
    <app-header
      :settings="settings"
      :layout="layout"
    />
    <Nuxt/>
    <app-footer
      :settings="settings"
      :layout="layout"
    />
  </div>
</template>

<script>
import AppHeader from "~/components/layout-components/AppHeader";
import AppFooter from "~/components/layout-components/AppFooter";
import {mapGetters} from "vuex";

export default {
  name: "AppLayout",
  components: {
    AppFooter,
    AppHeader
  },
  data() {
    return {
      settings: {},
      layout: {}
    }
  },

  created() {
    this.settings = this.$store.getters.getSettings
    this.layout = this.$store.getters.getLayout
  }
}
</script>

<style lang="scss" scoped>

</style>
