<template>
  <div class="main__moto">
    <div class="d-flex position-relative h-100">
      <div class="d-flex orange__border">
        <div class="col-5 p-0 position-relative main__moto-img-block">
          <div
            data-aos="fade-right"
            class="moto__img"
          >
            <img :src="motoImage.original" alt="">
          </div>
        </div>
        <div
          class="col-12 col-sm-6 ps-md-5 ps-4 py-3 py-xl-0 d-flex flex-column justify-content-around align-items-start"
          data-aos="fade-left"
        >
          <h2 class="title">{{ $t('titles.moto') }}</h2>
          <p
            v-html="getPropertyLang(motoDescription)"
          ></p>
          <NuxtLink :to="`/${$i18n.locale}/about`">{{ $t('reusable.more_details') }}</NuxtLink>
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
    motoDescription: {
      type: Object,
      default: () => ({})
    },
    motoImage: {
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

.main__moto {
  height: 600px;

  .orange__border {
    width: 100%;
    border-top: 2px solid #F58B31;
    border-bottom: 2px solid #F58B31;
    position: relative;
    background-color: #005085;

    & h2 {
      position: relative;
      width: 80%;

      &::after {
        content: '';
        display: block;
        width: 80px;
        height: 5px;
        background-color: #F58B31;
        position: absolute;
        bottom: -30px;
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

  .moto__img {
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
      right: 0;
      transform: translateX(100%);
    }

    &::after {
      content: '';
      display: block;
      width: 3px;
      height: 100px;
      background-color: #F58B31;
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translateX(100%);
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

@media only screen and (max-width: 1399px) {

  .main__moto {
    .orange__border {
      & h2 {
        width: 100%;

        &::after {
          bottom: -38px;
        }
      }
    }
  }

}

@media only screen and (max-width: 1199px) {

  .main__moto {
    height: auto;

    .orange__border {

      & h2 {
        width: 100%;
        font-size: calc(26px + 21 * (100vw - 320px) / 1600) !important;
        line-height: 50px;
        margin-bottom: 2rem;

        &::after {
          bottom: -18px;
        }
      }

      & p {
        line-height: 27px;
      }

    }
  }

}

@media only screen and (max-width: 767px) {

  .main__moto {
    & .orange__border {
      h2 {
        line-height: 40px;
      }

      p {
        line-height: 22px;
      }
    }
  }

}

@media only screen and (max-width: 575px) {

  .main__moto {
    display: none;
  }

}

</style>
