import React from "react";
import { InputText } from "../form/InputText";
import { InputTextarea } from "../form/InputTextarea";
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
