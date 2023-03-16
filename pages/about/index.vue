<template>
  <section class="about pages__rectangle-bg">
    <div class="about__intro-img pages__intro-img">
      <!--      <img src="~/assets/img/about-intro-bg.svg" alt="">-->
      <img :src="about.information_top_image.original" alt="">
    </div>

    <div class="container">

      <b-breadcrumb
        data-aos="fade-right"
        :items="breadcrumbItems"
      >
      </b-breadcrumb>

      <div class="about__history">

        <h2
          class="about__title pages__title title"
          data-aos="fade-right"
        >
          {{ $t('titles.about_history') }}
        </h2>

        <div
          v-for="(item, index) in history"
          :key="index"
          :class="item.hClass"
          class="row flex-column flex-md-row about__history-block"
        >
          <div class="col-12 col-md-6">
            <div
              :data-aos="index === 1 ? 'fade-left' : 'fade-right'"
              v-html="getPropertyLang(item.description)"
              class="about__history-description"
            ></div>
          </div>
          <div class="col-12 col-md-6">
            <div
              :data-aos="index === 1 ? 'fade-right' : 'fade-left'"
              class="about__history-img"
            >
              <img :src="item.image.original" alt="">
            </div>
          </div>
        </div>
      </div>

      <div class="about__professionalism">

        <h2
          data-aos="fade-left"
          class="about__title pages__title title about__professionalism-title"
        >{{ $t('titles.about_professionalism') }}
        </h2>

        <div class="row flex-column flex-md-row about__professionalism-block">
          <div class="col-12 col-md-6">
            <div
              data-aos="fade-right"
              v-html="getPropertyLang(about.professionalism_description)"
              class="about__history-description"
            ></div>
          </div>
          <div class="col-12 col-md-6">
            <div
              data-aos="fade-left"
              class="about__professionalism-img"
            >
              <img :src="about.professionalism_image.original" alt="">
            </div>
          </div>
        </div>

      </div>

      <div class="about__control">
        <h2
          data-aos="fade-right"
          class="about__title pages__title title"
        >
          {{ $t('titles.about_control') }}
        </h2>
        <div
          data-aos="fade-up"
          class="about__control-img"
        >
          <img :src="about.quality_control_image.original" alt="">
        </div>
        <div
          data-aos="fade-up"
        >
          <div
            v-html="getPropertyLang(about.quality_control_description)"
            class="about__history-description"
          ></div>
        </div>
      </div>

      <div class="about__reality">
        <h2
          data-aos="fade-left"
          class="about__title pages__title title about__professionalism-title"
        >
          {{ $t('titles.about_reality') }}
        </h2>
        <div
          data-aos="fade-up"
          v-html="getPropertyLang(about.reality_description)"
          class="about__history-description"
        ></div>
      </div>

      <div class="about__employees">
        <h2
          data-aos="fade-right"
          class="about__title pages__title title"
        >
          {{ $t('titles.about_employees') }}
        </h2>
        <span
          data-aos="fade-up"
          class="about__employees-subtitle"
          v-html="getPropertyLang(about.employees_description)"
        >
        </span>

        <div class="row">
          <div
            v-for="(employee, index) in employees"
            :key="employee.id"
            class="col-12 col-sm-6 col-md-4"
            data-aos="fade-right"
          >
            <div class="about__employees-block">
              <div class="about__employees-img">
                <img :src="employee.image.original" alt="">
              </div>
              <span class="about__employees-position">{{ getPropertyLang(employee.position) }}</span>
              <h3 class="about__employees-name">{{ getPropertyLang(employee.full_name) }}</h3>
              <p class="about__employees-experience">{{ getPropertyLang(employee.experience) }}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script>
import {getPropertyLang} from "~/utils/getPropertyLang";
import AOS from 'aos'
import 'aos/dist/aos.css'
import {createLogger} from "vuex";

export default {
  name: "About",
  layout: 'AppLayout',

  async asyncData({$axios}) {
    const fetchAbout = async () => {
      try {
        return await $axios('website/section/about')
      } catch (e) {
        return Promise.reject(e)
      }
    }

    // const fetchEmployees = async () => {
    //   try {
    //     return await $axios('website/company/employee')
    //   } catch (e) {
    //     return Promise.reject(e)
    //   }
    // }

    const [aboutFullFilled] = //employeesFullFilled
      await Promise.allSettled([fetchAbout()]) //, fetchEmployees()


    return {
      history: aboutFullFilled.value.data.history.map((h, index) => {
        if (index % 2 === 0) {
          return {
            ...h,
            hClass: ''
          }
        }
        return {
          ...h,
          hClass: 'flex-md-row-reverse'
        }
      }),
      about: aboutFullFilled.value.data,
      // employees: employeesFullFilled.value.data.data,
    }
  },

  head() {
    let seo = []
    let meta = []
    if (this.about && this.about.seo_meta_as_array && this.about.seo_meta_as_array.head) {
      seo = this.about.seo_meta_as_array.head[this.currentLang]
      meta = seo.map(item => {
        return {
          hid: item.name,
          name: item.name,
          content: item.content
        }
      })
    }

    return {
      title: `ARDENA - ${this.$t('titles.about')}`,
      link: [{
        rel: 'icon', type: 'image/x-icon', href: this.settings.favicon
      }],
      meta: meta
    }
  },

  data() {
    return {
      employees: [],
      breadcrumbItems: [
        {
          text: this.$t('reusable.main'),
          to: `/${this.$i18n.locale}`
        },
        {
          text: this.$t('titles.about'),
          to: `/${this.$i18n.locale}/about`,
          active: true
        },
      ],
    }
  },

  async mounted() {
    await this.getAllEmployees()
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
    async getAllEmployees() {
      await this.$axios.get('website/company/employee')
        .then(res => {
          this.employees = res.data.data
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

.about {
  overflow: hidden;

  &__history {
    &-block {
      margin-bottom: 100px;
    }

    &-description {
      font-size: 24px;
      line-height: 32px;
      text-align: justify;
      color: #D9D9D9;
      white-space: pre-line;
    }

    &-img {
      height: 600px;

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }

  &__professionalism {
    margin-bottom: 70px;

    &-title {
      text-align: right;

      &::after {
        left: 100%;
        transform: translateX(-100%);
      }
    }

    &-block {
      margin-bottom: 100px;
    }

    &-img {
      height: 850px;

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }

  &__control {
    &-img {
      height: 500px;
      margin-bottom: 100px;

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }

  &__reality {
    margin-bottom: 80px;
  }

  &__employees {
    &-subtitle {
      display: block;
      font-size: 24px;
      line-height: 32px;
      text-align: justify;
      color: #D9D9D9;
      margin-bottom: 60px;
    }

    &-block {
      margin-bottom: 100px;
    }

    &-position {
      font-weight: 700;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      color: #F58B31;
      display: block;
      text-align: center;
      margin-bottom: 0.75rem;
    }

    &-name {
      font-weight: 700;
      font-size: 17px;
      line-height: 16px;
      text-align: center;
      color: #fff;
      margin-bottom: 2rem;
    }

    &-experience {
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      color: #fff;
      white-space: pre-line;
    }

    &-img {
      display: flex;
      align-items: center;
      justify-content: center;
      width: auto;
      margin-bottom: 60px;

      & img {
        height: 230px;
        width: 190px;
        object-fit: cover;
        object-position: center;
      }
    }
  }
}

@media only screen and (max-width: 991px) {
  .about {
    &__history {
      &-description {
        font-size: 18px;
      }

      &-img {
        height: 500px;
      }
    }

    &__professionalism {
      &-img {
        height: 650px;
      }
    }

    &__control {
      &-img {
        height: 400px;
      }
    }

    &__employees {
      &-subtitle {
        font-size: 18px;
      }
    }
  }
}

@media only screen and (max-width: 767px) {

  .about {
    &__history {
      &-img {
        height: 350px;
      }

      &-block {
        margin-bottom: 50px;
      }
    }

    &__professionalism {
      &-img {
        height: 500px;
      }

      &-block {
        margin-bottom: 50px;
      }
    }

    &__control {
      &-img {
        height: 400px;
        margin-bottom: 50px;
      }
    }

    &__reality {
      margin-bottom: 50px;
    }
  }
}

@media only screen and (max-width: 575px) {

  .about {
    &__title {
      text-align: center;

      &::after {
        left: 50%;
        transform: translateX(-50%);
      }
    }

    &__history {
      &-img {
        height: 300px;
      }

      &-description {
        font-size: 14px;
      }
    }

    &__professionalism {
      &-img {
        height: 300px;
      }
    }

    &__control {
      &-img {
        height: 300px;
      }
    }
  }

}

</style>
