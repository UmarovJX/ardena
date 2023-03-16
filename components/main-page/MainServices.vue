<template>
  <div class="main__services">

    <!--    DESKTOP    -->
    <div class="services__desktop">
      <div
        class="custom__container"
        data-aos="fade-right"
      >
        <div class="row flex-wrap gy-5">
          <div
            class="col-3 px-lg-3 px-xl-4 px-4 main__services-card"
            :class="`order-${service.id}`"
            v-for="service in services"
            :key="service.id"
          >
            <NuxtLink
              :to="`/${$i18n.locale}/services/${service.id}`"
              class="main__services-card-block p-2 d-flex align-items-center"
            >
              <div class="main__services-card-block-img">
                <img :src="service.image.original" alt="">
              </div>
              <p>{{ getPropertyLang(service.name) }}</p>
            </NuxtLink>
          </div>
          <div class="main__services-title-block col-6 order-6">
            <h2 class="main__services-title title text-center">{{ $t('titles.services') }}</h2>
            <p class="main__services-description">{{ getPropertyLang(servicesDescription) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!--    MOBILE    -->
    <div class="services__mobile">
      <div class="container">
        <h2
          class="title text-center"
        >{{ $t('titles.services') }}</h2>
        <div class="row flex-wrap gy-5">
          <div
            class="col-12 col-sm-6 px-lg-2 px-4 main__services-card"
            :class="`order-${service.order}`"
            v-for="(service, index) in mobileServices"
          >
            <NuxtLink
              data-aos="fade-right"
              :to="`/${$i18n.locale}/services/${service.id}`"
              class="main__services-card-block p-2 d-flex align-items-center"
            >
              <div class="main__services-card-block-img">
                <img :src="service.image.original" alt="">
              </div>
              <p
                v-html="getPropertyLang(service.name)"
              ></p>
            </NuxtLink>
          </div>
        </div>

        <div class="show__all">
          <NuxtLink
            :to="`/${$i18n.locale}/services`"
            data-aos="fade-up"
          >{{ $t('reusable.all_services') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getPropertyLang} from "~/utils/getPropertyLang";

export default {
  name: "MainServices",
  props: {
    servicesDescription: {
      type: Object,
      default: () => ({})
    },
    services: {
      type: Array,
      default: () => ([])
    }
  },

  data() {
    return {
      mobileServices: []
    }
  },

  mounted() {
    this.revertServices()
  },

  methods: {
    getPropertyLang,

    revertServices() {
      this.mobileServices = this.services.slice(0, 6)
      return this.mobileServices
    }
  }
}
</script>

<style lang="scss" scoped>

.main__services {
  padding: 150px 0;

  .services__mobile {
    display: none;
  }

  &-title {
    padding-bottom: 75px;
    position: relative;
    margin-bottom: 0;

    &-block {
      margin: 80px 0;
    }

    &::after {
      content: '';
      display: block;
      width: 80px;
      height: 5px;
      background-color: #F58B31;
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &-description {
    font-size: 22px;
    line-height: 32px;
    text-align: center;
    color: #D9D9D9;
    margin-bottom: 3rem;
  }

  .custom__container {
    margin: 0 auto;
  }

  &-card {
    display: flex;
    align-items: center;

    &-block {
      position: relative;
      background-color: #002238;
      width: 100%;
      padding-bottom: 11px !important;
      transition: .3s;

      &:hover {
        transform: scale(1.1);
      }

      &::before {
        content: '';
        width: 10px;
        height: 20px;
        background-color: #F58B31;
        position: absolute;
        bottom: -10px;
        right: -10px;
      }

      &::after {
        content: '';
        width: 20px;
        height: 10px;
        background-color: #F58B31;
        position: absolute;
        bottom: -10px;
        right: -10px;
      }

      &-img {
        position: relative;
        z-index: 123;

        &::after {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          border: 1px solid #F58B31;
          position: absolute;
          top: 3px;
          left: 3px;
          z-index: -1;
        }
      }

      & img {
        width: 46px;
        height: 46px;
        position: relative;
        object-fit: cover;
        object-position: center;
      }

      & p {
        margin-bottom: 0;
        font-weight: 700;
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;
        color: #D9D9D9;
        padding-left: 24px;
        position: relative;

        &::before {
          content: '';
          display: block;
          background-color: #F58B31;
          width: 1px;
          height: 30px;
          position: absolute;
          left: 12px;
        }
      }
    }
  }
}

// MEDIA QUERY
@media (min-width: 992px) {
  .custom__container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .custom__container {
    max-width: 1170px;
  }
}

@media (min-width: 1400px) {
  .custom__container {
    max-width: 1370px;
  }
}

@media only screen and (max-width: 1399px) {

  .main__services {

    &-title-block {
      margin: 50px 0;
    }
  }

}

@media only screen and (max-width: 1199px) {

  .main__services {
    padding: 100px 0;

    &-title-block {
      margin-top: 40px;
    }

    &-card-block {
      &::before {
        width: 5px;
        height: 10px;
        bottom: -5px;
        right: -5px;
      }

      &::after {
        width: 10px;
        height: 5px;
        bottom: -5px;
        right: -5px;
      }
    }

    &-description {
      margin-bottom: 0;
    }
  }
}

@media only screen and (max-width: 991px) {

  .main__services {
    padding: 60px 0;

    & h2 {
      position: relative;
      padding-bottom: 1rem;
      margin-bottom: 40px;

      &::after {
        content: '';
        width: 7px;
        height: 7px;
        background-color: #F58B31;
        border-radius: 100%;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
      }
    }

    & .show__all {
      margin-top: 40px;
      display: flex;
      align-items: center;

      a {
        display: inline-block;
        padding: 12px 40px;
        background-color: #F58B31;
        font-size: 14px;
        color: #FFFFFF;
        margin: 0 auto;
      }
    }

    &-card-block {
      position: relative;
      background-color: #002238;
      width: 100%;
      padding-bottom: 11px !important;

      &::before {
        width: 10px;
        height: 20px;
        bottom: -10px;
        right: -10px;
      }

      &::after {
        width: 20px;
        height: 10px;
        bottom: -10px;
        right: -10px;
      }
    }
  }


  .services__desktop {
    display: none;
  }

  .services__mobile {
    display: flex !important;
  }

}

@media only screen and (max-width: 767px) {

  .main__services {

    &-card-block {
      &::before {
        width: 5px;
        height: 15px;
        bottom: -5px;
        right: -5px;
      }

      &::after {
        width: 15px;
        height: 5px;
        bottom: -5px;
        right: -5px;
      }
    }
  }

}

@media only screen and (max-width: 575px) {

  .main__services {
    padding: 40px 0;

    & h2 {
      position: relative;
      padding-bottom: 1rem;

      &::after {
        content: '';
        width: 7px;
        height: 7px;
        background-color: #F58B31;
        border-radius: 100%;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
      }
    }
  }

}


</style>

