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
        <el-aside class="aside" width="200px">Aside</el-aside>
        <el-main class="main">Main</el-main>
    </el-container>
</el-container>
</template>

<script>
export default {

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
    background: #ccc
}

.main {
    height: 100%;
}
</style>
