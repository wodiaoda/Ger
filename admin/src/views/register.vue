<template>
  <div class="login-container">
    <el-card header="请注册" class="login-card">
      <el-form :model="model" :rules="rules" ref="model">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="Confirmpassword">
          <el-input v-model="model.Confirmpassword" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register('model')">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请填写密码", trigger: "blur" }],
        Confirmpassword: [
          { required: true, message: "请填写确认密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async register(model) {
      this.$refs[model].validate(valid => {
        if (valid) {
          if (this.model.Confirmpassword !== this.model.password) {
            this.$message.error("两次输入密码不一致!");
            console.log(this.model);
          } else {
            this.$http.post("rest/admin_users", this.model).then(() => {
              this.$router.push("/login");
              this.$message({
                type: "success",
                message: "注册成功"
              });
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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