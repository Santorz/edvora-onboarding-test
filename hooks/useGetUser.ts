import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

export interface UserDataInterface {
  station_code: number;
  name: string;
  url: string;
}

// Main Hook
const useGetUser = () => {
  // State values
  const [data, setData] = useState<UserDataInterface | null>(null);
  const [error, setError] = useState<string>();

  // Perform fetch initially
  useEffect(() => {
    axios
      .get('https://assessment.api.vweb.app/user', {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((res: AxiosResponse<UserDataInterface>) => setData(res.data))
      .catch((err: AxiosError) => setError(err.message));
  }, []);

  return {
    isUserLoading: !data && !error,
    userData: data ? data : null,
    isUserError: error && !data,
    userErrorMsg: error ? error : null,
  };
};

export default useGetUser;
