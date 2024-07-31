import React from "react";
import Select, { SingleValue } from "react-select";
import { languageOptions, languageOption } from "./languageOptions";

type LanguagesDropdownProps = {
    onSelectChange: (sl: SingleValue<languageOption> | null) => void
}

export default function LanguagesDropdown( { onSelectChange }: LanguagesDropdownProps ): JSX.Element {
    return (
        <Select 
            options={languageOptions}
            defaultValue={languageOptions[0]}
            onChange={(selectedOption) => onSelectChange(selectedOption)}
        />
    );
}
