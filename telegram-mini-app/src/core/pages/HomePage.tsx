import { Box, Center, Flex, Image, Text } from '@chakra-ui/react';
import homeBg from '@core/assets/images/home-bg.png';
import house from '@core/assets/images/house.png';
import Carpet from '@core/components/Carpet.tsx';
import { useAppSelector } from '@core/storeConfig/store.ts';
import {
  selectBalance,
  selectIsTutorialComplete,
} from '@core/store/root/selectors.ts';
import coin from '@core/assets/images/coin.png';
import daily from '@core/assets/images/daily.png';
import tasks from '@core/assets/images/tasks.png';

const HomePage = () => {
  const isTutorialCompleted = useAppSelector(selectIsTutorialComplete);
  const balance = useAppSelector(selectBalance);
  return (
    <Box
      className="tab-content"
      backgroundImage={homeBg}
      mx={-4}
      position="relative"
      overflow="hidden"
    >
      <Box position="absolute" top={0} left={0} pt={4} pl={4}>
        <Flex alignItems="center" position="relative">
          <Box position="absolute" top={0} left={0}>
            <Image src={coin} />
          </Box>
          <Box
            mt="6px"
            ml={2}
            pl="35px"
            pr={4}
            borderRadius={10}
            bg="rgba(255, 255, 255, 0.5)"
            className="modal-shadow"
            h="fit-content"
          >
            <Text>{balance}</Text>
          </Box>
        </Flex>
        <Flex flexDirection="column" alignItems="center" pt={5}>
          <Image src={daily} />
          <Text fontSize={10} fontWeight={500} pt={1}>
            Daily bonus
          </Text>
        </Flex>
        <Flex flexDirection="column" alignItems="center" pt={3}>
          <Image src={tasks} />
          <Text fontSize={10} fontWeight={500} pt={1}>
            Tasks
          </Text>
        </Flex>
      </Box>
      <Image src={house} position="absolute" right={-4} top={4} h="50%" />
      <Center position="absolute" top="55%" w="100%">
        <Carpet isTutorialCompleted={isTutorialCompleted} />
      </Center>
    </Box>
  );
};

export default HomePage;
