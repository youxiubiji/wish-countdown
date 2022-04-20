import { wxlogin, getInfo } from "@/api/user.js";
import util from "@/utils/util";
const state = {
  info: "",
  token: util.storage("YXBJ-token") || "",
};

const mutations = {
  SET_USERINFO: (state, payload) => {
    state.info = Object.assign({}, state.info, payload);
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
    util.storage("YXBJ-token", token);
  },
};

const actions = {
  //微信登录
  async wxLogin({ commit }) {
    try {
      const code = await new Promise((resolve, reject) => {
        uni.login({
          provider: "weixin",
          success: function (res) {
            resolve(res.code);
          },
          fail: function (err) {
            resolve(err);
          },
        });
      });
      const { token } = await wxlogin({
        code,
      });
      commit("SET_TOKEN", token);
      const data = await getInfo();
      commit("SET_USERINFO", data);
    } catch (error) {
      util.removeStorage("YXBJ-token");
      //TODO handle the exception
    }
  },
  // 获取用户信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((response) => {
          commit("SET_USERINFO", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
