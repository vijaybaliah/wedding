import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CloseIcon from '../../Icons/Close';

export default class Value extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool.isRequired,
    onRemove: PropTypes.func,
    value: PropTypes.object.isRequired,
  };

  handleRemove = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onRemove();
  }

  renderRemoveIcon() {
    if (this.props.disabled || !this.props.onRemove) return null;

    return (
      <span className={'selectRemoveIcon'} onMouseDown={this.handleRemove}>
        <CloseIcon width={10} height={10}/>
      </span>
    );
  }

  render() {
    return (
      <div
        className={`${this.props.className} selectValue`}
        title={this.props.value.title}
      >
        {this.renderRemoveIcon()}
        {this.props.children}
      </div>
    );
  }
}
