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
  msg,
  showLoad,
  hideLoad,
};
