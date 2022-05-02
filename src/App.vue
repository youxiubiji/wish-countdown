<script>
import store from '@/store';
export default {
    onLaunch() {
        try {
            if (store.getters.token) {
                store.dispatch('user/getInfo');
            }
        } catch (error) {}
    },
};
</script>

<style>
/*每个页面公共css */
page {
    background-color: #f5f5f5;
}
uni-list-item {
    width: 100%;
}
</style>
