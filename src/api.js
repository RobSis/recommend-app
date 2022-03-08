const HOST = 'https://author-onehob4efwibvpms.saas.magnolia-cloud.com';

const MEDIA_TYPES_URL = HOST + '/.rest/delivery/types/v1';

const RECOMMENDATIONS_BY_TYPE_URL = HOST + '/.rest/delivery/recommendations/v1';

export const mediaTypeByName = async (type, dataCallback) => {
  try {
    const mediaTypes = await fetch(MEDIA_TYPES_URL + '?name=' + type).then(res => res.json());
    if (!mediaTypes.results || mediaTypes.results.length !== 1) {
      console.error("Media type not found or multiple media types found");
    } else {
      dataCallback(mediaTypes.results[0]);
    }
  } catch (error) {
    console.error("Request error", error);
  }
};

export const recommendationsByTypeData = async (type, dataCallback) => {
  try {
    mediaTypeByName(type, async (mediaType) => {
      const recommendations = await fetch(RECOMMENDATIONS_BY_TYPE_URL + '?type=' + mediaType['@id']).then(res => res.json()); // TODO
      console.log(recommendations);
      dataCallback(recommendations.results);
    })
  } catch (error) {
    console.error("Request error", error);
  }
};
