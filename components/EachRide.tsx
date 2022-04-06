import { FC } from 'react';
import { RideInterface } from '../hooks/useGetRides';
import {
  Flex,
  HStack,
  Image,
  Heading,
  VStack,
  chakra,
  Text,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { UserDataInterface } from '../hooks/useGetUser';

// Main Component
interface EachRideInterface extends RideInterface {
  userData: UserDataInterface | null;
}
const EachRide: FC<EachRideInterface> = (props) => {
  // Props
  const {
    map_url,
    id,
    origin_station_code,
    station_path,
    date,
    userData,
    city,
    state,
  } = props;

  // Hooks
  const { station_code: userStationCode } = userData || {};

  // Funcs
  const findSmallest = () => {
    return Math.min(...station_path.filter((num) => num > userStationCode!));
  };

  // Main JSX
  return (
    <Flex
      userSelect='none'
      maxW='full'
      px='5'
      py='4'
      bgColor='#171717'
      rounded='lg'
      justifyContent='space-between'
      alignItems='flex-start'
    >
      <HStack spacing='10' alignItems='center'>
        <Image
          width='250px'
          height='125px'
          src={map_url}
          alt={`Ride ${id}`}
          rounded='md'
        />
        <VStack alignItems='left' justifyContent='center'>
          <Heading as='h3' size='xs' color='white'>
            <chakra.span color='#DFDFDF'>Ride Id : </chakra.span> {id}
          </Heading>

          <Heading as='h3' size='xs' color='white'>
            <chakra.span color='#DFDFDF'>Origin Station : </chakra.span>{' '}
            {origin_station_code}
          </Heading>

          <Heading as='h3' size='xs' color='white'>
            <chakra.span color='#DFDFDF'>station_path : </chakra.span> [{' '}
            {station_path.map((a, index) => {
              return index < station_path.length - 1 ? `${a}, ` : a;
            })}{' '}
            ]
          </Heading>

          <Heading as='h3' size='xs' color='white'>
            <chakra.span color='#DFDFDF'>Date : </chakra.span>{' '}
            {format(new Date(date), 'do MMM yyyy HH:mm')}
          </Heading>

          {userStationCode && (
            <Heading as='h3' size='xs' color='white'>
              <chakra.span color='#DFDFDF'>Distance : </chakra.span>{' '}
              {station_path.indexOf(userStationCode!) >= 0
                ? 0
                : findSmallest()! - userStationCode!}
            </Heading>
          )}
        </VStack>
      </HStack>

      <HStack spacing='4'>
        <Text
          fontSize='sm'
          bgColor='rgba(0, 0, 0, 0.56)'
          color='white'
          px='2'
          py='1'
          rounded='full'
        >
          {city}
        </Text>
        <Text
          fontSize='sm'
          bgColor='rgba(0, 0, 0, 0.56)'
          color='white'
          px='2'
          py='1'
          rounded='full'
        >
          {state}
        </Text>
      </HStack>
    </Flex>
  );
};

export default EachRide;
