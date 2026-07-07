<template>
  <div class="section-padding">
    <v-container>
      <!-- Header -->
      <v-row class="mb-10">
        <v-col cols="12" md="6">
          <v-chip
            class="mb-4"
            variant="outlined"
            color="primary"
            size="small"
            style="border-color: rgba(108, 99, 255, 0.3);"
          >
            <v-icon start size="14">mdi-account-group</v-icon>
            Join Our Talent Network
          </v-chip>

          <h1 class="text-h3 font-weight-bold mb-4">
            Become a <span class="glow-text">Lancerbahi</span> Creator
          </h1>

          <p class="text-body-1 text-medium-emphasis mb-6" style="line-height: 1.8; max-width: 500px;">
            We're always looking for exceptional freelancers and creators to join our 
            co-working network. Work on premium projects, collaborate with top talent, 
            and grow your career.
          </p>

          <div class="d-flex flex-wrap ga-6 mb-8">
            <div v-for="benefit in benefits" :key="benefit.label" class="d-flex align-center">
              <v-icon size="20" color="success" class="mr-2">mdi-check-circle</v-icon>
              <span class="text-body-2">{{ benefit.label }}</span>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="glass-card pa-8 text-center" style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div class="icon-wrapper-large mb-4">
              <v-icon size="48" color="primary">mdi-rocket-launch</v-icon>
            </div>
            <div class="text-h5 font-weight-bold mb-2">Why Join Us?</div>
            <p class="text-body-2 text-medium-emphasis" style="max-width: 360px; line-height: 1.7;">
              Access a steady stream of high-quality projects, competitive rates, 
              and a supportive community of fellow creators.
            </p>
          </v-card>
        </v-col>
      </v-row>

      <!-- Application Form -->
      <v-row>
        <v-col cols="12" md="8" lg="6" class="mx-auto">
          <ApplicationForm />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import ApplicationForm from '@/components/talent/ApplicationForm.vue'

const benefits = [
  { label: 'Premium Projects' },
  { label: 'Flexible Hours' },
  { label: 'Competitive Pay' },
  { label: 'Creative Community' },
]
</script>

<style scoped>
.icon-wrapper-large {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(108, 99, 255, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(108, 99, 255, 0.15);
}
</style>