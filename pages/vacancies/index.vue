<template>
  <section class="vacancies pages__rectangle-bg">
    <div class="vacancies__belt-img pages__intro-img">
      <img :src="topImage" alt="">
    </div>

    <client-only>
      <div class="container">
        <b-breadcrumb
          data-aos="fade-right"
          data-aos-once="true"
          :items="breadcrumbItems"
        >
        </b-breadcrumb>

        <h2
          data-aos="fade-right"
          data-aos-once="true"
          class="vacancies__title pages__title title"
        >
          {{ $t('titles.vacancies') }}
        </h2>

        <div
          data-aos="fade-right"
          data-aos-once="true"
          class="vacancies__subtitle pages__subtitle"
          v-html="getPropertyLang(vacanciesSubtitle)"
        >
        </div>

        <div class="row gy-5 g-0 g-sm-5 mt-0 mt-lg-5">
          <div
            class="col-12 col-lg-6 vacancies__card"
            v-for="vacancy in vacancies"
            :key="vacancy.id"
            data-aos="fade-right"
            data-aos-once="true"
          >
            <div class="vacancies__card-block">
              <div class="vacancies__card-img">
                <img :src="vacancy.image.original" alt="">
              </div>
              <h3
                class="vacancies__card-title"
                v-html="getPropertyLang(vacancy.name)"
              ></h3>
              <div
                class="vacancies__card-text"
                v-html="getPropertyLang(vacancy.description)"
              ></div>

              <b-button
                v-b-modal="`modal-${vacancy.id}`"
              >
                {{ $t('reusable.send_cv') }}
              </b-button>

              <b-modal
                ref="vacancy-modal"
                hide-header
                hide-footer
                centered
                :id="`modal-${vacancy.id}`"
              >
                <b-form
                  @submit.prevent="onSubmit(vacancy.id)"
                >
                  <b-form-file
                    v-model="file"
                    :state="Boolean(file)"
                    plain
                  ></b-form-file>

                  <b-button
                    type="submit"
                    variant="primary"
                    @click="$bvModal.hide(`modal-${vacancy.id}`)"
                  >
                    {{ $t('reusable.send_cv') }}
                  </b-button>

                </b-form>
              </b-modal>

            </div>
          </div>
        </div>
      </div>

      <b-modal
        ref="response-modal"
        id="response-modal"
        size="md"
        hide-header
        hide-footer
        centered
      >
        <b-button
          @click="$bvModal.hide('response-modal')"
          class="close__modal-btn"
        >X
        </b-button>
        <h4 style="color: #fff">{{ modalResponse }}</h4>
      </b-modal>
    </client-only>

  </section>
</template>

<script>
import {getPropertyLang} from "~/utils/getPropertyLang";
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  name: "Vacancies",
  layout: 'AppLayout',

  async asyncData({$axios}) {
    // let vacancies = []
    let vacanciesSeo = {}
    let vacanciesSubtitle = {}
    let topImage = null

    // await $axios('website/company/vacancy')
    //   .then((response) => {
    //     vacancies = response.data.data
    //   }).catch((err) => {
    //     console.error(err)
    //     vacancies = []
    //   })

    await $axios('website/section/vacancies')
      .then((response) => {
        vacanciesSeo = response.data.seo_meta_as_array.head
        vacanciesSubtitle = response.data.information_description
        topImage = response.data.information_top_image.original
      })
      .catch((err) => {
        console.error(err)
        vacanciesSeo = {}
        vacanciesSubtitle = {}
      })
    return {vacanciesSeo, vacanciesSubtitle, topImage} // vacancies
  },

  head() {
    let seo = this.vacanciesSeo[this.currentLang]
    const meta = seo.map(item => {
      return {
        hid: item.name,
        name: item.name,
        content: item.content
      }
    })
    return {
      title: `ARDENA - ${this.$t('titles.vacancies')}`,
      link: [{
        rel: 'icon', type: 'image/x-icon', href: this.settings.favicon
      }],
      meta: meta
    }
  },

  data() {
    return {
      vacancies: [],
      file: null,
      modalResponse: '',
      breadcrumbItems: [
        {
          text: this.$t('reusable.main'),
          to: `/${this.$i18n.locale}`
        },
        {
          text: this.$t('titles.vacancies'),
          to: `/${this.$i18n.locale}/vacancies`,
          active: true
        },
      ],
    }
  },

  async mounted() {
    await this.getAllVacancies()
    AOS.init()
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
    async getAllVacancies() {
      await this.$axios.get('website/company/vacancy')
        .then(res => {
          this.vacancies = res.data.data
        })
        .catch(err => {
          console.error(err)
        })
    },

    getPropertyLang,

    async onSubmit(id) {
      const vacancy_id = id
      const formData = new FormData;
      formData.append('file', this.file)
      formData.append('vacancy_id', vacancy_id)

      await this.$axios.post('website/feedback/vacancy', formData)
        .then((response) => {
          this.modalResponse = this.$t('modal_response.success')
          this.$refs['response-modal'].show()
          return {
            response: response.data
          }
        })
        .catch(() => {
          this.modalResponse = this.$t('modal_response.error')
          this.$refs['response-modal'].show()
          return {
            response: []
          }
        })
        .finally(() => {
          this.file = null
        })
    },
  },

}
</script>

<style lang="scss" scoped>

::v-deep .modal-body {
  background-color: #002238;
  padding: 2rem;

  form {
    display: flex;
    flex-direction: column;

    input {
      color: #fff;
      border: 2px solid #F58B31;
      border-radius: 6px;
      padding: .5rem;
      margin-bottom: 2rem;
    }

    & button {
      display: block;
      margin: 0 auto;
      width: 50%;
      height: 40px;
      border: 3px solid #F58B31;
      background-color: transparent;
      transition: .3s;
      color: #F58B31;
      border-radius: 0;

      &:hover {
        background-color: transparent;
        border: 3px solid #F58B31;
        color: #F58B31;
      }
    }
  }
}

::v-deep #response-modal .modal-content {
  border-radius: 0;
  border: none;

  & .modal-body {
    padding: 45px;
    background-color: #262626;
    border-radius: 0;
    border: none;

    & input {
      background-color: #262626;
      border-radius: 0;
      border: 0;
      border-bottom: 3px solid #D9D9D9;
      color: #D9D9D9;
      padding: .75rem 0;

      &:focus {
        box-shadow: none;
      }
    }

    & h4 {
      text-align: center;
    }

    & button {
      position: absolute;
      top: 0;
      right: 0;
      display: block;
      border-radius: 0;
      border: 3px solid #F58B31;
      color: #F58B31;
      background-color: transparent;
    }
  }
}

.vacancies {

  &__card {

    &-block {
      background-color: #002238;
      padding: 40px;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 5px;
        width: 100%;
        background-color: #F58B31;
        transform: translateY(100%);
      }
    }

    &-img {
      margin-bottom: 40px;

      & img {
        height: 80px;
        object-fit: cover;
      }
    }

    &-title {
      position: relative;
      font-size: 24px;
      line-height: 32px;
      color: #D9D9D9;
      padding-bottom: 23px;
      margin-bottom: 30px;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 40px;
        height: 3px;
        background-color: #F58B31;
      }
    }

    &-text {
      font-size: 16px;
      line-height: 21px;
      text-align: justify;
      color: #D9D9D9;
      margin-bottom: 72px;
    }

    & button {
      display: block;
      margin: 0 auto;
      width: 50%;
      height: 40px;
      border: 3px solid #F58B31;
      background-color: transparent;
      transition: .3s;
      color: #F58B31;
      border-radius: 0;

      &:hover {
        background-color: transparent;
        border: 3px solid #F58B31;
        color: #F58B31;
      }
    }
  }
}

@media only screen and (max-width: 991px) {

  .vacancies {
    &__card {
      &-img {
        display: flex;
        justify-content: center;
      }

      &-title {
        display: flex;
        justify-content: center;

        &::after {
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
}

@media only screen and (max-width: 575px) {

  .vacancies {
    &__card {
      &-block {
        padding: 28px;
      }

      &-btn {
        width: 220px;
      }
    }
  }

}

</style>
