<template>
  <div ref="tableExistingContainer">
    <search-bar v-if="props.tableType === 'inviting'"></search-bar>

    <div v-else style="height: 70px"></div>

    <div class="fixTableHead">
      <vue-table-lite
        :is-static-mode="true"
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        :sortable="table.sortable"
        :messages="table.messages"
        :page="table.page"
        :page-size="table.pageSize"
        :page-options="table.pageOptions"
        @is-finished="tableLoadingFinish"
      >
      </vue-table-lite>

      <table-component-menu-modal
        v-if="menuModal.isShowing && props.tableType === 'existing'"
        :admin="menuModal.adminSelected"
        :is-showing="menuModal.isShowing"
        :right="menuModal.right"
        :top="menuModal.top"
        @close-modal="menuModal.close"
        :menu-content="menuModalExistingContent[props.tableType]"
        @on-select="menuModal.onSelect"
      ></table-component-menu-modal>

      <table-component-menu-modal
        v-else-if="menuModal.isShowing && props.tableType === 'inviting'"
        :admin="menuModal.adminSelected"
        :is-showing="menuModal.isShowing"
        :right="menuModal.right"
        :top="menuModal.top"
        @close-modal="menuModal.open"
        :menu-content="menuModalExistingContent[props.tableType]"
        :on-select="menuModal.onSelect"
      ></table-component-menu-modal>

      <div
        v-if="menuModal.isShowing"
        id="model-outer"
        v-show="menuModal.isShowing"
        @click="menuModal.close"
      ></div>
    </div>
  </div>

  <base-modal
    v-if="editModal.isShowing && editModal.type !== editType.default"
    :title="editModal.title"
    :admin="editModal.adminSelected"
    @close-base-modal="editModal.close"
  >
    <component
      :is="editModal.data[editModal.type].component"
      :admin="editModal.adminSelected"
      @update="adminUpdate"
    >
    </component>
  </base-modal>
</template>

<script lang="ts" setup>
import {
  reactive,
  ref,
  inject,
  onMounted,
  nextTick,
  Ref,
  defineProps,
  shallowRef,
} from "vue";
import VueTableLite from "vue3-table-lite/ts";
import TableComponentMenuModal from "@/components/AdminPage/table/TableComponentMenuModal.vue";
import SearchBar from "@/components/AdminPage/table/TableComponentSearchBar.vue";
import BaseModal from "@/components/AdminPage/table/modals/BaseModal.vue";
import EditName from "@/components/AdminPage/table/modals/modalContent/EditName.vue";
import EditRole from "@/components/AdminPage/table/modals/modalContent/EditRole.vue";
import EditPassword from "@/components/AdminPage/table/modals/modalContent/EditPassword.vue";
import Admin from "@/types/AdminPage/Admin";
import { ApiInfo } from "@/types/api/api";
import { editType } from "@/components/AdminPage/table/types/EditType";
import MenuModalContent from "@/types/AdminPage/MenuModalContent";
import MenuModalEventDetail from "@/types/AdminPage/MenuModalEventDetail";
interface PropI {
  api: ApiInfo;
  tableType: string;
}

const props = defineProps<PropI>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tableExistingContainer: any = ref(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getListPagination: any = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ret: any = tableExistingContainer?.value?.getElementsByClassName(
    "vtl-paging-pagination-page-li"
  );
  return ret;
};

const menuModal = reactive({
  isShowing: false,
  right: 0,
  top: 0,
  adminSelected: null as Admin | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect: (event: MenuModalEventDetail) => {
    console.log(event);

    editModal.open();
    editModal.title = editModal.data[event.type].title;
    editModal.adminSelected = event.admin;
    editModal.type = event.type;
    menuModal.isShowing = false;
  },

  open: () => {
    menuModal.isShowing = true;
  },

  close: () => {
    menuModal.isShowing = false;
  },
});

const editModal = reactive({
  isShowing: false,
  title: "",
  adminSelected: {} as Admin,
  type: editType.default,

  data: {
    [editType.editName]: {
      title: "お名前編集",
      component: shallowRef(EditName),
    },
    [editType.editRole]: {
      title: "edit role",
      component: shallowRef(EditRole),
    },
    [editType.editPassword]: {
      title: "edit password",
      component: shallowRef(EditPassword),
    },
    [editType.reInvite]: {
      title: "reinvite",
      component: shallowRef(EditPassword),
    },
    [editType.delete]: {
      title: "delete",
      component: shallowRef(EditPassword),
    },
  },
  open: () => {
    editModal.isShowing = true;
    editModal.type = editType.editName;
  },
  close: () => {
    editModal.isShowing = false;
    editModal.type = editType.editName;
  },
});

const PAGE_SIZE = 10;
let curPage = ref(1);
let totalPage: Ref<number> = ref(0);
// Table config
const table = reactive({
  isLoading: false,
  isReSearch: false,
  columns: [
    {
      label: "Name",
      field: "name",
      width: "30%",
      sortable: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      display: function (row: Admin) {
        let html =
          /*html */
          `<div class="row-name">
            <img src="${row.img}" alt="AVT" style="height: 30px; width: 30px">
            <span> ${row.name}</span>
          </div>`;
        return html;
      },
    },
    {
      label: "Email",
      field: "email",
      width: "30%",
      sortable: true,
    },
    {
      label: "Role",
      field: "role",
      width: "20%",
      sortable: true,
    },
    {
      label: "最終ログイン",
      field: "lastLogin",
      width: "20%",
      sortable: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      display: function (row: Admin) {
        const lastLogin: Date = new Date(row.lastLogin);

        const dateDisplay = `${lastLogin.getFullYear()}年${lastLogin.getMonth()}月${lastLogin.getDay()}日`;

        const html =
          /*html*/
          `<div>
          ${dateDisplay}
          </div>`;
        return html;
      },
    },
    {
      label: "",
      field: "btnEdit",
      width: "20%",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any

      display: function (row: Admin) {
        const onClickEvt = `onClick='this.dispatchEvent(new CustomEvent("click-with-data", { detail: ${JSON.stringify(
          row
        )}}))'`;
        const html = `<button class="nut_dropdown is-rows-el btn-edit-admin" ${onClickEvt}>
            <img src="img/icons/3dot.svg" alt="Icon">
          </button>
          `;
        return html;
      },
    },
  ],
  rows: [] as Admin[],
  totalRecordCount: 0,
  sortable: {
    order: "ID",
    sort: "asc",
  },
  page: 2,
  pageSize: PAGE_SIZE,
  messages: {
    pagingInfo: "{2}件 ({0}-{1}位)",
    pageSizeChangeLabel: "行数  ",
    gotoPageLabel: "ページに移動  ",
    noDataAvailable: "No data",
  },
  pageOptions: [
    {
      value: 10,
      text: 10,
    },
    {
      value: 25,
      text: 25,
    },
    {
      value: 50,
      text: 50,
    },
    {
      value: 100,
      text: 100,
    },
  ],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const axios: any = inject("axios"); // inject axios

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let admins: any = ref<Admin[]>([]);

const index = {
  PREV: 1,
  FIRST: 0,
  P1: 2,
  P2: 3,
  P3: 4,
  P4: 5,
  P5: 6,
  NEXT: 7,
  LAST: 8,
  _3DOT_LEFT: 9,
  _3DOT_RIGHT: 10,
};

const updatePaginationDisplay = () => {
  //console.log(
  //  `totalPage.value: ${totalPage.value} --- curPage.value: ${curPage.value} `
  //);

  const MAX_SHOW_AT_TIME = 7;
  const PAGE_MOVE_DEFAULT = 4;

  // show all
  if (
    totalPage.value >= MAX_SHOW_AT_TIME &&
    curPage.value >= PAGE_MOVE_DEFAULT &&
    totalPage.value - PAGE_MOVE_DEFAULT > curPage.value
  ) {
    // console.log("show all");

    getListPagination()[index._3DOT_RIGHT].hidden = false;
    getListPagination()[index.LAST].hidden = false;

    getListPagination()[index._3DOT_LEFT].hidden = false;
    getListPagination()[index.FIRST].hidden = false;
  }
  // show 3.R and last
  else if (
    totalPage.value >= MAX_SHOW_AT_TIME &&
    curPage.value <= totalPage.value - PAGE_MOVE_DEFAULT
  ) {
    // console.log("show 3.R and last");

    getListPagination()[index.FIRST].hidden = true;
    getListPagination()[index._3DOT_LEFT].hidden = true;
    getListPagination()[index._3DOT_RIGHT].hidden = false;
    getListPagination()[index.LAST].hidden = false;
  }

  // show 3.L and 1st
  else if (
    totalPage.value >= MAX_SHOW_AT_TIME &&
    totalPage.value - PAGE_MOVE_DEFAULT <= curPage.value &&
    curPage.value <= totalPage.value
  ) {
    // console.log("show 3.L and 1st");

    getListPagination()[index.FIRST].hidden = false;
    getListPagination()[index._3DOT_LEFT].hidden = false;
    getListPagination()[index._3DOT_RIGHT].hidden = true;
    getListPagination()[index.LAST].hidden = true;
  }

  // hide all
  else {
    // console.log("hide all");

    getListPagination()[index._3DOT_RIGHT].hidden = true;
    getListPagination()[index.LAST].hidden = true;

    getListPagination()[index._3DOT_LEFT].hidden = true;
    getListPagination()[index.FIRST].hidden = true;
  }
};

const getAdmins = async () => {
  const response = await axios[props.api.method](props.api.endpoint);

  admins.value = [];
  admins.value.push(...response.data);
  admins.value.sort();

  table.totalRecordCount = admins.value.length;
  table.sortable.order = "ID";
  table.sortable.sort = "asc";

  table.rows = admins.value;
  totalPage.value = Math.floor(table.rows.length / table.pageSize + 1);
};

onMounted(async () => {
  await getAdmins();

  nextTick().then(() => {
    //add 2 3-dot icons
    const li1 = document.createElement("li");
    li1.classList.add(
      "vtl-paging-pagination-page-li",
      "vtl-paging-pagination-page-li-number",
      "three-dot",
      "three-dot-left"
    );
    li1.innerHTML = /*html*/ `<img src="img/icons/3dot-black.svg" alt="•••">`;

    const li2 = document.createElement("li");
    li2.classList.add(
      "vtl-paging-pagination-page-li",
      "vtl-paging-pagination-page-li-number",
      "three-dot",
      "three-dot-right"
    );
    li2.innerHTML = /*html*/ `<img src="img/icons/3dot-black.svg" alt="•••">`;
    tableExistingContainer.value
      .querySelector(".vtl-paging-pagination-ul")
      .appendChild(li1);
    tableExistingContainer.value
      .querySelector(".vtl-paging-pagination-ul")
      .appendChild(li2);

    // set html content for prev and next btn
    getListPagination()[index.PREV].querySelector(
      ".vtl-paging-pagination-page-link"
    ).innerHTML = /*html*/ `<img src="img/icons/prev.svg" alt="•••">`;
    getListPagination()[index.NEXT].querySelector(
      ".vtl-paging-pagination-page-link"
    ).innerHTML = /*html*/ `<img src="img/icons/next.svg" alt="•••">`;

    // set html content for first and last btn
    getListPagination()[index.FIRST].querySelector(
      ".vtl-paging-pagination-page-link"
    ).innerHTML = /*html*/ `1`;
    getListPagination()[index.LAST].querySelector(
      ".vtl-paging-pagination-page-link"
    ).innerHTML = /*html*/ `${Math.floor(
      table.rows.length / table.pageSize + 1
    )}`;

    updatePaginationDisplay();

    nextTick().then(() => {
      let list = getListPagination();

      // add event to all btn to update curr page state
      // console.log("len = " + list.length);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pageChangeCB = (e: any) => {
        console.log("BTN click: " + e.target);
        if (e.target !== this) {
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handle = (dom: any) => {
          if (dom.classList.contains("vtl-paging-pagination-page-link-prev")) {
            // console.log("prev");

            if (curPage.value !== 1) {
              let temp: number = curPage.value;
              temp--;
              curPage.value = temp;
            } else {
              curPage.value = 1;
            }
          } else if (
            dom.classList.contains("vtl-paging-pagination-page-link-next")
          ) {
            // console.log("next");

            if (curPage.value !== totalPage.value) {
              let temp: number = curPage.value;

              temp++;
              curPage.value = temp;
            } else {
              curPage.value = totalPage.value;
            }
          } else {
            curPage.value = parseInt(dom.innerHTML);
          }
        };
        handle(e.target);
        updatePaginationDisplay();
        let newList = getListPagination();

        for (let elem of newList) {
          elem.removeEventListener("click", pageChangeCB);
          elem.addEventListener("click", pageChangeCB);
        }
      };

      for (let elem of list) {
        elem.removeEventListener("click", pageChangeCB);
        elem.addEventListener("click", pageChangeCB);
      }
    });
  });
});

/**
 * Loading finish event
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tableLoadingFinish = (elements: any) => {
  Array.prototype.forEach.call(elements, function (element) {
    if (element.classList.contains("btn-edit-admin")) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      element.addEventListener("click-with-data", (event: any) => {
        console.log("btn-edit-admin click!!");
        menuModal.adminSelected = event.detail;
        console.log(event.detail);

        menuModal.isShowing = true;
        menuModal.right = event.target.getBoundingClientRect().right;
        menuModal.top = event.target.getBoundingClientRect().top;
      });
    }
  });
  table.isLoading = false;
};

const menuModalExistingContent = reactive<{
  existing: MenuModalContent[];
  inviting: MenuModalContent[];
}>({
  existing: [
    {
      id: 0,
      text: "画像を編集する",
      type: editType.editAvatar,
      isDanger: false,
    },
    {
      id: 1,
      text: "姓名を編集する",
      type: editType.editName,
      isDanger: false,
    },
    {
      id: 2,
      text: "メールアドレスを編集する",
      type: editType.editEmail,
      isDanger: false,
    },
    {
      id: 3,
      text: "役割を編集する",
      type: editType.editRole,
      isDanger: false,
    },
    {
      id: 4,
      text: "パスワードを編集する",
      type: editType.editPassword,
      isDanger: false,
    },
    {
      id: 5,
      text: "取り除く",
      type: editType.delete,
      isDanger: true,
    },
  ],
  inviting: [
    {
      id: 0,
      text: "画像を編集する",
      type: editType.editAvatar,
      isDanger: false,
    },
    {
      id: 1,
      text: "姓名を編集する",
      type: editType.editName,
      isDanger: false,
    },
    {
      id: 2,
      text: "メールアドレスを編集する",
      type: editType.editName,
      isDanger: false,
    },
    {
      id: 3,
      text: "役割を編集する",
      type: editType.editRole,
      isDanger: false,
    },
    {
      id: 4,
      text: "再招待",
      type: editType.reInvite,
      isDanger: false,
    },
    {
      id: 5,
      text: "取り除く",
      type: editType.delete,
      isDanger: true,
    },
  ],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adminUpdate = async (e: any) => {
  console.log(e);
  editModal.close();
  menuModal.open();

  menuModal.adminSelected = e.data;
  editModal.adminSelected = e.data;
  await getAdmins();
};
</script>

<style lang="scss">
@import "@/scss/layoutDefault.scss";

table {
  height: $admins_table_height;
  overflow: scroll;
}

.vtl-sortable {
  cursor: pointer;
  background-position: left !important;
  background-repeat: no-repeat !important;
  padding: 0px 30px !important;
}

.vtl-table thead th {
  background-color: #fafafa !important;
  color: #222 !important;
  border-top: 2px solid #dee2e6 !important;
}

.vtl-both {
  background-image: url("@/assets/icons/sort.svg") !important;
}

.vtl-asc {
  background-image: url("@/assets/icons/sort-up.svg") !important;
}

.vtl-desc {
  background-image: url("@/assets/icons/sort-down.svg") !important;
}

.vtl-paging.vtl-row {
  flex-direction: row;
}

.vtl-paging-info {
  flex: 0 0 50% !important;
  max-width: 50% !important;
}

.vtl-paging-pagination-div {
  flex: 0 0 35% !important;
  max-width: 35% !important;
}

.vtl-paging-change-div {
  order: 2;
  display: flex;
  justify-content: flex-end !important;
  align-self: center;
  flex: 0 0 15% !important;
  max-width: 15% !important;
}

.vtl-paging-count-label,
.vtl-paging-count-dropdown {
  display: none;
}

table,
th,
td {
  border-left: none !important;
  border-right: none !important;
}

.fixTableHead {
  overflow-y: auto;
}

.fixTableHead thead th {
  position: sticky;
  top: 0;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 8px 15px;
  border: 2px solid #529432;
}

.row-name {
  display: flex;
  justify-content: left;
  align-items: center;
}

.btn-edit-admin {
  width: 50px;
  height: 50px;
  background-color: #d6f6ee;
  border: 0px solid #d6f6ee;
  border-radius: 5px;

  > img {
    width: 50%;
  }
}

.btn-edit-admin:hover {
  border: 1px solid #35cfaa;
}

#model-outer {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  opacity: 0.5;
  z-index: $zi-edit-admin-modal-outer;
}

.vtl-pagination {
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
.vtl-paging-pagination-page-li {
  height: 40px !important;
  width: 40px !important;
}
.vtl-paging-pagination-page-li-prev {
  order: 0;
  > a > img {
    z-index: -1;
  }
}

.vtl-paging-pagination-page-li-first {
  order: 1;
}

.three-dot-left {
  order: 2 !important;
  width: 40px !important;
  > img {
    margin: 5px;
    width: 30px;
  }
}
.vtl-paging-pagination-page-li-number {
  order: 3;
}
.three-dot-right {
  order: 4 !important;
}

.vtl-paging-pagination-page-li-last {
  order: 5;
}

.vtl-paging-pagination-page-li-next {
  order: 6;
  > a > img {
    z-index: -1;
  }
}

.three-dot {
  width: 40px !important;
  display: flex;
  > img {
    margin: 5px;
    width: 30px;
  }
}

.page-link {
  border: none !important;
}

.page-item {
  .page-link {
    background: none !important;
    color: #666 !important;
    text-decoration: none !important;
  }
}
.page-item.vtl-paging-pagination-page-li-number.disabled {
  background: #35cfaa !important;
  border-radius: 50% !important;
  margin: 5px !important;
  .page-link {
    background: none !important;
    color: #fff !important;
    text-decoration: none !important;
  }
}

[hidden] {
  display: none !important;
}
</style>
