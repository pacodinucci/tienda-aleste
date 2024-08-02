import React, { useState } from "react";

interface AccordionRadioGroupProps {
  options: Array<{
    label: string;
    value: string;
    description: string;
    discount?: string;
  }>;
}

const AccordionRadioGroup: React.FC<AccordionRadioGroupProps> = ({
  options,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(
    options.length > 0 ? options[0].value : null
  );

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className="border border-gray-200">
      {options.map((option) => (
        <div key={option.value} className="border-t border-gray-300">
          <div className="flex items-center p-4 cursor-pointer border-b border-gray-300">
            <input
              type="radio"
              id={option.value}
              name="payment-method"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => handleChange(option.value)}
              className="hidden peer"
            />
            <label
              htmlFor={option.value}
              className="flex-grow cursor-pointer flex items-center"
            >
              <span
                className={`w-4 h-4 mr-2 inline-block border border-darkCustom rounded-full flex items-center justify-center ${
                  selectedValue === option.value
                    ? "bg-brownCustom border-transparent"
                    : "bg-white"
                }`}
              >
                {selectedValue === option.value && (
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                )}
              </span>
              <span>
                {option.label}
                {option.discount && (
                  <span className="text-gray-500 ml-2">{option.discount}</span>
                )}
              </span>
            </label>
          </div>
          {selectedValue === option.value && (
            <div className="p-4 bg-gray-50 border-t border-b border-gray-300 min-h-[80px]">
              <p>{option.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccordionRadioGroup;
