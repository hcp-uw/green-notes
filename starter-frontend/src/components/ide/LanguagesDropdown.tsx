// @ts-nocheck
// Select height change from https://stackoverflow.com/a/60912805
// Select remove border from https://stackoverflow.com/a/52615293

import React from "react";
import Select, { SingleValue } from "react-select";
import { languageOptions, languageOption } from "./languageOptions";

type LanguagesDropdownProps = {
    onSelectChange: (sl: languageOption | null) => void,
    language: languageOption
}

export default function LanguagesDropdown( { onSelectChange, language }: LanguagesDropdownProps ): JSX.Element {
    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          background: '#fff',
          borderColor: '#9e9e9e',
          minHeight: '30px',
          height: '30px',
          boxShadow: state.isFocused ? null : null,
          border: 0,
          boxShadow: 'none', 
          borderRadius: '0px',
        }),
    
        valueContainer: (provided, state) => ({
          ...provided,
          height: '30px',
          padding: '0 6px'
        }),
    
        input: (provided, state) => ({
          ...provided,
          margin: '0px',
        }),
        indicatorSeparator: state => ({
          display: 'none',
        }),
        indicatorsContainer: (provided, state) => ({
          ...provided,
          height: '30px',
        }),
      };
    
    return (
        <Select 
            options={languageOptions}
            defaultValue={language}
            value={language}
            onChange={(selectedOption) => onSelectChange(selectedOption)}
            className="ide-dropdown"
            styles={customStyles}
        />
    );
}
