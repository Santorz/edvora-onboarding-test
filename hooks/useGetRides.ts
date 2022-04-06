import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import useGetUser from './useGetUser';

// Interfaces and types
export interface RideInterface {
  id: number;
  origin_station_code: number;
  station_path: number[];
  destination_station_code: number;
  date: string;
  map_url: string;
  state: string;
  city: string;
}
export type RideDataArrayType = RideInterface[] | null;

// Main Hook
const useGetRides = () => {
  // Sub hooks
  const { userData } = useGetUser();
  const { station_code: usersStationCode } = userData || {};

  // State values
  const [data, setData] = useState<RideDataArrayType>(null);
  const [error, setError] = useState<string>();
  const [nearestRides, setNearestRides] = useState<RideDataArrayType>([]);
  const [upcomingRides, setUpcomingRides] = useState<RideDataArrayType>([]);
  const [pastRides, setPastRides] = useState<RideDataArrayType>([]);

  // Perform fetch initially
  useEffect(() => {
    axios
      .get('https://assessment.api.vweb.app/rides', {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((res: AxiosResponse<RideDataArrayType>) =>
        setData(res.data!.sort((a, b) => a.id - b.id))
      )
      .catch((err: AxiosError) => setError(err.message));
  }, []);

  // Function to sort according to distance to user's station code
  const getNearestRides = useCallback(() => {
    let nearestRidesArr: RideDataArrayType = [];

    if (data && usersStationCode) {
      // Push all rides that have user's station code in the nearestRidesArr
      data
        .sort((rideA, rideB) => rideA.id - rideB.id)
        .map((eachRide) => {
          if (eachRide.station_path.includes(usersStationCode!)) {
            nearestRidesArr?.push(eachRide);
          }
        });

      // Get Ride objects that don't contain user's station code
      // and their max station code is greater than users station code
      const ridesWithoutUsersStationCode = data
        .filter(
          (eachRide) =>
            eachRide.station_path.indexOf(usersStationCode!) < 0 &&
            Math.max(...eachRide.station_path) > usersStationCode!
        )
        .sort(
          (rideA, rideB) =>
            Math.min(
              ...rideA.station_path.filter((a) => a > usersStationCode!)
            ) -
            Math.min(...rideB.station_path.filter((b) => b > usersStationCode!))
        );

      setNearestRides(nearestRidesArr.concat(ridesWithoutUsersStationCode));
    }
  }, [data, usersStationCode]);

  // Function to get upcoming rides and order them
  const getUpcomingRides = useCallback(() => {
    if (data && usersStationCode) {
      const upcomingRidesArr = data
        .slice()
        .filter(
          (eachRide) =>
            Date.parse(new Date(eachRide.date).toISOString()) >
            Date.parse(new Date().toISOString())
        )
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

      setUpcomingRides(upcomingRidesArr);
    }
  }, [data, usersStationCode]);

  // Function to get past rides and order them
  const getPastRides = useCallback(() => {
    if (data && usersStationCode) {
      const pastRidesArr = data
        .slice()
        .filter(
          (eachRide) =>
            Date.parse(new Date(eachRide.date).toISOString()) <
            Date.parse(new Date().toISOString())
        )
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

      setPastRides(pastRidesArr);
    }
  }, [data, usersStationCode]);

  useEffect(() => {
    getNearestRides();
    getUpcomingRides();
    getPastRides();
  }, [getNearestRides, getPastRides, getUpcomingRides]);

  return {
    isLoading: !data && !error,
    isError: error && !data,
    errorMsg: error ? error : null,
    nearestRides,
    upcomingRides,
    pastRides,
    rideData: data,
    userData,
  };
};

export default useGetRides;
