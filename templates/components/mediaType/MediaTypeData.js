import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CardContent, Card, CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import { mediaTypeByName } from "../../../src/api";

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
          {mediaTypeLogo && <CardMedia>
            <img src={mediaTypeLogo} alt={mediaType.name} style={{ height: 150 }} />
          </CardMedia>
          }
        </CardContent>
      </Card>
        : <div>Media type not found: {query.type}</div>}
    </>
  );
}
