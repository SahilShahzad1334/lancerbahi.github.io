<template>
  <v-footer class="pa-0 mt-auto" style="background: transparent;">
    <v-container>
      <v-divider class="mb-6" style="border-color: rgba(255,255,255,0.06);"></v-divider>
      <v-row class="pb-8">
        <v-col cols="12" md="4">
          <div class="text-h5 font-weight-bold mb-2">
            <span class="glow-text">Lancerbahi</span>
          </div>
          <p class="text-body-2 text-medium-emphasis" style="max-width: 300px; line-height: 1.7;">
            Premium digital services & co-working marketplace. We connect elite talent with visionary clients.
          </p>
        </v-col>

        <v-col cols="6" md="2">
          <div class="text-caption font-weight-bold text-uppercase mb-3" style="letter-spacing: 0.08em; color: rgba(226,232,240,0.5);">Services</div>
          <div v-for="service in store.services" :key="service.id" class="mb-2">
            <router-link :to="`/services/${service.id}`" class="text-body-2 text-medium-emphasis text-decoration-none footer-link">
              {{ service.title }}
            </router-link>
          </div>
        </v-col>

        <v-col cols="6" md="2">
          <div class="text-caption font-weight-bold text-uppercase mb-3" style="letter-spacing: 0.08em; color: rgba(226,232,240,0.5);">Company</div>
          <div class="mb-2"><router-link to="/" class="text-body-2 text-medium-emphasis text-decoration-none footer-link">Home</router-link></div>
          <div class="mb-2"><router-link to="/#services" class="text-body-2 text-medium-emphasis text-decoration-none footer-link">Services</router-link></div>
          <div class="mb-2"><router-link to="/join" class="text-body-2 text-medium-emphasis text-decoration-none footer-link">Careers</router-link></div>
        </v-col>

        <v-col cols="12" md="4">
          <div class="text-caption font-weight-bold text-uppercase mb-3" style="letter-spacing: 0.08em; color: rgba(226,232,240,0.5);">Connect</div>
          <div class="d-flex gap-2">
            <v-btn icon variant="text" size="small" class="text-medium-emphasis" href="#" target="_blank">
              <v-icon>mdi-github</v-icon>
            </v-btn>
            <v-btn icon variant="text" size="small" class="text-medium-emphasis" href="#" target="_blank">
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
            <v-btn icon variant="text" size="small" class="text-medium-emphasis" href="#" target="_blank">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn icon variant="text" size="small" class="text-medium-emphasis" href="#" target="_blank">
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-divider class="mb-4" style="border-color: rgba(255,255,255,0.04);"></v-divider>
      <div class="text-center text-caption text-medium-emphasis pb-4">
        &copy; {{ new Date().getFullYear() }} Lancerbahi. All rights reserved.
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
import { useAgencyStore } from '@/stores/agencyStore'

const store = useAgencyStore()
</script>

<style scoped>
.footer-link {
  transition: color 0.2s ease;
}
.footer-link:hover {
  color: #6C63FF !important;
}
.gap-2 {
  gap: 4px;
}
</style>