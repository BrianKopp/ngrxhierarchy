export interface HierarchyItem {
  Id: string;
  Name: string;
  ParentHierarchyItem?: string;
  ChildrenItems?: string[];
}
