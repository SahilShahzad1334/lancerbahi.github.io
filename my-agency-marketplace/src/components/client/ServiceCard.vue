<template>
  <v-card class="glass-card pa-6 d-flex flex-column" height="100%">
    <div class="d-flex align-center mb-4">
      <div class="icon-wrapper mr-4">
        <v-icon size="32" color="primary">{{ service.icon }}</v-icon>
      </div>
      <div>
        <div class="text-h6 font-weight-bold">{{ service.title }}</div>
        <div class="text-caption text-medium-emphasis">Starting at ${{ service.startingPrice }}</div>
      </div>
    </div>

    <p class="text-body-2 text-medium-emphasis mb-6 flex-grow-1" style="line-height: 1.7;">
      {{ service.shortDescription }}
    </p>

    <div class="d-flex ga-2">
      <v-btn
        :to="`/services/${service.id}`"
        class="gradient-btn flex-grow-1"
        size="small"
      >
        Inquire Now
        <v-icon end size="14">mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
defineProps({
  service: {
    type: Object,
    required: true,
  },
})
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