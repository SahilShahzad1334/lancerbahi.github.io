<template>
  <div class="section-padding">
    <v-container v-if="service">
      <!-- Breadcrumb -->
      <div class="mb-6">
        <router-link to="/" class="text-caption text-medium-emphasis text-decoration-none">Home</router-link>
        <span class="text-caption text-medium-emphasis mx-2">/</span>
        <span class="text-caption text-medium-emphasis">{{ service.title }}</span>
      </div>

      <!-- Service Header -->
      <v-row class="mb-10">
        <v-col cols="12" md="8">
          <div class="d-flex align-center mb-4">
            <div class="icon-wrapper mr-4">
              <v-icon size="36" color="primary">{{ service.icon }}</v-icon>
            </div>
            <div>
              <h1 class="text-h3 font-weight-bold">{{ service.title }}</h1>
              <p class="text-body-1 text-medium-emphasis mt-1">Starting at ${{ service.startingPrice }}</p>
            </div>
          </div>
          <p class="text-body-1 text-medium-emphasis" style="line-height: 1.8; max-width: 600px;">
            {{ service.description }}
          </p>
        </v-col>
      </v-row>

      <!-- Pricing Tiers -->
      <h2 class="text-h4 font-weight-bold mb-6">Choose Your <span class="glow-text">Plan</span></h2>
      <v-row class="mb-12">
        <v-col v-for="(tier, index) in service.tiers" :key="tier.name" cols="12" md="4">
          <v-card
            class="glass-card pa-6 d-flex flex-column"
            height="100%"
            :class="{ 'featured-tier': index === 1 }"
          >
            <div v-if="index === 1" class="text-caption font-weight-bold text-primary mb-3" style="letter-spacing: 0.05em;">
              MOST POPULAR
            </div>
            <div class="text-h5 font-weight-bold mb-1">{{ tier.name }}</div>
            <div class="d-flex align-baseline mb-4">
              <span class="text-h3 font-weight-bold">${{ tier.price }}</span>
              <span class="text-body-2 text-medium-emphasis ml-1">/project</span>
            </div>

            <v-divider class="mb-4" style="border-color: rgba(255,255,255,0.06);"></v-divider>

            <div class="flex-grow-1">
              <div v-for="feature in tier.features" :key="feature" class="d-flex align-start mb-3">
                <v-icon size="18" color="success" class="mr-2 mt-1">mdi-check-circle</v-icon>
                <span class="text-body-2">{{ feature }}</span>
              </div>
            </div>

            <v-btn
              class="mt-6"
              :class="index === 1 ? 'gradient-btn' : 'gradient-btn-outline'"
              block
              @click="scrollToInquiry"
            >
              Select {{ tier.name }}
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <!-- Inquiry Form -->
      <div id="inquiry-form">
        <InquiryForm />
      </div>
    </v-container>

    <!-- Loading / Not Found -->
    <v-container v-else-if="loading" class="text-center py-12">
      <v-progress-circular indeterminate color="primary" size="48"></v-progress-circular>
      <p class="text-body-1 text-medium-emphasis mt-4">Loading service details...</p>
    </v-container>

    <v-container v-else class="text-center py-12">
      <v-icon size="64" color="text-medium-emphasis" class="mb-4">mdi-file-question</v-icon>
      <h2 class="text-h4 font-weight-bold mb-2">Service Not Found</h2>
      <p class="text-body-1 text-medium-emphasis mb-6">The service you're looking for doesn't exist.</p>
      <v-btn to="/" class="gradient-btn">Back to Home</v-btn>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAgencyStore } from '@/stores/agencyStore'
import InquiryForm from '@/components/client/InquiryForm.vue'

const route = useRoute()
const store = useAgencyStore()
const loading = ref(true)

const service = computed(() => store.getServiceById(route.params.id))

onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    loading.value = false
  }, 300)
})

function scrollToInquiry() {
  const el = document.getElementById('inquiry-form')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.icon-wrapper {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(108, 99, 255, 0.1);
  border-radius: 16px;
  border: 1px solid rgba(108, 99, 255, 0.15);
  flex-shrink: 0;
}

.featured-tier {
  border-color: rgba(108, 99, 255, 0.3) !important;
  position: relative;
}

.featured-tier::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: 17px;
  background: linear-gradient(135deg, rgba(108, 99, 255, 0.2), transparent, rgba(0, 212, 170, 0.2));
  z-index: -1;
}
</style>