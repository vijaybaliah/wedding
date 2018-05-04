import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sifter from 'sifter';
import { toString, toArray } from './helpers';
import ValueComponent from './Value';
import OptionComponent from './Option';
import CloseIcon from '../../Icons/Close';
import ChevronUp from '../../Icons/ChevronUp';
import ChevronDown from '../../Icons/ChevronDown';
import MultiSelectValues from './MultiSelectValues';

export default class Select extends Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    filterOption: PropTypes.func,
    id: PropTypes.string,
    isLoading: PropTypes.bool,
    labelKey: PropTypes.string,
    multi: PropTypes.bool,
    name: PropTypes.string,
    noResultsText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    onFocus: PropTypes.func,
    onInputChange: PropTypes.func,
    onOpen: PropTypes.func,
    options: PropTypes.array,
    renderOption: PropTypes.func,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    required: PropTypes.bool,
    searchable: PropTypes.bool,
    searchableKeys: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.any, // eslint-disable-line
    valueKey: PropTypes.string,
  };

  static defaultProps = {
    backspaceToRemoveMessage: 'Press backspace to remove {label}',
    disabled: false,
    isLoading: false,
    labelKey: 'label',
    multi: false,
    noResultsText: 'No results found',
    placeholder: 'Select...',
    required: false,
    searchable: true,
    searchableKeys: [],
    valueKey: 'value',
  };

  constructor(props) {
    super(props);

    const sifter = new Sifter(props.options);
    this.state = {
      isOpen: false,
      value: '',
      prefix: `select-${Date.now()}`,
      focusedIndex: props.disabled ? -1 : 0,
      sifter,
      options: this.executeSearch(sifter, props, ''),
      optionsForValue: this.calculateValue(props),
    };
  }

  componentWillReceiveProps(props) {
    if (props.options !== this.props.options) {
      this.onOptionsChange(props);
    }
    if (props.value !== this.props.value) {
      this.onValueChange(props);
    }
  }

  componentDidUpdate() {
    const element =
      this.selector && this.selector.children[this.state.focusedIndex];

    if (element) {
      if (element.scrollIntoViewIfNeeded) element.scrollIntoViewIfNeeded(true);
      else if (element.scrollIntoView) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }
    }
  }

  onOptionsChange(props) {
    const sifter = new Sifter(props.options);
    this.setState({
      sifter,
      optionsForValue: this.calculateValue(props),
      options: this.executeSearch(sifter, props, this.state.value),
    }); // Re-index options and execute search again.
  }

  onValueChange(props) {
    this.setState({ optionsForValue: this.calculateValue(props) });
  }

  calculateValue = (props) => {
    let target = toArray(props.value).map((value) =>
      props.options.find((option) => option[props.valueKey] === value),
    );

    if (target.some((it) => (it === undefined || it === null))) {
      target = []; // options not loaded yet.
    }

    return target;
  }

  executeSearch = (sifter, props, value) => {
    let target = [];
    if (!props.searchable || !value.trim()) {
      // sort options. selected should appear at top.
      const setOfValues = new Set(toArray(props.value));
      const options = props.options.slice();
      options.sort((a, b) => {
        if (
          setOfValues.has(a[props.valueKey]) &&
          setOfValues.has(b[props.valueKey])
        ) {
          return 0;
        }
        if (setOfValues.has(a[props.valueKey])) return -1;
        if (setOfValues.has(b[props.valueKey])) return 1;
        return 0;
      });

      target = options.slice(
        0,
        Math.max(20, toArray(props.value).length),
      );
    } else {
      const results = sifter.search(value, {
        fields: [props.labelKey, ...props.searchableKeys],
        sort: [{ field: props.labelKey, direction: 'asc' }],
        limit: 20,
      });

      target = results.items.map(({ id: index }) => props.options[index]);
    }

    if (props.filterOption) {
      target = target.filter(props.filterOption);
    }

    return target;
  }

  get options() {
    return this.state.options;
  }

  get optionsForValue() {
    return this.state.optionsForValue;
  }

  openMenu() {
    this.focus();
    if (this.state.isOpen) return;
    this.setState({ isOpen: true, options: this.executeSearch(this.state.sifter, this.props, this.state.value) }, this.props.onOpen);
  }

  closeMenu() {
    this.blur();
    if (!this.state.isOpen) return;
    this.setState({ isOpen: false, value: '' }, this.props.onClose);
  }

  popValue() {
    this.handleRemove(this.optionsForValue[this.optionsForValue.length - 1]);
  }

  focus() {
    if (this.input) this.input.focus();
  }

  blur() {
    if (this.input) this.input.blur();
  }

  focusPreviousOption() {
    const count = this.options.length;

    this.setState({
      focusedIndex: (count + (this.state.focusedIndex - 1)) % count,
    });
  }

  focusNextOption() {
    const count = this.options.length;

    this.setState({
      focusedIndex: (count + (this.state.focusedIndex + 1)) % count,
    });
  }

  focusEndOption() {
    const index = this.options.length - 1;
    if (this.state.focusedIndex !== index) {
      this.setState({
        focusedIndex: index,
      });
    }
  }

  focusStartOption() {
    const index = 0;
    if (this.state.focusedIndex !== index) {
      this.setState({
        focusedIndex: index,
      });
    }
  }

  selectFocusedOption() {
    const option = this.options[this.state.focusedIndex];

    if (option) this.selectValue(option);
  }

  selectValue(option) {
    if (this.props.multi) {
      if (this.optionsForValue.indexOf(option) < 0) {
        const value = toArray(this.props.value).slice();
        const values = this.optionsForValue.slice();

        value.push(option[this.props.valueKey]);
        values.push(option);

        this.props.onChange(value, values);
      } else {
        this.handleRemove(option);
      }
    } else {
      this.props.onChange(option[this.props.valueKey], option);
      this.closeMenu();
    }
  }

  handleRemoveAll = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onChange([], []);
  }
  handleRemove = option => {
    if (this.props.multi) {
      const selected = toArray(this.props.value).slice();
      if (this.props.required && selected.length === 1) return;
      if (!option) return;

      const value = option[this.props.valueKey];
      const newSelected = selected.filter(it => it !== value);
      const newOptions = this.optionsForValue.filter(
        it => it[this.props.valueKey] !== value,
      );

      this.props.onChange(newSelected, newOptions);
    } else if (!this.props.required) {
      this.props.onChange(null);
    }
  };

  handleMouseDown = event => {
    if (
      this.props.disabled ||
      (event.type === 'mousedown' && event.button !== 0)
    ) {
      return;
    }

    event.preventDefault();

    if (!this.state.isOpen) {
      this.openMenu();
    }
  };

  handleKeyDown = event => {
    switch (event.key || event.keyCode) {
      // case 8: // backspace
      //   if (!this.state.value) {
      //     event.preventDefault();
      //     this.popValue();
      //   }
      //   break;
      case 'Tab':
      case 9:
        if (event.shiftKey || !this.state.isOpen) break;
        event.preventDefault();
        if (!this.props.disabled) {
          this.selectFocusedOption();
        }
        break;
      case 'Enter':
      case 13:
        event.preventDefault();
        event.stopPropagation();
        if (this.state.isOpen && !this.props.disabled) {
          this.selectFocusedOption();
        } else {
          this.focusNextOption();
        }
        break;
      case 'Escape':
      case 27:
        event.preventDefault();
        if (this.state.isOpen) {
          this.closeMenu();
          event.stopPropagation();
        }
        break;
      case ' ':
      case 32: // space
        if (this.props.searchable) break;
        event.preventDefault();
        if (!this.state.isOpen) {
          this.focusNextOption();
          break;
        }
        event.stopPropagation();
        this.selectFocusedOption();
        break;
      case 'ArrowUp':
      case 38: // up
        event.preventDefault();
        this.focusPreviousOption();
        break;
      case 'ArrowDown':
      case 40: // down
        event.preventDefault();
        this.focusNextOption();
        break;
      case 'End':
      case 35: // end key
        if (event.shiftKey) break;
        event.preventDefault();
        this.focusEndOption();
        break;
      case 'Home':
      case 36: // home key
        if (event.shiftKey) break;
        event.preventDefault();
        this.focusStartOption();
        break;
      // case 46: // delete
      //   if (!this.state.value) {
      //     event.preventDefault();
      //     this.popValue();
      //   }
      //   break;
      default:
        break;
    }
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

  handleInput = event => {
    const value = event.target.value;

    if (value !== this.state.value) {
      this.setState({ value, focusedIndex: -1, options: this.executeSearch(this.state.sifter, this.props, value) });
    }

    if (this.props.onInputChange) this.props.onInputChange(value);
  };

  handleInputFocus = event => {
    if (this.props.disabled) return;

    if (this.props.onFocus) this.props.onFocus(event);

    this.setState({
      focusedIndex: -1,
    });

    this.openMenu();
  };

  handleInputBlur = event => {
    if (
      this.selector &&
      (this.selector === document.activeElement ||
        this.selector.contains(document.activeElement))
    ) {
      this.focus();
      return;
    }

    if (this.props.onBlur) this.props.onBlur(event);

    this.closeMenu();
  };

  handleOptionFocus = (event, option, index) => {
    if (this.state.focusedIndex !== index) {
      this.setState({
        focusedIndex: index,
      });
    }
  };

  handleOptionSelect = (event, option) => {
    this.selectValue(option);
  };

  handleMouseDownOnSelector = event => {
    if (
      this.props.disabled ||
      (event.type === 'mousedown' && event.button !== 0)
    )
      return;
    event.preventDefault();
    event.stopPropagation();

    this.focus();
  };

  renderHiddenFields(values) {
    return values.map(it => (
      <input
        disabled={this.props.disabled}
        name={this.props.name}
        type="hidden"
        key={it[this.props.valueKey]}
        value={toString(it[this.props.valueKey])}
      />
    ));
  }

  toggleMenu = () => {
    if (this.props.disabled && !this.props.multi) {
      return
    }
    if (this.state.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  renderDropIcon() {
    const select = (this.props.disabled && !this.props.multi) ? 'select' : ''
    const disabled = (this.props.disabled && !this.props.multi) ? 'disabled' : ''
    return (
      <span className={`dropIcon ${select} ${disabled}`} onClick={this.toggleMenu}>
        {this.state.isOpen ? <ChevronUp /> : <ChevronDown />}
      </span>
    );
  }

  renderValue(values) {
    if (this.state.isOpen && this.state.value.trim()) return [];
    if (this.props.multi) {
      if (values.length > 0) {
        const selectValueUnderlay = this.state.isOpen ? 'selectValueUnderlay' : ''
        const selectDisabledValue = this.props.disabled ? 'selectDisabledValue' : ''
        return (
          <span
            className={`selectValueCount ${selectValueUnderlay} ${selectDisabledValue}`}
          >
            {
              !this.props.disabled &&
              <span className={'selectRemoveIcon'} onMouseDown={this.handleRemoveAll}>
                <CloseIcon width={10} height={10}/>
              </span>
            }
            <MultiSelectValues
              values = {values}
              disabled = {this.props.disabled}
              toggleMenu = {this.toggleMenu} />
          </span>
        );
      }
    }

    const selectValueUnderlay = (!this.props.multi && this.state.isOpen) ? 'selectValueUnderlay' : ''
    const selectDisabledValue = this.props.disabled ? 'selectDisabledValue' : ''
    return values.map(it => (
      <ValueComponent
        className={`${selectValueUnderlay} ${selectDisabledValue}`}
        disabled={this.props.disabled || this.props.required}
        key={it[this.props.valueKey]}
        onRemove={() => this.handleRemove(it)}
        value={it}
      >
        {toString(it[this.props.labelKey])}
      </ValueComponent>
    ));
  }

  renderInput(values) {
    let value = this.state.value;

    if (!this.state.isOpen) {
      value = '';
    }
    const selectInputDisabled = (this.props.disabled && !this.state.isOpen && values.length > 0) ? 'selectInputDisabled' : ''
    return (
      <input
        id={this.props.id}
        className={`selectInput ${selectInputDisabled}`}
        onBlur={this.handleInputBlur}
        onFocus={this.handleInputFocus}
        onInput={this.handleInput}
        ref={ref => {
          this.input = ref;
        }}
        role="combobox"
        value={value}
        placeholder={values.length ? '' : this.props.placeholder}
        autoComplete="off"
        aria-haspopup={toString(this.state.isOpen)}
        aria-expanded={toString(this.state.isOpen)}
        aria-autocomplete="both"
        aria-activedescendant={`${this.state.prefix}-option-${
          this.state.focusedIndex
        }`}
        aria-controls={`${this.state.prefix}-options`}
        aria-owns={`${this.state.prefix}-options`}
      />
    );
  }

  renderLoading() {
    if (this.props.isLoading) {
      return (
        <span className={'selectLoading'}>
          loading
        </span>
      );
    }

    return null;
  }

  renderSelector() {
    const values = new Set(toArray(this.props.value));
    const render =
      this.props.renderOption || (option => option[this.props.labelKey]);
    const options = this.options;

    return (
      <div
        id={`${this.state.prefix}-options`}
        className={'selectOptionsWrapper'}
        onMouseDown={this.handleMouseDownOnSelector}
        ref={ref => {
          this.selector = ref;
        }}
        role="listbox"
        tabIndex={-1}
      >
        {options.length ? (
          options.map((option, index) => (
            <OptionComponent
              key={option[this.props.valueKey]}
              instancePrefix={this.state.prefix}
              option={option}
              optionIndex={index}
              onFocus={event => this.handleOptionFocus(event, option, index)}
              onSelect={event => this.handleOptionSelect(event, option, index)}
              isFocused={index === this.state.focusedIndex}
              isSelected={values.has(option[this.props.valueKey])}
              isDisabled={option.disabled}
              isDropDownDisabled={this.props.disabled}
            >
              {this.props.multi && (
                <input
                  className={'optionCheckbox'}
                  type="checkbox"
                  checked={values.has(option[this.props.valueKey])}
                  readOnly
                />
              )}
              {render(option)}
            </OptionComponent>
          ))
        ) : (
          <div className={'selectNoOptions'}>
            {this.props.noResultsText}
          </div>
        )}
      </div>
    );
  }

  render() {
    const disabledClass = this.props.disabled ? 'disabled' : ''
    const selectControlFocus = this.state.isOpen ? 'selectControlFocus' : ''
    const values = toArray(this.optionsForValue);

    return (
      <div
        ref={ref => {
          this.wrapper = ref;
        }}
        className={`select ${this.props.className} ${disabledClass}`}
      >
        {this.renderHiddenFields(values)}
        <div
          className={`selectControl ${selectControlFocus}`}
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
          onTouchEnd={this.handleTouchEnd}
          onTouchMove={this.handleTouchMove}
          onTouchStart={this.handleTouchStart}
        >
          <span className={'selectInputWrapper'}>
            {this.renderValue(values)}
            {this.renderInput(values)}
            {this.renderDropIcon()}
          </span>
          {this.renderLoading()}
        </div>
        {this.state.isOpen && this.renderSelector()}
      </div>
    );
  }
}
