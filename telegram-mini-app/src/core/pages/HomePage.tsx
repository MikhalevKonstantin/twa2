import { Box, Center, Circle, Flex, Image, Text } from '@chakra-ui/react';
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
import { useNavigate } from 'react-router-dom';
import routes from '@core/navigation/routes.ts';

const HomePage = () => {
  const isTutorialCompleted = useAppSelector(selectIsTutorialComplete);
  const balance = useAppSelector(selectBalance);
  const navigate = useNavigate();
  const navigateQuiz = () => {
    navigate(routes.quiz);
  };
  return (
    <Box
      className="tab-content"
      backgroundImage={homeBg}
      mx={-4}
      position="relative"
      overflow="hidden"
    >
      <Box position="absolute" top={0} left={0} pt={4} pl={4} zIndex={20}>
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
            <Text>{balance.toFixed(2)}</Text>
          </Box>
        </Flex>
        <Flex flexDirection="column" alignItems="center" pt={5}>
          <Image src={daily} />
          <Text fontSize={10} fontWeight={500} pt={1}>
            Daily bonus
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          pt={3}
          onClick={navigateQuiz}
          position="relative"
        >
          <Circle
            pos="absolute"
            size={3}
            bg="#FFE869"
            top={5}
            style={{
              boxShadow: '0px 0px 15px 10px #FFE869',
            }}
            className="opacity-pulse"
          />
          <Image src={tasks} />
          <Text fontSize={10} fontWeight={500} pt={1}>
            Quiz
          </Text>
          <Text
            fontSize={14}
            fontWeight={700}
            color="gray.500"
            position="absolute"
            left={50}
            bottom={-20}
            w={150}
            style={{
              transform: 'rotate(-30deg)',
            }}
          >
            Try to touch Tonchi
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
