import { editType } from "@/components/AdminPage/table/types/EditType";
export default interface MenuModalContent {
  id: number;
  text: string;
  type: typeof editType.default;
  isDanger: boolean;
}
