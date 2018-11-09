import { Component, OnInit } from '@angular/core';
import { TreeService } from './services/tree.service';
import { TreeItem } from './model/treeitem';
import { HierarchyItem } from './model/hierachyitem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  treeItems: HierarchyItem[];
  constructor(private treeItemService: TreeService) {}

  ngOnInit() {
    this.treeItems = this.treeItemService.getItems();
  }
}
