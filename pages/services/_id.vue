<template>
  <section class="services pages__rectangle-bg">
    <div class="news__belt-img pages__intro-img">
      <img :src="topImage" alt="">
    </div>

    <div class="container">
      <div class="d-flex align-items-end justify-content-end justify-content-sm-between mb-5">
        <b-breadcrumb
          data-aos="fade-right"
          :items="breadcrumbItems"
        >
        </b-breadcrumb>

<!--        @click="$router.go(-1)"-->
        <NuxtLink
          data-aos="fade-right"
          :to="`/${this.$i18n.locale}/services`"
          class="services__back-btn float-right"
        >
          <span><</span> {{ $t('reusable.all_services_btn') }}
        </NuxtLink>
      </div>


      <!--      <h2-->
      <!--        data-aos="fade-right"-->
      <!--        class="services__title pages__title title"-->
      <!--      >-->
      <!--        {{ $t('titles.services') }}-->
      <!--      </h2>-->

      <div class="services__content">
        <div
          data-aos="fade-right"
          class="services__content-img"
        >
          <img :src="serviceData.image.original" alt="">
        </div>
        <h3
          data-aos="fade-right"
          class="services__content-title"
          v-html="getPropertyLang(serviceData.name)"
        >
        </h3>
        <div
          data-aos="fade-right"
          class="services__content-text"
          v-html="getPropertyLang(serviceData.description)"
        ></div>
      </div>

    </div>

  </section>
</template>

<script>
import {getPropertyLang} from "~/utils/getPropertyLang";
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  name: "Services",
  layout: 'AppLayout',


  async asyncData({params, $axios}) {
    let serviceId = params.id
    let serviceData = {}
    let services = []
    let servicesSubtitle = {}
    let topImage = null

    await $axios('website/company/service')
      .then((response) => {
        services = response.data.data.reverse()
      }).catch((err) => {
        console.error(err)
        services = []
      })

    if (!serviceId) {
      serviceId = services[0].id
    }

    await $axios(`website/company/service/${serviceId}`)
      .then((response) => {
        serviceData = response.data
      }).catch((err) => {
        console.error(err)
        serviceData = {}
      })

    await $axios('website/section/services')
      .then((response) => {
        servicesSubtitle = response.data.information_description
        topImage = response.data.information_top_image.original
      })
      .catch((err) => {
        console.error(err)
        servicesSubtitle = {}
      })

    return {services, serviceId, serviceData, servicesSubtitle, topImage}
  },

  head() {
    let seo = this.serviceData.seo_meta_as_array.head[this.currentLang]
    const meta = seo.map(item => {
      return {
        hid: item.name,
        name: item.name,
        content: item.content
      }
    })
    return {
      title: `ARDENA - ${this.serviceData.name[this.currentLang]}`,
      link: [{
        rel: 'icon', type: 'image/x-icon', href: this.settings.favicon
      }],
      meta: meta
    }
  },

  mounted() {
    AOS.init()
  },

  created() {
    this.settings = this.$store.getters.getSettings

    this.breadcrumbItems[2].text = this.getPropertyLang(this.serviceData.name)
  },

  data() {
    return {
      breadcrumbItems: [
        {
          text: this.$t('reusable.main'),
          to: `/${this.$i18n.locale}`
        },
        {
          text: this.$t('titles.services'),
          to: `/${this.$i18n.locale}/services`,
        },
        {
          text: this.$t('titles.services'),
          to: `/${this.$i18n.locale}/services`,
          active: true
        },
      ],
    }
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

.services__back-btn {
  display: inline-block;
  align-items: center;
  color: #D9D9D9;
  padding: 10px 1.5rem;
  background-color: #002238;
  margin-top: 30px;
  border-radius: .5rem;
  border: none;
}

.services {
  &__block {
    margin-top: 50px;
    margin-bottom: 140px;

    .active {
      transform: scale(1.1);
      background-color: #ffcea5;

      & span {
        color: #F58B31;
      }
    }

    &-btn {
      display: flex;
      align-items: center;
      background-color: #002238;
      padding: 10px 10px 13px 10px;
      position: relative;
      transition: .3s;

      &:hover {
        transform: scale(1.1);
        background-color: #ffcea5;

        & span {
          color: #F58B31;
        }
      }

      &::before {
        content: '';
        width: 10px;
        height: 20px;
        background-color: #F58B31;
        position: absolute;
        top: 100%;
        left: 100%;
        transform: translateY(-50%);
      }

      &::after {
        content: '';
        width: 20px;
        height: 10px;
        background-color: #F58B31;
        position: absolute;
        top: 100%;
        left: 100%;
        transform: translateX(-50%);
      }

      &-img {
        position: relative;
        width: 46px;
        height: 46px;

        &::after {
          content: '';
          position: absolute;
          border: 1px solid #F58B31;
          left: 4px;
          top: 4px;
          width: 100%;
          height: 100%;
          display: block;
          z-index: 0;
        }
      }

      & img {
        position: relative;
        width: 46px;
        height: 46px;
        object-fit: cover;
        object-position: center;
        z-index: 12;
      }

      & span {
        position: relative;
        margin-bottom: 0;
        padding-left: 24px;
        font-weight: 700;
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;
        color: #D9D9D9;

        &::before {
          content: '';
          width: 1px;
          height: 30px;
          background-color: #F58B31;
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }

  &__content {
    padding: 40px;
    background-color: #002238;

    &-img {
      position: relative;

      & img {
        width: 84px;
        height: 84px;
        object-fit: cover;
        object-position: center;
      }
    }

    &-title {
      position: relative;
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      color: #D9D9D9;
      margin: 30px 0;
      padding-bottom: 20px;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 100%;
        width: 40px;
        height: 3px;
        background-color: #F58B31;
      }
    }

    &-text {
      font-size: 16px;
      line-height: 21px;
      color: #D9D9D9;
      text-align: justify;
      gap: 8px;
      display: flex;
      flex-direction: column;
    }
  }
}

@media only screen and (max-width: 991px) {

  .services__block {
    margin-bottom: 100px;
  }

}

@media only screen and (max-width: 767px) {

  .breadcrumb {
    width: 75%;
  }

}

@media only screen and (max-width: 575px) {

  .services__block {
    margin-bottom: 60px;
  }

}

</style>
