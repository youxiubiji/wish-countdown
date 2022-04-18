import Vue from "vue";
import App from "./App";
import store from "./store";
import util, { msg } from "@/utils/util";

Vue.config.productionTip = false;

Vue.prototype.$util = util;
Vue.prototype.$msg = msg;

App.mpType = "app";

const app = new Vue({
  ...App,
  store
});
app.$mount();
