import React from "react";
import { observer } from "mobx-react";
import { Tree } from "antd";
import {
  DatabaseOutlined,TableOutlined
} from "@ant-design/icons";

const { TreeNode } = Tree;
@observer
class AsyncTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [],   //树数据
      searchValue:''
    };
  }

  componentDidMount() {
  }
  componentWillUnmount() { }

  handleCancel() {
    
  }
  onExpand = (expandedKeys) => {
    // console.log('onExpand-->', expandedKeys);
    
    // dispatch({
    //   type: `${namespace}/onExpand`,
    //   payload: {
    //     expandedKeys,
    //     autoExpandParent: false,
    //   }
    // });
  }
  onSelect = (selectedKeys,e) => {
    console.log('selectedKeys',selectedKeys);
    console.log(e.selectedNodes)
    if(selectedKeys.length>0 ){
      let tableName = selectedKeys
      let id = e.selectedNodes[0].id
      this.props.queryDBFileds(id,tableName)
    }
  }
  // onLoadData = (treeNode) => {
  //   console.log(treeNode.props)
  //   let tableName = treeNode.props.eventKey
  //   let id = treeNode.props.data.id
  //   // return this.props.queryDBFileds(id)
  //   return new Promise((resolve) => {

  //     this.props.queryDBFileds(id,tableName)
  //     resolve();
  //     // if (treeNode.props.isGetDealer === 1) {
  //     //   console.log(treeNode.props)
  //     //   let id = treeNode.props.eventKey;

  //     //   this.props.queryDBFileds(id)
  //     // }
  //   })
  // }
  render() {
    const treeData = this.props.treeData;
    const { expandedKeys,searchValue } = this.state;
    const loop = data => data.map((item) => {
      // console.log(item)
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span className="color-red">{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode key={item.key} title={title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={title} id={item.id} />;
    });
    return (
      <Tree
        onExpand={this.onExpand}
        expandedKeys={expandedKeys}
        onSelect={this.onSelect}
        // loadData={this.onLoadData}
        showIcon
    switcherIcon={<TableOutlined />}
      >
        {loop(treeData)}
      </Tree>
    );
  }
}
export default AsyncTree;