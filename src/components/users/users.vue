<template>
<el-card class="box-card">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>成员管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchRow">
        <el-col>
            <el-input placeholder="请输入内容" v-model="query" class="inputSearch">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success">
                新增成员
            </el-button>
        </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" >
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="80">
        </el-table-column>
        <el-table-column prop="mailbox" label="邮箱">
        </el-table-column>
        <el-table-column label="电话">
        </el-table-column>
        <el-table-column prop="data" label="创建日期">
        </el-table-column>
        <el-table-column label="用户状态">
        </el-table-column>
        <el-table-column label="操作">
        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            query: ' ',
            pagenum: 1,
            pagesize: 2,
            tableData: [{
                name: '王小虎',
                mailbox: '122321@qq.com',
                date: '2016-05-02',
            }, {
                name: '王小虎',
                mailbox: '122321@qq.com',
                date: '2016-05-02',
            }]
        }
    },
    created() {
        this.getUserList()
    },
    methods:{
        async getUserList() {
            const AUTH_TOKEN = localStorage.getItem('token')
            this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
            const res = await this.$http.get('users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}')
            console.log(res)
        }
    }
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
