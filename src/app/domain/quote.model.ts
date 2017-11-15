export interface Quote {
  id?: string;
  cn: string;
  pic: string;
  en: string;
  taskLists?: string[]; // 存储 TaskList ID
  members?: string[]; // 存储成员 key 为 ID， value 为角色
}