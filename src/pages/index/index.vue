<template>
    <view class="content">
        <view class="empty" v-if="!list.length">
            <view class="text">您还未设置心愿倒计时。</view>
            <view class="text">去创建一个吧。</view>
        </view>
        <view class="list" v-else>
            <uni-list :border="false">
                <uni-swipe-action>
                    <uni-swipe-action-item v-for="(item, index) in list" :key="index" :right-options="options" @click="swipeClick($event, index, item.id, item.title)">
                        <uni-list-item
                            :border="true"
                            :show-extra-icon="true"
                            :extra-icon="{ size: '22', type: 'gift' }"
                            :title="item.title"
                            :rightText="$util.FmtTime(item.date, 'yyyy年MM月dd日')"
                            clickable
                            @click="goDetail(item.id)"
                        />
                    </uni-swipe-action-item>
                </uni-swipe-action>
            </uni-list>
        </view>
        <button class="btn" type="primary" @click="$util.gotoUrl('/pages/add/index')">+ 新增心愿倒计时</button>
    </view>
</template>

<script>
import { wishAll, wishDel } from '@/api/wish.js';
export default {
    name: 'index',
    data() {
        return {
            options: [
                {
                    text: '编辑',
                    style: {
                        backgroundColor: '#007aff',
                    },
                },
                {
                    text: '删除',
                    style: {
                        backgroundColor: '#dd524d',
                    },
                },
            ],
            list: [], //心愿列表
        };
    },
    // 监听页面显示。页面每次出现在屏幕上都触发，
    onShow() {
        wishAll()
            .then(res => {
                this.list = res;
            })
            .catch(() => {});
    },

    methods: {
        /**
         * 滑动操作 0编辑  1删除
         */
        swipeClick({ index }, key, id, title) {
            if (index === 0) {
                this.$util.gotoUrl(`/pages/add/index?id=${id}`);
            } else {
                uni.showModal({
                    content: `确定要删除${title}？`,
                    success: res => {
                        if (res.confirm) {
                            wishDel({ id })
                                .then(() => {
                                    this.list.splice(key, 1);
                                })
                                .catch(() => {});
                        }
                    },
                });
            }
        },
        /**
         * 心愿详情
         */
        goDetail(id) {
            this.$util.gotoUrl(`/pages/detail/index?id=${id}`);
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
