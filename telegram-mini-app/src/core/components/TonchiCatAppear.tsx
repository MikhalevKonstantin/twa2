import tocnhiCat from '@core/assets/images/tonchi-cat.png';
import { Box, Image } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import murSound from '@core/assets/sound/mur-mur-sound.wav';
import coinSound from '@core/assets/sound/coin-sound-2.wav';
import WebApp from '@twa-dev/sdk';
import { useAppDispatch } from '@core/storeConfig/store.ts';
import { rootActions } from '@core/store/root/slice.ts';
import hint from '@core/assets/quiz/hint.svg';
import coins from '@core/assets/images/coinsAnim.gif';

const TonchiCatAppear = () => {
  const dispatch = useAppDispatch();
  const transition = {
    type: 'spring',
    duration: 1,
  };
  const [isLoaded, setIsLoaded] = useState(false);
  const [play, { stop }] = useSound(murSound, {
    volume: 0.5,
    sprite: { main: [0, 6000] },
    interrupt: true,
  });
  const [playCoin] = useSound(coinSound, {
    volume: 0.5,
    interrupt: true,
    onload: () => {
      setIsLoaded(true);
    },
  });
  const progress = useRef(0);
  const startInterval = useCallback(async () => {
    progress.current = 0;
    while (progress.current < 100) {
      WebApp.HapticFeedback.impactOccurred('soft');
      progress.current += 1;
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    if (progress.current === 100) {
      dispatch(rootActions.changeBalance(0.2));
      setIsCoinsVisible(true);
      setTimeout(() => {
        setIsCoinsVisible(false);
      }, 2000);
      stop();
      playCoin();
    }
  }, [progress, isLoaded]);

  const onStartTouch = () => {
    play({ id: 'main' });
    startInterval();
    setIsHintVisible(false);
  };
  const onEndTouch = () => {
    progress.current = 110;
    stop();
  };
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [isCoinsVisible, setIsCoinsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsHintVisible(true);
    }, 3000);
  }, []);
  return (
    <Box
      position="absolute"
      top={-130}
      left={0}
      w="100%"
      justifyContent="center"
      display="flex"
      pl={20}
    >
      {isCoinsVisible && (
        <Box position="absolute" zIndex={40} bottom={0}>
          <Image src={coins} w="100%" />
        </Box>
      )}
      <motion.div
        transition={transition}
        animate={{
          translateX: [120, 0, 0],
          translateY: [130, 0, 0],
          opacity: [0, 1, 1],
        }}
        style={{
          position: 'relative',
        }}
      >
        <Image
          src={tocnhiCat}
          onTouchStart={onStartTouch}
          onTouchEnd={onEndTouch}
          onTouchCancel={onEndTouch}
          onMouseDown={onStartTouch}
          onMouseUp={onEndTouch}
          onMouseLeave={onEndTouch}
          draggable={false}
          className="prevent-select"
        />
        <Box position="absolute" top="-18px" left="-18px">
          <AnimatePresence>
            {isHintVisible && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: 'spring',
                  duration: 3,
                }}
              >
                <Image src={hint} />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </motion.div>
    </Box>
  );
};

export default TonchiCatAppear;
