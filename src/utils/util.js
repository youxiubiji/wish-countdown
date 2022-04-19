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

export default {
  storage,
  removeStorage,
  msg,
  showLoad,
  hideLoad,
};
