import { get, post, put } from "@/utils/request";

/**
 * 获取微信静默登录
 */
export const wxlogin = (data) =>
  post({
    url: "/api/account/wxlogin",
    data,
  });
//获取用户信息
export const getInfo = (data) =>
  get({
    url: "/api/account/info",
    data,
  });
//更新用户头像信息
export const wxUserInfo = (data) =>
  put({
    url: "/api/account/wxUserInfo",
    data,
  });
/**
 * 扫码解析参数
 */
export const wxScan = (data) =>
  get({
    url: "/api/account/wxScan",
    data,
  });

/**
 * 邮箱登录
 */
export const login = (data) =>
  post({
    url: "/api/account/login",
    data,
    isLoad: false,
  });
/**
 * 微信扫码登录注册
 */
export const wxScanLogin = (data) =>
  put({
    url: "/api/account/wxscanLogin",
    data,
  });
/**
 * 更新微信信息
 */
export const wxUpdate = (data) =>
  put({
    url: "/api/account/wxUpdate",
    data,
  });
/**
 * 微信退出
 */
export const wxLogout = (data) =>
  put({
    url: "/api/account/wxLogout",
    data,
  });
