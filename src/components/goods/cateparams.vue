<template>
<el-card class="box-card">

    <my-bread level1="成员管理" level2="用户列表"></my-bread>
    <el-alert class="alert" title="只允许为第三级分类设置参数" type="error"></el-alert>
    <el-form class="alert" label-position="left" label-width="80px">
        <el-form-item label="商品分类">
            <el-cascader :show-all-levels="false" clearable expandTrigger="hover" v-model="selectedOptions" :options="options" :props="defaultProp" @change="handleChange"></el-cascader>
        </el-form-item>
    </el-form>

    <el-tabs @tab-click="handleClick" v-model="active">
        <el-tab-pane label="动态参数" name="1">
            <el-button type="danger">设置动态参数</el-button>
            <el-table :data="arrDtparams" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="scope" label="#">
                        <el-tag :key="tag" v-for="tag in scope.row.attr_vals" closable :disable-transitions="false" @close="handleClose(scope.row.attr_vals,scope.row.attr_id,scope.row.attr_name,tag)">
                            {{tag}}
                        </el-tag>
                        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row.attr_vals,scope.row.attr_id,scope.row.attr_name)" @blur="handleInputConfirm(scope.row.attr_vals,scope.row.attr_id,scope.row.attr_name)">
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="属性名称" prop="attr_name">

                </el-table-column>
                <el-table-column label="操作" prop="name">
                    <template slot-scope="scope">
                        <el-button @click="showEdit(scope.row)" size="mini" type="primary" icon="el-icon-edit" plain circle>

                        </el-button>

                        <el-button @click="showDelete(scope.row.id)" size="mini" type="primary" icon="el-icon-delete" plain circle>

                        </el-button>
                    </template>

                </el-table-column>
            </el-table>

        </el-tab-pane>
        <el-tab-pane label="静态参数" name="2">
            <el-button type="danger">静态参数</el-button>
            <el-table :data="arrJtparams" style="width: 100%">
                <el-table-column  label="#" type="index">
                </el-table-column>
                <el-table-column label="属性名称" prop="attr_name">

                </el-table-column>
                <el-table-column label="属性值" prop="attr_vals">

                </el-table-column>
                <el-table-column label="操作" prop="name">
                    <template slot-scope="scope">
                        <el-button @click="showEdit(scope.row)" size="mini" type="primary" icon="el-icon-edit" plain circle>

                        </el-button>

                        <el-button @click="showDelete(scope.row.id)" size="mini" type="primary" icon="el-icon-delete" plain circle>

                        </el-button>
                    </template>

                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>

</el-card>
</template>

<script>
export default {
    data() {
        return {
            active: "1",
            options: [],
            selectedOptions: [],
            defaultProp: {
                label: 'cat_name',
                value: 'cat_id',
                children: 'children'
            },
            arrDtparams: [],
            arrJtparams: [],
            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: ''
        }
    },
    created() {
        this.getGoodsCate()
    },
    methods: {
        async handleClick() {
            if (this.active === "2") {
                if (this.selectedOptions.length === 3) {
                    //静态参数
                    //静态参数
                    const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
                    this.arrJtparams = res.data.data

                    //数组才能在v-for中遍历，所以一定要将字符串变为数组
                    this.arrJtparams.forEach(item => {
                        item.attr_vals =
                            item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(",")
                    })

                    console.log(res)

                }
            }

        },
        
        async handleChange() {
            if (this.selectedOptions.length === 3) {
                //动态参数
                const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
                this.arrDtparams = res.data.data

                //数组才能在v-for中遍历，所以一定要将字符串变为数组
                this.arrDtparams.forEach(item => {
                    item.attr_vals =
                        item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(",")
                })

                console.log(this.arrDtparams)

            }

        },

        async getGoodsCate() {
            const res = await this.$http.get(`categories?type=3`)
            //options 要赋值
            this.options = res.data.data
        },

        //tag 移除 splice
        async handleClose(attr_vals, attr_id, attr_name, tag) {
            attr_vals.splice(attr_vals.indexOf(tag), 1);

            let putData = {
                attr_name: attr_name,
                attr_sel: 'many',
                //修改为字符串
                attr_vals: attr_vals.join(",")
            }

            const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${attr_id}`, putData)

        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        async handleInputConfirm(attr_vals, attr_id, attr_name) {
            let inputValue = this.inputValue;
            if (inputValue) {
                attr_vals.push(inputValue);

                let putData = {
                    attr_name: attr_name,
                    attr_sel: 'many',
                    //修改为字符串
                    attr_vals: attr_vals.join(",")
                }

                const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${attr_id}`, putData)
            }
            this.inputVisible = false;
            this.inputValue = '';
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

.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>
