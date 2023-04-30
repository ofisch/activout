import {useState, useEffect} from 'react';
import {appId, baseUrl} from '../utils/variables';

const doFetch = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    const message = json.error
      ? `${json.message}: ${json.error}`
      : json.message;
    throw new Error(message || response.statusText);
  }
  return json;
};

// staattinen taulukko (ehkä vähä nihkee.. mut toimii!!)
let searchResults = [];
let userSearch;

const doSearch = async (searchString, categoryArray) => {
  try {
    searchResults = [];
    userSearch = searchString;
    // haetaan kaikki
    const files = await useTag().getTag(appId);
    const filesWithThumbnail = await Promise.all(
      files.map(async (file) => {
        return await doFetch(baseUrl + 'media/' + file.file_id);
      })
    );

    for (const file of filesWithThumbnail) {
      const location = JSON.parse(file.description);

      if (location.address != undefined) {
        if (categoryArray.length === 0) {
          // jos EI OLE valittuna kategorioita
          // verrataan haku-stringiä osoitteseen ja otsikkoon
          if (
            searchString
              .toLowerCase()
              .includes(location.address.toLowerCase()) ||
            searchString.toLowerCase().includes(file.title.toLowerCase())
          ) {
            searchResults.push(file);
            console.log('EI kategorioita:', searchResults);
          }
        } else {
          // jos ON valittuna kategorioita
          if (categoryArray.includes(location.category)) {
            if (searchString) {
              if (
                searchString
                  .toLowerCase()
                  .includes(location.address.toLowerCase()) ||
                searchString.toLowerCase().includes(file.title.toLowerCase())
              ) {
                searchResults.push(file);
                console.log('ON kategorioita ja HAKU:', searchResults);
              }
            } else {
              searchResults.push(file);
              console.log('ON kategorioita mutta EI HAKUA:', searchResults);
            }
          }
        }
      }
    }
  } catch (error) {
    alert(error);
  }
};

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const getMedia = async () => {
    try {
      const files = await useTag().getTag(appId);
      const filesWithThumbnail = await Promise.all(
        files.map(async (file) => {
          return await doFetch(baseUrl + 'media/' + file.file_id);
        })
      );
      setMediaArray(filesWithThumbnail);
    } catch (error) {
      console.error('getMedia', error.message);
    }
  };

  useEffect(() => {
    try {
      getMedia();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const postMedia = async (data, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      body: data,
    };
    return await doFetch(baseUrl + 'media', options);
  };

  return {mediaArray, postMedia};
};

const useUser = () => {
  const postUser = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await doFetch(baseUrl + 'users', options);
  };

  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    return await doFetch(baseUrl + 'users/user', options);
  };

  const getCheckUser = async (username) => {
    const {available} = await doFetch(baseUrl + 'users/username/' + username);
    return available;
  };

  return {postUser, getUserByToken, getCheckUser};
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await doFetch(baseUrl + 'login', options);
  };
  return {postLogin};
};

const useTag = () => {
  const getTag = async (tag) => {
    const tagResult = await doFetch(baseUrl + 'tags/' + tag);
    if (tagResult.length > 0) {
      return tagResult;
    } else {
      throw new Error('Tag not found');
    }
  };

  const postTag = async (data, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'tags', fetchOptions);
  };

  return {getTag, postTag};
};

export {
  useMedia,
  useUser,
  useAuthentication,
  useTag,
  doSearch,
  searchResults,
  userSearch,
};
