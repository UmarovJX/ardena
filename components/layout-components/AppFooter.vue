<template>
  <div class="app__footer">
    <div class="container">
      <div class="d-flex flex-column align-items-center">

        <div
          data-aos="fade-up"
          class="app__footer-logo"
        >
          <img :src="layout.footer_logo.original" alt="">
        </div>
        <p
          class="app__footer-logo-text"
          data-aos="fade-up"
          v-html="layout.footer_company_name"
        >
        </p>
        <p
          data-aos="fade-up"
          class="app__footer-moto"
          v-html="getPropertyLang(layout.footer_slogan)"
        >
        </p>

        <ul class="app__footer-socials d-flex align-items-center">
          <li
            data-aos="fade-right"
            data-aos-anchor-placement="top-bottom"
            v-for="(socialLink, index) in socialLinks"
            :key="index"
            v-if="socialLink.link !== null"
          >
            <a :href="socialLink.link" target="_blank">
              <img :src="socialLink.icon" alt="">
            </a>
          </li>
          <!--          <li-->
          <!--            data-aos="fade-right"-->
          <!--            data-aos-delay="150"-->
          <!--            data-aos-anchor-placement="top-bottom"-->
          <!--          >-->
          <!--            <a :href="layout.socials_linkedin" target="_blank">-->
          <!--              <img src="~/assets/img/linkedin-icon.svg" alt="">-->
          <!--            </a>-->
          <!--          </li>-->
          <!--          <li-->
          <!--            data-aos="fade-right"-->
          <!--            data-aos-delay="300"-->
          <!--            data-aos-anchor-placement="top-bottom"-->
          <!--          >-->
          <!--            <a :href="layout.socials_instagram" target="_blank">-->
          <!--              <img src="~/assets/img/instagram-icon.svg" alt="">-->
          <!--            </a>-->
          <!--          </li>-->
          <!--          <li-->
          <!--            data-aos="fade-right"-->
          <!--            data-aos-delay="450"-->
          <!--            data-aos-anchor-placement="top-bottom"-->
          <!--          >-->
          <!--            <a :href="layout.socials_telegram" target="_blank">-->
          <!--              <img src="~/assets/img/telegram-icon.svg" alt="">-->
          <!--            </a>-->
          <!--          </li>-->
          <!--          <li-->
          <!--            data-aos="fade-right"-->
          <!--            data-aos-delay="600"-->
          <!--            data-aos-anchor-placement="top-bottom"-->
          <!--          >-->
          <!--            <a :href="layout.socials_whatsapp" target="_blank">-->
          <!--              <img src="~/assets/img/whatsapp-icon.svg" alt="">-->
          <!--            </a>-->
          <!--          </li>-->
        </ul>

        <p
          data-aos="fade-right"
          data-aos-anchor-placement="top-bottom"
          class="app__footer-info"
        >
          © Copyright 2017-{{ currentYear }}. Ardena Central Asia. All rights reserved.
        </p>

      </div>
    </div>

  </div>
</template>

<script>
import {getPropertyLang} from "~/utils/getPropertyLang";

export default {
  name: "AppFooter",
  props: {
    settings: {
      type: Object,
      default: () => ({})
    },
    layout: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      currentYear: null,
      socialLinks: []
    }
  },

  created() {
    this.getCurrentYear()
    this.setSocialLinksToArray()
  },

  methods: {
    getPropertyLang,

    getCurrentYear() {
      this.currentYear = new Date().getFullYear()
    },

    setSocialLinksToArray() {
      this.socialLinks.push(
        {
          link: this.layout['socials_facebook'],
          icon: require('@/assets/img/facebook-icon.svg')
        },
        {
          link: this.layout['socials_linkedin'],
          icon: require('@/assets/img/linkedin-icon.svg')
        },
        {
          link: this.layout['socials_instagram'],
          icon: require('@/assets/img/instagram-icon.svg')
        },
        {
          link: this.layout['socials_telegram'],
          icon: require('@/assets/img/telegram-icon.svg')
        },
        {
          link: this.layout['socials_whatsapp'],
          icon: require('@/assets/img/whatsapp-icon.svg')
        },
    )

      // if (Object.values(this.socialLinks) === null) {
      //   return ''
      // }
    }
  }
}
</script>

<style lang="scss" scoped>

.app__footer {
  position: relative;
  background-color: #002238;
  padding: 70px 0 50px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(270deg, #383838 0%, rgba(255, 255, 255, 0.505208) 50%, #383838 100%);
  }

  &-logo {
    margin-bottom: 30px;

    & img {
      width: 70px;
      height: 62px;
      object-fit: contain;
    }
  }

  &-logo-text {
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
    text-align: center;
    color: #FFFFFF;
    margin-bottom: 30px;
  }

  &-moto {
    font-size: 20px;
    line-height: 27px;
    text-align: center;
    color: #FFFFFF;
    margin-bottom: 30px;
  }

  &-socials {
    margin-bottom: 78px;
    padding: 0;

    li {
      padding: 0 18px;

      & a img {
        transition: .3s;

        &:hover {
          transform: scale(1.3);
        }
      }
    }
  }

  &-info {
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    color: #FFFFFF;
  }
}

// MEDIA QUERY
@media only screen and (max-width: 1199px) {

  .app__footer {
    padding: 50px 0;

    &-logo {
      margin-bottom: 20px;
    }

    &-logo-text {
      margin-bottom: 20px;
    }

    &-moto {
      margin-bottom: 20px;
    }

    &-socials {
      margin-bottom: 30px;
    }

    &-info {
      margin-bottom: 0;
    }
  }

}

@media only screen and (max-width: 767px) {

  .app__footer {
    padding: 60px 0 40px;
  }

}

@media only screen and (max-width: 575px) {

  .app__footer {
    padding: 40px 0 30px;

    &-logo {
      margin-bottom: 20px;

      & img {
        width: 50px;
      }
    }

    &-logo-text {
      font-size: 16px;
      margin-bottom: 20px;
    }

    &-moto {
      font-size: 12px;
      line-height: 20px;
      margin-bottom: 20px;
    }

    &-socials {
      margin-bottom: 40px;
    }

    &-info {
      font-size: 11px;
      line-height: 15px;
    }
  }

}

</style>
