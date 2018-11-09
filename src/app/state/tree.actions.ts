import { Action } from '@ngrx/store';
import { HierarchyItem } from '../model/hierachyitem';

export const TreeActionTypes = {
  CLEAR_TREE: '[Tree] CLEAR_TREE',
  GET_ROOT_ITEMS: '[Tree] GET_ROOT_ITEMS',
  GET_ROOT_ITEMS_SUCCESS: '[Tree] GET_ROOT_ITEMS_SUCCESS',
  GET_ROOT_ITEMS_FAILED: '[Tree] GET_ROOT_ITEMS_FAILED',
  TOGGLE_EXPANDED: '[Tree] TOGGLE_EXPANDED',
  GET_CHILDREN_ITEMS: '[Tree] GET_CHILDREN_ITEMS',
  GET_CHILDREN_ITEMS_SUCCESS: '[Tree] GET_CHILDREN_ITEMS_SUCCESS',
  GET_CHILDREN_ITEMS_FAILED: '[Tree] GET_CHILDREN_ITEMS_FAILED'
};

export class ClearTreeAction implements Action {
  readonly type = TreeActionTypes.CLEAR_TREE;
}

export class GetRootItemsAction implements Action {
  readonly type = TreeActionTypes.GET_ROOT_ITEMS;
}

export class GetRootItemsSuccessAction implements Action {
  readonly type = TreeActionTypes.GET_ROOT_ITEMS_SUCCESS;
  constructor(public payload: { items: HierarchyItem[] }) {}
}

export class GetRootItemsFailedAction implements Action {
  readonly type = TreeActionTypes.GET_ROOT_ITEMS_FAILED;
  constructor(public payload: { message: string }) {}
}

export class ToggleExpandedAction implements Action {
  readonly type = TreeActionTypes.TOGGLE_EXPANDED;
  constructor(public payload: { whichId: string }) {}
}

export class GetChildrenItemsAction implements Action {
  readonly type = TreeActionTypes.GET_CHILDREN_ITEMS;
  constructor(public payload: { childrenForId: string }) {}
}

export class GetChildrenItemsSuccessAction implements Action {
  readonly type = TreeActionTypes.GET_CHILDREN_ITEMS_SUCCESS;
  constructor(public payload: { childrenForId: string, items: HierarchyItem[] }) {}
}

export class GetChildrenItemsFailedAction implements Action {
  readonly type = TreeActionTypes.GET_CHILDREN_ITEMS_FAILED;
  constructor(public payload: { childrenForId: string, message: string }) {}
}

export type TreeActions =
  ClearTreeAction
  | GetRootItemsAction
  | GetRootItemsSuccessAction
  | GetRootItemsFailedAction
  | ToggleExpandedAction
  | GetChildrenItemsAction
  | GetChildrenItemsSuccessAction
  | GetChildrenItemsFailedAction;
