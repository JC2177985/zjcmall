<template>
<el-card class="box-card">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>成员管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchRow">
        <el-col>
            <el-input @clear="loadUserList()" placeholder="请输入内容" v-model="query" class="inputSearch" clearable>
                <el-button slot="append" icon="el-icon-search" @click="searchUser()">
                </el-button>
            </el-input>
            <el-button type="success" @click="dialogFormVisible = true">
                新增成员
            </el-button>
        </el-col>
    </el-row>
    <el-table height="250px" :data="userlist" style="width: 100%">
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
                <el-button @click="showEdit()" size="mini" type="primary" icon="el-icon-edit" plain circle>

                </el-button>
                <el-button size="mini" type="primary" icon="el-icon-share" plain circle>

                </el-button>
                <el-button @click="showDelete(scope.row.id)" size="mini" type="primary" icon="el-icon-delete" plain circle>

                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <!-- dialog对话框 -->

    <el-dialog title="添加成员" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.mobile" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="AddUsers()">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 编辑成员-dialog对话框 -->

    <el-dialog title="编辑成员" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.mobile" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="AddUsers()">确 定</el-button>
        </div>
    </el-dialog>

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
            gridData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            dialogTableVisible: false,
            dialogFormVisibleEdit: false,
            dialogFormVisible: false, //false代表不显示对话框
            form: {
                username: '',
                password: '',
                mobile: '',
                email: ''
            },
            formLabelWidth: '120px'
        }
    },
    created() {
        this.getUserList()
    },
    methods: {
        //
        showEdit(){
            this.dialogFormVisibleEdit = true

        },
        //编辑成员
        editUsers () {

        },
        // 删除用户
        showDelete(userId) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                debugger
                const res = await this.$http.delete('users/${userId}')
                console.log(res)
                if (res.data.meta.status === 200)
                    this.getUserList()
                    this.$message({
                        type: 'success',
                        message: res.data.meta.msg
                    });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        async AddUsers() {
            this.dialogFormVisible = false
            const res = await this.$http.post('users', this.form)
            console.log(res)
            const {
                meta: {
                    status,
                    msg
                },
                data
            } = res.data
            if (status == 201) {
                this.$message.success(msg)
                this.getUserList()
                this.form = {}
            } else {
                this.$message.error(msg)
            }

        },
        loadUserList() {
            this.getUserList()
        },
        searchUser() {
            this.getUserList()
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val;
            this.pagenum = 1;
            this.getUserList();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pagenum = val;
            this.getUserList();
        },
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
