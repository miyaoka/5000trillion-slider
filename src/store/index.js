import Vue from 'vue'
import Vuex from 'vuex'

import actionList from './actionList.yml'

Vue.use(Vuex)

const state = {
  priceNumber: 1,
  priceName: '万',
  currency: '円',
  action: '欲しい!'
}

const base = 10000
const max = 5000000000000000

const baseList = '万億兆京垓'
const currencyList = '円㌦㌣㌷㍀㌠㌆㌵㌡㍓㍔'

const nextInList = (list, val) => list[(list.indexOf(val) + 1) % list.length]

const getters = {
  price: state => `${state.priceNumber}${state.priceName}${state.currency}`,
  action: state => state.action,
  query: state => ({
    pu: state.priceNumber,
    pa: state.priceName,
    c: state.currency,
    a: state.action
  }),
  power: state => state.priceName === '' ? 0 : baseList.indexOf(state.priceName) + 1,
  priceValue: state => state.priceNumber * Math.pow(base, store.getters.power),
  exponent: state => Math.log(state.priceNumber) / Math.log(base) + store.getters.power,
  expoMax: state => Math.log(max) / Math.log(base)
}

const mutations = {
  cycleCurrency: (state) => { state.currency = nextInList(currencyList, state.currency) },
  cycleAction: (state) => { state.action = nextInList(actionList, state.action) },
  parseQuery: (state, query) => {
    Object.assign(state, {
      priceNumber: query.pu || state.priceNumber,
      priceName: query.pa || state.priceName,
      currency: query.c || state.currency,
      action: query.a || state.action
    })
  },
  changeExponent: (state, exponent) => {
    state.priceNumber =
    Math.floor(
      Math.ceil(
        Math.pow(base, exponent % 1) * base
      ) / base
    )
    state.priceName = baseList[Math.floor(exponent - 1)] || ''
  }
}

const actions = {
  cycleCurrency: ({ commit }) => { commit('cycleCurrency') },
  cycleAction: ({ commit }) => { commit('cycleAction') },
  parseQuery: ({ commit }, query) => { commit('parseQuery', query) },
  changeExponent: ({ commit }, exponent) => { commit('changeExponent', exponent) }
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations,
  actions
})

export default store
