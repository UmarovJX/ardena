export function getPropertyLang(obj) {
  if (obj) {
    const hasProperty = obj.hasOwnProperty(this.$i18n.locale)
    if (hasProperty) {
      return obj[this.$i18n.locale]
    }
    return obj['en']
  }
  return ''
}
