import util, { msg } from '@/utils/util';
import store from '@/store';

export const baseUrl = 'https://wish.youxiubiji.com';
// export const baseUrl = "http://localhost:5000";
const qs = require('querystring');

// get数据请求
export const get = (opt = {}) => {
    const str = qs.stringify(opt.data);
    const editHeaders = Object.assign(
        {},
        {
            'content-type': 'application/json',
            authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
        },
        opt.headers || {}
    );
    const isLoad = opt.isLoad != undefined ? opt.isLoad : true;
    const showMag = opt.showMag != undefined ? opt.showMag : true;
    isLoad && util.showLoad('加载中');
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}${opt.url}?${str}`,
            header: editHeaders,
            method: 'GET',
            success: async res => {
                isLoad && util.hideLoad();
                if (res.statusCode == 200) {
                    opt.success && opt.success(res.data);
                    if (res.data.code == 200) {
                        resolve(res.data.data);
                    } else if (res.data.code == 401) {
                        util.removeStorage('WISH-token');
                        await store.dispatch('user/wxLogin', { ...opt, method: 'GET' });
                        const { info } = store.getters;
                        resolve(info.data);
                    } else {
                        if (showMag) {
                            msg(res.data.msg);
                        }
                        reject(res.data);
                    }
                } else {
                    msg('sorry，网络开小差了');
                }
            },
            fail: err => {
                opt.fail && opt.fail(err);
                reject(err);
                msg('sorry，网络开小差了');
            },
            complete: err => {
                isLoad && util.hideLoad();
            },
        });
    });
};

// post数据请求
export const post = (opt = {}) => {
    const editHeaders = Object.assign(
        {},
        {
            'content-type': 'application/json',
            authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
        },
        opt.headers || {}
    );
    const isLoad = opt.isLoad != undefined ? opt.isLoad : true;
    const showMag = opt.showMag != undefined ? opt.showMag : true;
    isLoad && util.showLoad('加载中');
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${baseUrl}${opt.url}`,
            data: opt.data || {},
            header: editHeaders,
            method: 'POST',
            success: async res => {
                isLoad && util.hideLoad();
                if (res.statusCode == 200) {
                    opt.success && opt.success(res.data);
                    if (res.data.code == 200) {
                        resolve(res.data.data);
                    } else if (res.data.code == 401) {
                        util.removeStorage('WISH-token');
                        await store.dispatch('user/wxLogin', { ...opt, method: 'POST' });
                        const { info } = store.getters;
                        resolve(info.data);
                    } else {
                        if (showMag) {
                            msg(res.data.msg);
                        }
                        reject(res.data);
                    }
                } else {
                    msg('sorry，网络开小差了');
                }
            },
            fail: err => {
                opt.fail && opt.fail(err);
                reject(err);
                msg('sorry，网络开小差了');
            },
            complete: err => {
                isLoad && util.hideLoad();
            },
        });
    });
};
