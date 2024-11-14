import { useState } from "react";

function ToogleInput({ labelTitle, required, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType }) {

    const [value, setValue] = useState(defaultValue);

    const updateToogleValue = () => {
        const updatedValue = !value;
        setValue(updatedValue);
        updateFormValue({ updateType, value: updatedValue });
    };
    

    return (
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label cursor-pointer">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
                <input required={required || false} type="checkbox"  className="toggle" checked={value} onChange={updateToogleValue} />
            </label>
        </div>
    );
}

export default ToogleInput;
