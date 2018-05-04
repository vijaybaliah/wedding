import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ignoreEvent } from './helpers';

export default class Option extends Component {
  static propTypes = {
    className: PropTypes.string,
    instancePrefix: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onFocus: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    option: PropTypes.object.isRequired,
    optionIndex: PropTypes.number.isRequired,
  };

  onFocus(event) {
    if (!this.props.isFocused) {
      this.props.onFocus(this.props.option, event);
    }
  }

  handleMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSelect(this.props.option, event);
  };

  handleMouseEnter = event => {
    this.onFocus(event);
  };

  handleMouseMove = event => {
    this.onFocus(event);
  };

  handleTouchStart = () => {
    this.dragging = false;
  };

  handleTouchMove = () => {
    this.dragging = true;
  };

  handleTouchEnd = event => {
    if (this.dragging) return;

    this.handleMouseDown(event);
  };

  render() {
    const {
      option,
      instancePrefix,
      optionIndex,
      isDisabled,
      isSelected,
      isFocused,
      isDropDownDisabled
    } = this.props;

    const optionFocused = isFocused ? 'optionFocused' : ''
    const optionSelected = isSelected ? 'optionSelected' : ''
    const optionDisabled = isDisabled ? 'optionDisabled' : ''

    return (isDisabled || isDropDownDisabled) ? (
      <div
        className={this.props.className}
        onMouseDown={ignoreEvent}
        onClick={ignoreEvent}
      >
        {this.props.children}
      </div>
    ) : (
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
      <div
        className={`option ${this.props.className} ${option.className} ${optionFocused} ${optionSelected} ${optionDisabled}`}
        role="option"
        aria-selected={isSelected}
        aria-label={option.label}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        id={`${instancePrefix}-option-${optionIndex}`}
        title={option.title}
      >
        {this.props.children}
      </div>
    );
  }
}
