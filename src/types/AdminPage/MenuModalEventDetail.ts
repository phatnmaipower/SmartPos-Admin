import Admin from "@/types/AdminPage/Admin";
import { editType } from "@/types/AdminPage/EditType";

export const actions = {
  editName: "editName",
};

export default interface MenuModalEventDetail {
  admin: Admin;
  type: typeof editType.default;
}
