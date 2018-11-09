import { Component, OnInit, Input } from '@angular/core';
import { TreeItem } from 'src/app/model/treeitem';

@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.css']
})
export class TreeItemComponent implements OnInit {
  @Input() treeItem: TreeItem;
  constructor() { }

  ngOnInit() {
  }

}
