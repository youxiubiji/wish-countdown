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

/**
 *
 * @param {*} data
 * @returns
 */
export const wishEdit = (data) =>
  post({
    url: "/wish/edit",
    data,
  });

/**
 *
 * @param {*} data
 * @returns
 */
export const wishDel = (data) =>
  post({
    url: "/wish/delete",
    data,
  });
/**
 * 获取心愿详情
 * @param {*} data
 * @returns
 */
export const wishInfo = (data) =>
  get({
    url: "/wish/info",
    data,
  });

/**
 * 获取我的全部心愿
 * @param {*} data
 * @returns
 */
export const wishAll = (data) =>
  get({
    url: "/wish/list",
    data,
  });
