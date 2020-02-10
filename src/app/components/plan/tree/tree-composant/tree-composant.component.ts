import {FlatTreeControl} from "@angular/cdk/tree";
import {Component, OnInit} from "@angular/core";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import { callApiFree } from "./../../../../core/ApiCall";

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
export interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}

/** Flat node with expandable and level information */
export interface TreeNode {
  name: string;
  type: string;
  level: number;
  expandable: boolean;
}

const files = [
  {
    name: "material2",
    type: "folder",
    children: [
      {
        name: "src",
        type: "folder",
        children: [
          {
            name: "cdk",
            children: [
              { name: "package.json", type: "file" },
              { name: "BUILD.bazel", type: "file" },
            ]
          },
          { name: "lib", type: "folder" }
        ]
      }
    ]
  },
  {
    name: "angular",
    type: "folder",
    children: [
      {
        name: "packages",
        type: "folder",
        children: [
          { name: ".travis.yml", type: "file" },
          { name: "firebase.json", type: "file" }
        ]
      },
      { name: "package.json", type: "file" }
    ]
  },
  {
    name: "angularjs",
    type: "folder",
    children: [
      { name: "gulpfile.js", type: "file" },
      { name: "README.md", type: "file" }
    ]
  }
];

@Component({
  selector: "app-tree-composant",
  templateUrl: "./tree-composant.component.html",
  styleUrls: ["./tree-composant.component.css"]
})

export class TreeComposantComponent implements OnInit {

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<TreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<FileNode, TreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: any ;

  familles: any ;

  composants: any ;

  constructor() {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      node => node.children);

    this.treeControl = new FlatTreeControl<TreeNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  async ngOnInit() {
    this.familles = await callApiFree("/famille", "GET") ;
    this.composants = await callApiFree("/listStocks", "GET") ;
    const fonction = (elem) => {
      if(elem.id_fam === 1) {
        return elem.composant ;
      }
    } ;
    const test = this.familles.map(famille => {
                return this.composants.filter(composant => {
                  if (composant.id_fam === famille.id) {
                    return composant ;
                  }
                });
    }) ;
    const tesT = this.composants.filter(fonction) ;
    console.log(tesT) ;
    const filesTest = this.familles.map(famille => {
      const comp = this.composants.filter(fonction) ;
      const compComp = this.composants.map(elem => {
        return {name: elem.composant} ;
      }) ;
      return {name: famille.libelle,
              type: "folder",
              children: compComp
      } ;
    }) ;
    console.log(filesTest) ;
    this.dataSource.data = filesTest;
  }

  /** Transform the data to something the tree can read. */
  transformer(node: FileNode, level: number) {
    return {
      name: node.name,
      type: node.type,
      level,
      expandable: !!node.children
    };
  }

 /** Get the level of the node */
  getLevel(node: TreeNode) {
    return node.level;
  }

  /** Return whether the node is expanded or not. */
  isExpandable(node: TreeNode) {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: TreeNode) {
    return node.expandable;
  }

}
