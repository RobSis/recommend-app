import * as React from 'react';
import { EditableArea } from '@magnolia/react-editor';
import {Typography} from "@mui/material";

export default function HomePage(props) {

  const { main, title } = props;
  return (
    <>
      <Typography
          component="h1"
          variant="h2"
          align="left"
          color="text.primary"
          gutterBottom
      >
        { title }
      </Typography>

      <div className='Main'>
        {main && <EditableArea className='Area' content={main} />}
      </div>
    </>
  );
}