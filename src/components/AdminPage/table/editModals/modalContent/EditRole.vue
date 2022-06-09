<template>
  <div class="edit-role-content-div">
    <form @submit.prevent="updateRole">
      <label>入力ラベル</label><br />
      <select v-model="selected">
        <option disabled value="">{{ props.admin.role }}</option>
        <option>マスター管理者</option>
        <option>承認者</option>
        <option>メンバー</option>
      </select>
      <button type="submit" id="btn-submit-edit-name">確認する</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import Admin from "@/types/AdminPage/Admin";
import { defineProps, inject, defineEmits, ref } from "vue";
import UpdateEventDetail from "@/types/AdminPage/UpdateEventDetail";
import { getRuntimeConfig } from "@/services/services";

interface PropI {
  admin: Admin;
}

const props = defineProps<PropI>();

const emit = defineEmits<{
  (e: "update", detail: UpdateEventDetail): void;
}>();

const axios: any = inject("axios");

const selected = ref("");

const updateRole = async () => {
  const formData = new FormData();
  formData.append("id", props.admin.id);
  formData.append("role", selected.value);

  const runtimeConfig = await getRuntimeConfig();
  const api = runtimeConfig.admins.updateAdminRole;
  console.log("API", api);

  let response = await axios[api.method](
    runtimeConfig.host +
      api.endpoint.replace(`{${api.params[0]}}`, `${props.admin.id}`),
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  console.log(response);

  if (response?.status == 200) {
    emit("update", {
      statusText: response.statusText,
      status: response.status,
      data: response.data.data,
    });
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/layoutDefault.scss";

.edit-role-content-div {
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

    > select {
      width: 50%;
      height: 40px;
      position: absolute;
      left: 0;
      top: 30px;
      width: 400px;
      border-radius: 4px;
      border: 0;
      padding: 7px 15px;
      border: 1px solid #ccc;
      background: transparent;
      &:focus {
        outline: none;
        background: #fafafa;
      }
    }

    > button {
      width: 100%;
      height: 40px;
      width: 150px;
      display: block;
      margin: 0 auto;
      margin-top: 80px;
      background-color: #35cfaa;
      color: #fff;
      border: none;
      border-radius: 4px;
    }
  }
}
</style>
