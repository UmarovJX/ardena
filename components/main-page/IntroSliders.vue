<template>

  <!--  INTRO  -->
  <div
    class="main__intro d-flex flex-column justify-content-between"
  >
    <!--    <div class="container">-->
    <client-only>
      <div
        v-swiper:mySwiperRef="swiperOptions"
        ref="main__intro-slider"
        class="swiper swiper-global swiper-container"
      >
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="slider in sliders"
            :key="slider.id"
          >
            <div>
              <img
                v-if="windowWidth < 576"
                class="intro__bg-img"
                :src="slider.image_mobile.original"
                alt=""
                data-aos="zoom-out"
              >
              <img
                v-if="windowWidth < 991 && windowWidth > 575"
                class="intro__bg-img"
                :src="slider.image_tablet.original"
                alt=""
                data-aos="zoom-out"
              >
              <img
                v-if="windowWidth > 991"
                class="intro__bg-img"
                :src="slider.image_desktop.original"
                alt=""
                data-aos="zoom-out"
              >
            </div>
            <h2
              class="title"
              :class="resetAnimation ? 'animate__animated animate__fadeInUp' : ''"
            >
              {{ getPropertyLang(slider.title) }}
            </h2>
            <p
              :class="resetAnimation ? 'animate__animated animate__fadeInUp' : ''"
            >
              {{ getPropertyLang(slider.subtitle) }}
            </p>
            <span
              :class="resetAnimation ? 'animate__animated animate__fadeInUp' : ''"
            >{{ getPropertyLang(slider.description) }}</span>
            <!--              <NuxtLink :to="slider.link">{{ $t('reusable.main_slider_btn') }}</NuxtLink>-->

            <!--      MODAL BUTTON        -->
            <b-button
              class="main__intro-modal-btn"
              :class="resetAnimation ? 'animate__animated animate__fadeInUp' : ''"
              v-b-modal.callback-modal
            >
              {{ $t('reusable.main_slider_btn') }}
            </b-button>

          </div>
        </div>

        <div @mouseup="restartAnimation" v-if="sliders.length > 1" class="swiper-button-prev" slot="button-prev">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.84961 0.809998C6.97961 0.809998 7.10961 0.859997 7.19961 0.959997C7.39961 1.16 7.39961 1.47 7.19961 1.67L1.85961 7L7.19961 12.34C7.39961 12.54 7.39961 12.85 7.19961 13.05C6.99961 13.25 6.68961 13.25 6.48961 13.05L0.799608 7.36C0.709608 7.27 0.649609 7.14 0.649609 7.01C0.649609 6.88 0.699608 6.75 0.799608 6.66L6.48961 0.969997C6.58961 0.859997 6.71961 0.809998 6.84961 0.809998Z"
              fill="#F58B31"/>
          </svg>
        </div>
        <div @mouseup="restartAnimation" v-if="sliders.length > 1" class="swiper-button-next" slot="button-next">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.15039 13.19C1.02039 13.19 0.890391 13.14 0.800391 13.04C0.600391 12.84 0.600391 12.53 0.800391 12.33L6.14039 7L0.800391 1.66C0.600391 1.46 0.600391 1.15 0.800391 0.950003C1.00039 0.750003 1.31039 0.750003 1.51039 0.950003L7.20039 6.64C7.29039 6.73 7.35039 6.86 7.35039 6.99C7.35039 7.12 7.30039 7.25 7.20039 7.34L1.51039 13.03C1.41039 13.14 1.28039 13.19 1.15039 13.19Z"
              fill="#F58B31"/>
          </svg>
        </div>
      </div>
    </client-only>

    <!--      MODAL CONTENT        -->
    <b-modal
      ref="callback-modal"
      id="callback-modal"
      size="lg"
      hide-header
      hide-footer
      centered
    >
      <!--        <b-form @submit.prevent="submitCallBack">-->
      <!--          <div class="row">-->

      <!--            <div class="col-6 mb-5">-->
      <!--              <b-form-group>-->
      <!--                <b-form-input-->
      <!--                  v-model="form.full_name"-->
      <!--                  type="text"-->
      <!--                  required-->
      <!--                  :placeholder="$t('placeholders.name')"-->
      <!--                ></b-form-input>-->
      <!--              </b-form-group>-->
      <!--            </div>-->

      <!--            <div class="col-6 mb-5">-->
      <!--              <b-form-group>-->
      <!--                <b-form-input-->
      <!--                  v-mask="'+############'"-->
      <!--                  v-model="form.phone"-->
      <!--                  type="tel"-->
      <!--                  required-->
      <!--                  :placeholder="$t('placeholders.phone')"-->
      <!--                ></b-form-input>-->
      <!--              </b-form-group>-->
      <!--            </div>-->

      <!--            <div class="col-12 mb-5">-->
      <!--              <b-form-group>-->
      <!--                <b-form-input-->
      <!--                  v-model="form.message"-->
      <!--                  type="text"-->
      <!--                  required-->
      <!--                  :placeholder="$t('placeholders.message')"-->
      <!--                ></b-form-input>-->
      <!--              </b-form-group>-->
      <!--            </div>-->
      <!--          </div>-->

      <!--          <b-button type="submit">{{ $t('reusable.send') }}</b-button>-->
      <!--        </b-form>-->


      <b-form @submit.prevent="onSubmit" class="main__form-block row align-items-center">

        <!--     FULL NAME     -->
        <div class="col-12 col-sm-6 px-1 px-sm-3 mb-2">
          <b-form-group>
            <b-form-input
              class="px-0"
              id="name"
              v-model="form.full_name"
              type="text"
              :placeholder="$t('placeholders.name')"
              required
            ></b-form-input>
          </b-form-group>
        </div>

        <!--     PHONE     -->
        <div class="col-12 col-sm-6 px-1 px-sm-3 mb-2">
          <b-form-group>
            <b-form-input
              v-mask="'+############'"
              class="px-0"
              id="name"
              v-model="form.phone"
              type="tel"
              :placeholder="$t('placeholders.phone')"
              required
            ></b-form-input>
          </b-form-group>
        </div>

        <!--     E-MAIL     -->
        <div class="col-12 col-sm-6 px-1 px-sm-3 mb-2">
          <b-form-group>
            <b-form-input
              class="px-0"
              id="name"
              v-model="form.email"
              type="email"
              :placeholder="$t('placeholders.email')"
              required
            ></b-form-input>
          </b-form-group>
        </div>

        <!--     PLACE FROM     -->
        <div class="col-12 col-sm-6 px-1 px-sm-3 mb-2">
          <b-form-group>
            <b-form-input
              class="px-0"
              id="name"
              v-model="form.place_from"
              type="text"
              :placeholder="$t('placeholders.place_from')"
              required
            ></b-form-input>
          </b-form-group>
        </div>

        <!--     PLACE TO     -->
        <div class="col-12 col-sm-6 px-1 px-sm-3 mb-2">
          <b-form-group>
            <b-form-input
              class="px-0"
              id="name"
              v-model="form.place_to"
              type="text"
              :placeholder="$t('placeholders.place_to')"
              required
            ></b-form-input>
          </b-form-group>
        </div>

        <!--     VOLUME     -->
        <div class="col-12 col-sm-6 px-1 px-sm-3 mb-2">
          <b-form-group>
            <b-form-input
              class="px-0"
              id="name"
              v-model="form.volume"
              type="number"
              :placeholder="$t('placeholders.volume')"
              required
            ></b-form-input>
          </b-form-group>
        </div>

        <!--     WEIGHT     -->
        <div class="col-12 col-sm-6 px-1 px-sm-3 mb-2">
          <b-form-group>
            <b-form-input
              class="px-0"
              id="name"
              v-model="form.weight"
              type="number"
              :placeholder="$t('placeholders.weight')"
              required
            ></b-form-input>
          </b-form-group>
        </div>

        <!--     SHIPPING TYPE     -->
        <div class="col-12 col-sm-6 px-1 px-sm-3 my-3">
          <b-form-group>
            <b-form-select
              v-model="selected"
              :options="selectOptions"
              class="h-100"
            >
            </b-form-select>
          </b-form-group>
        </div>

        <div class="col-12 col-sm-6 px-1 px-sm-3 my-3">
          <b-button type="submit" variant="primary">{{ $t('reusable.calculate_btn') }}</b-button>
        </div>

        <span
          class="main__form-notes mb-3"
          v-html="getPropertyLang(formNotes)"
        >
          </span>
      </b-form>

      <b-button
        @click="$bvModal.hide('callback-modal')"
        class="close__modal-btn"
      >X
      </b-button>

    </b-modal>
    <!--    </div>-->

    <div>
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
    </div>

    <!--    <div class="main__intro-belt">-->
    <!--      <div class="main__intro-belt-position">-->
    <!--        <div class="container">-->
    <!--          <div class="row">-->
    <!--            <div-->
    <!--              class="main__intro-belt-card col-6 col-lg-3 d-flex flex-column align-items-center"-->
    <!--              v-for="(item, index) in statistics"-->
    <!--              :key="index"-->
    <!--            >-->
    <!--              <div>-->
    <!--                <img :src="item.image.original" alt="">-->
    <!--              </div>-->
    <!--              <ICountUp-->
    <!--                :delay="delay"-->
    <!--                :endVal="parseInt(item.quantity)"-->
    <!--                :options="options"-->
    <!--              />-->
    <!--              <p-->
    <!--                v-html="getPropertyLang(item.description)"-->
    <!--              ></p>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->

  </div>

</template>

<script>
import {getPropertyLang} from "~/utils/getPropertyLang";
import {directive} from "vue-awesome-swiper";
import 'swiper/css/swiper.css'
import {VueSelect as vSelect} from 'vue-select'
import 'animate.css'

export default {
  name: "MainIntroSlider",

  components: {
    // ICountUp,
    vSelect
  },

  directives: {
    swiper: directive,
  },

  props: {
    sliders: {
      type: Array,
      default: () => ([])
    },
    statistics: {
      type: Array,
      default: () => ([])
    },
    formDescription: {
      type: Object,
      default: () => ({})
    },
    formNotes: {
      type: Object,
      default: () => ({})
    },
    shippingTypes: {
      type: Array,
      default: () => ([])
    },
  },

  data() {
    return {
      windowWidth: null,
      selected: null,
      // delay: 1000,
      // options: {
      //   useEasing: true,
      //   useGrouping: true,
      //   separator: ',',
      //   decimal: '.',
      //   prefix: '',
      //   suffix: ''
      // },
      modalResponse: '',
      resetAnimation: false,
      form: {
        full_name: '',
        phone: '',
        email: '',
        place_from: '',
        place_to: '',
        shipping_type_id: '',
        volume: '',
        weight: ''
      },
      selectOptions: [],
      swiperOptions: {
        speed: 800,
        direction: "horizontal",
        effect: 'fade',
        allowTouchMove: false,
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
        slidesPerView: 1,
      },
    }
  },

  mounted() {
    this.getOptions()
    this.pushStaticNull()
    this.windowWidth = window.innerWidth
  },

  methods: {

    restartAnimation() {
      setTimeout(() => {
        this.resetAnimation = true
      }, 1)
      this.resetAnimation = false
    },

    getPropertyLang,

    async onSubmit() {
      const formData = new FormData;
      formData.append('full_name', this.form.full_name)
      formData.append('phone', this.form.phone)
      formData.append('email', this.form.email)
      formData.append('place_from', this.form.place_from)
      formData.append('place_to', this.form.place_to)
      formData.append('shipping_type_id', this.selected)
      formData.append('volume', this.form.volume)
      formData.append('weight', this.form.weight)

      await this.$axios.post('website/feedback/cost-calculation', formData)
        .then((response) => {
          this.$refs['callback-modal'].hide()
          this.modalResponse = this.$t('modal_response.success')
          this.$refs['response-modal'].show()
          return {
            response: response.data,
          }
        })
        .catch(() => {
          this.$refs['callback-modal'].hide()
          this.modalResponse = this.$t('modal_response.error')
          this.$refs['response-modal'].show()
          return {
            response: []
          }
        })
        .finally(() => {
          this.form.full_name = ''
          this.form.phone = ''
          this.form.email = ''
          this.form.place_to = ''
          this.form.place_from = ''
          this.selected = null
          this.form.volume = ''
          this.form.weight = ''
        })
    },

    getOptions() {
      const locale = this.$i18n.locale
      if (Array.isArray(this.shippingTypes)) {
        this.shippingTypes.map((item) => {
          this.selectOptions.push({
            text: item.name[locale],
            value: item.id,
          })
        })
      }
    },

    pushStaticNull() {
      this.selectOptions.unshift({
        text: `${this.$t("placeholders.shipping_type")}`,
        value: null,
        disabled: true,
      })
    },

    // async submitCallBack() {
    //   const formData = new FormData;
    //   formData.append('full_name', this.form.full_name)
    //   formData.append('phone', this.form.phone)
    //   formData.append('message', this.form.message)
    //
    //   await this.$axios.post('website/feedback/callback', formData)
    //     .then((response) => {
    //       return {
    //         response: response.data
    //       }
    //     })
    //     .catch(() => {
    //       return {
    //         response: []
    //       }
    //     })
    //     .finally(() => {
    //       this.$root.$emit('bv::hide::modal', 'callback-modal')
    //       this.form.full_name = ''
    //       this.form.phone = ''
    //       this.form.message = ''
    //     })
    // },
  }
}
</script>

<style lang="scss" scoped>

#response-modal {
  padding-top: 100px;

  & h4 {
    text-align: center;
  }
}

.close__modal-btn {
  position: absolute;
  top: 0;
  right: 0;
  border: 2px solid #F58B31 !important;
  margin: .25rem !important;
}

.main__form {

  &-block {
    //background-color: #002238;
    position: relative;

    select {
      width: 100%;
      background-color: transparent;
      border: none;
      border-bottom: 3px solid #D9D9D9;
      padding: 0.375rem 0;
      //margin-bottom: 50px;
      height: auto;
      color: #fff;
      border-radius: 0;

      &:focus-visible {
        outline: none;
        box-shadow: none;
      }
    }

    & input {
      margin-bottom: 1rem;
      background-color: transparent;
      color: #fff;
      border: none;
      border-bottom: 3px solid #D9D9D9;
      border-radius: 0;

      //&::placeholder {
      //  color: #D9D9D9;
      //}

      &:focus {
        box-shadow: none;
      }
    }

    & button {
      width: 100%;
      color: #F58B31;
      background-color: transparent;
      border: 3px solid #F58B31;
      border-radius: 0;
      margin-bottom: 50px;
      transition: .3s;

      &:hover {
        background-color: #F58B31;
        color: #D9D9D9;
      }
    }
  }

  &-notes {
    font-size: 16px;
    line-height: 21px;
    color: #D9D9D9;
  }
}

::v-deep .modal-content {
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

    & button {
      display: block;
      margin: 0 auto;
      border-radius: 0;
      border: 3px solid #F58B31;
      color: #F58B31;
      background-color: transparent;
    }
  }
}

.intro__bg-img {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  //animation: 6s introBg;
}

//@keyframes introBg {
//  from {
//    transform: scale(3, 3);
//  }
//  to {
//    transform: scale(1, 1);
//  }
//}

.main__intro {
  //position: relative;
  overflow: hidden;
  //padding-top: 170px;
  width: 100%;
  height: 100vh;
  //background-image: url("../../assets/img/intro-bg.svg");
  //background-position: center;
  //background-size: cover;
  //background-repeat: no-repeat;

  .swiper {
    margin: 60px 0 0;
    height: 100%;
    //margin-bottom: 120px;
  }

  .swiper-slide {
    height: 100%;
    padding-bottom: 190px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
      font-weight: 700;
      font-size: 48px;
      line-height: 64px;
      color: #FFFFFF;
      margin-bottom: 50px;
    }

    p {
      font-size: 24px;
      line-height: 32px;
      color: #FFFFFF;
      margin-bottom: 10px;
    }

    span {
      font-size: 14px;
      line-height: 19px;
      color: #FFFFFF;
      margin-bottom: 50px;
    }

    .main__intro-modal-btn {
      padding: 15px 70px;
      font-weight: 700;
      font-size: 14px;
      line-height: 19px;
      text-align: center;
      color: #D9D9D9;
      border: 3px solid #F58B31;
      background-color: transparent;
      text-transform: uppercase;
      border-radius: 0;
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    top: calc(50% - 95px);
    width: 50px;
    height: 50px;
    border: 1px solid #F58B31;
    border-radius: 50%;
    transition: .3s;

    &:hover {
      background-color: #F58B31;
      border-color: #F58B31;
    }

    &:hover svg path {
      fill: #fff;
    }

    &::after {
      display: none;
    }
  }

  .swiper-button-prev {
    left: 15%;
  }

  .swiper-button-next {
    right: 15%;
  }

  &-belt {
    position: static;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 20;

    &-position {
      position: relative;
      background: linear-gradient(270deg, rgba(0, 55, 91, 0) 0%, #00375B 49.71%, rgba(0, 55, 91, 0) 100%);
      padding: 53px 0 27px;
    }

    &-position::before {
      content: '';
      display: block;
      width: 100%;
      height: 3px;
      position: absolute;
      left: 0;
      top: 0;
      background: linear-gradient(270deg, #383838 0%, rgba(255, 255, 255, 0.505208) 50%, #383838 100%);
    }

    &-position::after {
      content: '';
      display: block;
      width: 100%;
      height: 3px;
      position: absolute;
      left: 0;
      bottom: 0;
      background: linear-gradient(270deg, #383838 0%, rgba(255, 255, 255, 0.505208) 50%, #383838 100%);
    }

    &-card {

      & img {
        width: 50px;
        height: 50px;
        object-fit: contain;
        margin-bottom: 52px;
      }

      & span {
        font-weight: 700;
        font-size: calc(20px + (32 - 22) * ((100vw - 320px) / (1920 - 320))) !important;
        line-height: 43px;
        text-align: center;
        text-transform: uppercase;
        color: #F58B31;
        padding-bottom: 37px;
        position: relative;

        &::after {
          content: '';
          display: block;
          width: 9px;
          height: 9px;
          background: #D9D9D9;
          border-radius: 100%;
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      & p {
        font-size: 16px;
        line-height: 21px;
        text-align: center;
        color: #D9D9D9;
      }
    }
  }
}

@media only screen and (max-width: 1199px) {

  .main__intro-belt {
    &-position {
      padding: 25px 0 15px;
    }

    &-card {
      & img {
        margin-bottom: 20px;
      }
    }
  }
}

@media only screen and (max-width: 991px) {

  //@keyframes introBg {
  //  from {
  //    transform: scale(3, 3) translateY(-35%);
  //  }
  //  to {
  //    transform: scale(1, 1) translateY(-35%);
  //
  //  }
  //}

  .main__intro {

    &-belt {
      position: static;
      background-color: #00375B;

      &-position {
        padding: 40px 0 0;
        background: linear-gradient(270deg, rgba(0, 55, 91, 0.7) 0%, #00375B 49.71%, rgba(0, 55, 91, 0.7) 100%);

        &::after {
          display: none;
        }

        &::before {
          background: linear-gradient(270deg, rgba(245, 139, 49, 0) 0%, #F58B31 50%, rgba(245, 139, 49, 0) 100%);
        }
      }

      &-card {
        margin-bottom: 40px;
      }
    }

    & .swiper {
      //margin: 30px 0 120px;

      &-slide {
        padding: 0;
      }

    }

    .swiper-button-prev,
    .swiper-button-next {
      border: none;
      top: 50%;
      transform: translateY(-50%);

      & svg {
        width: 27px;
        height: 50px;
      }

      &:hover {
        background-color: transparent;
        border: transparent;
      }

      &:hover svg path {
        fill: #F58B31;
      }
    }

    .swiper-button-prev {
      left: 10%;
    }

    .swiper-button-next {
      right: 10%;
    }

    .swiper-slide {
      & h2 {
        margin-bottom: 0;
      }

      & p {
        margin-bottom: 100px;
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main__intro {
    .swiper-button-prev {
      left: 5%;
    }

    .swiper-button-next {
      right: 5%;
    }
  }
}

@media only screen and (max-width: 575px) {

  .main__intro {

    & .swiper-slide {
      & .main__intro-modal-btn {
        padding: 10px 40px;
        background-color: #F58B31;
        color: #fff;
        transition: .3s;

        &:hover {
          color: #F58B31;
          background-color: transparent;
        }
      }

      & p {
        font-size: 20px;
      }
    }

    &-belt-card p {
      font-size: 13px;
    }

    .swiper-button-prev,
    .swiper-button-next {
      & svg {
        width: 18px;
        height: 50px;
      }
    }

    .swiper-button-prev {
      left: 1.5rem;
      transform: translate(-50%, -50%);
    }

    .swiper-button-next {
      right: 1.5rem;
      transform: translate(50%, -50%);
    }
  }

}

</style>
