import util, { msg } from "@/utils/util";
import store from "@/store";

export const baseUrl = "https://api.youxiubiji.com";
// export const baseUrl = 'http://localhost:3000';
const qs = require("querystring");

// get数据请求
export const get = (opt = {}) => {
  const str = qs.stringify(opt.data);
  const editHeaders = Object.assign(
    {},
    {
      "content-type": "application/json",
      authorization: store.getters.token ? `Bearer ${store.getters.token}` : "",
    },
    opt.headers || {}
  );
  const isLoad = opt.isLoad != undefined ? opt.isLoad : true;
  const showMag = opt.showMag != undefined ? opt.showMag : true;
  isLoad && util.showLoad("加载中");
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${baseUrl}${opt.url}?${str}`,
      header: editHeaders,
      method: "GET",
      success: async (res) => {
        isLoad && util.hideLoad();
        if (res.statusCode == 200) {
          opt.success && opt.success(res.data);
          if (res.data.code == 200) {
            resolve(res.data.data);
          } else if (res.data.code == 401 || res.data.code == 405) {
            util.removeStorage("YXBJ-token");
            await store.dispatch("user/logout");
            // #ifdef MP-WEIXIN
            store.dispatch("user/wxLogin");
            // #endif
          } else {
            if (showMag) {
              msg(res.data.msg);
            }
            reject(res.data);
          }
        } else {
          msg("sorry，网络开小差了");
        }
      },
      fail: (err) => {
        opt.fail && opt.fail(err);
        reject(err);
        msg("sorry，网络开小差了");
      },
      complete: (err) => {
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
      "content-type": "application/json",
      authorization: store.getters.token ? `Bearer ${store.getters.token}` : "",
    },
    opt.headers || {}
  );
  const isLoad = opt.isLoad != undefined ? opt.isLoad : true;
  const showMag = opt.showMag != undefined ? opt.showMag : true;
  isLoad && util.showLoad("加载中");
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${baseUrl}${opt.url}`,
      data: opt.data || {},
      header: editHeaders,
      method: "POST",
      success: async (res) => {
        isLoad && util.hideLoad();
        if (res.statusCode == 200) {
          opt.success && opt.success(res.data);
          if (res.data.code == 200) {
            resolve(res.data.data);
          } else if (res.data.code == 401 || res.data.code == 405) {
            util.removeStorage("YXBJ-token");
            await store.dispatch("user/logout");
            // #ifdef MP-WEIXIN
            store.dispatch("user/wxLogin");
            // #endif
          } else {
            if (showMag) {
              msg(res.data.msg);
            }
            reject(res.data);
          }
        } else {
          msg("sorry，网络开小差了");
        }
      },
      fail: (err) => {
        opt.fail && opt.fail(err);
        reject(err);
        msg("sorry，网络开小差了");
      },
      complete: (err) => {
        isLoad && util.hideLoad();
      },
    });
  });
};

// put数据请求
export const put = (opt = {}) => {
  const editHeaders = Object.assign(
    {},
    {
      "content-type": "application/json",
      authorization: `Bearer ${store.getters.token}`,
    },
    opt.headers || {}
  );
  const isLoad = opt.isLoad != undefined ? opt.isLoad : true;
  const showMag = opt.showMag != undefined ? opt.showMag : true;
  isLoad && util.showLoad("加载中");
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${baseUrl}${opt.url}`,
      data: opt.data || {},
      header: editHeaders,
      method: "PUT",
      success: async (res) => {
        isLoad && util.hideLoad();
        if (res.statusCode == 200) {
          opt.success && opt.success(res.data);
          if (res.data.code == 200) {
            resolve(res.data.data);
          } else if (res.data.code == 401 || res.data.code == 405) {
            util.removeStorage("YXBJ-token");
            await store.dispatch("user/logout");
            // #ifdef MP-WEIXIN
            store.dispatch("user/wxLogin");
            // #endif
          } else {
            if (showMag) {
              msg(res.data.msg);
            }
            reject(res.data);
          }
        } else {
          msg("sorry，网络开小差了");
        }
      },
      fail: (err) => {
        opt.fail && opt.fail(err);
        reject(err);
        msg("sorry，网络开小差了");
      },
      complete: (err) => {
        isLoad && util.hideLoad();
      },
    });
  });
};
