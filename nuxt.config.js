export default {
  server: {
    port: 9876
  },

  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Ardena',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon.png'},
      {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon.png'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/i18n.js'},
    {src: '@/plugins/vue-awesome-swiper.js', mode: 'client'},
    {src: '~/plugins/ymapPlugin.js', mode: 'client'},
    '@plugins/v-mask.js',
    {src: '@/plugins/countUp.js', ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',

    '@nuxtjs/i18n'
  ],

  i18n: {
    /* module options */
    baseUrl: 'https://api.ardena.uz/',
    defaultLocale: 'ru',
    strategy: 'prefix',
    locales: [
      {
        code: 'en',
        name: 'En',
        file: 'en.js'
      },
      {
        code: 'ru',
        name: 'RU',
        file: 'ru.js'
      }
    ],
    langDir: 'lang',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome'
        },
        ru: {
          welcome: 'Добро пожаловать'
        }
      }
    }
  },

  env: {
    baseURL: process.env.VUE_APP_URL_BASE_URL
  },
  axios: {
    baseURL: process.env.VUE_APP_URL_BASE_URL
  }

}
