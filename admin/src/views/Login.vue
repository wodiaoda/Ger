<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="primary" @click="register">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
   async login(){
    this.$http.post("login",this.model).then(data=>{
      // sessionStorage.token = res.data.token 页面存储
      localStorage.token = data.data.token //本地存储
      this.$router.push('/')
      this.$message({
        type:"success",
        message:"登陆成功"
      })
    })
    },
    register(){
      this.$router.push("/register")
    }
  }
};
</script>

<style>
.login-card {
  width: 30rem;
  margin: 5rem auto;
}
</style>