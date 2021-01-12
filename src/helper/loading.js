import React, { Component } from 'react';
import {
  loading_modal,
} from './loading.css';

function Loading(props) {
  return (
    <div className={loading_modal} >
      <div className="ant-spin ant-spin-lg ant-spin-spinning ant-spin-show-text portal-spin" >
        <span className="ant-spin-dot" >
          <i ></i>
          <i ></i>
          <i ></i>
          <i ></i>
        </span>
        <div className="ant-spin-text" >{ "加载中..." }</div>
      </div>
    
    </div>
  )
}

export default Loading;
