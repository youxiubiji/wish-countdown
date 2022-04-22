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
        <picker
          :value="date"
          mode="date"
          :start="startDate"
          :end="endDate"
          @change="bindDateChange"
        >
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
      <button class="btn" type="default" @click="back">取消</button>
    </view>
  </view>
</template>
<script>
import { wishAdd, wishInfo, wishEdit } from "@/api/wish.js";
export default {
  name: "add",
  data() {
    return {
      title: "",
      date: "",
      id: "",
    };
  },
  computed: {
    startDate() {
      return this.getDate("start");
    },
    endDate() {
      return this.getDate("end");
    },
  },
  onLoad(option) {
    if (option.id) {
      this.id = option.id;
      uni.setNavigationBarTitle({
        title: "修改心愿倒计时",
      });
      wishInfo({ id: option.id }).then((res) => {
        this.title = res.title;
        this.date = res.date;
      });
    } else {
      uni.setNavigationBarTitle({
        title: "新增心愿倒计时",
      });
    }
  },
  methods: {
    /**
     * 心愿日期选择
     */
    bindDateChange: function (e) {
      this.date = e.detail.value;
    },
    // 保存
    Save() {
      if (!this.title) {
        this.$showModal("请输入心愿倒计时名称");
        return;
      }
      if (!this.date) {
        this.$showModal("请选择倒计时日期");
        return;
      }
      const { title, date, id } = this;
      if (id) {
        wishEdit({ id, title, date }).then(() => {
          uni.redirectTo({
            url: `/pages/detail/index?id=${id}`,
          });
        });
      } else {
        wishAdd({ title, date }).then((res) => {
          uni.redirectTo({
            url: `/pages/detail/index?id=${res.id}`,
          });
        });
      }
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (type === "end") {
        year = year + 10;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    },
    back() {
      uni.navigateBack({
        delta: 1,
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
