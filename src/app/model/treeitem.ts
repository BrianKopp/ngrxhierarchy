export interface TreeItem {
  Id: string;
  Name: string;
  Expanded: boolean;
  ChildrenIds: TreeItem[];
}
