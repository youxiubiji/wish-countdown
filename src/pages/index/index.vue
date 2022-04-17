<template>
  <view class="content">
    <!-- <view class="empty">
      <view class="text">您还未设置心愿倒计时。</view>
      <view class="text">去创建一个吧。</view>
    </view> -->
    <view class="list">
      <!-- 按组使用 -->
      <uni-swipe-action>
        <uni-swipe-action-item
          :right-options="options"
          @click="bindClick"
          @change="swipeChange($event, index)"
        >
          <view>item1</view>
        </uni-swipe-action-item>
      </uni-swipe-action>
    </view>
    <button class="btn" type="primary">+ 新增心愿倒计时</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          text: "取消",
          style: {
            backgroundColor: "#007aff",
          },
        },
        {
          text: "确认",
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
    padding: 100rpx 0 200rpx;
    .text {
      color: #999;
      font-size: 28rpx;
    }
  }
  .btn {
    margin: 20rpx 30rpx;
    box-sizing: border-box;
  }
}
</style>
