import { get, post } from "@/utils/request";

/**
 * 添加心愿
 * @param {*} data
 * @returns
 */
export const wishAdd = (data) =>
  post({
    url: "/wish/add",
    data,
  });
