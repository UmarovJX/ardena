<template>
  <section class="news__show pages__rectangle-bg">
    <div class="news__show-belt-img pages__intro-img">
      <img :src="topImage" alt="">
    </div>

    <div class="container">
      <b-breadcrumb
        data-aos="fade-right"
        :items="breadcrumbItems"
      >
      </b-breadcrumb>
      <button
        data-aos="fade-right"
        @click="$router.go(-1)"
        class="back__btn"
      >
        <span><</span> {{ $t('reusable.back') }}
      </button>

      <h2
        data-aos="fade-right"
        class="news__show-title pages__title title"
        v-html="getPropertyLang(newData.name)"
      >
      </h2>

      <p
        data-aos="fade-right"
        class="news__show-subtitle pages__subtitle"
        v-html="newData.published_at"
      >
      </p>

      <div
        data-aos="fade-up"
        class="news__show-img"
      >
        <img :src="newData.image_preview.original" alt="">
      </div>

      <div class="news__show-info">
        <p
          data-aos="fade-right"
          class="news__show-info-text"
          v-html="getPropertyLang(newData.full_description)"
        ></p>
      </div>

    </div>

  </section>
</template>

<script>
import {getPropertyLang} from "~/utils/getPropertyLang";
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  layout: 'AppLayout',

  async asyncData({params, $axios}) {
    const {slug} = params
    let newData = {}
    let topImage = null
    await $axios(`website/news/news/${slug}`)
      .then((response) => {
        newData = response.data
      }).catch((err) => {
        console.error(err)
        newData = {}
      })

    await $axios('website/section/news')
      .then((response) => {
        topImage = response.data.information_top_image.original
      })
      .catch((err) => {
        console.error(err)
      })
    return {newData, topImage}
  },

  head() {
    let seo = this.newData.seo_meta_as_array.head[this.currentLang]
    const meta = seo.map(item => {
      return {
        hid: item.name,
        name: item.name,
        content: item.content
      }
    })
    return {
      title: `ARDENA - ${this.newData.name[this.currentLang]}`,
      link: [{
        rel: 'icon', type: 'image/x-icon', href: this.settings.favicon
      }],
      meta: meta
    }
  },

  data() {
    return {
      nameForBreadCrumb: {},
      breadcrumbItems: [
        {
          text: this.$t('reusable.main'),
          to: `/${this.$i18n.locale}`
        },
        {
          text: this.$t('titles.news'),
          to: `/${this.$i18n.locale}/news`
        },
        {
          text: "",
          to: "",
          active: true
        }
      ]
    }
  },

  mounted() {
    AOS.init({})
  },

  created() {
    this.settings = this.$store.getters.getSettings

    this.breadcrumbItems[2].text = this.getPropertyLang(this.newData.name)
  },

  computed: {
    currentLang() {
      return this.$i18n.locale
    },
  },

  methods: {
    getPropertyLang,
  }
}
</script>

<style lang="scss" scoped>

.back__btn {
  border: 0;
}

.news__show {

  &-img {
    height: 350px;
    overflow: hidden;
    margin: 50px 0 40px;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-info-text {
    font-size: 24px;
    line-height: 32px;
    text-align: justify;
    color: #D9D9D9;

    & div {
      display: block;
      margin-bottom: 20px;
    }
  }
}

@media only screen and (max-width: 991px) {

  .news__show {

    &-img {
      height: 300px;
      margin: 30px 0 40px;
    }

    &-info p {
      font-size: 20px;
    }
  }
}

@media only screen and (max-width: 575px) {

  .news__show {

    &-info p {
      font-size: 16px;
    }
  }

}

</style>
