<template>
  <div>
    <!-- ===== HERO SECTION ===== -->
    <section class="hero-gradient section-padding" style="min-height: 90vh; display: flex; align-items: center;">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" lg="6" class="text-center">
            <v-chip
              class="mb-6"
              variant="outlined"
              color="primary"
              size="small"
              style="border-color: rgba(108, 99, 255, 0.3);"
            >
              <v-icon start size="14">mdi-star</v-icon>
              Elite Digital Services Marketplace
            </v-chip>

            <h1 class="text-h2 text-sm-h1 font-weight-bold mb-4" style="line-height: 1.15; letter-spacing: -0.03em;">
              Where <span class="glow-text">Vision</span> Meets
              <span class="glow-text">Execution</span>
            </h1>

            <p class="text-h6 text-medium-emphasis mb-8" style="max-width: 540px; margin: 0 auto; line-height: 1.7; font-weight: 400;">
              Premium digital services and a co-working hub for elite creators. 
              We build, design, and scale your digital presence.
            </p>

            <div class="d-flex flex-wrap justify-center ga-4">
              <v-btn
                size="large"
                class="gradient-btn px-8"
                @click="scrollToServices"
              >
                Explore Our Services
                <v-icon end size="20">mdi-arrow-down</v-icon>
              </v-btn>
              <v-btn
                to="/join"
                size="large"
                class="gradient-btn-outline px-8"
              >
                Join Our Team
                <v-icon end size="20">mdi-arrow-right</v-icon>
              </v-btn>
            </div>

            <!-- Stats -->
            <v-row class="mt-12 pt-4" justify="center">
              <v-col cols="4" class="text-center">
                <div class="text-h4 font-weight-bold glow-text">50+</div>
                <div class="text-caption text-medium-emphasis">Projects Delivered</div>
              </v-col>
              <v-col cols="4" class="text-center">
                <div class="text-h4 font-weight-bold glow-text">30+</div>
                <div class="text-caption text-medium-emphasis">Team Members</div>
              </v-col>
              <v-col cols="4" class="text-center">
                <div class="text-h4 font-weight-bold glow-text">98%</div>
                <div class="text-caption text-medium-emphasis">Client Satisfaction</div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ===== SERVICES SECTION ===== -->
    <section id="services" class="section-padding" style="background: rgba(11, 15, 25, 0.5);">
      <v-container>
        <div class="text-center mb-10">
          <h2 class="section-title">Our <span class="glow-text">Services</span></h2>
          <p class="section-subtitle">
            From concept to launch, we offer end-to-end digital services 
            crafted to elevate your brand and drive results.
          </p>
        </div>

        <v-row>
          <v-col
            v-for="service in store.services"
            :key="service.id"
            cols="12"
            sm="6"
            lg="4"
          >
            <ServiceCard :service="service" />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ===== WHY WORK WITH US ===== -->
    <section class="section-padding">
      <v-container>
        <div class="text-center mb-10">
          <h2 class="section-title">Why <span class="glow-text">Work With Us</span></h2>
          <p class="section-subtitle">
            We combine premium quality with seamless collaboration.
          </p>
        </div>

        <v-row>
          <v-col v-for="item in whyUs" :key="item.title" cols="12" sm="6" md="3">
            <v-card class="glass-card pa-6 text-center" height="100%">
              <div class="icon-wrapper mx-auto mb-4">
                <v-icon size="28" color="primary">{{ item.icon }}</v-icon>
              </div>
              <div class="text-h6 font-weight-bold mb-2">{{ item.title }}</div>
              <p class="text-body-2 text-medium-emphasis" style="line-height: 1.7;">
                {{ item.description }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ===== CTA SECTION ===== -->
    <section class="section-padding" style="background: rgba(11, 15, 25, 0.5);">
      <v-container>
        <v-card class="form-glass pa-10 text-center" style="max-width: 700px; margin: 0 auto;">
          <h2 class="text-h3 font-weight-bold mb-4">
            Ready to <span class="glow-text">Get Started</span>?
          </h2>
          <p class="text-body-1 text-medium-emphasis mb-6" style="max-width: 480px; margin: 0 auto 24px;">
            Whether you need a project built or want to join our talent network, 
            we're here to make it happen.
          </p>
          <div class="d-flex flex-wrap justify-center ga-4">
            <v-btn to="/#services" class="gradient-btn px-8" size="large">
              Hire Us
            </v-btn>
            <v-btn to="/join" class="gradient-btn-outline px-8" size="large">
              Apply as Talent
            </v-btn>
          </div>
        </v-card>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import { useAgencyStore } from '@/stores/agencyStore'
import ServiceCard from '@/components/client/ServiceCard.vue'

const store = useAgencyStore()

const whyUs = [
  {
    icon: 'mdi-shield-star',
    title: 'Premium Quality',
    description: 'Every project is crafted with meticulous attention to detail and industry best practices.',
  },
  {
    icon: 'mdi-lightning-bolt',
    title: 'Fast Turnaround',
    description: 'We deliver results on time, every time, without compromising on quality.',
  },
  {
    icon: 'mdi-headset',
    title: 'Seamless Communication',
    description: 'Dedicated project managers keep you informed at every stage of development.',
  },
  {
    icon: 'mdi-account-group',
    title: 'Elite Talent Network',
    description: 'Access a curated team of top-tier designers, developers, and strategists.',
  },
]

function scrollToServices() {
  const el = document.getElementById('services')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.icon-wrapper {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(108, 99, 255, 0.1);
  border-radius: 14px;
  border: 1px solid rgba(108, 99, 255, 0.15);
}
</style>