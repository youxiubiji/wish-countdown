import { get, post } from "@/utils/request";

/**
 * 获取微信静默登录
 */
export const wxlogin = (data) =>
  post({
    url: "/user/wxlogin",
    data,
  });
//获取用户信息
export const getInfo = (data) =>
  get({
    url: "/user/info",
    data,
  });
