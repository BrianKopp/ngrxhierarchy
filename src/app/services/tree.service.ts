import { TreeItem } from './../model/treeitem';
import { Injectable } from '@angular/core';
import { HierarchyItem } from './../model/hierachyitem';

const hierarchyItems: HierarchyItem[] = [
  { Id: '1', Name: 'Root 1', ParentHierarchyItem: null },
  { Id: '10', Name: 'Child 1-0', ParentHierarchyItem: '1' },
  { Id: '11', Name: 'Child 1-1', ParentHierarchyItem: '1' },
  { Id: '12', Name: 'Child 1-2', ParentHierarchyItem: '1' },

  { Id: '2', Name: 'Root 2', ParentHierarchyItem: null },
  { Id: '20', Name: 'Child 2-0', ParentHierarchyItem: '2' },
  { Id: '21', Name: 'Child 2-1', ParentHierarchyItem: '2' },
  { Id: '22', Name: 'Child 2-2', ParentHierarchyItem: '2' },

  { Id: '3', Name: 'Root 3', ParentHierarchyItem: null },
  { Id: '30', Name: 'Child 3-0', ParentHierarchyItem: '3' },
  { Id: '31', Name: 'Child 3-1', ParentHierarchyItem: '3' },
  { Id: '32', Name: 'Child 3-2', ParentHierarchyItem: '3' },
];

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  constructor() { }

  getItems(): TreeItem[] {
    return this.convertToTreeItems(hierarchyItems, null);
  }

  convertToTreeItems(items: HierarchyItem[], currentItem?: string): TreeItem[] {
    const rootTrees: TreeItem[] = [];
    const directChildren = items.filter(i => i.ParentHierarchyItem === currentItem);
    const otherNodes = items.filter(i => !directChildren.filter(d => d.Id === i.Id).length);
    directChildren.forEach(dc => {
      rootTrees.push({
        Id: dc.Id,
        Name: dc.Name,
        Expanded: false,
        ChildrenIds: this.convertToTreeItems(otherNodes, dc.Id)
      });
    });

    return rootTrees;
  }
}
