<script>
import store from "@/store";
export default {
  // onLaunch: function () {
  //   try {
  //     store.dispatch("user/wxLogin");
  //   } catch (e) {
  //     console.log(e);
  //     //TODO handle the exception
  //   }
  // },
  created() {
    try {
      if (store.getters.token) {
        store.dispatch("user/getInfo");
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
</style>
