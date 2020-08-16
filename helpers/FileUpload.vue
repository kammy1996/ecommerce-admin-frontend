<template>
  <div style="margin:50px 50px">
    <v-form
      method="post"
      @submit.prevent="sendFile"
      enctype="multipart/form-data"
    >
      <input type="file" ref="files" @change="selectedFile" multiple />
      <v-btn small type="submit" color="primary">Upload Image</v-btn>
    </v-form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "FileUpload",
  data() {
    return {
      files: [],
      uploadFiles: [],
    };
  },
  methods: {
    selectedFile() {
      const files = this.$refs.files.files;
      this.uploadFiles = [...this.uploadFiles, ...files];
    },
    async sendFile() {
      const formData = new FormData();
      this.uploadFiles.forEach((file) => {
        formData.append("files", file);
      });
      try {
        let res = await axios.post("api/image/add", formData);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
