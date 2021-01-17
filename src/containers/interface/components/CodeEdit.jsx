import React, { Component } from 'react';
import codemirror from 'codemirror';
// import { debounce } from 'lodash.debounce';

require('codemirror/lib/codemirror.css'); // CodeMirrory原生样式
require('codemirror/mode/sql/sql');
require('codemirror/mode/shell/shell');
require('codemirror/addon/display/placeholder'); 
require('codemirror/addon/hint/show-hint.css'); // 用来做代码提示
require('codemirror/addon/hint/show-hint.js'); // 用来做代码提示
require('codemirror/addon/hint/sql-hint.js'); // 用来做代码提示


export default class CodeEdit extends React.Component {
  static defaultProps = {
    useFocus: true
  }

  componentDidMount() {
    this.paste = '';
    const {
      onChange, onBlur, options, value = '', onScroll,
      onCursorActivity, onInputRead,
    } = this.props;

    this.editor = codemirror(this.ref, {
      indentWithTabs: true,// 使用制表符进行智能缩进
      smartIndent: true, //智能缩进
      lineNumbers: true,
      matchBrackets: true,//匹配结束符号，比如"]、}"
      autofocus: false,
      extraKeys: { Tab: 'autocomplete' },
      hintOptions: { completeSingle: false },
      autoCloseBrackets: true , // 自动闭合符号
      lineWrapping: true,// 在行槽中添加行号显示器、折叠器、语法检测器`
      value
    });
    const { editor, setCursor } = this;

    setCursor(editor, true);
    // const changeDelay = debounce((e) => {
    //   setCursor(e);
    //   onChange && onChange(e.getValue());
    // }, 300);
    // editor.on('change', changeDelay);
    editor.on('blur', (e) => {
      setCursor(e);
      onBlur && onBlur(e.getValue());
    });
    editor.on('cursorActivity', onCursorActivity);
    editor.on('inputRead', (cm, change) => onInputRead(cm, change, editor));
    onScroll && editor.on('scroll', onScroll);
  }

  shouldComponentUpdate({ paste = '', value = '', }) {
    const { editor } = this;

    if (paste !== this.paste) {
      this.focus();
      editor.replaceSelection(` ${paste}`);
      this.paste = paste;
    } else if (value !== editor.getValue()) {
      editor.setOption('value', value);

      editor.setValue(value);
      this.fixBottom();
      this.focus();
    }
    return false;
  }

  setCursor = (editor, toEnd) => {
    const { line, ch } = editor.doc.getCursor();
    this.cursor = { ch, line: toEnd ? line + 1 : line };
  }

  focus() {
    const { editor } = this;
    const { options: { readOnly }, useFocus } = this.props;
    if (readOnly) return;
    if (!useFocus) return;
    editor.focus();
    editor.setCursor({ ...this.cursor }, readOnly);
  }

  fixBottom() {
    const { fixBottom } = this.props;
    if (!fixBottom) return;

    const { editor } = this;
    const { height } = editor.getScrollInfo();
    editor.scrollTo(0, height);
  }

  render() {
    const { className, options: { readOnly } } = this.props;
    return (
      <div
        className={`${className} ${readOnly && 'readOnly'}`}
        ref={(self) => { this.ref = self; }}
      />
    );
  }
}
