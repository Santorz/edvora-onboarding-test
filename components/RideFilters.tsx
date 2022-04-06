import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { RideDataArrayType } from '../hooks/useGetRides';
import { VStack, Select, chakra } from '@chakra-ui/react';

// Main Component
interface RideFiltersInterface {
  rideData: RideDataArrayType;
}
const RideFilters: FC<RideFiltersInterface> = (props) => {
  // Props
  const { rideData } = props;
  const [rideStates, setRideStates] = useState<string[]>([]);
  const [rideCities, setRideCities] = useState<string[]>([]);

  //   useEffects
  useEffect(() => {
    if (rideData) {
      let allStates = rideData.map((ride) => ride.state);
      allStates = Array.from(new Set(allStates));
      setRideStates(allStates);
    }
  }, [rideData]);

  //   Handlers
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const target = e.target as HTMLSelectElement;
      const value = target.value;
      if (value && rideData) {
        const resultArr = rideData
          ?.filter((ride) => ride.state === value)
          .map((ride) => ride.city);
        const uniqueResultArr = Array.from(new Set(resultArr));
        setRideCities(uniqueResultArr);
      } else {
        setRideStates([]);
      }
    },
    [rideData]
  );

  // Main JSX
  return (
    <VStack spacing='5' bgColor='rgba(19, 19, 19, 1)' px='4' py='3'>
      <Select
        border='none'
        placeholder='State'
        bgColor='rgba(35, 35, 35, 1)'
        color='white'
        onChange={handleChange}
      >
        {rideStates &&
          rideStates.map((eachState) => (
            <chakra.option
              bgColor='rgba(19, 19, 19, 1) !important'
              color='white'
              key={eachState}
              value={eachState}
            >
              {eachState}
            </chakra.option>
          ))}
      </Select>

      <Select
        border='none'
        placeholder='City'
        bgColor='rgba(35, 35, 35, 1)'
        color='white'
      >
        {rideCities &&
          rideCities.map((eachCity) => (
            <chakra.option
              bgColor='rgba(19, 19, 19, 1) !important'
              color='white'
              key={eachCity}
              value={eachCity}
            >
              {eachCity}
            </chakra.option>
          ))}
      </Select>
    </VStack>
  );
};

export default RideFilters;
