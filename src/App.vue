<template>
  <el-container>
    <div id="app" class="app">
      <router-view name="Main" />
    </div>
  </el-container>
</template>

<style lang="scss">
$warning: #ff9a2a;
$success: #7fbc39;
$light-primary: #00b4cf;
$dark-primary: #01869a;
$light-secondary: #435466;
$dark-secondary: #2d4054;
$light-gray: #f3f3f3;
$dark-gray: #e1e4e6;

%margin-common {
  margin-top: 60px;
}

%button-common {
  background-color: $light-primary;
  border: none;
  color: $light-gray;
  border-radius: 0;
  &:hover {
    background-color: $dark-primary;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: auto;
}
#controlBar {
  padding-top: 20px;
}
.shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-container {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
}
.el-header {
  z-index: 999;
}
.el-aside {
  @extend %margin-common;
  background-color: $dark-secondary;
  color: #ccc;
  width: auto;
}
.el-main {
  @extend %margin-common;
  background-color: #eee;
}
.history {
  padding: 10px;
  line-height: 20px;
}
h3 {
  font-size: 24;
}
li {
  font-size: 12px;
  font-weight: bold;
  color: #999;
  &:hover {
    color: $light-primary;
  }
}
.icon-md {
  font-size: 20px;
  margin-right: 10px;
}
.icon-sm {
  font-size: 16px;
  margin-right: 5px;
}
.domain {
  font-weight: bold;
  color: $light-primary;
  margin-right: 10px;
}
#add-btn {
  @extend %button-common;
  font: 18px;
  margin-right: 10px;
}
#delete-btn {
  background-color: #efefef;
  font-weight: bold;
  border: none;
  margin-right: 10px;
  &:hover {
    color: $light-primary;
  }
  border-radius: 0;
}
#deny-btn {
  @extend %button-common;
  font: 14px;
  font-weight: bold;
}
#cancel-btn {
  background-color: $light-secondary;
  border: none;
  color: $light-gray;
  border-radius: 0;
  font: 14px;
  font-weight: bold;
  &:hover {
    background-color: $dark-secondary;
  }
}
#agents {
  margin-top: 10px;
  width: 100%;
}
#tag {
  color: $light-gray;
  border: none;
  font-weight: bold;
  border-radius: 0;
}
#text-muted {
  color: &$dark-gray;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  opacity: 70%;
  font-weight: bold;
}
#text-dropdown {
  color: &$dark-gray;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
}
#popover {
  box-shadow: 0 3 5px (#000, 30%);
  border: 3px;
  border-color: $light-primary;
}
#pop-input {
  color: $light-primary;
}
</style>
