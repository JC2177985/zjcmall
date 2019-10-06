<template>
<el-container class="container">
    <el-header class="header">
        <el-row>
            <el-col :span="4" class="logo">
                <div class="grid-content bg-purple">
                    <h4>FAMILY 欢乐家庭群</h4>
                </div>
            </el-col>
            <el-col :span="18" class="middle">
                <div class="grid-content bg-purple-light">
                    <h3></h3>
                </div>
            </el-col>
            <el-col :span="2" class="btn">
                <div class="grid-content bg-purple">退出</div>
            </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside class="aside" width="200px">
            <el-menu :unique-opened="true" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-submenu index="1" >
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>成员管理</span>
                    </template>

                    <el-menu-item index="1-1">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>

                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                    </template>

                    <el-menu-item index="2-1">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                    <el-menu-item index="2-2">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>

                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>物品管理</span>
                    </template>

                    <el-menu-item index="3-1">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                    <el-menu-item index="3-2">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>

                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订阅管理</span>
                    </template>

                    <el-menu-item index="4-1">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                    <el-menu-item index="4-2">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>

                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据统计</span>
                    </template>

                    <el-menu-item index="5-1">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                    <el-menu-item index="5-2">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>

                </el-submenu>

            </el-menu>

        </el-aside>
        <el-main class="main">Main</el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    beforeCreate(){
      const token = localStorage.getItem('token')
      if(!token){
          this.$router.push({name:'login'})
      }
    }
}
</script>

<style scoped>
.btn {
    line-height: 60px;
    text-align: center;
}

.container {
    height: 100%;
}

.header {
    background: rgb(255, 232, 103);
    /* background-image:url("../../assets/imgs/header.jpg");
    background-repeat: no-repeat;
    background-size:100% 100%; */
}

.aside {
    background: #545c64;
}

.main {
    height: 100%;
}
</style>
