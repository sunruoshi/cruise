<template>
  <el-aside class="hidden-sm-and-down" width="270px">
    <el-menu
      :default-active="activeIndex"
      :router="true"
      background-color="#2d4054"
      text-color="#ccc"
      active-text-color="#00b4cf"
    >
      <el-menu-item index="/dashboard">
        <template #title
          ><i class="icon-dashboard icon-md" /> DASHBOARD</template
        >
      </el-menu-item>
      <el-menu-item index="/">
        <i class="icon-sitemap icon-md" />
        <template #title> AGENT</template>
      </el-menu-item>
      <el-menu-item index="/mycruise">
        <i class="icon-boat icon-md" />
        <template #title> MY CRUISE</template>
      </el-menu-item>
      <el-menu-item index="/help">
        <i class="icon-life-bouy icon-md" />
        <template #title> HELP</template></el-menu-item
      >
    </el-menu>
    <div class="history">
      <h3>History</h3>
      <li v-for="(item, index) in histories" :key="index">
        {{ item }}
      </li>
    </div>
  </el-aside>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Aside",
  components: {},
  props: {},
  computed: {
    ...mapState({
      histories: state => state.histories
    })
  },
  data() {
    return {
      activeIndex: this.$route.path
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.el-menu {
  margin-top: 10px;
  border-right: none;
}
</style>
