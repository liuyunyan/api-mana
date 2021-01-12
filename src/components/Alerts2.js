import React from 'react';
import { message } from 'antd';
import { observer } from 'mobx-react';
import globalStore from '../stores/GlobalStore';

@observer
class Alerts2 extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
const success = () => {
  message.success('This is a success message');
};

const success = () => {
  message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10);
};

const warning = () => {
  message.warning('This is a warning message');
};

    handleAlertDismiss = () => {
        globalStore.alertMsg = Object.assign(globalStore.alertMsg, { message: '', alertVisible: false });
    };

    render() {
        if (globalStore.alertMsg.alertVisible) {
            switch (globalStore.alertMsg.type) {
                case "danger":
                    sign = (<i className="iconfont icon-alert-danger mr10"></i>);
                break;
                case "info":
                    sign = (<i className="iconfont icon-alert-info mr10"></i>);
                break;
                case "warning":
                    sign = (<i className="iconfont icon-alert-warning mr10"></i>);
                break;
                default:
                    sign = (<i className="iconfont icon-alert-success mr10"></i>);
                break;
            }
            return (
                
            );
        }
        return (<div />);
    }
}

export default Alerts2;
module.exports = Alerts2 //不能删除，抽取多语后要重新加载