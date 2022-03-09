import React from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

export const InputDropdown = ({ name, control, label, required, options }) => {
  const generateSingleOptions = () => {
    return options?.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl fullWidth>
      <label>{label}</label>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select
            value={value}
            onChange={onChange}
            required={required}
          >
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};