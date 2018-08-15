import Vue from "vue"
import numbro from "numbro"
// import moment from "moment";

// Vue.filter('dateFormat', (d) => moment(d).format("DD.MM.YYYY"))

numbro.registerLanguage({
  languageTag: 'de-DE',
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: "Tsd",
    million: "Mio",
    billion: "Mrd",
    trillion: "Trl"
  },
  ordinal: (number) => {
    return number === 1 ? "er" : "e";
  },
  currency: {
      symbol: "€",
      position: "postfix",
      code: "EUR"
  },

})
numbro.setLanguage('de-DE')

Vue.filter('numberFormat', (n) => {
  return numbro(n).format({
    thousandSeparated: true,
    mantissa: 2
  })
})
