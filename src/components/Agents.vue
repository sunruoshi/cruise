<template>
  <el-card id="agents">
    <el-row>
      <el-col :span="2" class="hidden-lg-and-down">
        <img src="../assets/os_icons/windows.png" />
      </el-col>
      <el-col :xl="22" :lg="24">
        <el-row type="flex" justify="space-between" align="middle">
          <span>
            <i class="icon-desktop icon-md" />
            <span class="domain">{{ agent.domain }}</span>
            <el-tag
              id="tag"
              v-if="this.agent.building"
              size="mini"
              color="#ff9a2a"
              >building</el-tag
            >
            <el-tag id="tag" v-else size="mini" color="#7fbc39">idle</el-tag>
          </span>
          <span>
            <i class="icon-info icon-sm" />
            {{ agent.ip }}
            <i class="icon-folder icon-sm" />
            {{ agent.path }}
          </span>
        </el-row>
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="margin-top: 20px"
        >
          <el-button-group>
            <el-popover
              id="popover"
              placement="right"
              :width="400"
              trigger="click"
            >
              <template #reference>
                <el-button size="mini" id="add-btn"
                  ><i class="icon-plus icon-add"
                /></el-button>
              </template>
              <el-form>
                <el-form-item>
                  <template #label>
                    <span id="text-muted"
                      >Separate multiple resource name with commas</span
                    >
                  </template>
                  <el-input
                    id="pop-input"
                    v-model="formInput"
                    type="text"
                    size="small"
                    placeholder="e.g. Chrome, Firefox"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button id="deny-btn" size="mini" @click="addResources()"
                    >Add Resources</el-button
                  >
                  <el-button id="cancel-btn" size="mini" @click="resetInput()"
                    >Cancel</el-button
                  >
                </el-form-item>
              </el-form>
            </el-popover>
            <el-button
              v-for="(item, index) in tags"
              :key="index"
              size="mini"
              id="delete-btn"
              @click="removeTag(index)"
              >{{ item }} <i class="icon-trash"
            /></el-button>
          </el-button-group>
          <el-button size="mini" id="deny-btn" v-if="agent.building"
            ><i class="icon-deny" /> Deny</el-button
          >
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "Agents",
  components: {},
  props: {
    agent: Object
  },
  data() {
    return {
      tags: ["Firefox", "Safari", "Ubuntu", "Chrome"],
      formInput: "",
      imgSource: `../assets/os_icons/${this.agent.os}.png`
    };
  },
  methods: {
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    addTag(tag) {
      this.tags.push(tag);
    },
    addResources() {
      let add = this.formInput.split(",");
      for (const word of add) {
        this.tags.push(word);
      }
    },
    resetInput() {
      this.formInput = "";
    }
  }
};
</script>

<style lang="scss" scoped></style>
