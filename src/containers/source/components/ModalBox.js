/**
 * @file 弹出层组件 显示 有用
 */
import React from 'react';
import { observer } from 'mobx-react';
import { Modal } from 'antd';
@observer
class ModalBox extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <Modal
        title={this.props.modalTitle}
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        destroyOnClose={true}
        keyboard={false}
        maskClosable={false}
        width={800}
        cancelText={"取消"}
        okText={"确定"}
        // centered={true}
      >
        {
          React.Children.map(this.props.children, child => React.cloneElement(child, {
          }))
        }
      </Modal>
    )
  }
}

export default ModalBox;
