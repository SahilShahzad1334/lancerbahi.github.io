<template>
  <v-app-bar class="glass-navbar" flat height="72">
    <v-container class="d-flex align-center">
      <v-app-bar-title class="font-weight-bold text-h5">
        <router-link to="/" class="text-decoration-none">
          <span class="glow-text">Lancerbahi</span>
        </router-link>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <template v-for="link in navLinks" :key="link.to">
        <v-btn
          v-if="link.external"
          :href="link.to"
          target="_blank"
          variant="text"
          class="text-body-2 font-weight-medium mr-2"
          style="text-transform: none; letter-spacing: 0.01em;"
        >
          <v-icon start size="18">{{ link.icon }}</v-icon>
          {{ link.label }}
        </v-btn>
        <v-btn
          v-else
          :to="link.to"
          variant="text"
          class="text-body-2 font-weight-medium mr-2"
          style="text-transform: none; letter-spacing: 0.01em;"
          :class="{ 'text-primary': isActive(link.to) }"
        >
          <v-icon start size="18">{{ link.icon }}</v-icon>
          {{ link.label }}
        </v-btn>
      </template>

      <v-btn
        to="/join"
        class="gradient-btn ml-4"
        size="small"
      >
        Join Our Team
        <v-icon end size="16">mdi-arrow-right</v-icon>
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const navLinks = [
  { label: 'Home', to: '/', icon: 'mdi-home-outline' },
  { label: 'Services', to: '/#services', icon: 'mdi-view-grid-outline' },
  { label: 'Careers', to: '/join', icon: 'mdi-briefcase-outline' },
]

function isActive(to) {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}
</script>

<style scoped>
.v-app-bar-title {
  overflow: visible !important;
}
</style>