<template>
  <div class="main__form">
    <div class="container">
      <h2
        class="main__form-title title"
        data-aos="fade-right"
      >
        {{ $t('titles.form_title') }}
      </h2>
      <p
        class="main__form-description"
        data-aos="fade-right"
        v-html="getPropertyLang(formDescription)"
      >
      </p>

      <div
        data-aos="fade-right"
        class="bordered px-4 px-sm-0"
      >
        <b-form @submit.prevent="onSubmit" class="main__form-block row align-items-center">

          <!--     FULL NAME     -->
          <div class="col-12 col-sm-6 col-xl-3 px-1 px-sm-3">
            <b-form-group>
              <b-form-input
                class="px-0"
                id="name"
                v-model="form.full_name"
                type="text"
                :placeholder="$t('placeholders.name')"
                required
              ></b-form-input>
            </b-form-group>
          </div>

          <!--     PHONE     -->
          <div class="col-12 col-sm-6 col-xl-3 px-1 px-sm-3">
            <b-form-group>
              <b-form-input
                v-mask="'+############'"
                class="px-0"
                id="name"
                v-model="form.phone"
                type="tel"
                :placeholder="$t('placeholders.phone')"
                required
              ></b-form-input>
            </b-form-group>
          </div>

          <!--     PLACE FROM     -->
          <div class="col-12 col-sm-6 col-xl-3 px-1 px-sm-3">
            <b-form-group>
              <b-form-input
                class="px-0"
                id="name"
                v-model="form.place_from"
                type="text"
                :placeholder="$t('placeholders.place_from')"
                required
              ></b-form-input>
            </b-form-group>
          </div>

          <!--     PLACE TO     -->
          <div class="col-12 col-sm-6 col-xl-3 px-1 px-sm-3">
            <b-form-group>
              <b-form-input
                class="px-0"
                id="name"
                v-model="form.place_to"
                type="text"
                :placeholder="$t('placeholders.place_to')"
                required
              ></b-form-input>
            </b-form-group>
          </div>

          <!--     VOLUME     -->
          <div class="col-12 col-sm-6 col-xl-3 px-1 px-sm-3">
            <b-form-group>
              <b-form-input
                class="px-0"
                id="name"
                v-model="form.volume"
                type="number"
                :placeholder="$t('placeholders.volume')"
                required
              ></b-form-input>
            </b-form-group>
          </div>

          <!--     WEIGHT     -->
          <div class="col-12 col-sm-6 col-xl-3 px-1 px-sm-3">
            <b-form-group>
              <b-form-input
                class="px-0"
                id="name"
                v-model="form.weight"
                type="number"
                :placeholder="$t('placeholders.weight')"
                required
              ></b-form-input>
            </b-form-group>
          </div>

          <!--     SHIPPING TYPE     -->
          <div class="col-12 col-sm-6 col-xl-3 px-1 px-sm-3">
            <b-form-group>
              <b-form-select
                v-model="selected"
                :options="options"
                class="h-100"
              >
              </b-form-select>
            </b-form-group>
          </div>

          <div class="col-12 col-sm-6 col-xl-3 px-1 px-sm-3">
            <b-button type="submit" variant="primary">{{ $t('reusable.calculate_btn') }}</b-button>
          </div>

          <span
            class="main__form-notes mb-5"
            v-html="getPropertyLang(formNotes)"
          >
          </span>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import {getPropertyLang} from "~/utils/getPropertyLang";

export default {
  name: "MainForm",
  props: {
    formDescription: {
      type: Object,
      default: () => ({})
    },
    formNotes: {
      type: Object,
      default: () => ({})
    },
    shippingTypes: {
      type: Array,
      default: () => ([])
    },
  },
  data() {
    return {
      form: {
        full_name: '',
        phone: '',
        place_from: '',
        place_to: '',
        shipping_type_id: '',
        volume: '',
        weight: ''
      },
      options: [],
      selected: null
    }
  },

  mounted() {
    this.getOptions()
    this.pushStaticNull()
  },

  methods: {
    getPropertyLang,

    async onSubmit() {
      const formData = new FormData;
      formData.append('full_name', this.form.full_name)
      formData.append('phone', this.form.phone)
      formData.append('place_from', this.form.place_from)
      formData.append('place_to', this.form.place_to)
      formData.append('shipping_type_id', this.selected)
      formData.append('volume', this.form.volume)
      formData.append('weight', this.form.weight)

      await this.$axios.post('website/feedback/cost-calculation', formData)
        .then((response) => {
          return {
            response: response.data
          }
        })
        .catch(() => {
          return {
            response: []
          }
        })
        .finally(() => {
          this.form.full_name = ''
          this.form.phone = ''
          this.form.place_to = ''
          this.form.place_from = ''
          this.selected = null
          this.form.volume = ''
          this.form.weight = ''
        })
    },

    getOptions() {
      const locale = this.$i18n.locale
      if (Array.isArray(this.shippingTypes)) {
        this.shippingTypes.map((item) => {
          this.options.push({
            text: item.name[locale],
            value: item.id,
          })
        })
      }
    },

    pushStaticNull() {
      this.options.unshift({
        text: `${this.$t("placeholders.shipping_type")}`,
        value: null,
        disabled: true,
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.main__form {
  padding: 50px 0 110px;

  &-title {
    padding-bottom: 30px;
    position: relative;

    &::after {
      content: '';
      width: 80px;
      height: 3px;
      background-color: #F58B31;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }

  &-description {
    font-size: 24px;
    line-height: 32px;
    color: #D9D9D9;
    margin-top: 40px;
  }

  .bordered {
    position: relative;
    z-index: 1;

    &::before {
      content: '';
      width: calc(100% + 20px);
      height: 100%;
      border: 3px solid #F58B31;
      position: absolute;
      top: 16px;
      left: 8px;
      z-index: -1;
    }
  }

  &-block {
    background-color: #002238;
    padding: 50px 34px 0 34px;
    margin-top: 100px;
    position: relative;

    select {
      width: 100%;
      background-color: transparent;
      border: none;
      border-bottom: 3px solid #D9D9D9;
      padding: 0.375rem 0;
      margin-bottom: 50px;
      height: auto;
      color: #fff;
      border-radius: 0;

      &:focus-visible {
        outline: none;
        box-shadow: none;
      }
    }

    & input {
      margin-bottom: 50px;
      background-color: transparent;
      color: #fff;
      border: none;
      border-bottom: 3px solid #D9D9D9;
      border-radius: 0;

      //&::placeholder {
      //  color: #D9D9D9;
      //}

      &:focus {
        box-shadow: none;
      }
    }

    & button {
      width: 100%;
      color: #F58B31;
      background-color: transparent;
      border: 3px solid #F58B31;
      border-radius: 0;
      margin-bottom: 50px;
      transition: .3s;

      &:hover {
        background-color: #F58B31;
        color: #D9D9D9;
      }
    }
  }

  &-notes {
    font-size: 16px;
    line-height: 21px;
    color: #D9D9D9;

  }
}

@media only screen and (max-width: 1199px) {

  .main__form {
    padding: 50px 0;

    &-block {
      margin-top: 50px;
    }
  }

}

@media only screen and (max-width: 767px) {

  .main__form {
    &-title {
      line-height: 45px;
    }

    &-description {
      margin-top: 30px;
      font-size: 18px;
    }
  }

}

@media only screen and (max-width: 575px) {

  .main__form {
    padding: 40px 0;

    &-title {
      text-align: center;

      &::after {
        width: 7px;
        height: 7px;
        border-radius: 100%;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    &-description {
      display: none;
    }

    & .bordered {
      &::before {
        width: calc(100% + (-25px));
        left: 24px;
        top: 12px;
      }
    }

    &-block {
      padding: 40px 20px 0;
    }

    &-description {
      font-size: 15px;
    }
  }

}

</style>
