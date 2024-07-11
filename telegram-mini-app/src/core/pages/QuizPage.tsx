import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import routes from '@core/navigation/routes.ts';
import {
  Box,
  Center,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import tgIcon from '@core/assets/quiz/tg.svg';
import walletIcon from '@core/assets/quiz/wallet.svg';
import swapIcon from '@core/assets/quiz/swap.png';
import safetyIcon from '@core/assets/quiz/safety.svg';
import quizSteps from '@core/constants/quizSteps.tsx';

const cardsList = [
  { icon: tgIcon, isActive: true, isDone: false },
  { icon: walletIcon, isActive: true, isDone: false },
  { icon: safetyIcon, isActive: true, isDone: false },
  { icon: swapIcon, isActive: false, isDone: false },
];

const QuizPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    WebApp.BackButton.show();
    WebApp.BackButton.onClick(() => {
      navigate(routes.home);
    });
    return () => {
      WebApp.BackButton.hide();
    };
  }, []);
  const [cards, setCards] = useState(cardsList);
  const [stepNumber, setStepNumber] = useState(0);
  const currentStep = useMemo(() => quizSteps[stepNumber], [stepNumber]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onCloseModal = () => {
    setIsModalOpen(false);
    setStepNumber(stepNumber + 1);
  };
  const onCardClick = (index: number) => () => {
    if (index === currentStep.rightCardIndex) {
      setIsModalOpen(true);
      setGreenIndex(index);
      setTimeout(() => {
        const newCards = [...cards];
        newCards[index].isDone = true;
        setCards(newCards);
        setGreenIndex(null);
      }, 1000);
    } else {
      WebApp.HapticFeedback.notificationOccurred('error');
      setRedIndex(index);
      setTimeout(() => {
        setRedIndex(null);
      }, 1000);
    }
  };
  const [redIndex, setRedIndex] = useState<null | number>(null);
  const [greenIndex, setGreenIndex] = useState<null | number>(null);
  return (
    <>
      <Box
        h="100vh"
        backgroundColor="#F2F2F7"
        position="relative"
        overflow="hidden"
      >
        <Text
          px={4}
          textAlign="center"
          fontSize="24px"
          fontWeight="700"
          pt={5}
          pb={6}
        >
          {currentStep.question}
        </Text>
        <Flex wrap="wrap" px={2}>
          {cards.map((item, index) => (
            <Center
              w="50%"
              p={2}
              key={'card' + index}
              onClick={
                item.isActive && !item.isDone ? onCardClick(index) : () => false
              }
            >
              <Center
                bg={item.isDone ? 'green' : 'white'}
                borderRadius={12}
                borderWidth={1}
                borderColor="#0000001A"
                w="100%"
                minH={170}
                py={4}
                opacity={item.isActive ? 1 : 0.5}
                className={
                  (redIndex === index ? 'red-pulse' : '') +
                  (greenIndex === index ? ' green-pulse' : '')
                }
              >
                <Image src={item.icon} w="70%" />
              </Center>
            </Center>
          ))}
        </Flex>
      </Box>
      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{quizSteps[stepNumber].title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>{quizSteps[stepNumber].text}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default QuizPage;
