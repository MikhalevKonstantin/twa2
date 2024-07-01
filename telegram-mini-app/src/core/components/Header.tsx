import { Box, Center, Circle, Flex, Image, Text } from '@chakra-ui/react';
import BellIcon from '@core/assets/icons/bell.svg';
import GearIcon from '@core/assets/icons/gear.svg';
import WebApp from '@twa-dev/sdk';
import avatarMock from '@core/assets/mock/avatar.png';
import squadMock from '@core/assets/mock/squad.png';

const avatar = WebApp.initDataUnsafe.user?.photo_url;

const Header = () => {
  return (
    <Box px={4} pt="6px">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex>
          <Flex alignItems="center" cursor="pointer">
            <Circle size="35px" bg="#D9D9D9">
              <Image
                src={avatar ? avatar : avatarMock}
                h={35}
                w={35}
                borderRadius="50%"
              />
            </Circle>
            <Text fontSize={12} fontWeight="medium" pl="10px">
              user
            </Text>
          </Flex>
          <Flex alignItems="center" pl={5} cursor="pointer">
            <Circle size="35px" bg="#D9D9D9">
              <Image src={squadMock} h={35} w={35} borderRadius="50%" />
            </Circle>
            <Text fontSize={12} fontWeight="medium" pl="10px">
              squad
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <Center px={4} py="10px" cursor="pointer">
            <Image src={BellIcon} h={22} />
          </Center>
          <Center px={4} py="10px" ml={1} cursor="pointer">
            <Image src={GearIcon} h={22} />
          </Center>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
