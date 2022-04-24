<template>
  <view class="content">
    <view class="box">
      <view class="title">{{ $util.FmtTime(date, "yyyy年MM月dd日") }}</view>
      <view class="date"> {{ timeDay }}<text>天</text> </view>
      <view class="quotes">
        <view class="list"> {{ content }} </view>
        <view v-if="author" class="author">---《{{ author }}》</view>
      </view>
    </view>
    <view class="menu" v-if="isMMine">
      <text @click="goEdit">修改</text>
      <text @click="goDel">删除</text>
      <!-- <text>保存到相册</text> -->
    </view>
    <view class="btn-auto">
      <button v-if="isMMine" class="btn" type="primary" open-type="share">
        转发到群或好友
      </button>
      <button v-else class="btn" type="primary" @click="focusWish">
        关注此心愿
      </button>
      <button class="btn" type="default" @click="myHome">
        查看我的心愿倒计时
      </button>
    </view>
    <view class="note">*下拉可切换名言</view>
  </view>
</template>
<script>
import { wishInfo, wishDel } from "@/api/wish.js";
import { quoteInfo } from "@/api/quote.js";
export default {
  name: "",
  data() {
    return {
      id: "",
      date: "",
      title: "",
      isMMine: false,
      timeDay: 0,
      content: "",
      author: "",
    };
  },
  onLoad(option) {
    if (option.id) {
      this.id = option.id;
      wishInfo({ id: option.id }).then((res) => {
        if (!res) {
          return;
        }
        this.title = res.title;
        this.date = res.date;
        uni.setNavigationBarTitle({
          title: res.title,
        });
        if (res.userId === this.$store.getters.info.id) {
          this.isMMine = true;
        }
        let endTime =
          new Date(res.date).getTime() / 1000 -
          parseInt(new Date().getTime() / 1000);
        this.timeDay =
          parseInt(endTime / 60 / 60 / 24) > 0
            ? parseInt(endTime / 60 / 60 / 24)
            : 0; //相差天数
      });
      this.getQuoteInfo();
    }
  },
  methods: {
    /**
     * 关注此心愿
     */
    focusWish() {
      const { title, date } = this;
      wishAdd({ title, date }).then(() => {
        uni.reLaunch({
          url: "/pages/index/index",
        });
      });
    },
    /**
     * 编辑心愿
     */
    goEdit() {
      this.$util.gotoUrl(`/pages/add/index?id=${this.id}`);
    },
    /**
     * 心愿删除
     */
    goDel() {
      uni.showModal({
        content: "要删除这个心愿倒计时？",
        success: (res) => {
          if (res.confirm) {
            wishDel({ id: this.id }).then(() => {
              uni.reLaunch({
                url: "/pages/index/index",
              });
            });
          }
        },
      });
    },
    // 我的心愿列表
    myHome() {
      uni.reLaunch({
        url: "/pages/index/index",
      });
    },
    // 获取名言
    getQuoteInfo() {
      quoteInfo().then((res) => {
        this.content = res.content;
        this.author = res.author;
        uni.stopPullDownRefresh();
      });
    },
  },
  onPullDownRefresh() {
    this.getQuoteInfo();
  },
  onShareAppMessage(res) {
    return {
      title: `距${this.title}还有`,
      path: `/pages/detail/index?id=${this.id}`,
    };
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
      padding: 80rpx 30rpx;
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
