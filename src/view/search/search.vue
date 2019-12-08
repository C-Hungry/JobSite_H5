<template>
  <div class="search">
    <van-search
      class="ml5 mr10"
      v-model="keyword"
      autofocus
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearch"
      @cancel="onCancel"
    />
    <div class="hot-label">热门标签</div>
    <div class="label-list">
      <van-tag
        size="medium"
        round
        color="#c8c8c8"
        class="mr15 mb10"
        v-for="(item, index) in labelList"
        :key="index"
        @click="onSearchByLabel(item)"
      >{{item}}</van-tag>
    </div>
    <div class="no-data" v-if="labelList.length == 0">暂无热门标签</div>
  </div>
</template>

<script>
import { getJobKeyWordsList } from "@/api/home";
export default {
  name: "",
  data() {
    return {
      keyword: "",
      labelList: [
        "长加班",
        "不体检",
        "非流水线",
        "吃住在厂",
        "大龄工",
        "坐班多",
        "工时高",
        "不穿无尘服",
        "不查案底",
        "临时证件",
        "不查字母"
      ]
    };
  },
  methods: {
    onSearch() {
      this.$router.push({
        path: 'jobList',
        query: {
          // keywords: keywords
          keywords: this.keyword
        }
      })
    },
    onSearchByLabel(keywords) {
      this.$router.push({
        path: 'jobList',
        query: {
          keywords: keywords
        }
      })
    },
    onCancel() {
      this.$router.go(-1);
    },
    getHotLabel() {}
  },
  created() {
    this.getHotLabel();
  }
};
</script>

<style lang="less" scoped>
.hot-label {
  margin: 10px 15px;
  font-size: 14px;
}
.no-data {
  margin: 15px;
  font-size: 14px;
  color: #aaa;
}
.label-list {
  margin: 15px;
}
</style>