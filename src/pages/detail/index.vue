<template>
  <view class="content">
    <view class="box">
      <view class="title">2022年11月11日</view>
      <view class="date"> 3081<text>天</text> </view>
      <view class="quotes">
        <view class="list"> 任务善志，虽勇必伤。 </view>
        <view class="author">---《座右铭》</view>
      </view>
    </view>
    <view class="menu">
      <text>修改</text>
      <text>删除</text>
      <text>保存到相册</text>
    </view>
    <view class="btn-auto">
      <button class="btn" type="primary" open-type="share">
        转发到群或好友
      </button>
      <button class="btn" type="default">查看我的心愿倒计时</button>
    </view>
    <view class="note">*下拉可切换名言</view>
  </view>
</template>
<script>
import { wishInfo } from "@/api/wish.js";
export default {
  name: "",
  data() {},
  onLoad(option) {
    if (option.id) {
      this.id = option.id;
      wishInfo({ id: option.id }).then((res) => {
        uni.setNavigationBarTitle({
          title: res.title,
        });
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  .box {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    .title {
      color: #333;
      font-size: 30rpx;
      padding: 20rpx 60rpx;
    }
    .date {
      padding-top: 40rpx;
      text-align: center;
      font-size: 220rpx;
      color: red;
      font-weight: bold;
      text {
        font-size: 60rpx;
      }
    }
    .quotes {
      padding: 100rpx 30rpx;
      display: flex;
      flex-direction: column;
      font-size: 28rpx;
      color: #999;
      .list {
        display: flex;
        line-height: 45rpx;
        justify-content: center;
      }
      .author {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .menu {
    padding: 0 30rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text {
      font-size: 28rpx;
      color: #888;
      padding-left: 60rpx;
    }
  }
  .btn-auto {
    padding: 20rpx 30rpx;
    display: flex;
    flex-direction: column;
    .btn {
      margin-bottom: 30rpx;
      width: 100%;
    }
  }
  .note {
    padding: 0 30rpx;
    font-size: 20rpx;
    color: #aaa;
  }
}
</style>
