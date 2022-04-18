<template>
  <view class="content">
    <view class="empty">
      <view class="text">您还未设置心愿倒计时。</view>
      <view class="text">去创建一个吧。</view>
    </view>
    <!-- <view class="list">
      <uni-list :border="false">
        <uni-swipe-action>
          <uni-swipe-action-item :right-options="options">
            <uni-list-item
              :border="false"
              :show-extra-icon="true"
              :extra-icon="{ size: '22', type: 'gift' }"
              title="高考倒计时"
              rightText="2022年3月12日"
            />
          </uni-swipe-action-item>
          <uni-swipe-action-item :right-options="options">
            <uni-list-item
              ellipsis="1"
              :show-extra-icon="true"
              :extra-icon="{ size: '22', type: 'gift' }"
              title="列表文字列表文字列表文字列表文字列表文字列表文字列表文字"
              rightText="2022年3月12日"
            />
          </uni-swipe-action-item>
        </uni-swipe-action>
      </uni-list>
    </view> -->
    <button class="btn" type="primary" @click="goto('/pages/add/index')">
      + 新增心愿倒计时
    </button>
  </view>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      options: [
        {
          text: "编辑",
          style: {
            backgroundColor: "#007aff",
          },
        },
        {
          text: "删除",
          style: {
            backgroundColor: "#dd524d",
          },
        },
      ],
    };
  },
  onLoad() {},
  methods: {
    onClick(e) {
      console.log(
        "点击了" +
          (e.position === "left" ? "左侧" : "右侧") +
          e.content.text +
          "按钮"
      );
    },
    swipeChange(e, index) {
      console.log("当前状态：" + e + "，下标：" + index);
    },
    goto(url) {
      uni.navigateTo({
        url: url,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  .empty {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100rpx 0;
    .text {
      color: #999;
      font-size: 28rpx;
    }
  }
  .btn {
    margin: 100rpx 30rpx;
    box-sizing: border-box;
  }
}
</style>
