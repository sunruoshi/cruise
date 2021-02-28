<template>
  <el-container>
    <el-header class="shadow">
      <el-row
        type="flex"
        align="middle"
        justify="space-between"
        style="padding: 10px"
      >
        <el-col :span="8">
          <el-button
            size="large"
            id="navi-btn"
            class="hidden-md-and-up"
            @click="drawer = true"
            ><i class="icon-navicon"
          /></el-button>
          <el-drawer
            v-model="drawer"
            :direction="direction"
            :size="270"
            :with-header="false"
          >
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
          </el-drawer>
        </el-col>
        <el-col :span="8" align="middle" justify="center">
          <img src="../assets/logo/logo.svg" style="height: 30px" />
        </el-col>
        <el-col :span="8" align="end" justify="center">
          <el-dropdown>
            <span>
              <el-avatar icon="el-icon-user-solid" :size="40"></el-avatar>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="icon-id-card" id="text-dropdown">
                  Profile</el-dropdown-item
                >
                <el-dropdown-item icon="icon-sign-in" id="text-dropdown">
                  Sign Out</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <Aside />
      <el-main>
        <div id="statusCard">
          <el-row :gutter="20">
            <el-col :span="8" :xs="12">
              <el-card
                shadow="hover"
                :body-style="cardBuilding"
                class="status-card"
              >
                <el-row type="flex" justify="start">
                  <strong class="status-card-title">Building</strong>
                  <i class="icon-cog icon-bg animated" />
                </el-row>
                <el-row type="flex" justify="end">
                  <strong class="status-card-number">{{
                    countBuilding
                  }}</strong>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="8" :xs="12">
              <el-card
                shadow="hover"
                :body-style="cardIdle"
                class="status-card"
              >
                <el-row type="flex" justify="start">
                  <strong class="status-card-title">Idle</strong>
                  <i class="icon-coffee icon-bg" />
                </el-row>
                <el-row type="flex" justify="end">
                  <strong class="status-card-number">{{
                    countAgents - countBuilding
                  }}</strong>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="8" :xs="24">
              <el-card
                shadow="hover"
                :body-style="{ height: '10vh' }"
                class="status-card"
              >
                <el-row
                  type="flex"
                  justify="space-between"
                  align="middle"
                  class="countAgents"
                >
                  <small style="font-size: 12px">ALL</small>
                  <strong style="font-size: 20px">{{ countAgents }}</strong>
                </el-row>
                <el-row
                  type="flex"
                  justify="space-between"
                  align="middle"
                  class="countAgents"
                >
                  <small style="font-size: 12px">PHYSICAL</small>
                  <strong style="font-size: 20px">{{ countPhysical }}</strong>
                </el-row>
                <el-row
                  type="flex"
                  justify="space-between"
                  align="middle"
                  class="countAgents"
                >
                  <small style="font-size: 12px">VIRTUAL</small>
                  <strong style="font-size: 20px">{{
                    countAgents - countPhysical
                  }}</strong>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <el-input
          class="hidden-sm-and-up"
          prefix-icon="icon-search icon-md-no-margin"
          style="margin-top: 10px"
        />
        <div id="controlBar">
          <el-menu
            default-active="ALL"
            mode="horizontal"
            @select="handleSelect"
            active-text-color="#00b4cf"
          >
            <el-menu-item index="ALL">ALL</el-menu-item>
            <el-menu-item index="Physical">Physical</el-menu-item>
            <el-menu-item index="Virtual">Virtual</el-menu-item>
            <el-menu-item
              id="el-menu-item-input"
              disabled
              class="hidden-xs-only"
            >
              <el-input
                size="small"
                prefix-icon="icon-search icon-md-no-margin"
              />
            </el-menu-item>
            <el-menu-item
              index="Card"
              class="hidden-xs-only"
              id="card-view"
              disabled
            >
              <i class="icon-th-card icon-md-no-margin" />
            </el-menu-item>
            <el-menu-item
              :index="activeAgents"
              class="hidden-xs-only"
              id="list-view"
            >
              <i class="icon-th-list icon-md-no-margin" />
            </el-menu-item>
          </el-menu>
        </div>
        <div id="agents">
          <el-row v-for="(agent, index) in agents" :key="index">
            <Agents :agent="agent" v-if="showAgents(agent)" />
          </el-row>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import { defineAsyncComponent } from "vue";
export default {
  name: "Main",
  components: {
    Agents: defineAsyncComponent(() =>
      import(/* webpackChunkName: "agents" */ "../components/Agents.vue")
    ),
    Aside: defineAsyncComponent(() =>
      import(/* webpackChunkName: "aside" */ "../views/Aside.vue")
    )
  },
  computed: {
    ...mapState({
      agents: state => state.agents,
      histories: state => state.histories
    }),
    countAgents() {
      return this.agents.length;
    },
    countPhysical() {
      let count = 0;
      for (const agent of this.agents) {
        if (agent.physical) count++;
      }
      return count;
    },
    countBuilding() {
      let count = 0;
      for (const agent of this.agents) {
        if (agent.building) count++;
      }
      return count;
    }
  },
  data() {
    return {
      activeIndex: this.$route.path,
      activeAgents: "ALL",
      cardBuilding: {
        background: "#ff9a2a",
        height: "10vh"
      },
      cardIdle: {
        background: "#7fbc39",
        height: "10vh"
      },
      drawer: false,
      direction: "ltr"
    };
  },
  methods: {
    handleSelect(index) {
      this.activeAgents = index;
    },
    showAgents(agent) {
      if (this.activeAgents === "ALL") {
        return true;
      } else if (this.activeAgents === "Physical") {
        return agent.physical;
      } else if (this.activeAgents === "Virtual") {
        return !agent.physical;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
.icon-md-no-margin {
  font-size: 20px;
}
.status-card {
  z-index: 20;
  margin-bottom: 10px;
  margin-top: 10px;
}
.status-card-title {
  font-size: 18px;
  color: #fff;
  z-index: 10;
}
.status-card-number {
  font-size: 48px;
  color: #fff;
  z-index: 10;
}
#el-menu-item-input {
  border-bottom: none;
  opacity: 1;
}
#card-view {
  border-bottom: none;
}
#list-view {
  border-bottom: none;
}
.icon-bg {
  font-size: 144px;
  opacity: 20%;
  z-index: 0;
  position: absolute;
  left: 40%;
  top: -100%;
  color: #fff;
}
.countAgents {
  height: 33.3%;
  padding: 10px, 10px;
}
</style>
