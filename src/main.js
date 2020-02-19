import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import i18n from './i18n'
import App from './App.vue'
import './plugins/axios'

var lang = '';
var citylist = '';
const appLoader = Vue.component('clean-air-counter', {
  functional: true,
  props: [lang, citylist],
  render: function (createElement, context) {
    return createElement(App, context.data, context.children);
  }
});

new Vue({
  el: '#app',
  i18n,
  components: {appLoader}
});
