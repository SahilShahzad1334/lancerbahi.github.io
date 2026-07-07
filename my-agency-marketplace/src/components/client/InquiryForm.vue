<template>
  <v-card class="form-glass pa-8">
    <div class="text-h5 font-weight-bold mb-1">Get a Custom Quote</div>
    <p class="text-body-2 text-medium-emphasis mb-6">
      Tell us about your project and we'll provide a tailored estimate.
    </p>

    <v-form ref="formRef" v-model="valid" @submit.prevent="handleSubmit">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.name"
            label="Full Name"
            placeholder="John Doe"
            :rules="[rules.required]"
            variant="outlined"
            hide-details="auto"
            class="mb-4"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.email"
            label="Email Address"
            placeholder="john@example.com"
            :rules="[rules.required, rules.email]"
            variant="outlined"
            hide-details="auto"
            class="mb-4"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-select
            v-model="form.service"
            :items="serviceOptions"
            label="Service Needed"
            placeholder="Select a service"
            :rules="[rules.required]"
            variant="outlined"
            hide-details="auto"
            class="mb-4"
          ></v-select>
        </v-col>

        <v-col cols="12" sm="6">
          <v-select
            v-model="form.budget"
            :items="budgetOptions"
            label="Budget Range"
            placeholder="Select budget"
            :rules="[rules.required]"
            variant="outlined"
            hide-details="auto"
            class="mb-4"
          ></v-select>
        </v-col>

        <v-col cols="12">
          <v-textarea
            v-model="form.description"
            label="Project Description"
            placeholder="Describe your project, goals, and any specific requirements..."
            :rules="[rules.required]"
            variant="outlined"
            hide-details="auto"
            rows="4"
            class="mb-4"
          ></v-textarea>
        </v-col>
      </v-row>

      <v-alert
        v-if="submitted"
        type="success"
        variant="tonal"
        class="mb-4"
        closable
        @click:close="submitted = false"
      >
        Thank you! Your inquiry has been received. We'll get back to you within 24 hours.
      </v-alert>

      <v-btn
        type="submit"
        class="gradient-btn"
        size="large"
        block
        :loading="loading"
        :disabled="loading"
      >
        Submit Inquiry
        <v-icon end size="18">mdi-send</v-icon>
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useAgencyStore } from '@/stores/agencyStore'

const store = useAgencyStore()
const formRef = ref(null)
const valid = ref(false)
const loading = ref(false)
const submitted = ref(false)

const form = reactive({
  name: '',
  email: '',
  service: null,
  budget: null,
  description: '',
})

const serviceOptions = computed(() =>
  store.services.map((s) => ({ title: s.title, value: s.title }))
)

const budgetOptions = [
  { title: 'Under $500', value: 'Under $500' },
  { title: '$500 - $1,000', value: '$500 - $1,000' },
  { title: '$1,000 - $3,000', value: '$1,000 - $3,000' },
  { title: '$3,000 - $10,000', value: '$3,000 - $10,000' },
  { title: '$10,000+', value: '$10,000+' },
]

const rules = {
  required: (v) => !!v || 'This field is required',
  email: (v) => /.+@.+\..+/.test(v) || 'Please enter a valid email',
}

async function handleSubmit() {
  const { valid: isValid } = await formRef.value.validate()
  if (!isValid) return

  loading.value = true

  // Simulate API call
  setTimeout(() => {
    store.addInquiry({ ...form })
    loading.value = false
    submitted.value = true
    resetForm()
  }, 1000)
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.service = null
  form.budget = null
  form.description = ''
  formRef.value.resetValidation()
}
</script>