import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAgencyStore = defineStore('agency', () => {
  // --- Services Data ---
  const services = ref([
    {
      id: 'web-development',
      title: 'Web Development',
      icon: 'mdi-code-tags',
      description: 'Custom websites, web apps, and e-commerce solutions built with cutting-edge technologies.',
      shortDescription: 'Custom websites & web apps',
      startingPrice: 499,
      tiers: [
        { name: 'Basic', price: 499, features: ['5-page responsive website', 'Basic SEO setup', 'Contact form integration', '1 month support'] },
        { name: 'Standard', price: 1499, features: ['10-page dynamic website', 'CMS integration', 'Advanced SEO', 'API integrations', '3 months support'] },
        { name: 'Premium', price: 3999, features: ['Full-stack web application', 'Custom database design', 'Admin dashboard', 'Third-party integrations', '12 months support', 'Dedicated project manager'] },
      ],
    },
    {
      id: 'graphic-design',
      title: 'Graphic Design',
      icon: 'mdi-palette',
      description: 'Stunning visual identities, branding materials, and creative assets that captivate audiences.',
      shortDescription: 'Branding & visual identity',
      startingPrice: 299,
      tiers: [
        { name: 'Basic', price: 299, features: ['Logo design (3 concepts)', 'Business card design', 'Social media kit', '2 revisions'] },
        { name: 'Standard', price: 799, features: ['Complete brand identity', 'Logo + variations', 'Brand guidelines PDF', 'Stationery set', 'Social media templates', '5 revisions'] },
        { name: 'Premium', price: 1999, features: ['Full brand ecosystem', 'Custom illustrations', 'Packaging design', 'Brand guidelines', 'Marketing collateral', 'Unlimited revisions'] },
      ],
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      icon: 'mdi-monitor-dashboard',
      description: 'Intuitive, user-centered interfaces that drive engagement and conversion.',
      shortDescription: 'User-centered interface design',
      startingPrice: 599,
      tiers: [
        { name: 'Basic', price: 599, features: ['UI audit & recommendations', '3 key screens design', 'Wireframes', '1 round of revisions'] },
        { name: 'Standard', price: 1499, features: ['Full app/site redesign', 'User flow mapping', 'Interactive prototype', 'Design system', '3 rounds of revisions'] },
        { name: 'Premium', price: 3499, features: ['Complete product design', 'User research & testing', 'Full interactive prototype', 'Comprehensive design system', 'Developer handoff', '6 months support'] },
      ],
    },
    {
      id: 'content-writing',
      title: 'Content Writing',
      icon: 'mdi-pencil-ruler',
      description: 'Compelling copy that tells your story, engages your audience, and drives action.',
      shortDescription: 'Compelling copy & content',
      startingPrice: 199,
      tiers: [
        { name: 'Basic', price: 199, features: ['1 blog post (1000 words)', 'SEO keyword research', 'Meta description', '1 revision'] },
        { name: 'Standard', price: 599, features: ['5 blog posts', 'Content strategy', 'SEO optimization', 'Social media captions', '3 revisions'] },
        { name: 'Premium', price: 1499, features: ['10 premium articles', 'Full content strategy', 'Email newsletter copy', 'Landing page copy', 'Brand voice guide', 'Unlimited revisions'] },
      ],
    },
    {
      id: 'seo-optimization',
      title: 'SEO Optimization',
      icon: 'mdi-chart-line',
      description: 'Data-driven SEO strategies to boost your rankings, traffic, and online visibility.',
      shortDescription: 'Boost rankings & traffic',
      startingPrice: 399,
      tiers: [
        { name: 'Basic', price: 399, features: ['SEO audit report', 'Keyword research', 'On-page optimization', 'Monthly report'] },
        { name: 'Standard', price: 999, features: ['Technical SEO', 'Content optimization', 'Link building (10/mo)', 'Google Analytics setup', 'Bi-weekly reports'] },
        { name: 'Premium', price: 2499, features: ['Full SEO campaign', 'Competitor analysis', 'Content strategy', 'Advanced link building', 'Weekly reports', 'Dedicated SEO manager'] },
      ],
    },
  ])

  // --- Inquiries (Client Form Submissions) ---
  const inquiries = ref([])

  function addInquiry(inquiry) {
    inquiries.value.push({
      ...inquiry,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    })
    saveToLocalStorage()
  }

  // --- Applications (Talent Form Submissions) ---
  const applications = ref([])

  function addApplication(application) {
    applications.value.push({
      ...application,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    })
    saveToLocalStorage()
  }

  // --- Local Storage Persistence ---
  function saveToLocalStorage() {
    try {
      localStorage.setItem('agency-inquiries', JSON.stringify(inquiries.value))
      localStorage.setItem('agency-applications', JSON.stringify(applications.value))
    } catch (e) {
      console.warn('Failed to save to localStorage:', e)
    }
  }

  function loadFromLocalStorage() {
    try {
      const savedInquiries = localStorage.getItem('agency-inquiries')
      const savedApplications = localStorage.getItem('agency-applications')
      if (savedInquiries) inquiries.value = JSON.parse(savedInquiries)
      if (savedApplications) applications.value = JSON.parse(savedApplications)
    } catch (e) {
      console.warn('Failed to load from localStorage:', e)
    }
  }

  // Load saved data on initialization
  loadFromLocalStorage()

  // --- Computed ---
  const totalInquiries = computed(() => inquiries.value.length)
  const totalApplications = computed(() => applications.value.length)

  function getServiceById(id) {
    return services.value.find((s) => s.id === id)
  }

  return {
    services,
    inquiries,
    applications,
    totalInquiries,
    totalApplications,
    addInquiry,
    addApplication,
    getServiceById,
  }
})