import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

export const InputText = ({ name, control, label }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) => (
                <div>
                    <TextField
                        helperText={error ? error.message : null}
                        size="small"
                        error={!!error}
                        onChange={onChange}
                        value={value ? value : ''}
                        fullWidth
                        label={label}
                        variant="outlined"
                    />
                </div>
            )}
        />
    );
};
