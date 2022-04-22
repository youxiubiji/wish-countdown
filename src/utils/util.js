// storage 读写
const storage = (key, val) => {
  try {
    if (!key || typeof key !== "string") {
      throw new Error("key must be a String");
    }
    if (val != undefined) {
      if (val instanceof Object) {
        val = JSON.stringify(val);
      }
      uni.setStorageSync(key, val);
    } else {
      let value = uni.getStorageSync(key);
      return value;
    }
  } catch (error) {
    console.log(error);
  }
};
// storage 删除
const removeStorage = (key) => {
  if (key == undefined) {
    return;
  }
  uni.removeStorageSync(key);
};
// 提示 可单独导入
export const msg = (text) => {
  if (text && typeof text === "string") {
    uni.showToast({
      title: text,
      icon: "none",
      duration: 1500,
    });
  }
};
// 显示加载框
const showLoad = (text = "加载中...") => {
  if (text && typeof text === "string") {
    uni.showLoading({
      title: text,
      mask: true,
    });
  }
};

// 隐藏加载框
const hideLoad = () => uni.hideLoading();

//显示模态弹窗
export const showModal = (content) => {
  uni.showModal({
    title: "提示",
    content,
    showCancel: false,
  });
};

// 跳转链接地址
const gotoUrl = (url) => {
  uni.navigateTo({
    url,
  });
};
// 格式化时间  date时间对象  fmt时间格式 如yyyy/MM/dd hh:mm:ss
const FmtTime = (date, fmt) => {
	var o = {
		"M+": date.getMonth() + 1, // 月份
		"d+": date.getDate(), // 日
		"h+": date.getHours(), // 小时
		"m+": date.getMinutes(), // 分
		"s+": date.getSeconds(), // 秒
		"q+": Math.floor((date.getMonth() + 3) / 3), // 季度
		S: date.getMilliseconds() // 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(
			RegExp.$1,
			`${date.getFullYear()}`.substr(4 - RegExp.$1.length)
		);
	for (var k in o)
		if (new RegExp(`(${k})`).test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
			);
	return fmt;
};

export default {
  storage,
  removeStorage,
  msg,
  showLoad,
  hideLoad,
  showModal,
  gotoUrl,
  FmtTime
};
