<template>
  <view class="content">
    <view class="empty" v-if="!list.length">
      <view class="text">您还未设置心愿倒计时。</view>
      <view class="text">去创建一个吧。</view>
    </view>
    <view class="list" v-else>
      <uni-list :border="false">
        <uni-swipe-action>
          <uni-swipe-action-item
            v-for="(item, index) in list"
            :key="index"
            :right-options="options"
            @click="swipeClick($event, index, item.id)"
          >
            <uni-list-item
              :border="false"
              :show-extra-icon="true"
              :extra-icon="{ size: '22', type: 'gift' }"
              :title="item.title"
              :rightText="item.date"
              clickable
              @click="goDetail(item.id)"
            />
          </uni-swipe-action-item>
        </uni-swipe-action>
      </uni-list>
    </view>
    <button class="btn" type="primary" @click="goto('/pages/add/index')">
      + 新增心愿倒计时
    </button>
  </view>
</template>

<script>
import { wishAll, wishDel } from "@/api/wish.js";
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
      list: [],
    };
  },
  onLoad() {
    wishAll()
      .then((res) => {
        this.list = res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    swipeClick({ index }, key, id) {
      if (index === 0) {
        uni.navigateTo({
          url: `/pages/add/index?id=${id}`,
        });
      } else {
        wishDel({ id }).then(() => {
          this.list.splice(key, 1);
        });
      }
    },
    goto(url) {
      uni.navigateTo({
        url: url,
      });
    },
    goDetail(id) {
      uni.navigateTo({
        url: `/pages/detail/index?id=${id}`,
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
