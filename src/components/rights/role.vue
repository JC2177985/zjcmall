<template>
<el-card>
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-row class="addrolebtn">
        <el-col>
            <el-button type="info">添加按钮</el-button>
        </el-col>
    </el-row>
    <el-table height="550px" :data="rolelist" style="width: 100%">

        <el-table-column type="expand">
            <template slot-scope="scope">

                <el-row v-for="(item1 , i) in scope.row.children" :key="i">

                    <el-col :span="4">
                        <el-tag @close="deleRight(scope.row,item1.id)" closable>{{item1.authName}}</el-tag>
                        <i class="el-icon-arrow-right"></i>

                    </el-col>
                    <el-col :span="20">
                        <el-row v-for="(item2 , i) in item1.children" :key="i">
                            <el-col :span="4">
                                <el-tag @close="deleRight(scope.row,item2.id)" closable type="warning">{{item2.authName}}</el-tag>
                                <i class="el-icon-arrow-right"></i>
                            </el-col>

                            <el-col :span="20">
                                <el-tag @close="deleRight(scope.row,item3.id)" closable type="danger" v-for="(item3 , i) in item2.children" :key="i">
                                    {{item3.authName}}
                                </el-tag>

                            </el-col>

                        </el-row>
                    </el-col>
                </el-row>
                <span v-if="scope.row.children.length===0">未分配权限</span>
            </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>

        <el-table-column prop="roleName" label="角色名称" width="180">
        </el-table-column>

        <el-table-column prop="roleDesc" label="角色描述" width="180">
        </el-table-column>

        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="showEdit(scope.row)" size="mini" type="primary" icon="el-icon-edit" plain circle>

                </el-button>
                <el-button @click="showDelete(scope.row.id)" size="mini" type="primary" icon="el-icon-delete" plain circle>

                </el-button>

                <el-button @click="showSetRight(scope.row)" size="mini" type="primary" icon="el-icon-share" plain circle>

                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 设置树形的权限 -->
    <el-dialog title="分配权限" :visible.sync="dialogFormSetRight">
        <el-tree ref="tree" :data="roleTree" show-checkbox :props="props" node-key="id" default-expand-all :default-checked-keys="arrcheck">
        </el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormSetRight = false">取 消</el-button>
            <el-button type="primary" @click="setRole()">确 定</el-button>
        </div>
    </el-dialog>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            rolelist: [],
            dialogFormSetRight: false,
            roleTree: [],
            props: {
                label: 'authName',
                children: 'children'
            },
            arrexpand: [],
            arrcheck: [],
            currRoleId: -1
        }
    },
    created() {
        this.getRoleList()
    },
    methods: {
        //设置角色权限
        async setRole() {
            let arr1 = this.$refs.tree.getCheckedKeys()
            let arr2 = this.$refs.tree.getHalfCheckedKeys()

            //vue中两个数组组合在一起的方法
            let arr = [...arr1,...arr2]

            const res = await this.$http.post(`roles/${this.currRoleId}/rights`,{rids:arr.join(',')})
            this.dialogFormSetRight = false
            this.getRoleList()
        },

        async getRoleList() {
            const res = await this.$http.get(`roles`)
            console.log(res)
            this.rolelist = res.data.data
        },

        async deleRight(role, rightid) {
            const res = await this.$http.delete(`roles/${role.id}/rights/${rightid}`)
            role.children = res.data.data
            // this.getRoleList()
        },

        //展开树形菜单
        async showSetRight(role) {
            this.currRoleId = role.id
            this.dialogFormSetRight = true
            const res = await this.$http.get(`rights/tree`)
            this.roleTree = res.data.data
            // var arrtemp1 = []
            // this.roleTree.forEach(item1 => {
            //     arrtemp1.push(item1.id)
            //     item1.children.forEach(item2 => {
            //         arrtemp1.push(item2.id)
            //         item2.children.forEach(item3 => {
            //             arrtemp1.push(item3.id)
            //         })
            //     })

            // });

            // this.arrexpand = arrtemp1;
            var arrtemp2 = []
            role.children.forEach(item1 => {
                // arrtemp1.push(item1.id)
                item1.children.forEach(item2 => {
                    // arrtemp1.push(item2.id)
                    item2.children.forEach(item3 => {
                        arrtemp2.push(item3.id)
                    })
                })

            });

            this.arrcheck = arrtemp2;
        }
    }
}
</script>

<style scoped>
.addrolebtn {
    margin-top: 10px;
}
</style>
