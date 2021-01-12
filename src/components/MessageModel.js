/**
 * 消息弹窗口组件
 */
import React from 'react';
// import { Modal, Button } from 'react-bootstrap';
import { Modal, Button } from 'antd';
import { observer } from 'mobx-react';
import globalStore from '../stores/GlobalStore';

@observer
class MessageModel extends React.Component {
    constructor(props) {
        super(props);
    }

    close = () => {
        globalStore.modelMsg = Object.assign(globalStore.modelMsg, { message: '', modelVisible: false });
    };
    cancelFn = () => {
        if (typeof (globalStore.modelMsg.cancelFn) === "function") {
            globalStore.modelMsg.cancelFn();
        }
        this.close();
    }

    sureFn = () => {
        if (typeof (globalStore.modelMsg.sureFn) === "function") {
            globalStore.modelMsg.sureFn();
        }
        this.close();
    }

    render() {
        let _this = this;
        return (
            <Modal
                width={418}
                title=""
                className="static-modal"
                visible={globalStore.modelMsg.modelVisible}
                closable={false}
                maskClosable={false}
                maskStyle={{zIndex: '1100'}}
                zIndex={1100}
                onOk={_this.sureFn}
                onCancel={_this.close}
                autoFocusButton={"ok"}
                footer={globalStore.modelMsg.hasCancel === true ?undefined :
                    <Button key="ok" type="primary" onClick={_this.sureFn}>
                        确定
                    </Button>
                }
            >
                {globalStore.modelMsg.hasCancel === true ? <i className="iconfont icon-warn-sign mr20"></i> : ''}
                <span>{globalStore.modelMsg.message}</span>
            </Modal>

            // ant-modal-body

            // <Modal show={globalStore.modelMsg.modelVisible} onHide={_this.close} className="static-modal">
            //     <Modal.Body style={{wordBreak: "break-all"}}>
            //         {globalStore.modelMsg.hasCancel === true ? <i className="iconfont icon-warn-sign mr20"></i> : ''}
            //         <span>{globalStore.modelMsg.message}</span>
            //     </Modal.Body>
            //     <Modal.Footer>
            //         <Button className={globalStore.modelMsg.hasCancel === true ? "" : "hidden"} onClick={_this.cancelFn}>取消</Button>
            //         <Button bsStyle="primary" onClick={_this.sureFn}>确定</Button>
            //     </MPodal.Footer>
            // </Modal>
        );
    }
}

export default MessageModel;
module.exports = MessageModel; //不能删除，抽取多语后要重新加载
