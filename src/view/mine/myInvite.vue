<template>
  <div class="container">
    <ul class="invite-list" v-if="inviteList.length > 0">
      <li class="invite-item" v-for="(item, index) in inviteList" :key="index">
        <div class="status">已注册</div>
        <div class="info">
          <div class="left">
            <van-image width="40" height="40" fit="cover" round :src="item.HeadImage"></van-image>
          </div>
          <div class="right">
            <div class="mb5">{{$store.state.user.userInfo.RealName || $store.state.user.userInfo.NickName}}</div>
            <div>
              <van-icon size="16" class="vm mr3" color="#1585F5" name="phone-o" />
              <a class="primary" :href="`tel:${item.Phone}`">{{item.Phone || '-'}}</a>
            </div>
          </div>
        </div>
      </li>
      <li class="nodata">没有更多了</li>
    </ul>
  </div>
</template>

<script>
import { inviteUsers } from "@/api/user";
export default {
  name: "",
  data() {
    return {
      inviteList: []
    };
  },
  methods: {
    inviteUsers() {
      inviteUsers({
        PageIndex: 1,
        PageSize: 999
      }).then(res => {
        this.inviteList = res.Data;
      });
    }
  },
  created() {
    this.inviteUsers();
  }
};
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  top: 0;
  bottom: 48px;
  left: 0;
  right: 0;
  background: #eee;
  overflow-y: auto;
  .invite-list {
    .invite-item {
      background: #fff;
      margin: 10px;
      border-radius: 5px;
      padding: 10px;
      position: relative;
      .status {
        background: #ff976a;
        color: #fff;
        height: 20px;
        position: absolute;
        line-height: 20px;
        text-align: center;
        padding: 0 5px;
        right: 0;
        top: 0;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      .info {
        background: #fff;
        border-radius: 10px; 
        display: flex;
        align-items: center;
        .left {
          width: 60px;
          margin: 5px;
          margin-right: 0px;
        }
        .right {
          font-size: 14px;
        }
      }
    }
  }
}
</style>