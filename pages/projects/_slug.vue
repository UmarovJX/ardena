<template>
  <section class="projects__show pages__rectangle-bg">
    <div class="projects__show-belt-img pages__intro-img">
      <img :src="topImage" alt="">
    </div>

    <div class="container">
      <b-breadcrumb
        data-aos="fade-right"
        :items="breadcrumbItems"
      >
      </b-breadcrumb>
      <NuxtLink
        data-aos="fade-right"
        to=""
        class="back__btn"
      >
        <span><</span> {{ $t('reusable.back') }}
      </NuxtLink>

      <h2
        data-aos="fade-right"
        class="projects__show-title pages__title title"
        v-html="getPropertyLang(projectData.name)"
      >
      </h2>

      <p
        data-aos="fade-right"
        class="projects__show-subtitle pages__subtitle"
        v-html="projectData.published_at"
      >
      </p>

      <div
        data-aos="fade-up"
        class="projects__show-img"
      >
        <img :src="projectData.image_preview.original" alt="">
      </div>

      <div class="projects__show-info mb-5">
        <p
          data-aos="fade-right"
          class="projects__show-info-text"
          v-html="getPropertyLang(projectData.full_description)"
        ></p>
      </div>

      <client-only>
        <div class="projects__slider">
          <div
            v-swiper:mySwiperRef="swiperOptions"
            ref="main__intro-slider"
            class="swiper swiper-global swiper-container"
          >
            <div class="swiper-wrapper">
              <div
                data-aos="fade-up"
                :data-aos-delay="150 * (index + 1)"
                class="swiper-slide"
                v-for="(image,index) in projectData.images_list"
                :key="index"
              >
                <img :src="image.original" alt="">
              </div>
            </div>

            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </div>
        </div>
      </client-only>

    </div>
  </section>
</template>

<script>
import {getPropertyLang} from "~/utils/getPropertyLang";
import {directive} from "vue-awesome-swiper";
import 'swiper/css/swiper.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  layout: 'AppLayout',

  directives: {
    swiper: directive
  },

  async asyncData({params, $axios}) {
    const {slug} = params
    let projectData = {}
    let topImage = null
    await $axios(`website/company/project/${slug}`)
      .then((response) => {
        projectData = response.data
      }).catch((err) => {
        console.error(err)
        projectData = {}
      })

    await $axios('website/section/projects')
      .then((response) => {
        topImage = response.data.information_top_image.original
      })
      .catch((err) => {
        console.error(err)
      })
    return {projectData, topImage}
  },

  head() {
    let seo = this.projectData.seo_meta_as_array.head[this.currentLang]
    const meta = seo.map(item => {
      return {
        hid: item.name,
        name: item.name,
        content: item.content
      }
    })
    return {
      title: `ARDENA - ${this.projectData.name[this.currentLang]}`,
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
          text: this.$t('titles.projects'),
          to: `/${this.$i18n.locale}/projects`
        },
        {
          text: "",
          to: "",
          active: true
        }
      ],
      swiperOptions: {
        speed: 1000,
        direction: "horizontal",
        spaceBetween: 30,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        mousewheelControl: true,
        mousewheel: {
          forceToAxis: true,
        },
        breakpoints: {
          575: {
            slidesPerView: 1,
            spaceBetweenSlides: 30
          },
          767: {
            slidesPerView: 2,
            spaceBetweenSlides: 30
          },
          991: {
            slidesPerView: 3,
            spaceBetweenSlides: 30
          },
        }
      },
    }
  },

  mounted() {
    AOS.init({})
  },

  created() {
    this.settings = this.$store.getters.getSettings
    this.breadcrumbItems[2].text = this.getPropertyLang(this.projectData.name)
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

.projects__show {

  &-img {
    height: 500px;
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

.projects__slider {
  .swiper-slide {
    & img {
      width: 100%;
      height: 230px;
      object-fit: cover;
      object-position: center;
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: #F58B31;
  }
}

@media only screen and (max-width: 991px) {

  .projects__show {

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

  .projects__show {

    &-info p {
      font-size: 16px;
    }
  }

}

</style>
