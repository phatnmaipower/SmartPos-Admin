import { editType } from "@/types/AdminPage/EditType";
export default interface MenuModalContent {
  id: number;
  text: string;
  type: typeof editType.default;
  isDanger: boolean;
}
