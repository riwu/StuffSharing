import React from 'react';
import { MenuItem, DropdownButton, Form, ControlLabel, FormControl, Button } from 'react-bootstrap';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import { Range } from 'rc-slider';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import CountrySelect from './react-country-select';

import './Search.css';


const Search = ({ search, setFilter, onSubmit }) => (
  <div className="Search">
    <FormControl
      className="formGroup"
      type="text"
      placeholder="Search for item"
      value={search.name}
      onChange={e => setFilter('name', e.target.value)}
    />

    <Form className="formGroup">
      <ControlLabel>Category</ControlLabel>
      {' '}
      <DropdownButton
        id="Sort by"
        title={search.category}
      >
        {['All', 'Books', 'Movies/Music', 'Games/Toys', 'Electronics', 'Home',
          'Clothes/Shoes/Jewellery', 'Sports', 'Automotives',
          'Office & School Supplies', 'Others'].map(category => (
            <MenuItem
              key={category}
              onClick={() => setFilter('category', category)}
              active={search.category === category}
            >{category}</MenuItem>
      ))}
      </DropdownButton>
    </Form>

    <Form className="formGroup">
      <ControlLabel>Available before</ControlLabel>
      {' '}
      <DayPickerInput
        value={search.availableDate}
        format="D MMM YY"
        onDayChange={day => setFilter('availableDate', day.format('D MMM YY'))}
      />
    </Form>

    <Form inline className="formGroup">
      <ControlLabel>Minimum loan period:</ControlLabel>
      {' '}
      <FormControl
        type="number"
        value={search.minLoan}
        min={0}
        max={500}
        step={5}
        onChange={e => setFilter('minLoan', e.target.value)}
      />
      {' '}
      <ControlLabel>days</ControlLabel>
    </Form>

    <div className="sliderContainer">
      <ControlLabel>Price range</ControlLabel>
      <Range
        className="slider"
        value={search.price}
        marks={{
          0: 'FREE',
          100: 'MAX',
          ...[...Array(4).keys()].reduce((obj, value) => {
            const key = (value + 1) * 20;
            obj[key] = '$' + key; //eslint-disable-line
            return obj;
          }, {}),
        }}
        step={5}
        onChange={value => setFilter('price', value)}
      />
    </div>

    <Form className="sliderContainer">
      <ControlLabel>Condition</ControlLabel>
      <Range
        className="slider"
        value={search.condition}
        min={1}
        max={5}
        marks={{
          1: 'Very old',
          5: 'New',
          ...[...Array(3).keys()].reduce((obj, value) => {
            const key = value + 2;
            obj[key] = key; //eslint-disable-line
            return obj;
          }, {}),
        }}
        step={1}
        onChange={value => setFilter('condition', value)}
      />
    </Form>

    <Form inline className="formGroup">
      <ControlLabel>Owner</ControlLabel>
      {' '}
      <FormControl
        type="text"
        placeholder="Enter owner name"
        value={search.owner}
        onChange={e => setFilter('owner', e.target.value)}
      />
    </Form>
    <Form inline className="countryContainer">
      <ControlLabel className="controlLabel">Country</ControlLabel>
      <div className="country">
        <CountrySelect
          multi
          flagImagePath="./assets/flags/"
          value={search.location}
          onSelect={countries => setFilter('location', countries)}
        />
      </div>
    </Form>

    <Form inline className="formGroup">
      <div className="sort">
        <div>
          <ControlLabel>Sort by</ControlLabel>
          {' '}
          <DropdownButton
            id="Sort by"
            title={search.sort}
          >
            {['Price', 'Condition', 'Max Loan', 'Available date'].map(category => (
              <MenuItem
                key={category}
                onClick={() => setFilter('sort', category)}
                active={search.sort === category}
              >{category}</MenuItem>
            ))}
          </DropdownButton>
        </div>
        <div>
          Asc{' '}
          <Switch
            checked={search.asc}
            onChange={value => setFilter('asc', value)}
          />
          {' '}Desc
        </div>
      </div>
    </Form>

    <Form inline className="formGroup">
      <ControlLabel>Show</ControlLabel>
      {' '}
      <FormControl
        type="number"
        value={search.count}
        min={0}
        max={500}
        step={50}
        onChange={e => setFilter('count', e.target.value)}
      />
      {' '}
      <ControlLabel>per page</ControlLabel>
    </Form>

    <Button
      className="submit"
      bsStyle="primary"
      onClick={() => {
        setFilter('page', 0);
        onSubmit({ ...search, page: 1 });
      }}
    >
      Search now!
    </Button>
  </div>
);

export default Search;
