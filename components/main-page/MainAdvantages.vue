<template>
  <div class="main__advantages">
    <div class="container">
      <h2
        class="title"
        data-aos="fade-right"
      >
        {{ $t('titles.advantages') }}
      </h2>
      <p
        data-aos="fade-right"
        class="main__advantages-subtitle"
        v-html="getPropertyLang(advantagesDescription)"
      >
      </p>
      <div class="row main__advantages-cards px-sm-5 px-md-0">

        <div
          v-for="(advantage, index) in advantages"
          class="p-4 p-xl-5 col-12 col-md-6 col-lg-4 bordered"
          :class="index === 2 ? 'offset-md-3 offset-lg-0' : ''"
          data-aos="fade-right"
          :data-aos-delay="200 * (index + 1)"
        >
          <div class="main__advantages-card">
            <img :src="advantage.image.original" alt="">
            <h3
              v-html="getPropertyLang(advantage.title)"
            ></h3>
            <p
              v-html="getPropertyLang(advantage.short_description)"
            ></p>
            <!--            <NuxtLink to="">{{ $t('reusable.more_details') }}</NuxtLink>-->
            <div>
              <b-button
                v-b-modal="`modal-${index}`"
              >
                {{ $t('reusable.more_details') }}
              </b-button>

              <b-modal
                hide-header
                centered
                ok-only
                :ok-title="$t('reusable.modal_close_btn')"
                :id="`modal-${index}`"
                title="BootstrapVue"
                size="lg"
              >
                <img :src="advantage.image.original" alt="">
                <h3
                  v-html="getPropertyLang(advantage.title)"
                ></h3>
                <p
                  class="my-4"
                  v-html="getPropertyLang(advantage.full_description)"
                >
                </p>
              </b-modal>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import {getPropertyLang} from "~/utils/getPropertyLang";

export default {
  name: "MainAdvantages",
  props: {
    advantagesDescription: {
      type: Object,
      default: () => ({})
    },
    advantages: {
      type: Array,
      default: () => ([])
    },
  },

  methods: {
    getPropertyLang,
  }
}
</script>

<style lang="scss" scoped>

::v-deep .modal-content {
  border-radius: 0;

  .modal-body {
    background-color: #002238;
    padding: 2rem;

    h3 {
      font-weight: 700;
      font-size: 20px;
      line-height: 27px;
      text-transform: uppercase;
      color: #F58B31;
      padding: 30px 0 20px;
      position: relative;

      &::after {
        content: '';
        display: block;
        width: 40px;
        height: 3px;
        background-color: #F58B31;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }

    p {
      font-size: 16px;
      line-height: 21px;
      color: #F5F5F5;
      margin: 50px 0 60px;
      white-space: pre-line;
    }
  }

  .modal-footer {
    background-color: #002238;
    border-radius: 0;
    border-top: 0;
    display: flex;
    justify-content: center;

    button {
      padding: 10px 32px;
      font-size: 14px;
      line-height: 19px;
      color: #F58B31;
      border: 3px solid #F58B31;
      border-radius: 0;
      background-color: transparent;

      &:hover {
        background-color: transparent;
        color: #F58B31;
        border: 3px solid #F58B31;
      }
    }
  }
}

.main__advantages {
  padding: 150px 0 85px;

  & h2 {
    padding-bottom: 75px;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 80px;
      height: 5px;
      background-color: #F58B31;
      position: absolute;
      bottom: 30px;
      transform: translateY(-50%);
    }
  }

  &-subtitle {
    font-size: 20px;
    line-height: 27px;
    color: #D9D9D9;
  }

  &-cards {
    margin-top: 100px;
    height: max-content;
  }

  .bordered {
    z-index: 1;
    position: relative;

    &::before {
      content: '';
      width: calc(100% - 92px);
      height: calc(100% - 92px);
      border: 3px solid #F58B31;
      position: absolute;
      left: 68px;
      z-index: -1;
      top: 68px;

    }
  }

  &-card {
    background-color: #002238;
    padding: 30px;
    height: 100%;

    & h3 {
      font-weight: 700;
      font-size: 20px;
      line-height: 27px;
      text-transform: uppercase;
      color: #F58B31;
      padding: 30px 0 20px;
      position: relative;

      &::after {
        content: '';
        display: block;
        width: 40px;
        height: 3px;
        background-color: #F58B31;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }

    & p {
      font-size: 16px;
      line-height: 21px;
      color: #F5F5F5;
      margin: 50px 0 60px;
    }

    & button {
      padding: 10px 32px;
      font-size: 14px;
      line-height: 19px;
      color: #F58B31;
      border: 3px solid #F58B31;
      border-radius: 0;
      background-color: transparent;

      &:hover {
        background-color: transparent;
        color: #F58B31;
        border: 3px solid #F58B31;
      }
    }

    & img {
      height: 60px;
      object-fit: contain;
    }
  }
}

@media only screen and (max-width: 1399px) {

  .main__advantages {
    &-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      & img {
        width: fit-content;
      }

      & a {
        width: fit-content;
      }
    }
  }

}

@media only screen and (max-width: 1199px) {

  .main__advantages {
    padding: 100px 0 50px;

    &-cards {
      margin-top: 0;
    }

    &-card {
      padding: 19px;

      & h3 {
        font-size: 19px;
      }
    }

    .bordered {
      &::before {
        content: "";
        width: calc(100% - 50px);
        height: calc(100% - 50px);
        border: 3px solid #F58B31;
        position: absolute;
        left: 45px;
        z-index: -1;
        top: 45px;
      }
    }
  }
}

@media only screen and (max-width: 991px) {

  .main__advantages {
    padding: 50px 0;
  }

}

@media only screen and (max-width: 767px) {

  .main__advantages {
    & h2 {
      padding-bottom: 40px;

      &::after {
        bottom: 18px;
      }
    }

    &-subtitle {
      font-size: 18px;
    }
  }
}

@media only screen and (max-width: 575px) {

  .main__advantages {
    padding: 40px 0;
    background-color: #005085;
    position: relative;

    &::before {
      content: '';
      width: 100%;
      height: 3px;
      background-color: #F58B31;
      position: absolute;
      top: 0;
      left: 0;
    }

    &::after {
      content: '';
      width: 100%;
      height: 3px;
      background-color: #F58B31;
      position: absolute;
      bottom: 0;
      left: 0;
    }

    .bordered::before {
      top: 37px;
      left: 37px;
    }

    &-subtitle {
      display: none;
    }

    &-card {
      align-items: center;

      & p {
        margin: 30px 0;
        font-size: 14px;
        text-align: center;
      }

      & h3::after {
        left: 50%;
        transform: translateX(-50%);
      }
    }

    & h2 {
      text-align: center;

      &::after {
        width: 7px;
        height: 7px;
        background-color: #F58B31;
        border-radius: 100%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

}

</style>
