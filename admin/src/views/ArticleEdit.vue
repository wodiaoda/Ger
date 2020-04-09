<template>
  <div class="about">
    <h1>{{id ? "编辑" : "新建"}}文章</h1>
    <el-Form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-Form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/articles", this.model);
      }

      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCatgories() {
      const res = await this.$http.get(`/rest/categories`);
      this.categories = res.data;
    },

    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      const formData = new FormData();
      // file文件对象
      //cursorLocation 光标位置
      //Editor编辑器
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader(); //重置上传器
    }
  },
  components: {
    VueEditor
  },
  created() {
    this.fetchCatgories();
    this.id && this.fetch();
  }
};
</script>
