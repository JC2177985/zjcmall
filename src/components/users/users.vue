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
    <el-table :data="userlist" style="width: 100%">
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="80">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column prop="create_time" label="创建日期">
            <template slot-scope="userlist">{{userlist.row.create_time | fmtdate}}</template>
        </el-table-column>
        <el-table-column label="用户状态">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" plain circle></el-button>
                <el-button size="mini" type="primary" icon="el-icon-share" plain circle></el-button>
                <el-button size="mini" type="primary" icon="el-icon-delete" plain circle></el-button>
            </template>
        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            query: '',
            pagenum: 1,
            pagesize: 2,
            userlist: [],
            total: -1,
            create_time: '',
            email: '',
            id: '',
            mg_state: true,
            mobile: '',
            role_name: '',
            username: '',
            // tableData: [{
            //     name: '王小虎',
            //     mailbox: '122321@qq.com',
            //     date: '2016-05-02',
            // }, {
            //     name: '王小虎',
            //     mailbox: '122321@qq.com',
            //     date: '2016-05-02',
            // }]
        }
    },
    created() {
        this.getUserList()
    },
    methods: {
        async getUserList() {

            const AUTH_TOKEN = localStorage.getItem('token')
            this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
            const res = await this.$http.get('users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}')
            console.log(res)

            const {
                meta: {
                    status,
                    msg
                },
                data: {
                    users,
                    total
                }
            } = res.data

            if (status === 200) {
                this.userlist = users
                this.total = total
                this.$message.success(msg)
            } else {
                this.$message.warning(msg)
            }

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
