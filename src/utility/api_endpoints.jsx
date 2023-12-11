import axios from "axios";

export const getUserInfo = async (token) => {
  const url = "https://api.spotify.com/v1/me";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(url, config);
    return response.data; // Return the JSON data
  } catch (error) {
    console.log(error);
  }
};

export const getUserSavedTracks = async (token) => {
  const limit = 50;
  let offset = 0;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    let allTracks = [];
    let hasMoreTracks = true;

    while (hasMoreTracks) {
      const response = await axios.get(
        `https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`,
        config,
      );
      const { items, total } = response.data;

      allTracks = allTracks.concat(items);

      if (allTracks.length >= total) {
        hasMoreTracks = false;
      } else {
        offset += limit;
      }
    }

    return allTracks;
  } catch (error) {
    console.log(error);
  }
};

export const getAudioFeaturesForTracks = async (token, trackIds) => {
  
  const url = `https://api.spotify.com/v1/audio-features?ids=${trackIds.join(",")}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(url, config);
    return response.data.audio_features;
  } catch (error) {
    console.log(error);
  }
}