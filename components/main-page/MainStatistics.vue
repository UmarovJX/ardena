<template>
  <div class="main__intro-belt">
    <div class="main__intro-belt-position">
      <div class="container">
        <div class="row">
          <div
            class="main__intro-belt-card col-6 col-lg-3 d-flex flex-column align-items-center"
            v-for="(item, index) in statistics"
            :key="index"
          >
            <div>
              <img :src="item.image.original" alt="">
            </div>
            <ICountUp
              :id="`count-${index}`"
              :delay="delay"
              :endVal="parseInt(item.quantity)"
              :options="options"
            />
            <p
              v-html="getPropertyLang(item.description)"
            ></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2';
import {getPropertyLang} from "~/utils/getPropertyLang";
import {CountUp} from "countup.js";

export default {
  name: "MainStatistics",
  components: {
    ICountUp,
  },
  props: {
    statistics: {
      type: Array,
      default: () => ([])
    },
  },
  data() {
    return {
      delay: 100,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      },
    }
  },
  mounted() {
    this.statistics.forEach((item, index) => {
      const countUp = new CountUp(`count-${index}`, parseInt(item.quantity), {enableScrollSpy: true});
    })
  },
  methods: {
    getPropertyLang,
  }
}
</script>

<style lang="scss" scoped>
.main__intro {
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
  .main__intro {
    height: auto;

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
  }
}

@media only screen and (max-width: 575px) {
  .main__intro {
    &-belt-card p {
      font-size: 13px;
    }
  }
}

</style>
