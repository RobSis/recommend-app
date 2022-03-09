const HOST = process.env.NEXT_PUBLIC_MGNL_HOST;

const GENRES_URL = HOST + '/.rest/delivery/genres/v1';
const MEDIA_TYPES_URL = HOST + '/.rest/delivery/types/v1';
const RECOMMENDATIONS_BY_TYPE_URL = HOST + '/.rest/delivery/recommendations/v1';

const listEntities = async (url, dataCallback) => {
  try {
    const list = await fetch(url).then(res => res.json());
    if (!list.results) {
      console.error("There are results");
      dataCallback([])
    } else {
      dataCallback(list.results);
    }
  } catch (error) {
    console.error("Request error", error);
  }
};

export const genres = (dataCallback) => {
  listEntities(GENRES_URL, dataCallback);
};

export const mediaTypes = (dataCallback) => {
  listEntities(MEDIA_TYPES_URL, dataCallback);
};

export const mediaTypeByName = (type, dataCallback) => {
  listEntities(MEDIA_TYPES_URL + '?name=' + type, (list) => {
    if (!list || list.length !== 1) {
      console.error("Media type not found or multiple media types found");
    } else {
      dataCallback(list[0]);
    }

  });
};

export const mediaTypeById = async (type, dataCallback) => {
  try {
    const mediaTypes = await fetch(MEDIA_TYPES_URL + '?@jcr:uuid=' + type).then(res => res.json());
    if (!mediaTypes.results || mediaTypes.results.length !== 1) {
      console.error("Media type not found or multiple media types found");
    } else {
      dataCallback(mediaTypes.results[0]);
    }
  } catch (error) {
    console.error("Request error", error);
  }
};

export const latestByType = async (type, dataCallback) => {
  try {
    const recommendations = await fetch(RECOMMENDATIONS_BY_TYPE_URL + '?type=' + type + '&orderBy=mgnl:created').then(res => res.json());
    dataCallback(recommendations.results);
  } catch (error) {
    console.error("Request error", error);
  }
}

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
