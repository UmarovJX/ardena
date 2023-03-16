import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'

// настройки плагина
const settings = {
  apiKey: '',
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1'
}

Vue.use(YmapPlugin, settings);
