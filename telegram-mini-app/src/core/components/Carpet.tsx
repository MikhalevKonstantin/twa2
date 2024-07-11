import { Box, Center, Image } from '@chakra-ui/react';
import carpetFood from '@core/assets/images/carpet-food.png';
import carpetNoFood from '@core/assets/images/carpet-nofood.png';
import plus from '@core/assets/icons/plus.svg';
import TonchiCatAppear from '@core/components/TonchiCatAppear.tsx';

interface CarpetProps {
  isTutorialCompleted: boolean;
}

const Carpet = ({ isTutorialCompleted }: CarpetProps) => {
  return (
    <Center overflow="hidden">
      <Box opacity={isTutorialCompleted ? 1 : 0.5} className="step-1">
        <Image src={isTutorialCompleted ? carpetFood : carpetNoFood} />
      </Box>
      {isTutorialCompleted ? (
        <TonchiCatAppear />
      ) : (
        <Image
          src={plus}
          position="absolute"
          ml={6}
          pb={2}
          className="prevent-select"
        />
      )}
    </Center>
  );
};

export default Carpet;
