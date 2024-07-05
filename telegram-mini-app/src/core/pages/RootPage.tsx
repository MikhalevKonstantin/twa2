import { Center, Spinner } from '@chakra-ui/react';
import { selectIsOnboardingComplete } from '@core/store/root/selectors.ts';
import { useAppSelector } from '@core/storeConfig/store.ts';
import { useNavigate } from 'react-router-dom';
import routes from '@core/navigation/routes.ts';
import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

const RootPage = () => {
  const isOnboardingComplete = useAppSelector(selectIsOnboardingComplete);
  const navigate = useNavigate();
  useEffect(() => {
    WebApp.sendData('entered');
    if (isOnboardingComplete) {
      navigate(routes.home);
    } else {
      navigate(routes.onboarding);
    }
  }, []);
  return (
    <Center w="100vw" h="100vh">
      <Spinner />
    </Center>
  );
};

export default RootPage;
