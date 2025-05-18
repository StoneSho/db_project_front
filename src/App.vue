<template>
  <div id="app">
    <el-menu :default-active="$route.path" mode="horizontal" router>
      <el-menu-item index="/student">学生管理</el-menu-item>
      <el-menu-item index="/grade">成绩管理</el-menu-item>
      <el-menu-item index="/course">课程管理</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 30px;
}
</style>