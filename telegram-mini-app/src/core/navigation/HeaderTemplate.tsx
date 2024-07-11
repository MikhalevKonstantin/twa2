import Header from '@core/components/Header.tsx';
import {
  Box,
  Center,
  CloseButton,
  Image,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { createContext, useEffect, useMemo, useState } from 'react';
import Tutorial from '@core/components/Tutorial.tsx';
import { useAppDispatch, useAppSelector } from '@core/storeConfig/store.ts';
import {
  selectIsTutorialComplete,
  selectIsTutorialModalOpened,
} from '@core/store/root/selectors.ts';
import ReactModal from 'react-modal';
import homeBg from '@core/assets/images/home-bg.png';
import buttonImage from '@core/assets/icons/button1.svg';
import { Outlet, useNavigate } from 'react-router-dom';
import routes from '@core/navigation/routes.ts';
import { rootActions } from '@core/store/root/slice.ts';

export const TabsContext = createContext<any>(null);

const HeaderTemplate = () => {
  const dispatch = useAppDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();
  const onChangeTab = (index: number) => {
    if (index) {
      navigate(routes.wallet);
    } else {
      navigate(routes.home);
    }
    setTabIndex(index);
  };
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const isTutorialCompleted = useAppSelector(selectIsTutorialComplete);
  const isTutorialModalOpened = useAppSelector(selectIsTutorialModalOpened);
  useEffect(() => {
    if (!isTutorialCompleted) {
      setIsTutorialOpen(true);
    } else {
      setIsTutorialOpen(false);
      if (!isTutorialModalOpened) {
        setTimeout(() => {
          setIsEndModalOpen(true);
          dispatch(rootActions.openTutorialModal());
        }, 2000);
      }
    }
  }, [isTutorialCompleted]);
  const steps = useMemo(() => {
    return [
      {
        id: 'step-1',
        text: '',
        xOffset: 16,
        yOffset: -6,
        onClick: () => {
          setIsModalOpen(true);
          setTimeout(() => {
            setCurrentStep(1);
          }, 100);
          setOpacity(0);
          setTimeout(() => {
            setOpacity(1);
          }, 1000);
        },
      },
      {
        id: 'step-2',
        text: '',
        onClick: () => {
          setIsModalOpen(false);
          setTimeout(() => {
            setCurrentStep(2);
          }, 100);
          setOpacity(0);
          setTimeout(() => {
            setOpacity(1);
          }, 1000);
        },
      },
      {
        id: 'step-3',
        text: 'Now you need to buy some food go to “Wallet”',
        onClick: () => {
          setTabIndex(1);
          navigate(routes.wallet);
          setTimeout(() => {
            setCurrentStep(3);
          }, 100);
          setOpacity(0);
          setTimeout(() => {
            setOpacity(1);
          }, 1000);
        },
      },
      {
        id: 'step-4',
        text: '',
        onClick: () => {
          navigate(routes.swap);
          setOpacity(0);
          setTimeout(() => {
            setIsTutorialOpen(false);
          }, 1000);
        },
      },
    ];
  }, []);

  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    setTimeout(() => setOpacity(1), 750);
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const tabsContextValue = useMemo(
    () => ({
      onSwapCompleted: () => {
        setTabIndex(0);
        navigate(routes.home);
        dispatch(rootActions.completeTutorial());
        dispatch(rootActions.changeBalance(-5));
      },
    }),
    [dispatch, navigate]
  );
  return (
    <TabsContext.Provider value={tabsContextValue}>
      <Box
        h="100vh"
        className="bg-transition"
        backgroundColor={tabIndex ? '#F2F2F7' : 'white'}
        position="relative"
        overflow="hidden"
      >
        {isTutorialOpen && (
          <Tutorial steps={steps} currentStep={currentStep} opacity={opacity} />
        )}
        <Header />
        <Box pt={2} px={4}>
          <Tabs
            position="relative"
            variant="unstyled"
            onChange={onChangeTab}
            index={tabIndex}
          >
            <Box
              borderRadius="9px"
              h="32px"
              backgroundColor="#74748014"
              px="2.5px"
            >
              <TabList
                w="100%"
                justifyContent="center"
                borderRadius="9px"
                h="32px"
                position="absolute"
                top="0"
                zIndex={1}
                px="2.5px"
              >
                <Tab w="50%" userSelect="none" disabled={!isTutorialCompleted}>
                  Home
                </Tab>
                <Tab w="50%" userSelect="none" className="step-3">
                  Wallet
                </Tab>
              </TabList>
            </Box>
            <TabIndicator
              mt="-30px"
              height="28px"
              borderRadius="7px"
              backgroundColor="white"
              className="tab-shadows"
              borderWidth={0.5}
              borderColor="#74748014"
            />
            <Box id="detail">
              <Outlet />
            </Box>
          </Tabs>
        </Box>
      </Box>
      <ReactModal
        isOpen={isModalOpen}
        ariaHideApp={false}
        style={{
          content: {
            height: 250,
            width: 250,
            left: window.innerWidth / 2 - 125,
            top: 150,
            border: 'none',
            borderRadius: 10,
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            padding: 0,
          },
        }}
      >
        <Box h="100%" w="100%" backgroundImage={homeBg}>
          <CloseButton
            onClick={() => setIsModalOpen(false)}
            right={2}
            top={2}
            position="absolute"
            size="md"
          />
          <Center flexDirection="column" h="100%" className="step-2">
            <Image src={buttonImage} w={58} />
            <Text fontSize={12}>Buy Carpet</Text>
          </Center>
        </Box>
      </ReactModal>
      <ReactModal
        isOpen={isEndModalOpen}
        ariaHideApp={false}
        style={{
          content: {
            height: 250,
            width: 250,
            left: window.innerWidth / 2 - 125,
            top: 150,
            border: 'none',
            borderRadius: 10,
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            padding: 0,
          },
          overlay: {
            zIndex: 100,
          },
        }}
      >
        <Box h="100%" w="100%" backgroundImage={homeBg}>
          <CloseButton
            onClick={() => setIsEndModalOpen(false)}
            right={2}
            top={2}
            position="absolute"
            size="md"
          />
          <Center flexDirection="column" h="100%" className="step-2">
            <Text fontSize={16} px={4} textAlign="center">
              <b>You complete the tutorial!</b> Check some tasks in the wallet
              tab
            </Text>
          </Center>
        </Box>
      </ReactModal>
    </TabsContext.Provider>
  );
};

export default HeaderTemplate;
