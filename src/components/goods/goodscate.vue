<template>
<el-card class="box-card">
    <my-bread level1="商品列表" level2="商品分类"></my-bread>
    <el-button class="alert" type="success" @click="addGoods()">添加分类</el-button>

    <!-- 表格的树形展开 -->
    <el-table height="450px" :data="list" style="width: 100%">
        <!-- <el-table-column label="分类名称" prop="cat_name">

        </el-table-column> -->
        <el-tree-grid prop="cat_name" label="分类">

        </el-tree-grid>
        <el-table-column label="级别">
            <template slot-scope="scope">
                <span v-if="scope.row.level==='0'">一级</span>
                <span v-else-if="scope.row.level==='1'">二级</span>
                <span v-else-if="scope.row.level==='2'">三级</span>
            </template>
        </el-table-column>
        <el-table-column label="是否有效">
            <template slot-scope="scope">
                <span v-if="scope.row.cat_deleted===false">有效</span>
                <span v-else-if="scope.row.cat_deleted===true">无效</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="showEdit(scope.row)" size="mini" type="primary" icon="el-icon-edit" plain circle>

                </el-button>
                <el-button @click="showSetUserRole(scope.row)" size="mini" type="primary" icon="el-icon-share" plain circle>

                </el-button>
                <el-button @click="showDelete(scope.row.id)" size="mini" type="primary" icon="el-icon-delete" plain circle>

                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <!-- 添加分类的对话框 -->
     <el-dialog title="添加分类" :visible.sync="dialogGoosEdit">
        <el-form :model="catelist">
            <el-form-item label="分类名称" label-width="100px">
                {{cat_name}}
            </el-form-item>
            <el-form-item label="分类" label-width="100px">
                <el-select v-model="currRoleId" placeholder="请选择角色">
                    <el-option label="请选择" :value="-1"></el-option>
                    <el-option :label="item.roleName" :value="item.id" v-for="(item,i) in roles" :key="i"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormSetUser = false">取 消</el-button>
            <el-button type="primary" @click="setRole()">确 定</el-button>
        </div>
    </el-dialog>

</el-card>
</template>

<script>
//引入树形结构-页面您局部引入插件的方法。（插件也称为扩展）
var ElTreeGrid = require("element-tree-grid");

export default {
    components: {
        ElTreeGrid
    },
    data() {
        return {
            list: [],

            dialogGoosEdit: false,
            catelist: []
        }
    },
    methods:{
        async addGoods() {

            const res = await this.$http.get(`categories?type=2`)
            this.catelist = res.data.data

            this.dialogGoosEdit = true
        }
    }
}
</script>

<style scoped>
.alert {
    margin-top: 20px;
}

.box-card {
    height: 100%;
}
</style>
