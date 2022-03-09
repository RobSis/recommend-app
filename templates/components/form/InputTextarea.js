import React from "react";
import { Controller } from "react-hook-form";
import { TextareaAutosize, FormControl } from "@mui/material";

export const InputTextarea = ({ name, control, label, required }) => {
  return (
    <FormControl fullWidth>
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
        }) => (
          <TextareaAutosize
            onChange={onChange}
            minRows={10}
            label={label}
            value={value}
            required={required}
            variant="outlined"
          />
        )}
      />
    </FormControl>
  );
};
