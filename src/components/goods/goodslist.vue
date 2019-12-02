<template>
    <el-card class="box-card">
        <my-bread level1="商品管理" level2="商品列表"></my-bread>
        <el-row class="searchRow">
        <el-col>
            <el-input @clear="loadUserList()" placeholder="请输入内容" v-model="query" class="inputSearch" clearable>
                <el-button slot="append" icon="el-icon-search" @click="searchUser()">
                </el-button>
            </el-input>
            <el-button type="success" @click="$router.push({name:'goodsadd'})" plain>
                添加商品
            </el-button>
        </el-col>
    </el-row>
    </el-card>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.box-card {
    height: 100%;
}

.inputSearch {
    width: 300px;
}

.searchRow {
    margin-top: 20px;
}
</style>