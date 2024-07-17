import { Center, Spinner } from '@chakra-ui/react';
import { selectIsOnboardingComplete } from '@core/store/root/selectors.ts';
import { useAppSelector } from '@core/storeConfig/store.ts';
import { useNavigate } from 'react-router-dom';
import routes from '@core/navigation/routes.ts';
import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

const RootPage = () => {
  // const requestStatus = useAppSelector(selectRequestStatus);
  // const userStored = useAppSelector(selectUser);
  const isOnboardingComplete = useAppSelector(selectIsOnboardingComplete);
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  useEffect(() => {
    if (isFirstLoad) {
      WebApp.sendData('entered');
      // preloadData();
      setIsFirstLoad(false);
      if (isOnboardingComplete) {
        console.log(isOnboardingComplete);
        navigate(routes.home);
      } else {
        navigate(routes.onboarding);
      }
    }
  }, []);
  // const preloadData = async () => {
  //   const user = WebApp.initDataUnsafe.user;
  //   if (user?.id) {
  //     await dispatch(rootThunks.getUser(user?.id));
  //     if (requestStatus.getUser === 'success' && userStored !== null) {
  //       navigate(routes.home);
  //     } else {
  //       navigate(routes.onboarding);
  //     }
  //   }
  // };
  return (
    <Center w="100vw" h="100vh">
      <Spinner />
    </Center>
  );
};

export default RootPage;
