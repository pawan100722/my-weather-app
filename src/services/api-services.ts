import axios from 'axios';
import { CONSTANT } from './CONSTANTS.ts';

export const getWeatherInfo=async (params:{location: string})=>{
  const {location} = params;
  // eslint-disable-next-line no-useless-catch
  try{
     const url = `${CONSTANT.BASE_URL}/current.json`;
     const response = await axios.get(url, {
       params: { q: location,key: CONSTANT.API_KEY },
     });
     return response?.data;
  }
  catch(err){
    throw err;
  }
}