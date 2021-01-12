/* eslint-disable class-methods-use-this */

/**
 * 全局store, 在整个App的生命周期生存
 */
import { observable, computed, action, autorun, when } from 'mobx';
import Config from '../config';
class GlobalStore {

  constructor() {

   
  }

  // 提示信息
  @observable alertMsg = {
    message: '',
    alertVisible: false,
    type: 'danger',     // "info", "success", "warning", "danger"
    autoClose: false,
  };
  // 提示信息
  @observable modelMsg = {
    message: '',
    modelVisible: false,
    hasCancel: false,
    cancelFn: null,
    sureFn: null
  };
  @observable showWaiting = {
    show: false,
    text: "加载中...",     // "加载中..."
  };

  // 用弹窗的方式显示提示信息
  @action showModel(msg,sureFn) {
    this.modelMsg = Object.assign(this.modelMsg, {
      message: msg,
      modelVisible: true,
      hasCancel: false,
      cancelFn: null,
      sureFn: sureFn
    });
  }
  // 用弹窗的方式显示提示信息
  @action showCancelModel(msg, cancelFn, sureFn) {
    this.modelMsg = Object.assign(this.modelMsg, {
      message: msg,
      modelVisible: true,
      hasCancel: true,
      cancelFn,
      sureFn
    });
  }

  // 显示一般提示信息
  @action showInfo(msg) {
    this.alertMsg = Object.assign(this.alertMsg, {
      message: msg,
      type: 'info',
      autoClose: true,
      alertVisible: true
    });
    if (this.alertMsg.autoClose) {
      setTimeout(() => {
        this.alertMsg = Object.assign(this.alertMsg, {
          message: '',
          alertVisible: false
        });
      }, 3000);
    }
  }
  // 显示成功提示信息
  @action showSuccess(msg) {
    this.alertMsg = Object.assign(this.alertMsg, {
      message: msg,
      type: 'success',
      autoClose: true,
      alertVisible: true
    });
    if (this.alertMsg.autoClose) {
      setTimeout(() => {
        this.alertMsg = Object.assign(this.alertMsg, {
          message: '',
          alertVisible: false
        });
      }, 3000);
    }
  }
  // 显示警告提示信息
  @action showWarning(msg) {
    this.alertMsg = Object.assign(this.alertMsg, {
      message: msg,
      type: 'warning',
      autoClose: true,
      alertVisible: true
    });
    if (this.alertMsg.autoClose) {
      setTimeout(() => {
        this.alertMsg = Object.assign(this.alertMsg, {
          message: '',
          alertVisible: false
        });
      }, 3000);
    }
  }
  // 显示错误提示信息
  @action showError(msg) {
    this.alertMsg = Object.assign(this.alertMsg, {
      message: msg,
      type: 'danger',
      autoClose: false,
      alertVisible: true
    });
    setTimeout(() => {
      this.alertMsg = Object.assign(this.alertMsg, {
        message: '',
        alertVisible: false
      });
    }, 3000);
  }

  // 隐藏提示信息
  @action hideAlert() {
    this.alertMsg = Object.assign(this.alertMsg, {
      message: '',
      alertVisible: false
    });
  }

  // 显示等待遮罩
  @action showWait() {
    this.showWaiting = Object.assign(this.showWaiting, {
      show: true
    });
    // 超时自动关闭
    // setTimeout(() => {
    //     this.showWaiting = Object.assign(this.showWaiting, {show:false});
    // }, 20000);
  }
  // 隐藏等待遮罩
  @action hideWait() {
    this.showWaiting = Object.assign(this.showWaiting, {
      show: false
    });
  }
  
}
const globalStore = new GlobalStore()
export default globalStore //new GlobalStore()// new GlobalStore();
