<template>
  <div class="modal-cover-div" @click.self="emitEventCloseBaseModal">
    <div class="modal-content-div">
      <div class="modal-header">
        <span class="close" @click.self="emitEventCloseBaseModal">&times;</span>
        <span class="title">
          {{ title }}
        </span>
      </div>
      <div class="modal-body">
        <slot :admin="props.admin"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, defineEmits } from "vue";
import Admin from "@/models/AdminPage/Admin";
interface PropI {
  title?: string;
  admin?: Admin;
}

const props = defineProps<PropI>();
const emit = defineEmits<{
  (e: "closeBaseModal"): void;
}>();
const title = ref(props.title ?? "NO TITLE");

const emitEventCloseBaseModal = () => {
  emit("closeBaseModal");
};
</script>
<style lang="scss" scoped>
@import "@/scss/layoutDefault.scss";
.modal-cover-div {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
  z-index: $zi-modal-edit-cover;
  display: flex;
  justify-content: center;
  align-items: center;
  > .modal-content-div {
    background-color: #fff;
    height: $admin-modal-edit-height;
    width: $admin-modal-edit-width;

    $header-height: 50px;
    z-index: $zi-modal-edit-content;
    position: relative;
    $x: 15px;
    $y: 15px;
    > .modal-header {
      height: $admin-modal-edit-header-height;
      border-bottom: 1px solid #ddd;
      > .title {
        font-size: 12px;
        color: #222;
        position: absolute;
        left: $x;
        top: $y;
      }
      > .close {
        position: absolute;
        right: $x;
        top: $y;
      }
    }

    > .modal-content {
      height: $admin-modal-edit-height - $admin-modal-edit-header-height;
    }
  }
}
</style>
