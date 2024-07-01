import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useAppSelector } from '@core/storeConfig/store.ts';
import {
  selectBalance,
  selectIsTutorialComplete,
} from '@core/store/selectors.ts';
import sendInactiveIcon from '@core/assets/icons/walletButtons/send-inactive.svg';
import shopInactiveIcon from '@core/assets/icons/walletButtons/shop-inactive.svg';
import plusInactiveIcon from '@core/assets/icons/walletButtons/plus-inactive.svg';
import exchangeInactiveIcon from '@core/assets/icons/walletButtons/exchange-inactive.svg';
import spratImage from '@core/assets/images/sprat.png';
import { TonConnectButton } from '@tonconnect/ui-react';

const WalletPage = () => {
  const balance = useAppSelector(selectBalance);
  const isTutorialCompleted = useAppSelector(selectIsTutorialComplete);
  return (
    <Box>
      <Flex flexDirection="column" alignItems="center">
        <Text fontSize={16} fontWeight={500} pt={4}>
          Balance
        </Text>
        <Flex alignItems="flex-end" pt={30}>
          <Text fontSize={35} fontWeight={700} lineHeight="30px">
            {balance}
          </Text>
          <Text fontSize={30} lineHeight="30px" pl={2} color="#8E8E93">
            YTC
          </Text>
        </Flex>
      </Flex>
      <Flex justifyContent="space-between" pt={5} px={2}>
        <Flex flexDirection="column" p={2} alignItems="center">
          <Image src={sendInactiveIcon} h={27.5} w={27.5} />
          <Text pt={1} color="#8E8E93" fontSize={12}>
            Send
          </Text>
        </Flex>
        <Flex flexDirection="column" p={2} alignItems="center">
          <Image src={plusInactiveIcon} h={27.5} w={27.5} />
          <Text pt={1} color="#8E8E93" fontSize={12}>
            Top Up
          </Text>
        </Flex>
        <Flex flexDirection="column" p={2} alignItems="center">
          <Image src={exchangeInactiveIcon} h={27.5} w={27.5} />
          <Text pt={1} color="#8E8E93" fontSize={12}>
            Change
          </Text>
        </Flex>
        <Flex flexDirection="column" p={2} alignItems="center">
          <Image src={shopInactiveIcon} h={27.5} w={27.5} />
          <Text pt={1} color="#8E8E93" fontSize={12}>
            Shop
          </Text>
        </Flex>
      </Flex>
      <Flex flexDirection="column" pt={5}>
        <Flex
          bg="white"
          borderRadius={12}
          p={3}
          mb={3}
          justifyContent="flex-end"
        >
          <TonConnectButton />
        </Flex>
        <Flex
          bg="white"
          borderRadius={12}
          h="60px"
          px={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex alignItems="center">
            <Image src={spratImage} w="35px" h="48px" />
            <Box pl={2}>
              <Text fontSize={16} fontWeight={600}>
                Jar of Sprat
              </Text>
              <Text fontSize={10}>Will call Cat Tonchies</Text>
            </Box>
          </Flex>
          <Button
            bg={isTutorialCompleted ? 'gray' : '#007AFF'}
            color="white"
            borderRadius={13}
            height={27}
            fontSize={13}
            fontWeight={400}
            className="step-4"
            disabled={isTutorialCompleted}
          >
            BUY
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default WalletPage;
