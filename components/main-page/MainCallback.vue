<template>
  <div id="main-contacts" class="main__callback">
    <div class="container">
      <div class="row flex-column-reverse flex-md-row">

        <div class="main__callback-contacts col-12 col-md-6">
          <h2
            class="title"
            data-aos="fade-right"
          >
            {{ $t('titles.callback_title') }}
          </h2>
          <p
            data-aos="fade-right"
            class="main__callback-description"
            v-html="getPropertyLang(callback.contact_description)"
          >
          </p>

          <div class="d-flex flex-wrap">
            <div class="col-12 col-md-6 col-md-12 d-flex flex-wrap flex-row flex-md-column mb-5 p-0">
              <div
                class="d-flex flex-column flex-md-row align-items-center col-6 col-md-12 mb-4"
                data-aos="fade-right"
              >
                <div>
                  <img src="~/assets/img/callback-address.svg" alt="">
                </div>
                <div>
                  <p class="mb-0">{{ $t('reusable.address') }}</p>
                  <div>
                    <span>
                      {{ getPropertyLang(callback.contact_address) }}
                    </span>
                  </div>
                </div>
              </div>

              <div
                class="d-flex flex-column flex-md-row align-items-center col-6 col-md-12 mb-4"
                data-aos="fade-right"
              >
                <div>
                  <img src="~/assets/img/callback-phone.svg" alt="">
                </div>
                <div>
                  <p class="mb-0">{{ $t('reusable.phone_number') }}</p>
                  <div>
                    <a
                      v-for="(phone, index) in callback.contact_phones"
                      :key="index"
                      :href="`tel:${phone}`"
                      class="spans-with-border"
                    >
                      {{ phone }}
                    </a>
                  </div>
                </div>
              </div>

              <div
                class="d-flex flex-column flex-md-row align-items-center col-6 col-md-12 offset-3 offset-md-0"
                data-aos="fade-right"
              >
                <div>
                  <img src="~/assets/img/callback-email.svg" alt="">
                </div>
                <div>
                  <p class="mb-0">E-Mail:</p>
                  <div>
                    <a
                      :href="`mailto:${callback.contact_email}`"
                    >
                      {{ callback.contact_email }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="main__callback-map col-12 col-md-6 p-2 p-sm-3"
          data-aos="fade-left"
        >
          <!--          <div v-html="callback.contact_map"></div>-->

          <!--          <client-only>-->
          <!--            <yandex-map-->
          <!--              :coords="coords"-->
          <!--              :zoom="15"-->
          <!--              :scroll-zoom="false"-->
          <!--              style="width: 100%; height: 100%"-->
          <!--            >-->
          <!--              <ymap-marker-->
          <!--                :coords="coords"-->
          <!--                marker-id="1"-->
          <!--              >-->
          <!--              </ymap-marker>-->
          <!--            </yandex-map>-->
          <!--          </client-only>-->

          <!--          <iframe-->
          <!--            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.312596973291!2d69.26663101581651!3d41.302062779271964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b6e3d5082c3%3A0xb5f247747d739487!2sFESCO%20(SIA%20ARDENA%20TRANSPORT)!5e0!3m2!1sru!2s!4v1666793668746!5m2!1sru!2s"-->
          <!--            width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"-->
          <!--            referrerpolicy="no-referrer-when-downgrade"></iframe>-->

          <div
            v-html="callback.contact_map"
            class="w-100 h-100"
          ></div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {yandexMap, ymapMarker} from 'vue-yandex-maps'
import {getPropertyLang} from "~/utils/getPropertyLang";

export default {
  name: "MainCallback",
  components: {
    yandexMap,
    ymapMarker
  },
  props: {
    callback: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      coords: [41.302037, 69.269296],
    }
  },

  methods: {
    getPropertyLang,
  }

}
</script>

<style lang="scss" scoped>

::v-deep iframe {
  width: 100%;
  height: 100%;
}

::v-deep .ymap-container {
  height: 100px;
  -ms-touch-action: pan-x pan-y !important;
  touch-action: pan-x pan-y !important;
}

.main__callback {
  padding: 110px 0 50px;

  & h2 {
    padding-bottom: 35px;
    position: relative;
    margin-bottom: 0;

    &::after {
      content: '';
      width: 80px;
      height: 5px;
      background-color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }

  &-description {
    margin-top: 40px;
    font-size: 16px;
    line-height: 21px;
    color: #FFFFFF;
    margin-bottom: 40px;
  }

  &-contacts {
    & img {
      margin-right: 20px;
    }

    & p {
      font-weight: 700;
      font-size: 14px;
      line-height: 19px;
      color: #FFFFFF;
    }

    & a {
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #FFFFFF;
    }

    & span {
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #FFFFFF;
    }
  }

  &-map {
    background-color: #002238;
  }
}

.spans-with-border {
  margin-right: 36px;
}

@media only screen and (max-width: 1199px) {

  .main__callback {
    padding: 50px 0;
  }

  .spans-with-border {
    margin-right: 10px;
  }
}

@media only screen and (max-width: 767px) {

  .main__callback {
    padding: 50px 0 0 !important;

    & h2 {
      text-align: center;
      padding-bottom: 1rem;
      margin-bottom: 2rem;

      &::after {
        width: 7px;
        height: 7px;
        background-color: #fff;
        position: absolute;
        border-radius: 100%;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    &-description {
      display: none;
    }

    &-map {
      height: 300px;
    }

    &-contacts {
      & img {
        margin: 0 0 20px 0;
        width: 70px;
      }

      & p {
        text-align: center;
      }

      & .spans-with-border {
        display: block;
      }

      & .centerAddress {
        margin: 0 auto;
        text-align: center;
      }
    }
  }

}

@media only screen and (max-width: 575px) {

  .main__callback {
    padding: 40px 0;
  }

}

</style>
