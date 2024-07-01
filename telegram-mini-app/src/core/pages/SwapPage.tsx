import {
  Box,
  Button,
  Circle,
  Divider,
  Flex,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import coinImage from '@core/assets/images/coin.png';
import { useContext, useState } from 'react';
import swapIcon from '@core/assets/icons/swap.svg';
import spratImage from '@core/assets/images/sprat.png';
import WebApp from '@twa-dev/sdk';
import { TabsContext } from '@core/navigation/HeaderTemplate.tsx';
import { useAppSelector } from '@core/storeConfig/store.ts';
import { selectBalance } from '@core/store/selectors.ts';

const spratPrice = 5;

const SwapPage = () => {
  const { onSwapCompleted } = useContext(TabsContext);
  const balance = useAppSelector(selectBalance);
  const [inputValue, setInputValue] = useState(balance.toString());
  const onChange = (e: any) =>
    setInputValue(
      e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
    );
  const onButtonClick = () => {
    if (inputValue != '5') {
      WebApp.showAlert('Try to swap 5 YTC');
    } else {
      onSwapCompleted();
    }
  };
  return (
    <Box pt={7} className="tab-content">
      <Button
        bg={Number.parseFloat(inputValue) > balance ? 'gray' : '#007AFF'}
        position="absolute"
        bottom={6}
        color="white"
        w="100%"
        disabled={Number.parseFloat(inputValue) > 5}
        onClick={onButtonClick}
      >
        {Number.parseFloat(inputValue) > balance
          ? 'Insufficient balance'
          : 'Swap'}
      </Button>
      <Box>
        <Box>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex alignItems="center">
              <Image src={coinImage} />
              <Text fontSize={16} pl={2} fontWeight={500}>
                You send
              </Text>
            </Flex>
            <Text fontSize={14} fontWeight={500}>
              Balance: 5 YTC
            </Text>
          </Flex>
          <Flex justifyContent="space-between" pt={4} alignItems="center">
            <Input
              variant="ghost"
              bg="none"
              h="48px"
              fontSize={40}
              fontWeight={600}
              px={2}
              value={inputValue}
              onChange={onChange}
              inputMode="numeric"
              maxLength={12}
            />
            <Text fontSize={40} fontWeight={700} color="#8E8E93">
              YTC
            </Text>
          </Flex>
        </Box>
        <Flex mx="-16px" h="30px" position="relative">
          <Divider mt="14.5px" />
          <Circle
            bg="#007AFF"
            size="30px"
            position="absolute"
            top={0}
            right={6}
          >
            <Image src={swapIcon} h={30} w={30} />
          </Circle>
        </Flex>
        <Box>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex alignItems="center">
              <Image src={spratImage} />
              <Text fontSize={16} pl={2} fontWeight={500}>
                You recive
              </Text>
            </Flex>
            <Text fontSize={14} fontWeight={500}>
              Balance: {balance} YTC
            </Text>
          </Flex>
          <Flex justifyContent="space-between" pt={4} alignItems="center">
            <Text h="48px" fontSize={40} fontWeight={600} px={2}>
              {(Number.parseFloat(inputValue) / spratPrice || 0)
                .toFixed(6)
                .toString()
                .replace(/0*$/g, '')
                .replace(/\.$/g, '')}
            </Text>
            <Text fontSize={40} fontWeight={700} color="#8E8E93">
              YTC
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default SwapPage;
