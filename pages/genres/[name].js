import * as React from 'react';
import {useEffect, useState} from 'react';
import {Link, Typography} from '@mui/material';
import {useRouter} from "next/router";
import SearchTeaser from "../../templates/components/search/SearchTeaser";

const defaultBaseUrl = process.env.NEXT_PUBLIC_MGNL_HOST;

export default function Genre() {
    const router = useRouter();
    const { name } = router.query;

    const [genre, setGenre] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    const fetchGenre = async () => {

        const url = `${defaultBaseUrl}/.rest/delivery/genres/v1/?@name=${name}`;
        const response = await fetch(url);
        const json = await response.json();
        setGenre(json.results.pop());
    }

    const fetchRecommendations = async () => {
        const url = `${defaultBaseUrl}/.rest/delivery/recommendations/v1/?genres=${genre['@id']}`;
        console.log("genres:" + url)
        const response = await fetch(url);
        const json = await response.json();
        //console.log("res:" + JSON.stringify(json.results,null,2))
        setRecommendations(json.results);
    }

    useEffect(() => {
        if (name) {
            fetchGenre();
        }
    }, [name]);

    useEffect(() => {
        if (genre) {
            fetchRecommendations();
        }
    }, [genre])

    return (
        <>
            <Typography
                component="h1"
                variant="h2"
                align="left"
                color="text.primary"
                gutterBottom
            >
                {genre && genre.name}
            </Typography>
            {recommendations && recommendations.length > 0 ? (
                recommendations.map((item, index) => {
                    return (
                         <SearchTeaser item={item} key={index} /> 
                    //<div>{item.name}</div>
                    )
                })
            ) : (
                'There are no recommendations in this genre.'
            )}
        </>
    );
}
