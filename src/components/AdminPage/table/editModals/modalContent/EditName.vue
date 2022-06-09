<template>
  <div class="edit-name-content-div">
    <form
      action="http://localhost:3000/admins/updateOne/name"
      method="post"
      enctype="multipart/form-data"
      @submit.prevent="updateName"
      ref="formElem"
    >
      <label>お名前</label><br />

      <input
        type="text"
        v-model="firstName"
        id="firstName"
        name="firstName"
        :class="{ invalid: !form.isFirstNameValid }"
        @input="onInput('firstName')"
      />
      <span class="validation-msg">{{ errMsgFirstName }}</span>
      <input
        type="text"
        v-model="lastName"
        id="lastName"
        name="lastName"
        :class="{ invalid: !form.isLastNameValid }"
        @input="onInput('lastName')"
      />
      <span class="validation-msg">{{ errMsgLastName }}</span>
      <button type="submit" id="btn-submit-edit-name">確認する</button>
    </form>
  </div>
</template>
<script lang="ts" setup>
import Admin from "@/types/AdminPage/Admin";
import { AxiosStatic } from "axios";
import { reactive, defineProps, inject, defineEmits, ref } from "vue";
import UpdateEventDetail from "@/components/AdminPage/table/editModals/types/UpdateEventDetail";
import * as yup from "yup";
import { setLocale } from "yup";
import * as ja from "yup-locale-ja";
import { useField, useForm } from "vee-validate";
import { getRuntimeConfig } from "@/services/services";

setLocale(ja.suggestive);
interface PropI {
  admin: Admin;
}

const props = defineProps<PropI>();

const emit = defineEmits<{
  (e: "update", detail: UpdateEventDetail): void;
}>();

const formElem = ref<HTMLFormElement | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const axios: any = inject<AxiosStatic>("axios"); // inject axios

const form = reactive({
  isFirstNameValid: true,
  isLastNameValid: true,
});

const simpleSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

const useFormObj = useForm({
  validationSchema: simpleSchema,
});

let { value: firstName, errorMessage: errMsgFirstName } =
  useField<string>("firstName");
let { value: lastName, errorMessage: errMsgLastName } =
  useField<string>("lastName");

function onInput(type: string): void {
  if (type == "firstName") {
    Promise.resolve(useFormObj.validateField("firstName"))
      .then(({ valid }) => {
        form.isFirstNameValid = valid;
      })
      .catch((e: Error) => {
        console.log("err" + e.message);
      });
  } else if (type == "lastName") {
    Promise.resolve(useFormObj.validateField("lastName"))
      .then(({ valid }) => {
        form.isLastNameValid = valid;
      })
      .catch((e: Error) => {
        console.log("err" + e.message);
      });
  }
}

firstName.value = props?.admin?.name.split(" ")[0] ?? "";
lastName.value = props?.admin?.name.split(" ")[1] ?? "";

const updateName = async () => {
  const formData = new FormData();
  formData.append("id", props.admin.id);
  formData.append("firstName", `${firstName.value}`);
  formData.append("lastName", `${lastName.value}`);

  const runtimeConfig = await getRuntimeConfig();
  const api = runtimeConfig.admins.updateAdminFullName;
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
      position: absolute;
      top: 30px;
      width: 200px;
      border-radius: 4px;
      border: 0;
      padding: 7px 15px;
      border: 1px solid #ccc;
      background: transparent;
      &:focus {
        outline: none;
        background: #fafafa;
      }
      &.invalid {
        border-color: #f00 !important;
        box-shadow: 0 0 0 4px rgba(216, 0, 12, 0.2) !important;
      }

      &#firstName {
        left: 0;
      }
      &#lastName {
        right: 0;
      }
    }
    .validation-msg {
      color: red;
      float: left;
      font-size: 10px;
      position: absolute;
      top: 70px;
    }
    > button {
      width: 100%;
      height: 40px;
      width: 150px;
      display: block;
      margin: 0 auto;
      margin-top: 70px;
      background-color: #35cfaa;
      color: #fff;
      border: none;
      border-radius: 4px;
    }
  }
}
</style>
