import Admin from "@/types/AdminPage/Admin";
import { editType } from "@/components/AdminPage/table/types/EditType";

export const actions = {
  editName: "editName",
};

export default interface MenuModalEventDetail {
  admin: Admin;
  type: typeof editType.default;
}
