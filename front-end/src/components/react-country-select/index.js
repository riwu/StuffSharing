import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { countries } from './data';

export default class ReactCountrySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageStyle: {
        width: 30,
        height: 15,
      },
      tag: null,
    };
    this.logChange = this.logChange.bind(this);
    this.CountryRenderValue = this.CountryRenderValue.bind(this);
    this.CountryOptionRenderer = this.CountryOptionRenderer.bind(this);
  }

  logChange(val) {
    this.setState({ tag: val });
  }

  CountryOptionRenderer(option) {
    const flagImageUrl = `${this.props.flagImagePath + option.value}.png`;
    const optionStyle = {
      width: 50,
      height: 30,
    };
    return (
      <span style={{
        color: option.color,
      }}
      >
        <img alt="flag" src={flagImageUrl} style={optionStyle} />&nbsp; {option.label}
      </span>
    );
  }

  CountryRenderValue(option) {
    const flagImageUrl = `${this.props.flagImagePath + option.value}.png`;
    if (option.value === undefined) {
      return null;
    }
    return (
      <span>
        <img src={flagImageUrl} style={this.state.imageStyle} alt="" onError={this.onImageError} />&nbsp; {option.label}
      </span>
    );
  }

  render() {
    return (
      <div>
        <Select
          placeholder="Search country.."
          value={this.props.value || this.state.tag}
          options={countries}
          optionRenderer={this.CountryOptionRenderer}
          backspaceRemoves
          onChange={this.props.onSelect}
          valueRenderer={this.CountryRenderValue}
          multi={this.props.multi}
        />
      </div>
    );
  }
}
