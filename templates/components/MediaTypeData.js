import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { mediaTypeByName } from "../../src/api";

export default function MediaTypeData() {
  const [mediaType, setMediaType] = useState({});
  const { query } = useRouter();
  useEffect(() => {
    mediaTypeByName(query.type, setMediaType);
  }, []);
  const mediaTypeLogo = mediaType.icon ? mediaType.icon['@link'] : 'images/default.svg';

  return (
    <>
      {mediaType.name ? <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {mediaType.name}
          </Typography>
        </CardContent>
        {mediaTypeLogo && <CardMedia
          component="img"
          image={mediaTypeLogo}
          alt={mediaType.name}
        />}
      </Card>
        : <div>Media type not found: {query.type}</div>}
    </>
  );
}
