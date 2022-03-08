import React, { useEffect, useState } from "react";
import { mediaTypes } from "../../../src/api";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { InputText } from "../form/InputText";
import { InputTextarea } from "../form/InputTextarea";
import { InputDropdown } from "../form/InputDropdown";

const prepareMediaTypes = (mediaTypesCallback) => {
  mediaTypes((result) => {
    const preparedMediaTypes = result.map((mediaType) => ({ label: mediaType.name, value: mediaType['@id'] }));
    mediaTypesCallback(preparedMediaTypes);
  });
}

export default function RecommendationData() {
  const [mediaTypeList, setMediaTypeList] = useState([]);
  const { handleSubmit, reset, control } = useForm();
  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    prepareMediaTypes(setMediaTypeList);
  }, []);

  return (
    <div>
      This is a place to share some recommendations with your fellow Magnolians. Be sure to include not just what it is - but why you like it
      <form>
        <br/>
        <InputText name={"name"} control={control} label={"Name"} />
        <br/>
        <InputTextarea name={"description"} control={control} label={"Description"} />
        <br/>
        <InputDropdown name={"type"} control={control} label={"Media type"} options={mediaTypeList} />
        <br/>
        <div>TODO: GENRES</div>
        <br/>
        <InputText name={"link"} control={control} label={"Link"} />
        <br/>
        <InputText name={"user"} control={control} label={"User"} />
        <br/>
        <div>TODO: USER'S COMMENT</div>
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
      </form>
    </div>
  );
}
