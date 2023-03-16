<template>
  <section class="faq pages__rectangle-bg">
    <div class="faq__intro-img pages__intro-img">
      <img :src="topImage" alt="">
    </div>

    <div class="container">

      <b-breadcrumb
        data-aos="fade-right"
        :items="breadcrumbItems"
      >
      </b-breadcrumb>

      <h2
        data-aos="fade-right"
        class="faq__title pages__title title"
      >
        {{ $t('titles.faq') }}
      </h2>

      <p
        data-aos="fade-right"
        class="faq__subtitle pages__subtitle"
        v-html="getPropertyLang(faqSubtitle)"
      ></p>

      <div
        data-aos="fade-up"
        class="accordion"
        role="tablist"
      >
        <b-card
          no-body
          class="mb-1 accordion__card mb-5"
          v-for="faq in faqs"
          :key="faq.id"
        >
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
              block
              v-b-toggle="`accordion-${faq.id}`"
              variant="info"
              class="accordion__card-title"
            >
              <span
                v-html="getPropertyLang(faq.question)"
              ></span>
              <img src="~/assets/img/accordion-arrow1.svg" alt="">
            </b-button>
          </b-card-header>
          <b-collapse :id="`accordion-${faq.id}`" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text
                class="accordion__card-text"
                v-html="getPropertyLang(faq['answer'])"
              >
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>

    </div>
  </section>
</template>

<script>
import {getPropertyLang} from "~/utils/getPropertyLang";
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  name: "Faq",
  layout: 'AppLayout',

  async asyncData({$axios}) {
    let topImage = null
    let faqSubtitle = {}
    let faqSeo = {}

    await $axios('website/section/faq')
      .then((response) => {
        faqSubtitle = response.data.information_description
        faqSeo = response.data.seo_meta_as_array.head
        topImage = response.data.information_top_image.original
      }).catch((err) => {
        console.error(err)
        faqSubtitle = {}
      })
    return {faqSubtitle, faqSeo, topImage} // faqs
  },

  head() {
    let seo = this.faqSeo[this.currentLang]
    const meta = seo.map(item => {
      return {
        hid: item.name,
        name: item.name,
        content: item.content
      }
    })
    return {
      title: `ARDENA - ${this.$t('titles.faq')}`,
      link: [{
        rel: 'icon', type: 'image/x-icon', href: this.settings.favicon
      }],
      meta: meta
    }
  },

  data() {
    return {
      faqs: [],
      breadcrumbItems: [
        {
          text: this.$t('reusable.main'),
          to: `/${this.$i18n.locale}`
        },
        {
          text: 'FAQ',
          to: `/${this.$i18n.locale}/faq`,
          active: true
        },
      ],
    }
  },

  async mounted() {
    await this.getAllFaqs()
    AOS.init({})
  },

  created() {
    this.settings = this.$store.getters.getSettings
  },

  computed: {
    currentLang() {
      return this.$i18n.locale
    },
  },

  methods: {
    async getAllFaqs() {
      await this.$axios.get('website/company/faq')
        .then(res => {
          this.faqs = res.data.data
        })
        .catch(err => {
          console.error(err)
        })
    },

    getPropertyLang,
  }
}
</script>

<style lang="scss" scoped>

.accordion {
  margin-top: 50px;

  &__card {
    padding: 20px 40px 0;
    background-color: #002238;
    border: none;
    border-radius: 0;
    position: relative;

    &::after {
      content: '';
      width: 100%;
      height: 5px;
      background-color: #F58B31;
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translateY(100%);
    }

    & .card-header {
      border: none;
      background-color: transparent;
      position: relative;
      padding: 0 0 20px 0 !important;

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        background-color: #F58B31;
        left: 0;
        bottom: 0;
        transform: translateY(100%);
      }
    }

    & .card-body {
      padding: 30px 0;
    }

    &-title {
      width: 100%;
      text-align: left;
      background-color: transparent;
      color: #F58B31;
      border: none;
      font-weight: 700;
      font-size: 20px;
      line-height: 27px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0;

      & img {
        transition: .3s;
      }

      &:hover {
        background-color: transparent;
        color: #F58B31;
      }

      &.not-collapsed > img {
        transform: rotate(180deg);
      }

      &:focus {
        box-shadow: none;
      }
    }

    &-text {
      font-size: 16px;
      line-height: 21px;
      text-align: justify;
      color: #D9D9D9;
    }
  }
}

@media only screen and (max-width: 767px) {

  .accordion {
    &__card {
      &-title {
        font-size: 17px;
        line-height: 22px;
      }
    }
  }
}

@media only screen and (max-width: 575px) {

  .accordion {
    &__card {
      padding: 20px 20px 0;

      &-title {
        font-size: 14px;
        line-height: 21px;
      }

      &-text {
        font-size: 14px;
      }
    }
  }

}

</style>
