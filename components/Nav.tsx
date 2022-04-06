import { FC, useEffect, useState } from 'react';
import { Flex, Heading, HStack, Image } from '@chakra-ui/react';
import { UserDataInterface } from '../hooks/useGetUser';
import { AxiosError } from 'axios';

interface NavInterface {
  userData: UserDataInterface | null;
}
const Nav: FC<NavInterface> = (props) => {
  // Hooks
  const { userData } = props;
  const { name, url } = userData || {};

  // State values
  const [picBlob, setPicBlob] = useState('');

  useEffect(() => {
    if (url) {
      fetch(url)
        .then((res) =>
          res
            .blob()
            .then((blob) => {
              setPicBlob(window.URL.createObjectURL(blob));
            })
            .catch((error: AxiosError | any) => {
              console.log(error.message);
            })
        )
        .catch((error: AxiosError | any) => {
          console.log(error.message);
        });
    }
  }, [url]);

  // Main JSX
  return (
    <Flex
      userSelect='none'
      bgColor='#101010'
      w='full'
      maxW='full'
      justify='space-between'
      minH='10'
      px='30'
      py='2'
    >
      <Heading color='white'>Edvora</Heading>
      <HStack spacing='5'>
        {userData && (
          <Heading size='sm' color='white'>
            {name}
          </Heading>
        )}
        {picBlob && (
          <Image
            rounded='full'
            width='40px'
            height='40px'
            src={picBlob ? picBlob : ''}
            alt={`${name} profile image`}
          />
        )}
      </HStack>
    </Flex>
  );
};

export default Nav;
