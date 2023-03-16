import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default function ({ app }) {
  // onBeforeLanguageSwitch called right before setting a new locale
  app.i18n.onBeforeLanguageSwitch = (oldLocale, newLocale, isInitialSetup, context) => {
    // console.log(oldLocale, newLocale, isInitialSetup)
  }
  // onLanguageSwitched called right after a new locale has been set
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    // console.log(oldLocale, newLocale)
  }
}
