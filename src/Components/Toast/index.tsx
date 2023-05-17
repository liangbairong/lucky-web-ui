import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
//removeIf(!production)
import './index.less';
//endRemoveIf(!production)

interface IState {
  time?: number;
  content?: string;
  callback?: () => void;
}

const ToastElement = ({ content }: IState) => {
  return <div className="toast-content">{content}</div>;
};

class Toast {
  vm: Array<any> = [];
  props: IState = {};

  open(params: IState) {
    this.props = params || {};

    this.render(<ToastElement content={this.props.content} />);
    setTimeout(() => {
      this.close();
    }, this.props.time || 1000);
  }

  close() {
    if (this.vm.length > 0) {
      // ReactDOM.unmountComponentAtNode(this.vm[0]);
      this.vm[0].root.unmount();
      document.body.removeChild(this.vm[0].div);
      this.vm.shift();
    }
  }

  render(element: any) {
    let div = document.createElement('div');
    div.className = 'toast';

    document.body.appendChild(div);
    const root = ReactDOM.createRoot(div);
    root.render(element);
    this.vm.push({
      div,
      root,
    });
  }
}

export default new Toast();
