import { Action } from '@ngrx/store';
import { HierarchyItem } from './../model/hierachyitem';
import {
  TreeActionTypes,
  GetRootItemsSuccessAction,
  GetChildrenItemsAction,
  ToggleExpandedAction,
  GetChildrenItemsSuccessAction,
  GetChildrenItemsFailedAction
} from './tree.actions';

export interface HierarchyItemPlusExtraGoodies extends HierarchyItem {
  ChildrenLoaded: boolean;
  ChildrenLoading: boolean;
  Expanded: boolean;
}

export interface TreeState {
  Items: { [key: string]: HierarchyItemPlusExtraGoodies };
  LoadingRootItems: boolean;
  RootItemError: string | null;
  ChildrenError: string | null;
}

export const DefaultTreeState: TreeState = {
  Items: {},
  LoadingRootItems: false,
  RootItemError: null,
  ChildrenError: null
};

export function TreeReducer(state: TreeState = DefaultTreeState, action: Action) {
  switch (action.type) {
    case TreeActionTypes.CLEAR_TREE:
      return DefaultTreeState;
    case TreeActionTypes.GET_ROOT_ITEMS:
      return {
        ...state,
        LoadingRootItems: true
      };
    case TreeActionTypes.GET_ROOT_ITEMS_SUCCESS:
      const rootItems = (action as GetRootItemsSuccessAction).payload.items;
      const items = state.Items;
      rootItems.forEach(ri => items[ri.Id] = {
        ...ri,
        ChildrenLoaded: false,
        ChildrenLoading: false,
        Expanded: false
      });
      return {
        ...state,
        Loading: false,
        Items: items,
        RootItemError: null
      };
    case TreeActionTypes.GET_ROOT_ITEMS_FAILED:
      return {
        ...state,
        Loading: false,
        RootItemError: null
      };
    case TreeActionTypes.TOGGLE_EXPANDED:
      const idToToggle = (action as ToggleExpandedAction).payload.whichId;
      const itemsT = state.Items;
      const itemToToggle = itemsT[idToToggle];
      if (itemToToggle) {
        itemsT[idToToggle] = {
          ...itemToToggle,
          Expanded: !itemToToggle.Expanded
        };
      }
      return {
        ...state,
        Items: itemsT
      };
    case TreeActionTypes.GET_CHILDREN_ITEMS:
      const idToFetch = (action as GetChildrenItemsAction).payload.childrenForId;
      const existingItems = state.Items;
      if (existingItems[idToFetch]) {
        existingItems[idToFetch] = {
          ...existingItems[idToFetch],
          ChildrenLoading: true,
          ChildrenLoaded: true,
          ChildrenItems: [],
          Expanded: false
        };
      }
      return {
        ...state,
        Items: existingItems,
        ChildrenError: null
      };
    case TreeActionTypes.GET_CHILDREN_ITEMS_SUCCESS:
      const childSuccessPayload = (action as GetChildrenItemsSuccessAction).payload;
      const childId = childSuccessPayload.childrenForId;
      const newChildItems = childSuccessPayload.items;
      const itemsGCIS = state.Items;
      const itemToAddChildrenTo = itemsGCIS[childId];
      if (itemToAddChildrenTo) {
        itemsGCIS[childId] = {
          ...itemToAddChildrenTo,
          ChildrenLoading: false,
          ChildrenLoaded: true,
          Expanded: true,
          ChildrenItems: newChildItems.map(i => i.Id)
        };
        newChildItems.forEach(nci => {
          itemsGCIS[nci.Id] = {
            ...nci,
            ChildrenLoaded: nci.ChildrenItems !== null,
            ChildrenLoading: false,
            Expanded: false
          };
        });
      }
      return {
        ...state,
        Items: itemsGCIS,
        ChildrenError: null
      };
    case TreeActionTypes.GET_CHILDREN_ITEMS_FAILED:
      const childFailedPayload = (action as GetChildrenItemsFailedAction).payload;
      const itemsGCIF = state.Items;
      const failedChildLoadItem = itemsGCIF[childFailedPayload.childrenForId];
      if (failedChildLoadItem) {
        itemsGCIF[childFailedPayload.childrenForId] = {
          ...failedChildLoadItem,
          ChildrenItems: null,
          ChildrenLoaded: false,
          ChildrenLoading: false,
          Expanded: false
        };
      }
      return {
        ...state,
        Items: itemsGCIF,
        ChildrenError: childFailedPayload.message
      };
  }
}
