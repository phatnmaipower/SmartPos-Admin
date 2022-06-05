<template>
  <div class="edit-name-content-div">
    <form
      action="/admin/update/name"
      method="post"
      enctype="multipart/form-data"
    >
      <label>お名前</label><br />

      <input
        type="text"
        v-model="form.firstName"
        id="firstName"
        name="firstName"
      />
      <input
        type="text"
        v-model="form.lastName"
        id="lastName"
        name="lastName"
      />

      <button type="submit" id="btn-submit-edit-name">確認する</button>
    </form>
  </div>
</template>
<script lang="ts" setup>
import Admin from "@/models/AdminPage/Admin";
import { reactive, defineProps } from "vue";

interface PropI {
  admin: Admin;
}

const props = defineProps<PropI>();

const form = reactive({
  firstName: "",
  lastName: "",
});
form.firstName = props?.admin?.name.split(" ")[0] ?? "";
form.lastName = props?.admin?.name.split(" ")[1] ?? "";
</script>
<style lang="scss" scoped>
@import "@/scss/layoutDefault.scss";

.edit-name-content-div {
  height: $admin-modal-edit-height - $admin-modal-edit-header-height;
  width: $admin-modal-edit-width;
  position: relative;

  > form {
    position: absolute;
    top: 30px;
    left: 30px;
    width: 400px;

    > label {
      width: 400px;
      height: 20px;
    }

    > input {
      width: 50%;
      height: 40px;
      width: 195px;
      &#firstName {
        margin-right: 5px;
      }
      &#lastName {
        margin-left: 5px;
      }
    }

    > button {
      width: 100%;
      height: 40px;
      width: 150px;
      display: block;
      margin: 0 auto;
      margin-top: 35px;
    }
  }
}
</style>
