<template>
  <div class="edit-password-content-div">
    <form @submit.prevent="updatePassword" ref="formElem">
      <div id="password-div">
        <label>お名前</label>
        <input
          type="password"
          v-model="password"
          id="password"
          name="password"
          :class="{ invalid: !form.isFirstNameValid }"
          @input="onInput('password')"
        />
        <span class="validation-msg">{{ errMsgFirstName }}</span>
      </div>
      <div id="passwordConfirm-div">
        <label>お名前</label>
        <input
          type="password"
          v-model="passwordConfirm"
          id="passwordConfirm"
          name="passwordConfirm"
          :class="{ invalid: !form.isLastNameValid }"
          @input="onInput('passwordConfirm')"
        />
        <span class="validation-msg">{{ errMsgLastName }}</span>
      </div>
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
  password: yup.string().required().min(4),
  passwordConfirm: yup
    .string()
    .required()
    .min(4)
    .oneOf([yup.ref("password"), null], "パスワードが一致しません。"),
});

const useFormObj = useForm({
  validationSchema: simpleSchema,
});

let { value: password, errorMessage: errMsgFirstName } =
  useField<string>("password");
let { value: passwordConfirm, errorMessage: errMsgLastName } =
  useField<string>("passwordConfirm");

function onInput(type: string): void {
  if (type == "password") {
    Promise.resolve(useFormObj.validateField("password"))
      .then(({ valid }) => {
        form.isFirstNameValid = valid;
      })
      .catch((e: Error) => {
        console.log("err" + e.message);
      });
  }
  if (type == "passwordConfirm") {
    Promise.resolve(useFormObj.validateField("passwordConfirm"))
      .then(({ valid }) => {
        form.isLastNameValid = valid;
      })
      .catch((e: Error) => {
        console.log("err" + e.message);
      });
  }
}

password.value = props?.admin?.password ?? "";
passwordConfirm.value = props?.admin?.password ?? "";

const updatePassword = async () => {
  const formData = new FormData();
  formData.append("id", props.admin.id);
  formData.append("password", `${password.value}`);
  formData.append("passwordConfirm", `${passwordConfirm.value}`);

  const runtimeConfig = await getRuntimeConfig();
  const api = runtimeConfig.admins.updateCurrentAdminPassword;
  console.log("API", api);

  let response = await axios[api.method](
    runtimeConfig.host + api.endpoint,
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

.edit-password-content-div {
  height: $admin-modal-edit-height - $admin-modal-edit-header-height;
  width: $admin-modal-edit-width;
  position: relative;
  height: 270px;

  > form {
    position: absolute;
    top: 30px;
    left: 30px;
    width: 400px;

    > div {
      > label {
        width: 400px;
        height: 20px;
        position: absolute;
        top: 0;
        left: 0;
      }

      > input {
        width: 400px;
        height: 40px;
        border-radius: 4px;
        border: 0;
        border: 1px solid #ccc;
        background: transparent;
        position: absolute;
        top: 20px;
        &:focus {
          outline: none;
          background: #fafafa;
        }

        &.invalid {
          border-color: #f00 !important;
          box-shadow: 0 0 0 4px rgba(216, 0, 12, 0.2) !important;
        }
      }

      .validation-msg {
        color: red;
        float: left;
        font-size: 10px;
        height: 20px;
        width: 200px;
        position: absolute;
        top: 60px;
      }
    }

    > div#password-div {
      position: absolute;
    }

    > div#passwordConfirm-div {
      position: absolute;
      top: 80px;
    }
    > button {
      height: 40px;
      width: 150px;
      background-color: #35cfaa;
      color: #fff;
      border: none;
      border-radius: 4px;
      position: absolute;
      left: 125px;
      top: 170px;
    }
  }
}
</style>
