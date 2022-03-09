import * as React from 'react';
import {Box, Button, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {latestByType, mediaTypeById} from '../../src/api';
import ReviewGrid from './ReviewGrid';

export default function Latest(props) {

  const { title, type, limit } = props;

  const [recommendations, setRecommendations] = useState([]);
  const [mediaType, setMediaType] = useState([]);

  const slice = (recommendations) => {
    setRecommendations(recommendations.slice(0, limit))
  }

  useEffect(() => {
    mediaTypeById(type, setMediaType);
    latestByType(type, slice);
  }, []);
  return (
    <Box sx={{flexGrow: 1, mt: 10 }}>
      <Typography variant="h3" component="h4">
        { title }
      </Typography>
      {recommendations && <ReviewGrid recommendations={recommendations} />}
      <Button size="small" href={`/mediaType?type=${mediaType['@name']}`}>
        See All
      </Button>
    </Box>
  );
}