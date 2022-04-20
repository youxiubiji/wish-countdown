<template>
  <view class="content">
    <view class="list">
      <view class="uni-form-item">
        <view class="title">心愿倒计时名称</view>
        <input
          class="uni-input"
          focus
          v-model="title"
          placeholder-style="color: #999;font-size: 30rpx"
          placeholder="如：高考、项目、纪念日、家人生日等"
        />
      </view>
      <view class="uni-form-item">
        <view class="title">倒计时日期</view>
        <picker mode="date" @change="bindDateChange">
          <input
            class="uni-input"
            :disabled="true"
            v-model="date"
            placeholder-style="color: #999;font-size: 30rpx"
            placeholder="请选择倒计时日期"
          />
        </picker>
      </view>
    </view>
    <view class="btn-auto">
      <button class="btn" type="primary" @click="Save">保存</button>
      <button class="btn" type="default" @click="goto('/pages/add/index')">
        取消
      </button>
    </view>
  </view>
</template>
<script>
import { wishAdd } from "@/api/wish.js";
export default {
  name: "add",
  data() {
    return {
      title: "",
      date: "",
    };
  },
  methods: {
    bindDateChange: function (e) {
      this.date = e.detail.value;
    },
    goto(url) {
      uni.navigateTo({
        url: url,
      });
    },
    // 保存
    Save() {
      console.log(this.title, this.date);
      const { title, date } = this;
      wishAdd({ title, date })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  .list {
    display: flex;
    flex-direction: column;
    .uni-form-item {
      display: flex;
      flex-direction: column;
      .title {
        color: #999;
        font-size: 28rpx;
        padding: 30rpx 30rpx 10rpx;
      }
      .uni-input {
        background-color: #fff;
        height: 90rpx;
        padding: 0 30rpx;
      }
    }
  }
  .btn-auto {
    padding: 100rpx 30rpx;
    display: flex;
    flex-direction: column;
    .btn {
      margin-bottom: 30rpx;
      width: 100%;
    }
  }
}
</style>
