<template>
  <section class="contacts pages__rectangle-bg">
    <div class="contacts__intro-img pages__intro-img">
      <!--      <img :src="topImage" alt="">-->
    </div>

    <div class="container">

      <b-breadcrumb
        data-aos="fade-right"
        :items="breadcrumbItems"
      >
      </b-breadcrumb>

      <MainCallback
        :callback="callback"
      />

    </div>
  </section>
</template>

<script>
import {getPropertyLang} from "~/utils/getPropertyLang";
import AOS from 'aos'
import 'aos/dist/aos.css'
import MainCallback from "~/components/main-page/MainCallback";

export default {
  name: "Contacts",
  layout: 'AppLayout',
  components: {MainCallback},

  async asyncData({$axios}) {
    let contactsSeo = {}
    let callback = {}

    await $axios('website/section/home')
      .then((response) => {
        contactsSeo = response.data.seo_meta_as_array.head
        callback.contact_address = response.data.contact_address
        callback.contact_description = response.data.contact_description
        callback.contact_email = response.data.contact_email
        callback.contact_map = response.data.contact_map
        callback.contact_phones = response.data.contact_phones

      }).catch((err) => {
        console.error(err)
      })
    return {contactsSeo, callback}
  },

  head() {
    let seo = this.contactsSeo[this.currentLang]
    const meta = seo.map(item => {
      return {
        hid: item.name,
        name: item.name,
        content: item.content
      }
    })
    return {
      title: `ARDENA - ${this.$t('titles.contacts')}`,
      link: [{
        rel: 'icon', type: 'image/x-icon', href: this.settings.favicon
      }],
      meta: meta
    }
  },

  data() {
    return {
      breadcrumbItems: [
        {
          text: this.$t('reusable.main'),
          to: `/${this.$i18n.locale}`
        },
        {
          text: this.$t('titles.contacts'),
          to: `/${this.$i18n.locale}/contacts`,
          active: true
        },
      ],
    }
  },

  mounted() {
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
    getPropertyLang,
  }
}
</script>

<style lang="scss" scoped>

.pages__intro-img {
  height: 0;
}

.breadcrumb {
  padding-top: 40px;
}

.main__callback {
  padding: 50px 0 50px;
}

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
  .pages__intro-img {
    height: 0;
    margin: 0;
  }

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
