import { wxlogin, getInfo, qqlogin } from '@/api/user.js';
import util from '@/utils/util';
import { get, post } from '@/utils/request';
const state = {
    info: '',
    token: util.storage('WISH-token') || '',
};

const mutations = {
    SET_USERINFO: (state, payload) => {
        state.info = Object.assign({}, state.info, payload);
    },
    SET_TOKEN: (state, token) => {
        state.token = token;
        util.storage('WISH-token', token);
    },
};

const actions = {
    //微信登录
    async wxLogin({ commit }, payload) {
        try {
            const code = await new Promise((resolve, reject) => {
                uni.login({
                    provider: 'weixin',
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
            commit('SET_TOKEN', token);
            const data = await getInfo();
            commit('SET_USERINFO', data);
            const res = payload.method == 'GET' ? await get(payload) : await post(payload);
            commit('SET_USERINFO', { data: res });
        } catch (error) {
            util.removeStorage('WISH-token');
            //TODO handle the exception
        }
    },
    // qq登录
    async qqLogin({ commit }, payload) {
        try {
            const code = await new Promise((resolve, reject) => {
                uni.login({
                    provider: 'qq',
                    success: function (res) {
                        resolve(res.code);
                    },
                    fail: function (err) {
                        resolve(err);
                    },
                });
            });
            const { token } = await qqlogin({
                code,
            });
            commit('SET_TOKEN', token);
            const data = await getInfo();
            commit('SET_USERINFO', data);
            const res = payload.method == 'GET' ? await get(payload) : await post(payload);
            commit('SET_USERINFO', { data: res });
        } catch (error) {
            util.removeStorage('WISH-token');
            //TODO handle the exception
        }
    },
    // 获取用户信息
    getInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getInfo()
                .then(response => {
                    commit('SET_USERINFO', response);
                    resolve(response);
                })
                .catch(error => {
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
