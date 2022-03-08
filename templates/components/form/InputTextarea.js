import React from "react";
import { Controller } from "react-hook-form";
import { TextareaAutosize, InputLabel, FormControl } from "@mui/material";

export const InputTextarea = ({ name, control, label }) => {
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
            variant="outlined"
          />
        )}
      />
    </FormControl>
  );
};
