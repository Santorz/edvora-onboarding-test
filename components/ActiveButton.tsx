import { FC, ReactNode } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { viewHashType } from '../pages';

interface ActiveButtonInterface extends ButtonProps {
  activeHashName: string;
  viewHash: viewHashType;
  children?: ReactNode;
  onClick: () => void;
}
const ActiveButton: FC<ActiveButtonInterface> = (props) => {
  // Props
  const { children, activeHashName, viewHash, onClick } = props;

  //   Bools
  const isCurrentHash = activeHashName === viewHash;

  // Main JSX
  return (
    <Button
      onClick={() => onClick()}
      variant='ghost'
      color={isCurrentHash ? 'white' : '#D0CBCB'}
      fontWeight={isCurrentHash ? 'bold' : 'normal'}
      borderBottom={isCurrentHash ? '2px solid white' : 'none'}
      colorScheme='blackAlpha'
      rounded='none'
      px='0'
    >
      {children}
    </Button>
  );
};

export default ActiveButton;
