<template>
  <el-container class="home-contanier">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="isCollapse ? '64px': '200px' ">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff" :unique-opened="true" :collapse="isCollapse" :collapse-transition="false" router :default-active="$route.path">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + '' " v-for=" item in menuList " :key="item.id" >
            <!-- 一级菜单的模板区域  -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
              <el-menu-item :index=" '/' + subItem.path+'' " v-for=" subItem in item.children " :key="subItem.id">
                <template slot="title">
                 <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menuList: [],
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isCollapse: false
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 点击按钮收起菜单
    toggleCollapse () {
      this.isCollapse = this.isCollapse === false ? this.isCollapse = true : this.isCollapse = false
    },
    // 获取所有菜单
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.home-contanier {
  height: 100%;
}
.el-header,
.el-footer {
  display: flex;
  justify-content: space-between;
  background-color: #373d41;
  color: #ffffff;
  text-align: center;
  line-height: 60px;
  padding-left: 0;
  align-items: center;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
  span {
    margin-left: 15px;
  }
}

.el-aside {
  background-color: #333744;
  color: #333;
  text-align: center;
  line-height: 200px;
  .el-menu{
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.iconfont{
  margin-right: 10px
}

.toggle-button{
  background-color: #4a5064;
  color: #ffffff;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
  letter-spacing: 0.2em;
}
</style>
