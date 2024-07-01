import { createBrowserRouter } from 'react-router-dom';
import routes from '@core/navigation/routes.ts';
import OnboardingPage from '@core/pages/OnboardingPage.tsx';
import { RouterProvider } from 'react-router';
import HeaderTemplate from '@core/navigation/HeaderTemplate.tsx';
import RootPage from '@core/pages/RootPage.tsx';
import HomePage from '@core/pages/HomePage.tsx';
import SwapPage from '@core/pages/SwapPage.tsx';
import WalletPage from '@core/pages/WalletPage.tsx';

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
]);

const RootRouter = () => {
  return <RouterProvider router={router} />;
};

export default RootRouter;
