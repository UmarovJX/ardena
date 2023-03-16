<template>
  <div>

    <!--  DESKTOP NAVBAR  -->
    <div class="app__header app__header-desktop" data-aos="fade-down">
      <div
        class="container"
      >
        <div class="d-flex justify-content-between align-items-center">
          <NuxtLink :to="`/${this.$i18n.locale}`" class="app__header-logo d-flex align-items-center">
            <img :src="layout.header_logo.original" alt="">
            <span
              class="app__header-logo-text"
              v-html="layout.header_company_name"
            >
            </span>
          </NuxtLink>

          <ul class="app__header-links">
            <li>
              <NuxtLink :to="`/${this.$i18n.locale}/about`">{{ $t('titles.about') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="`/${this.$i18n.locale}/news`">{{ $t('titles.news') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="`/${this.$i18n.locale}/services`">{{ $t('titles.services') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="`/${this.$i18n.locale}/projects`">{{ $t('titles.projects') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="`/${this.$i18n.locale}/vacancies`">{{ $t('titles.vacancies') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="`/${this.$i18n.locale}/faq`">{{ $t('titles.faq') }}</NuxtLink>
            </li>
            <li>
              <!--              <a href="" @click.prevent="scrollToContacts('main-contacts')">{{ $t('titles.contacts') }}</a>-->
              <NuxtLink :to="`/${this.$i18n.locale}/contacts`">{{ $t('titles.contacts') }}</NuxtLink>
            </li>
          </ul>

          <div class="app__header-lang">
            <img src="~/assets/img/nav-lang-icon.svg" alt="">
            <b-dropdown id="lang-dropdown" :text="$i18n.locale.toUpperCase()" class="m-md-2 lang-dropdown">
              <b-dropdown-item
                @click="langValue"
                v-for="(lang,index) in $i18n.availableLocales"
                :key="index"
                :to="switchLocalePath(lang)"
              >
                {{ lang.toUpperCase() }}
              </b-dropdown-item>
            </b-dropdown>
          </div>

        </div>
      </div>
    </div>

    <!--  MOBILE NAVBAR  -->
    <div class="app__header app__header-mobile">
      <div class="container">
        <div class="d-flex align-items-center justify-content-between">

          <NuxtLink :to="`/${this.$i18n.locale}`" class="app__header-logo d-flex align-items-center">
            <img :src="layout.header_logo.original" alt="">
            <span
              class="app__header-logo-text"
              v-html="layout.header_company_name"
            ></span>
          </NuxtLink>

          <!--   HAMBURGER BUTTON   -->
          <button class="menu"
                  @click="openMenu"
                  :class="menuClass"
                  :aria-expanded="ariaExpanded"
                  aria-label="Main Menu"
          >
            <svg width="100" height="100" viewBox="0 0 100 100">
              <path class="line line1"
                    d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"/>
              <path class="line line2" d="M 20,50 H 80"/>
              <path class="line line3"
                    d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"/>
            </svg>
          </button>
        </div>

      </div>
    </div>

    <!--    NAVBAR MOBILE CONTENT    -->
    <div
      class="app__header-mobile-content"
      :class="{'active': isOpened}"
    >
      <ul class="app__header-links-mobile m-0">
        <li @click="selectNavigation">
          <NuxtLink :to="`/${this.$i18n.locale}/about`">{{ $t('titles.about') }}</NuxtLink>
        </li>
        <li @click="selectNavigation">
          <NuxtLink :to="`/${this.$i18n.locale}/news`">{{ $t('titles.news') }}</NuxtLink>
        </li>
        <li @click="selectNavigation">
          <NuxtLink :to="`/${this.$i18n.locale}/services`">{{ $t('titles.services') }}</NuxtLink>
        </li>
        <li @click="selectNavigation">
          <NuxtLink :to="`/${this.$i18n.locale}/projects`">{{ $t('titles.projects') }}</NuxtLink>
        </li>
        <li @click="selectNavigation">
          <NuxtLink :to="`/${this.$i18n.locale}/vacancies`">{{ $t('titles.vacancies') }}</NuxtLink>
        </li>
        <li @click="selectNavigation">
          <NuxtLink :to="`/${this.$i18n.locale}/faq`">{{ $t('titles.faq') }}</NuxtLink>
        </li>
        <li @click="selectNavigation">
          <!--          <a href="" @click.prevent="scrollToContacts('main-contacts')">{{ $t('titles.contacts') }}</a>-->
          <NuxtLink :to="`/${this.$i18n.locale}/contacts`">{{ $t('titles.contacts') }}</NuxtLink>
        </li>
        <li class="d-flex justify-content-center">
          <div class="app__header-lang">
            <img src="~/assets/img/nav-lang-icon.svg" alt="">
            <b-dropdown id="lang-dropdown" :text="$i18n.locale.toUpperCase()" class="m-md-2 lang-dropdown">
              <b-dropdown-item
                @click="langValue"
                v-for="(lang,index) in $i18n.availableLocales"
                :key="index"
                :to="switchLocalePath(lang)"
              >
                {{ lang.toUpperCase() }}
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </li>
      </ul>


    </div>

  </div>
</template>

<script>
import {getPropertyLang} from "~/utils/getPropertyLang";

export default {
  name: "AppHeader",

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
      selected: null,
      isOpened: false,
      menuClass: '',
      ariaExpanded: false,
    }
  },

  mounted() {
    this.getLocaleFromStorage()
  },

  methods: {
    getPropertyLang,

    getLocaleFromStorage() {
      const lang = localStorage.getItem('locale')
      if (lang) {
        const langIndex = this.$i18n.availableLocales.findIndex(item => lang === item)
        if (langIndex !== -1) {
          this.selected = this.options[langIndex].text
        }
      }
    },

    langValue(value) {
      this.selected = value.target.text || this.options[0].text
      localStorage.setItem('locale', this.selected)
      this.isOpened = false
      this.ariaExpanded = true
      this.menuClass = ''
    },

    openMenu() {
      if (this.menuClass !== '') {
        this.menuClass = ''
        this.isOpened = false
        this.ariaExpanded = true
      } else {
        this.menuClass = 'opened'
        this.ariaExpanded = false
        this.isOpened = true
      }
    },

    selectNavigation() {
      this.isOpened = false
      this.menuClass = ''
    },

    // scrollToContacts(id) {
    //   this.isOpened = false
    //   const routeName = this.$route.name
    //   if (routeName === 'index___en' || routeName === 'index___ru') {
    //     document.querySelector(`#${id}`).scrollIntoView();
    //   } else {
    //     this.$router.push(`/${this.$i18n.locale}`)
    //     setTimeout(() => {
    //       document.querySelector(`#${id}`).scrollIntoView();
    //     }, 2000)
    //
    //   }
    // }

  }
}
</script>

<style lang="scss" scoped>

.app__header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  height: 80px;
  background-color: #002238;
  z-index: 1000;

  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(270deg, #383838 0%, rgba(255, 255, 255, 0.505208) 50%, #383838 100%);
  }

  &-logo {
    & img {
      width: 34px;
      height: 30px;
      object-fit: contain;
    }
  }

  &-logo-text {
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
    color: #FFFFFF;
    margin-left: 1rem;
  }

  &-links {
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;

    & li {
      padding: 0 20px;

      & a {
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        color: #D9D9D9;
        transition: .3s;

        &:hover {
          color: #F58B31;
        }
      }
    }
  }

  &-lang {
    display: flex;
    align-items: center;
    position: relative;
    width: 60px;
    height: 30px;

    & img {
      position: absolute;
      left: 10px;
      z-index: 123;
    }

    & button {
      color: #D9D9D9;
      margin-left: 10px;
      border-radius: 0.5rem;
      border: none;
      background-color: transparent;
      padding: 0.25rem 0.35rem;
      transition: .3s;

      &:hover {
        background-color: #F58B31;
      }
    }
  }

  &-mobile {
    display: none;
    z-index: 1000;

    &-content {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: calc(100vh - 80px);
      z-index: 100;
      visibility: hidden;
      transform: translateY(-100%);
      transition: .7s;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 30px 0 0 0;

      & ul {
        padding: 0;

        li {
          padding: 0.5rem 0;
          text-align: center;

          & a {
            font-size: 20px;
            font-weight: 700;
            color: #D9D9D9;
            transition: .3s;

            &:hover {
              color: #F58B31;
            }
          }
        }
      }
    }
  }
}

// LANG STYLES
::v-deep .lang-dropdown {
  position: absolute;
  width: 60px;
  height: 30px;
  z-index: 12333;
  margin: 0;
  left: 0px;

  & button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0.25rem 0.35rem;
    background-color: transparent;
    border: none;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #D9D9D9;

    &:hover {
      background-color: transparent;
    }

    &::after {
      display: none !important;
    }

    &:focus {
      box-shadow: none;
    }
  }

  & ul.show {
    min-width: 3rem;
    transform: translate(10%, 32px) !important;
    padding: 0.25rem 0;

    & li {
      padding: 0;

      & a.dropdown-item {
        padding: 0.25rem !important;
        text-align: center;
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        color: #000;

        &:active {
          background-color: #F58B31;
          color: #fff;
        }

        &.nuxt-link-exact-active {
          background-color: #F58B31;
          color: #fff;
        }
      }
    }
  }
}

//  HAMBURGER BUTTON
.menu {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 0;
  width: 50px;
  height: 50px;

  & svg {
    width: 100%;
    height: 100%;
  }
}

.line {
  fill: none;
  stroke: white;
  stroke-width: 6;
  transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
  stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.line1 {
  stroke-dasharray: 60 207;
  stroke-width: 6;
}

.line2 {
  stroke-dasharray: 60 60;
  stroke-width: 6;
}

.line3 {
  stroke-dasharray: 60 207;
  stroke-width: 6;
}

.opened .line1 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
  stroke-width: 6;
}

.opened .line2 {
  stroke-dasharray: 1 60;
  stroke-dashoffset: -30;
  stroke-width: 6;
}

.opened .line3 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
  stroke-width: 6;
}

// MEDIA QUERY
@media only screen and (max-width: 1199px) {

  .app__header {
    &-links {
      & li {
        padding: 0 10px;
      }
    }
  }

}

@media only screen and (max-width: 991px) {

  .app__header {

    &-desktop {
      display: none;
    }

    &-mobile {
      display: flex;
      align-items: center;

      &-content.active {
        background-color: #002238;
        visibility: visible;
        transform: translateY(80px);
      }
    }
  }
}

@media only screen and (max-width: 767px) {

  .app__header {
    height: 70px;

    &-mobile-content {
      height: calc(100vh - 70px);

      &.active {
        transform: translateY(70px);
      }
    }
  }

}

@media only screen and (max-width: 575px) {

  .app__header {
    height: 60px;

    &-logo-text {
      font-size: 17px;
      margin-left: 0.75rem;
    }

    &-mobile-content {
      height: calc(100vh - 60px);

      &.active {
        transform: translateY(60px);
      }

      & ul li {
        padding: 1rem 0;

        a {
          font-size: 24px;
        }
      }
    }
  }

  .menu {
    width: 40px;
    height: 40px;
  }

}

</style>
