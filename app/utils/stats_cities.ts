import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL; // Replace with your actual API base URL

export const getStatesDetails = () => {
  const url = `${baseURL}/common/getStateList`;

  return axios
    .post(url, {}, { headers: { "Content-Type": "application/json" } })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
      throw err; // You may want to handle the error appropriately in your application
    });
};

export const getAllCitiesDetails = () => {
  const url = `${baseURL}/common/getAllCities`;

  return axios
    .post(url, {}, { headers: { "Content-Type": "application/json" } })
    .then((response) => response.data.cities)
    .catch((err) => {
      console.error(err);
      throw err; // You may want to handle the error appropriately in your application
    });
};
export const getAllLocalitiesDetails = () => {
  const url = `${baseURL}/common/getAllLocalities`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
    next:{
      revalidate: 21600 // 6 hours in seconds
    }
  })
    .then(response => response.json())
    .then(data => data.localities)
    .catch(err => {
      console.error(err);
      throw err; // You may want to handle the error appropriately in your application
    });
};


export const getCitiesDetails = async (cId: number) => {
  const url = `${baseURL}/common/getCityList?statecid=${cId}`;

  try {
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const getLocalityDetails = async (cId: number | string | null) => {
  const url = `${baseURL}/common/getLocalityfromCity?cityId=${cId}`;

  try {
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
