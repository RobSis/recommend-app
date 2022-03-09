import React, { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import { genres, mediaTypes } from "../../../src/api";
import { Button, Input, FormControl, InputLabel, Select, OutlinedInput, MenuItem, Box, Chip } from "@mui/material";
import { useForm } from "react-hook-form";
import { InputText } from "../form/InputText";
import { InputTextarea } from "../form/InputTextarea";
import { InputDropdown } from "../form/InputDropdown";
import RecommendationComment from "./RecommendationComment";
import { Report } from '@mui/icons-material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const prepareMediaTypes = (mediaTypesCallback) => {
  mediaTypes((result) => {
    const preparedMediaTypes = result.map((mediaType) => ({ label: mediaType.name, value: mediaType['@id'] }));
    mediaTypesCallback(preparedMediaTypes);
  });
}

const prepareGenres = (genresListCallback, genresMapCallback) => {
  genres((result) => {
    const genresMap = new Map();
    const preparedGenres = result.map((genre) => {
      const mappedGenre = { label: genre.name, value: genre['@id'] };
      genresMap.set(mappedGenre.value, mappedGenre.label);
      return mappedGenre;
    }
    );
    genresListCallback(preparedGenres);
    genresMapCallback(genresMap);
  });
}

function getStyles(genre, genres, theme) {
  return {
    fontWeight:
      genres.indexOf(genre) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function RecommendationData() {
  const theme = useTheme();
  const [mediaTypeList, setMediaTypeList] = useState([]);
  const [genresSourceList, setGenresSourceList] = useState([]);
  const [genresSourceMap, setGenresSourceMap] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const { handleSubmit, reset, control } = useForm();
  const onSubmit = (data) => {
    console.log(genresList)
    console.log(data);
  }


  const handleGenresChange = (event) => {
    const {
      target: { value },
    } = event;
    setGenresList(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    prepareMediaTypes(setMediaTypeList);
  }, []);

  useEffect(() => {
    prepareGenres(setGenresSourceList, setGenresSourceMap);
  }, []);

  return (
    <div>
      <div><Report sx={{ mr: 2 }} />NOT WORKING YET !!<Report sx={{ ml: 2 }} /></div>
      <div>This is a place to share some recommendations with your fellow Magnolians. Be sure to include not just what it is - but why you like it</div>
      <div>
        <form>
          <br />
          <InputText required name={"name"} control={control} label={"Name"} />
          <br />
          <label htmlFor="image">
            <Input accept="image/*" id="image" multiple type="file" />
            <Button variant="contained" component="span">
              Upload cover
            </Button>
          </label>
          <br />
          <InputTextarea required name={"description"} control={control} label={"Description"} />
          <br />
          <InputDropdown required name={"type"} control={control} label={"Media type"} options={mediaTypeList} />
          <br />
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="genres-label">Genres</InputLabel>
            <Select
              labelId="genres-label"
              id="genres"
              multiple={true}
              value={genresList}
              onChange={handleGenresChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={genresSourceMap.get(value)} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {genresSourceList.map((genre) => (
                <MenuItem
                  key={genre.value}
                  value={genre.value}
                  style={getStyles(genre.value, genresList, theme)}
                >
                  {genre.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <InputText name={"link"} control={control} label={"Link"} />
          <br />
          <RecommendationComment control={control} />
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
        </form>
      </div>
    </div>
  );
}
