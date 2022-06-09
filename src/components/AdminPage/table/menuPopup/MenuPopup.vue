<template>
  <div
    id="modal-cover"
    v-show="props?.isShowing ?? false"
    :style="[
      { right: `calc(100vw - ${props.right}px)` },
      { top: `calc(${props.top}px - 50px + 60px)` },
    ]"
  >
    <button
      v-for="item of modalItems"
      :key="item.id"
      :class="{ danger: item.isDanger }"
      @click="emitEventMenuOnSelect(item)"
    >
      <span>{{ item.text }}</span>
    </button>
  </div>
</template>
<script lang="ts" setup>
import { reactive, defineProps, defineEmits } from "vue";
import MenuModalEventDetail from "@/types/AdminPage/MenuModalEventDetail";
import MenuModalContent from "@/types/AdminPage/MenuModalContent";
import Admin from "@/types/AdminPage/Admin";

interface PropI {
  admin: Admin | null;
  isShowing: boolean;
  right: number;
  top: number;
  menuContent: MenuModalContent[];
}

const props = defineProps<PropI>();
const emit = defineEmits<{
  (e: "onSelect", detail: MenuModalEventDetail): void;
}>();

const modalItems: MenuModalContent[] = reactive(props.menuContent);

const emitEventMenuOnSelect = (item: MenuModalContent) => {
  console.log("emit on select", item);

  emit("onSelect", {
    admin: props.admin as Admin,
    type: item.type,
  });
};
</script>

<style lang="scss">
@import "@/scss/layoutDefault.scss";

#modal-cover {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: max-content;
  height: max-content;
  padding: 10px 0px;
  background-color: #fff;
  border-radius: 10px;
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.15));
  z-index: $zi-edit-admin-modal;

  > button {
    text-align: left;
    border: none;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    height: 40px;
    width: 100%;
    font-size: 14px;
    float: left;
    width: 250px;

    &:hover {
      background-color: #eee;
    }

    &.danger {
      color: #d8000c;
      border-bottom: none;
    }

    > span {
      margin-left: 20px;
    }
  }
}
</style>
