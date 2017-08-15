import React from 'react';

export default class BaseComponent extends React.Component {
  constructor(props) {
    super(props);
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach((method) => {
      if (typeof this[method] !== 'function') {
        return;
      }
      this[method] = this[method].bind(this);
    });
  }
}
