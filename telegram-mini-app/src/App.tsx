import './index.css';

import React from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { chakraTheme } from '@core/theme/chackraTheme.ts';
import store from '@core/storeConfig/store.ts';
import { Provider } from 'react-redux';
import RootRouter from '@core/navigation/RootRouter.tsx';
import WebApp from '@twa-dev/sdk';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { TwaAnalyticsProvider } from '@tonsolutions/telemetree-react';

WebApp.setHeaderColor('#FFFFFF');
WebApp.setBackgroundColor('#FFFFFF');

function App() {
  React.useEffect(() => {
    WebApp.expand()
    WebApp.setHeaderColor('secondary_bg_color')
  }, [])
  return (
    <TwaAnalyticsProvider
      projectId="8a046132-b131-4020-88d0-b7b0bc009aa5"
      apiKey="ce7b18cb-7a99-411c-b8f9-994a5d95b861"
      appName="tonchiwebv2"
    >
      <TonConnectUIProvider manifestUrl="https://duskwerefox.github.io/manifest.json">
        <Provider store={store}>
          <ChakraProvider>
            <ChakraProvider theme={chakraTheme}>
              <RootRouter />
            </ChakraProvider>
          </ChakraProvider>
        </Provider>
      </TonConnectUIProvider>
    </TwaAnalyticsProvider>
  );
}

export default App;
