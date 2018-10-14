import { BaseElement, IBaseElementArgs } from "../base-element";
import treeViewHbs from "./tree-view.hbs"; // tslint:disable-line:match-default-export-name
import "./treeView.scss";

/** a multi-level tree of expandable lists */
export class TreeView extends BaseElement {
    /**
     * Creates a new TreeView component.
     *
     * @param args - The base input args.
     */
    constructor(args: IBaseElementArgs) {
        super(args, treeViewHbs);
    }

    /**
     * Displays some Object as a TreeView.
     *
     * @param tree - The object to display.
     */
    public display(tree: object): void {
        // TODO: do
    }
}
