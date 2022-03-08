import * as React from 'react';
import { Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import {createMarkup} from "../../../utils";

export default function SearchTeaser({ item }) {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={item.image['@link']}
                alt={item.image['@name']}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={createMarkup(item.description)} /> */}
            
                <Typography>
                    {item.type.name}
                </Typography>

                <Typography>
                {item.genres && item.genres.map((genre) => {
                        return (
                          <div key={genre.id}>
                              {genre.name}
                          </div>
                        )}
                )}
                </Typography>

               
            </CardContent>
            <CardActions>
                <Button size="small" href={`/detail?id=${item['@id']}`}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}
