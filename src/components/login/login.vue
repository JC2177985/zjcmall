<template>
<div class="login-wrap">
    <el-form class="login-form" :label-position="labelPosition" :model="formLabelAlign">
        <h2>家庭成员登录</h2>
        <el-form-item>
            <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-button @click.prevent="handleLogin()" class="login-btn" type="primary">登录</el-button>
    </el-form>
</div>
</template>

<script>
export default {
    data() {
        return {
            labelPosition: 'right',
            formLabelAlign: {
                username: '用户名',
                password: '密码'
            }
        };
    },
    methods: {
        async handleLogin() {

            // 优化后的async+await代码
            const res = await  this.$http.post('login', this.formLabelAlign)
             
                const {
                    data,
                    meta: {
                        msg,
                        status
                    }
                } = res.data

                if (status === 200) {
                    localStorage.setItem('token',data.token)
                    this.$message.success(msg)
                    this.$router.push({
                        name: 'home'
                    })
                } else {
                    this.$message.warning(msg)
                }

         

            //原始初步异步代码
            // this.$http.post('login', this.formLabelAlign).then(res => {
            //     console.log(res)
            //     const {
            //         data,
            //         meta: {
            //             msg,
            //             status
            //         }
            //     } = res.data

            //     if (status === 200) {

            //         this.$message.success(msg)
            //         this.$router.push({
            //             name: 'home'
            //         })
            //     } else {
            //         this.$message.warning(msg)
            //     }

            // })

        }
    }
}
</script>

<style scoped>
.login-wrap {
    height: 100%;
    /* background: #ccc; */
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../../assets/imgs/bk.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}

.login-form {
    width: 400px;
    background: #fff;
    border: 1px solid rgb(234, 247, 204);
    border-radius: 5px;
    padding: 30px;
}

.login-btn {
    width: 100%;
    background: rgb(232, 248, 3);
    color: #333;
    border: 0px;
}
</style>
