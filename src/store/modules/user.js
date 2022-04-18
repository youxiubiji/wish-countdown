import { wxlogin, getInfo, login } from "@/api/user.js";
import util, { msg } from "@/utils/util";
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
  RESET_STATE: (state) => {
    state.info = "";
    state.token = "";
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
  // 邮箱登录
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then(async (response) => {
          commit("SET_TOKEN", response.token);
          const data = await getInfo();
          commit("SET_USERINFO", data);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
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
  // user logout
  logout({ commit }) {
    return new Promise((resolve) => {
      util.removeStorage("YXBJ-token");
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
