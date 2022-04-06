import { useState, useCallback } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import useGetRides from '../hooks/useGetRides';
import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Spinner,
  VStack,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import Nav from '../components/Nav';
import ActiveButton from '../components/ActiveButton';
import RideList from '../components/RideList';
import RideFilters from '../components/RideFilters';

// Types, intefaces and Vars
export type viewHashType = 'nearest' | 'upcoming' | 'past';

// Main Component
const Home: NextPage = () => {
  // Hooks
  const {
    isError,
    isLoading,
    nearestRides,
    upcomingRides,
    pastRides,
    errorMsg,
    userData,
    rideData,
  } = useGetRides();

  // State values
  const [viewHash, setViewHash] = useState<viewHashType>('nearest');

  // Custom funcs
  const setHash = useCallback(
    (hash: viewHashType) => {
      if (viewHash !== hash) {
        setViewHash(hash);
      }
    },
    [viewHash]
  );

  // Main JSX
  return (
    <>
      <Head>
        <title>Desktop test</title>
        <meta
          name='description'
          content='Edvora onboarding test by Saint Tarila-Brisbe'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/* Main Page Body */}
      <Container
        p='0'
        m='0'
        w='full'
        maxW='full'
        minH='100vh'
        bgColor='#292929'
      >
        <Nav userData={userData} />
        {isLoading && (
          <Flex
            w='full'
            minH='100vh'
            align='center'
            justify='center'
            bgColor='transparent'
            color='white'
            direction='column'
            gap='1rem'
            pt='-10'
          >
            <Spinner size='xl' />
            <Heading size='md'>Loading...</Heading>
          </Flex>
        )}
        {isError && <Heading>There was an error : {errorMsg}</Heading>}

        <VStack w='full' minH='95vh' alignItems='start' px='30'>
          {/*  */}
          {/* Controller Container */}
          {!isLoading && !isError && (
            <Flex w='full' justify='space-between'>
              <HStack spacing='10' my='4'>
                <ActiveButton
                  activeHashName='nearest'
                  viewHash={viewHash}
                  onClick={() => setHash('nearest')}
                >
                  Nearest rides
                </ActiveButton>

                <ActiveButton
                  activeHashName='upcoming'
                  viewHash={viewHash}
                  onClick={() => setHash('upcoming')}
                >
                  Upcoming rides {`(${upcomingRides!.length})`}
                </ActiveButton>

                <ActiveButton
                  activeHashName='past'
                  viewHash={viewHash}
                  onClick={() => setHash('past')}
                >
                  Past rides {`(${pastRides?.length})`}
                </ActiveButton>
              </HStack>

              <HStack>
                <Popover>
                  <PopoverTrigger>
                    <Button
                      variant='ghost'
                      color='white'
                      d='flex'
                      gap='3'
                      _hover={{ backgroundColor: 'transparent' }}
                      _pressed={{ backgroundColor: 'transparent' }}
                    >
                      <svg
                        width='18'
                        height='12'
                        viewBox='0 0 18 12'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M-6.10352e-05 12.0001H5.99994V10.0001H-6.10352e-05V12.0001ZM-6.10352e-05 0.00012207V2.00012H17.9999V0.00012207H-6.10352e-05ZM-6.10352e-05 7.00012H11.9999V5.00012H-6.10352e-05V7.00012Z'
                          fill='white'
                          fillOpacity='0.8'
                        />
                      </svg>
                      Filter
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    bgColor='transparent'
                    maxW='15rem'
                    border='none'
                  >
                    <RideFilters rideData={rideData} />
                  </PopoverContent>
                </Popover>
              </HStack>
              {/*  */}
            </Flex>
          )}
          {/* End of controller contaainer */}

          {/* RideList */}
          <VStack alignItems='left' spacing='7' w='full'>
            <RideList
              viewHash={viewHash}
              userData={userData}
              ridesArray={
                viewHash === 'past'
                  ? pastRides
                  : viewHash === 'upcoming'
                  ? upcomingRides
                  : nearestRides
              }
            />
          </VStack>

          {/*  */}
        </VStack>
      </Container>
    </>
  );
};

export default Home;
