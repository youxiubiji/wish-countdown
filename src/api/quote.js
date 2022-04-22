import { get, post } from "@/utils/request";

//获取名言
export const quoteInfo = (data) =>
  get({
    url: "/quote/info",
    data,
  });
