import { createBrowserRouter } from 'react-router-dom';
import routes from '@core/navigation/routes.ts';
import OnboardingPage from '@core/pages/OnboardingPage.tsx';
import { RouterProvider } from 'react-router';
import HeaderTemplate from '@core/navigation/HeaderTemplate.tsx';
import RootPage from '@core/pages/RootPage.tsx';
import HomePage from '@core/pages/HomePage.tsx';
import SwapPage from '@core/pages/SwapPage.tsx';
import WalletPage from '@core/pages/WalletPage.tsx';
import { useAppDispatch, useAppSelector } from '@core/storeConfig/store.ts';
import { selectRoot } from '@core/store/root/selectors.ts';
import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { rootActions } from '@core/store/root/slice.ts';
import getCloudStorageItem from '@core/utils/getCloudStorageItem.ts';
import QuizPage from '@core/pages/QuizPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
  },
  {
    path: routes.onboarding,
    element: <OnboardingPage />,
  },
  {
    path: routes.home,
    element: <HeaderTemplate />,
    children: [
      {
        path: routes.home,
        element: <HomePage />,
      },
      {
        path: routes.wallet,
        element: <WalletPage />,
      },
      {
        path: routes.swap,
        element: <SwapPage />,
      },
    ],
  },
  {
    path: routes.quiz,
    element: <QuizPage />,
  },
]);

const RootRouter = () => {
  const dispatch = useAppDispatch();
  const root = useAppSelector(selectRoot);
  const [isStoreInitialized, setIsStoreInitialized] = useState(false);
  useEffect(() => {
    if (isStoreInitialized)
      WebApp.CloudStorage.setItem('root', JSON.stringify(root));
  }, [root]);
  const initializeStore = async () => {
    const root = await getCloudStorageItem('root');
    if (root) {
      dispatch(rootActions.setRoot(JSON.parse(root)));
    }
    setIsStoreInitialized(true);
  };
  useEffect(() => {
    initializeStore().catch(console.error);
  }, []);
  return <RouterProvider router={router} />;
};

export default RootRouter;
