<script>
import store from "@/store";
export default {
  // onLaunch: function () {
  //   console.log("App Launch");
  // },
  // onShow: function () {
  //   console.log("App Show");
  // },
  // onHide: function () {
  //   console.log("App Hide");
  // },
  created() {
    try {
      store.dispatch("user/wxLogin");
    } catch (e) {
			console.log(e);
      //TODO handle the exception
    }
  },
};
</script>

<style>
/*每个页面公共css */
page {
  background-color: #f5f5f5;
}
</style>
