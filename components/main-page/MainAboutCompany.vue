<template>
  <div class="main__about">
    <div class="d-flex position-relative h-100">
      <div class="d-flex orange__border px-3 px-sm-0">

        <div
          data-aos="fade-right"
          class="col-12 col-sm-6 offset-sm-1 py-3 py-xl-0 pe-0 pe-sm-5 d-flex flex-column justify-content-around align-items-start"
        >
          <h2 class="title">{{ $t('titles.about') }}</h2>
          <p
            v-html="getPropertyLang(aboutDescription)"
          ></p>
          <NuxtLink :to="`/${$i18n.locale}/about`">{{ $t('reusable.more_details') }}</NuxtLink>
        </div>

        <div class="col-5 p-0 position-relative main__about-img-block">
          <div
            data-aos="fade-left"
            class="about__img"
          >
            <img :src="aboutImage.original" alt="">
          </div>
        </div>

      </div>
    </div>
  </div>


</template>

<script>
import {getPropertyLang} from "~/utils/getPropertyLang";

export default {
  name: "MainAboutCompany",
  props: {
    aboutDescription: {
      type: Object,
      default: () => ({})
    },
    aboutImage: {
      type: Object,
      default: () => ({})
    },
  },

  methods: {
    getPropertyLang,
  }
}
</script>

<style lang="scss" scoped>

.main__about {
  height: 600px;

  .orange__border {
    width: 100%;
    border-top: 2px solid #F58B31;
    border-bottom: 2px solid #F58B31;
    position: relative;
    background-color: #005085;

    & h2 {
      position: relative;

      &::after {
        content: '';
        display: block;
        width: 80px;
        height: 5px;
        background-color: #F58B31;
        position: absolute;
        bottom: -45px;
      }
    }

    & p {
      font-size: calc(12px + (24 - 12) * ((100vw - 320px) / (1920 - 320)));
      line-height: 32px;
      text-align: justify;
      color: #D9D9D9;
    }

    & a {
      border: 3px solid #F58B31;
      display: inline;
      padding: 10px 32px;
      font-size: 14px;
      line-height: 19px;
      color: #F58B31;
    }
  }

  .about__img {
    width: 100%;
    height: 100%;

    &::before {
      content: '';
      display: block;
      width: 3px;
      height: 100px;
      background-color: #F58B31;
      position: absolute;
      top: 0;
      left: 0;
      transform: translateX(-100%);
    }

    &::after {
      content: '';
      display: block;
      width: 3px;
      height: 100px;
      background-color: #F58B31;
      position: absolute;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

@media only screen and (max-width: 1199px) {

  .main__about {
    height: auto;

    .orange__border {

      & h2 {
        &::after {
          bottom: 0
        }
      }

      & p {
        line-height: 27px;
      }
    }
  }

}

@media only screen and (max-width: 767px) {

  .main__about {
    & .orange__border p {
      line-height: 22px;
    }
  }

}

@media only screen and (max-width: 575px) {

  .main__about {
    &-img-block {
      display: none;
    }

    & .orange__border {
      & h2 {
        margin: 0 auto;
        padding-bottom: 0.5rem;

        &::after {
          width: 7px !important;
          height: 7px !important;
          border-radius: 100%;
          left: 50%;
          transform: translateX(-50%);
        }
      }

      & p {
        margin-top: 1rem;
      }

      & a {
        margin: 0 auto;
        background-color: #F58B31;
        color: #fff;
        transition: .3s;

        &:hover {
          background-color: transparent;
          color: #F58B31;
        }
      }
    }
  }

}

</style>
