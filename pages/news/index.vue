<template>
  <section class="news pages__rectangle-bg">
    <div class="news__belt-img pages__intro-img">
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
        class="news__title pages__title title"
      >
        {{ $t('titles.news') }}
      </h2>

      <div
        data-aos="fade-right"
        class="news__subtitle pages__subtitle"
        v-html="getPropertyLang(newsSubtitle)"
      >
      </div>

      <div class="row gy-5" id="news-card">
        <div
          class="news__card col-sm-12 col-md-6 col-lg-4 px-3"
          v-for="(item, index) in itemsForList()"
          :key="item.id"
          data-aos="fade-right"
          :data-aos-delay="100 * (index + 1)"
        >
          <div class="news__card-img">
            <img :src="item['image_inner'].original" alt="">
          </div>
          <span
            class="news__card-date"
            v-html="item['published_at']"
          ></span>
          <div
            class="news__card-title"
            v-html="getPropertyLang(item.name)"
          ></div>
          <NuxtLink class="news__card-link" :to="`/${$i18n.locale}/news/${item.slug}`">
            {{ $t('reusable.more_details') }}
          </NuxtLink>
        </div>
      </div>

      <div
        class="news__pagination"
        v-if="itemsForList().length > 10"
      >
        <b-pagination
          data-aos="fade-up"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="news-cards"
          next-class="bigger bigger__next"
          prev-class="bigger bigger__prev"
          next-text=""
          prev-text=""
          first-class="biggest"
          last-class="biggest"
        ></b-pagination>
      </div>
    </div>
  </section>
</template>

<script>
import {getPropertyLang} from "~/utils/getPropertyLang";
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  name: "News",
  layout: 'AppLayout',

  async asyncData({$axios}) {
    // let news = []
    let newsSeo = {}
    let newsSubtitle = {}
    let topImage = null

    // await $axios('website/news/news')
    //   .then((response) => {
    //     news = response.data.data
    //   }).catch((err) => {
    //     console.error(err)
    //     news = []
    //   })

    await $axios('website/section/news')
      .then((response) => {
        newsSeo = response.data.seo_meta_as_array.head
        newsSubtitle = response.data.information_description
        topImage = response.data.information_top_image.original
      })
      .catch((err) => {
        console.error(err)
        newsSeo = {}
      })
    return {newsSeo, newsSubtitle, topImage} //news
  },

  head() {
    let seo = this.newsSeo[this.currentLang]
    const meta = seo.map(item => {
      return {
        hid: item.name,
        name: item.name,
        content: item.content
      }
    })
    return {
      title: `ARDENA - ${this.$t('titles.news')}`,
      link: [{
        rel: 'icon', type: 'image/x-icon', href: this.settings.favicon
      }],
      meta: meta
    }
  },

  data() {
    return {
      news: [],
      currentPage: 1,
      perPage: 9,
      breadcrumbItems: [
        {
          text: this.$t('reusable.main'),
          to: `/${this.$i18n.locale}`
        },
        {
          text: this.$t('titles.news'),
          to: '/news',
          active: true
        },
      ]
    }
  },

  async mounted() {
    await this.getAllNews()
    AOS.init({})
  },

  created() {
    this.settings = this.$store.getters.getSettings
  },

  computed: {
    rows() {
      return this.news.length
    },

    currentLang() {
      return this.$i18n.locale
    },
  },

  methods: {
    async getAllNews() {
      await this.$axios.get('website/news/news')
        .then(res => {
          this.news = res.data.data
        })
        .catch(err => {
          console.error(err)
        })
    },

    itemsForList() {
      return this.news.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage,
      );
    },

    getPropertyLang,
  }
}
</script>

<style lang="scss" scoped>

.news {

  &__title {
    font-weight: 700;
    font-size: 48px;
    line-height: 64px;
    color: #D9D9D9;
    padding-bottom: 30px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      height: 5px;
      width: 80px;
      left: 0;
      bottom: 0;
      background-color: #F58B31;
    }
  }

  &__subtitle {
    white-space: pre-line;
  }

  &__card {
    margin-top: 70px;

    &-img {
      position: relative;
      margin-bottom: 20px;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 5px;
        width: 100%;
        background-color: #F58B31;
      }

      & img {
        width: 100%;
        height: 230px;
        object-fit: cover;
        object-position: center;
      }
    }

    &-date {
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #D9D9D9;
    }

    &-title {
      font-size: 18px;
      font-weight: 700;
      color: #D9D9D9;
    }

    &-link {
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #F58B31;
    }
  }

  .pagination {
    margin: 0 auto;
  }

  &__pagination {
    margin-top: 50px;
    display: flex;
    align-items: center;

    & .pagination {
      display: flex;
      align-items: center;

      ::v-deep .page-item {
        padding: 0 2.5px;

        &.disabled {
          opacity: .5;
        }

        &.biggest {
          display: none;
        }

        &.bigger {
          background-repeat: no-repeat;
          background-size: auto;
          background-position: center;
          padding: 0 1.5rem;

          & .page-link {
            width: 50px;
            height: 50px;
          }
        }

        &.bigger__next {
          background-image: url("~/assets/img/pagination-next.svg");
        }

        &.bigger__prev {
          background-image: url("~/assets/img/pagination-prev.svg");
        }

        &.active .page-link {
          background-color: #F58B31;
        }

        & .page-link {
          background-color: transparent;
          width: 35px;
          height: 35px;
          border: 1px solid #F58B31;
          border-radius: 100%;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;

          &:focus {
            box-shadow: none;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 991px) {

  .news {
    &__title {
      padding-bottom: 20px;
    }
  }
}

@media only screen and (max-width: 767px) {

  .news {
    &__title {
      &::after {
        width: 60px;
        height: 3px;
      }
    }
  }
}

</style>
