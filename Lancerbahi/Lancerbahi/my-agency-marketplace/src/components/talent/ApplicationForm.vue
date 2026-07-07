<template>
  <v-card class="form-glass pa-8">
    <div class="d-flex align-center mb-4">
      <div class="icon-wrapper mr-4">
        <v-icon size="28" color="primary">mdi-account-plus</v-icon>
      </div>
      <div>
        <div class="text-h5 font-weight-bold">Apply to Join Our Team</div>
        <p class="text-body-2 text-medium-emphasis">
          Show us your portfolio and tell us why you'd be a great fit.
        </p>
      </div>
    </div>

    <v-form ref="formRef" v-model="valid" @submit.prevent="handleSubmit">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.name"
            label="Full Name"
            placeholder="Jane Doe"
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
            placeholder="jane@example.com"
            :rules="[rules.required, rules.email]"
            variant="outlined"
            hide-details="auto"
            class="mb-4"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-select
            v-model="form.skill"
            :items="skillOptions"
            label="Primary Skill"
            placeholder="Select your primary skill"
            :rules="[rules.required]"
            variant="outlined"
            hide-details="auto"
            class="mb-4"
          ></v-select>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.portfolio"
            label="Portfolio Link"
            placeholder="https://github.com/yourhandle"
            :rules="[rules.required, rules.url]"
            variant="outlined"
            hide-details="auto"
            class="mb-4"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-textarea
            v-model="form.message"
            label="Why do you want to join?"
            placeholder="Tell us about your experience, what you specialize in, and why you'd like to be part of Lancerbahi..."
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
        Application submitted successfully! We'll review your portfolio and get back to you within 48 hours.
      </v-alert>

      <v-btn
        type="submit"
        class="gradient-btn"
        size="large"
        block
        :loading="loading"
        :disabled="loading"
      >
        Submit Application
        <v-icon end size="18">mdi-send</v-icon>
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAgencyStore } from '@/stores/agencyStore'

const store = useAgencyStore()
const formRef = ref(null)
const valid = ref(false)
const loading = ref(false)
const submitted = ref(false)

const form = reactive({
  name: '',
  email: '',
  skill: null,
  portfolio: '',
  message: '',
})

const skillOptions = [
  { title: 'Web Development', value: 'Web Development' },
  { title: 'Graphic Design', value: 'Graphic Design' },
  { title: 'UI/UX Design', value: 'UI/UX Design' },
  { title: 'Content Writing', value: 'Content Writing' },
  { title: 'SEO Optimization', value: 'SEO Optimization' },
  { title: 'Mobile Development', value: 'Mobile Development' },
  { title: 'Video Production', value: 'Video Production' },
  { title: 'Other', value: 'Other' },
]

const rules = {
  required: (v) => !!v || 'This field is required',
  email: (v) => /.+@.+\..+/.test(v) || 'Please enter a valid email',
  url: (v) => {
    if (!v) return 'This field is required'
    try {
      new URL(v)
      return true
    } catch {
      return 'Please enter a valid URL (include https://)'
    }
  },
}

async function handleSubmit() {
  const { valid: isValid } = await formRef.value.validate()
  if (!isValid) return

  loading.value = true

  // Simulate API call
  setTimeout(() => {
    store.addApplication({ ...form })
    loading.value = false
    submitted.value = true
    resetForm()
  }, 1000)
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.skill = null
  form.portfolio = ''
  form.message = ''
  formRef.value.resetValidation()
}
</script>

<style scoped>
.icon-wrapper {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(108, 99, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(108, 99, 255, 0.15);
  flex-shrink: 0;
}
</style>