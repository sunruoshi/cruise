<template>
  <el-container>
    <el-header class="shadow">
      <el-row type="flex" align="middle" justify="space-between" style="padding: 10px">
        <el-col :span="8">
          <div></div>
        </el-col>
        <el-col :span="8" align="middle" justify="center">
          <img src="../assets/logo/logo.svg" style="height: 30px" />
        </el-col>
        <el-col :span="8" align="end" justify="center">
          <el-dropdown>
            <span>
              <el-avatar icon="el-icon-user-solid" size="40"></el-avatar>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="icon-id-card" id="text-dropdown"> Profile</el-dropdown-item>
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
      <el-aside class="hidden-xs-only" width="270px">
        <el-menu
          :default-active="activeIndex"
          :router="true"
          background-color="#2d4054"
          text-color="#ccc"
          active-text-color="#00b4cf"
        >
          <el-menu-item index="/dashboard">
            <template #title><i class="icon-dashboard icon-md" /> DASHBOARD</template>
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
      <el-main>
        <div id="statusCard">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-card shadow="hover" :body-style="cardBuilding">
                <el-row type="flex" justify="start">
                  <strong style="font-size: 18px; color: #fff">Building</strong>
                </el-row>
                <el-row type="flex" justify="end">
                  <strong style="font-size: 48px; color: #fff">{{ countBuilding }}</strong>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover" :body-style="cardIdle">
                <el-row type="flex" justify="start">
                  <strong style="font-size: 18px; color: #fff">Idle</strong>
                </el-row>
                <el-row type="flex" justify="end">
                  <strong style="font-size: 48px; color: #fff">{{
                    countAgents - countBuilding
                  }}</strong>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover" :body-style="{ height: '10vh' }">
                <el-row type="flex" justify="space-between" align="middle" class="countAgents">
                  <small style="font-size: 12px">ALL</small>
                  <strong style="font-size: 20px">{{ countAgents }}</strong>
                </el-row>
                <el-row type="flex" justify="space-between" align="middle" class="countAgents">
                  <small style="font-size: 12px">PHYSICAL</small>
                  <strong style="font-size: 20px">{{ countPhysical }}</strong>
                </el-row>
                <el-row type="flex" justify="space-between" align="middle" class="countAgents">
                  <small style="font-size: 12px">VIRTUAL</small>
                  <strong style="font-size: 20px">{{ countAgents - countPhysical }}</strong>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </div>
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
            <el-menu-item id="el-menu-item-input" disabled class="hidden-xs-only">
              <el-input size="small" prefix-icon="icon-search icon-md-no-margin" />
            </el-menu-item>
            <el-menu-item index="Card" class="hidden-md-and-down" id="no-border" disabled>
              <i class="icon-th-card icon-md-no-margin" />
            </el-menu-item>
            <el-menu-item :index="activeAgents" class="hidden-md-and-down" id="no-border">
              <i class="icon-th-list icon-md-no-margin" />
            </el-menu-item>
          </el-menu>
        </div>
        <div id="agents">
          <el-row v-for="(agent, index) in agents" :key="index">
            <Agents :agent="agent" v-show="showAgents(agent)" />
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
      }
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
  margin-top: 10px;
  border-right: none;
}
.icon-md-no-margin {
  font-size: 20px;
}
#el-menu-item-input {
  border-bottom: none;
  opacity: 1;
}
#no-border {
  border-bottom: none;
}
#input {
  &:focus {
    border-color: none;
    outline-color: none;
  }
}
.icon-bg {
  font-size: 144px;
  opacity: 20%;
  z-index: -1;
}
.countAgents {
  height: 33.3%;
  padding: 10px, 10px;
}
</style>
