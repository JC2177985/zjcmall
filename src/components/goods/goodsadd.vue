<template>
<el-card class="box-card">
    <my-bread level1="商品管理" level2="添加商品"></my-bread>
    <el-alert class="goodsalert" title="添加商品" type="success" center show-icon>
    </el-alert>
    <el-steps class="goodsalert" :active="1*active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
    </el-steps>
    <el-form label-position="top" label-width="80px" :model="form">
        <el-tabs @tab-click="tabChange()" v-model="active" class="goodsalert" tab-position="left" style="height: 500px;overflow:auto;">
            <el-tab-pane name="1" label="基本信息">
                <el-form-item label="商品名称">
                    <el-input v-model="form.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="form.goods_price"></el-input>
                </el-form-item>
                <el-form-item label="商品重量">
                    <el-input v-model="form.goods_weight"></el-input>
                </el-form-item>
                <el-form-item label="商品数量">
                    <el-input v-model="form.goods_number"></el-input>
                </el-form-item>
                <el-form-item label="商品分类">
                    <el-cascader clearable expandTrigger="hover" v-model="selectedOptions" :options="options" :props="defaultProp" @change="handleChange"></el-cascader>
                </el-form-item>

            </el-tab-pane>
            <el-tab-pane name="2" label="商品参数">
                <!-- <el-form-item :label="item1.attr_name" v-for="(item1,i) of arrDtparams" :key="i">
                        <el-checkbox-group  size="small" >
                            <el-checkbox v-for="(item2,i) of item1.attr_vals" label="item2" border :key="i"></el-checkbox>
                        </el-checkbox-group>

                </el-form-item> -->

            </el-tab-pane>
            <el-tab-pane name="3" label="商品属性">角色管理</el-tab-pane>
            <el-tab-pane name="4" label="商品图片">
                <el-form-item>
                <el-upload 
                class="upload-demo" 
                action="http://localhost:8888/api/private/v1/upload" 
                :headers="headers"
                :on-preview="handlePreview" 
                :on-remove="handleRemove" 
                :on-success="handleSuccess"
                :file-list="fileList" 
                list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="5" label="商品内容">
                <el-form-item>
                    <el-button type="primse" @click="addGoods()">点我添加商品</el-button>
                    <quill-editor v-model="form.goods_introduce">

                    </quill-editor>
                </el-form-item>
            </el-tab-pane>
        </el-tabs>
    </el-form>
</el-card>
</template>

<script>

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import {quillEditor} from 'vue-quill-editor'


export default {
    components: {
        quillEditor
    },
    data() {
        return {
            tabPosition: 'left',
            active: "1",
            form: {
                goods_name: '',
                goods_cat: '',
                goods_price: '',
                goods_number: '',
                goods_weight: '',
                goods_introduce: '',
                pics: [],
                attrs: []
            },
            options: [],
            selectedOptions: [1, 3, 6],
            defaultProp: {
                label: 'cat_name',
                value: 'cat_id',
                children: 'children'
            },
            arrDtparams: [],
            arrJtparams: [],
            headers: {
                Authorization:localStorage.getItem('token')
            }
        };
    },
    created() {
        this.getGoodsCate()
    },
    methods: {

        async addGoods() {
            this.form.goods_cat = this.selectedOptions.join(',')

            //动态参数数据
            let arr1 = this.arrDtparams.map((item)=>{

                return {attr_id:item.attr_id,attr_value:item.attr_vals}
            })

            //静态参数数据
            let arr2 = this.arrJtparams.map((item)=>{

                return {attr_id:item.attr_id,attr_value:item.attr_vals}
            })

            this.form.attrs = [...arr1,...arr2]

            const res = await this.$http.post(`goods`,this.form)

            //添加商品成功，返回到商品列表页
            this.$router.push({name:'goods'})


        },

        handlePreview() {},
        handleRemove(file) {
            //快速找索引的方法findIndex() 自带的方法 遍历数组，返回索引值
            let Index = this.form.pics.findIndex((item)=>{
                return item.pic === file.response.data.tmp_path

            })

            this.form.pics.splice(Index,1)
            console.log(this.form.pics)
            
        },
        handleSuccess(file) {
            this.form.pics.push({
                pic:file.data.tmp_path
            })
        },

        handleChange() {

        },
        async getGoodsCate() {
            const res = await this.$http.get(`categories?type=3`)
            //options 要赋值
            this.options = res.data.data
        },

        async tabChange() {
            if (this.active === "2") {
                if (this.selectedOptions.length !== 3) {
                    this.$message.warning('请选择三级分类')
                    return
                }
                //动态参数
                const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
                console.log(res)
                this.arrDtparams = res.data.data
            }

            if (this.active === '3') {
                if (this.selectedOptions.length !== 3) {
                    this.$message.warning('请选择三级分类')
                    return
                }
                //静态参数
                const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
                this.arrJtparams = res.data.data
                console.log(res)

            }

        },

    }
}
</script>

<style >
.ql-editor{
    min-height: 50px;
}
.box-card {
    height: 100%;
}

.goodsalert {
    margin-top: 20px;
}
</style>
