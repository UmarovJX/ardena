<template>
  <section class="main">
    <IntroSlider
      :sliders="home['slider']"
      :formDescription="home['cost_calculation_description']"
      :formNotes="home['cost_calculation_note']"
      :shippingTypes="shippingTypes"
    />

    <MainMouse/>

    <div class="rectangle__bg">
      <!--      <MainForm-->
      <!--        :formDescription="home['cost_calculation_description']"-->
      <!--        :formNotes="home['cost_calculation_note']"-->
      <!--        :shippingTypes="shippingTypes"-->
      <!--      />-->

      <MainAboutCompany
        :aboutDescription="home['about_1_description']"
        :aboutImage="home['about_1_image']"
      />

      <MainServices
        :servicesDescription="home['services_description']"
        :services="services"
      />

      <MainMoto
        :motoDescription="home['about_2_description']"
        :motoImage="home['about_2_image']"
      />

      <MainAdvantages
        :advantagesDescription="home['advantages_description']"
        :advantages="home['advantages']"
      />

      <MainStatistics
        :statistics="home['statistics']"
      />

      <MainCallback
        :callback="propSendData"
      />

    </div>

  </section>
</template>

<script>
import IntroSlider from "~/components/main-page/IntroSliders";
import MainMouse from "~/components/main-page/MainMouse";
import MainAboutCompany from "~/components/main-page/MainAboutCompany";
import MainServices from "~/components/main-page/MainServices";
import MainMoto from "@/components/main-page/MainMoto";
import MainAdvantages from "@/components/main-page/MainAdvantages";
import MainForm from "@/components/main-page/MainForm";
import MainCallback from "@/components/main-page/MainCallback";
import MainStatistics from "~/components/main-page/MainStatistics";
import {getPropertyLang} from "~/utils/getPropertyLang";
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  name: 'MainPage',
  layout: 'AppLayout',
  components: {
    MainCallback,
    MainForm,
    MainAdvantages,
    MainServices,
    MainAboutCompany,
    MainMouse,
    IntroSlider,
    MainMoto,
    MainStatistics
  },

  async asyncData({$axios}) {
    const fetchHome = async () => {
      try {
        return await $axios('website/section/home')
      } catch (e) {
        return Promise.reject(e)
      }
    }

    // const fetchServices = async () => {
    //   try {
    //     return $axios('website/company/service')
    //   } catch (e) {
    //     return Promise.reject(e)
    //   }
    // }

    const fetchShippingTypes = async () => {
      try {
        return $axios('website/company/shipping-type?page-size=50&page=1')
      } catch (e) {
        return Promise.reject(e)
      }
    }

    const [homeFullFilled, shippingFullFilled] = //servicesFullFilled
      await Promise.allSettled([fetchHome(), fetchShippingTypes()]) //fetchServices()])
    let propSendData = {}
    let shippingFullFilledData = {}
    let homeFullFilledData = {}
    // let servicesFullFilledData = {}


    if (homeFullFilled && homeFullFilled.value && homeFullFilled.value.data) {
      const {
        contact_address,
        contact_description,
        contact_email,
        contact_phones,
        contact_map
      } = homeFullFilled.value.data
      propSendData = {
        contact_address,
        contact_description,
        contact_email,
        contact_phones,
        contact_map
      }
      homeFullFilledData = homeFullFilled.value.data
    }

    if (shippingFullFilled && shippingFullFilled.value && shippingFullFilled.value.data) {
      shippingFullFilledData = shippingFullFilled.value.data.data
    }
    // if (servicesFullFilled && servicesFullFilled.value && servicesFullFilled.value.data) {
    //   servicesFullFilledData = servicesFullFilled.value.data.data
    // }

    return {
      propSendData,
      home: homeFullFilledData,
      shippingTypes: shippingFullFilledData,
      // services: servicesFullFilledData,
    }
  },

  head() {
    let seo = this.home.seo_meta_as_array.head[this.currentLang]
    const meta = seo.map(item => {
      return {
        hid: item.name,
        name: item.name,
        content: item.content
      }
    })
    return {
      title: this.settings.project_name,
      link: [{
        rel: 'icon', type: 'image/x-icon', href: this.settings.favicon
      }],
      meta: meta
    }
  },

  data() {
    return {
      services: []
    }
  },

  async mounted() {
    await this.getAllServices()
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
    async getAllServices() {
      await this.$axios.get('website/company/service')
        .then(res => {
          this.services = res.data.data
        })
        .catch(error => {
          console.error(error)
        })
    },

    getPropertyLang,
  }

}
</script>

<style lang="scss" scoped>

.main {
  overflow: hidden;
}

.main__mouse-bg {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 999;
}

.rectangle__bg {
  background-image: url("../assets/img/rectangle.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: 70px;
  background-color: #00375B;
}

</style>
