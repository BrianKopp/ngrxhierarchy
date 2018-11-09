import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TreeState, HierarchyItemPlusExtraGoodies } from './tree.reducer';
import { TreeItem } from '../model/treeitem';

const getTreeState = createFeatureSelector<TreeState>('tree');
export const getIsLoadingRootItems = createSelector(getTreeState, state => state.LoadingRootItems);
export const getRootLoadingError = createSelector(getTreeState, state => state.RootItemError);
export const getChildLoadingError = createSelector(getTreeState, state => state.ChildrenError);
export const getAllItems = createSelector(getTreeState, state => state.Items);

export const getItemsByParentId = createSelector(getTreeState, state => {
  const parentsDict: {[key: string]: HierarchyItemPlusExtraGoodies[]} = {};
  Object.keys(state.Items).forEach(i => {
    const parent = state.Items[i].ParentHierarchyItem;
    if (parentsDict[parent] === undefined) {
      parentsDict[parent] = [];
    }
    parentsDict[parent].push(state.Items[i]);
  });
  return parentsDict;
});

export const getConstructedTree = createSelector(getItemsByParentId, parentDict => {
  return recurseChildren(parentDict, null);
});

function recurseChildren(hierarchicalItemsByParentID: {[key: string]: HierarchyItemPlusExtraGoodies[]}, currentId?: string): TreeItem[] {
  const children = hierarchicalItemsByParentID[currentId];
  return children.map(c => {
    return {
      Id: c.Id,
      Name: c.Name,
      Expanded: c.Expanded,
      Children: c.Expanded ? recurseChildren(hierarchicalItemsByParentID, c.Id) : null
    };
  });
}
