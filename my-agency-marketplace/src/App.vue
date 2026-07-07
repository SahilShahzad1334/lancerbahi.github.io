<template>
  <v-app>
    <AppNavbar />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup>
import AppNavbar from '@/components/common/AppNavbar.vue'
import AppFooter from '@/components/common/AppFooter.vue'
</script>

<style>
/* Ensure the app takes full height */
.v-application {
  background: #0B0F19 !important;
}
</style>