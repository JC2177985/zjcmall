<template>
<el-card>
    <my-bread level1="权限管理" level2="权限列表"></my-bread>

    <el-table  class="right-table" border height="750px" :data="rightslist" style="width: 100%">
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="300">
        </el-table-column>
         <el-table-column prop="path" label="路径" width="300">
        </el-table-column>
         <el-table-column prop="level" label="层级" >
             <template slot-scope="scope">
                 <span v-if="scope.row.level==='0'">一级</span>
                 <span v-if="scope.row.level==='1'">二级</span>
                 <span v-if="scope.row.level==='2'">三级</span>
             </template>
        </el-table-column>
        
    </el-table>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            rightslist:[]
        }
    },
    created() {
        this.getRightList()
    },
    methods: {
        async getRightList() {
            // const AUTH_TOKEN = localStorage.getItem('token')
            // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

            const res = await this.$http.get(`rights/list`)
            console.log(res)
            this.rightslist = res.data.data
        }
    }
}
</script>

<style scoped>
.right-table{
    margin-top:10px;
}
</style>
