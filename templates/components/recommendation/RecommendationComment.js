import React, { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { genres, mediaTypes } from "../../../src/api";
import { Button, FormControl, InputLabel, Select, OutlinedInput, MenuItem, Box, Chip } from "@mui/material";
import { useForm } from "react-hook-form";
import { InputText } from "../form/InputText";
import { InputTextarea } from "../form/InputTextarea";
import { InputDropdown } from "../form/InputDropdown";
import { RatingComponent } from "../form/RatingComponent";


export default function RecommendationComment({ control }) {
  return (
    <div>
      User's review:
      <div>
        <RatingComponent name={"rating"} label={"Rating"} control={control} />
        <br />
        <InputText name={"commentingUser"} control={control} label={"User"} />
        <br />
        <InputTextarea name={"comment"} control={control} label={"Comment"} />
      </div>
    </div>
  );
}
