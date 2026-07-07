import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          background: '#0B0F19',
          surface: '#1E293B',
          primary: '#6C63FF',
          secondary: '#00D4AA',
          accent: '#FF6B6B',
          error: '#FF5252',
          info: '#4FC3F7',
          success: '#00D4AA',
          warning: '#FFB74D',
          'on-background': '#E2E8F0',
          'on-surface': '#E2E8F0',
          'on-primary': '#FFFFFF',
          'on-secondary': '#0B0F19',
        },
      },
    },
  },
  defaults: {
    VCard: {
      elevation: 0,
      rounded: 'lg',
    },
    VBtn: {
      rounded: 'pill',
      elevation: 0,
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
    },
    VTextarea: {
      variant: 'outlined',
      density: 'comfortable',
    },
  },
})