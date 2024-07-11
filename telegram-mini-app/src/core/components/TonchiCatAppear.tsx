import tocnhiCat from '@core/assets/images/tonchi-cat.png';
import { Box, Image, Progress } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import murSound from '@core/assets/sound/mur-mur-sound.wav';
import WebApp from '@twa-dev/sdk';
import { useAppDispatch } from '@core/storeConfig/store.ts';
import { rootActions } from '@core/store/root/slice.ts';

const TonchiCatAppear = () => {
  const dispatch = useAppDispatch();
  const transition = {
    type: 'spring',
    duration: 1,
  };
  const [play, { stop }] = useSound(murSound, { volume: 0.5 });
  const [progress, setProgress] = useState(0);
  const intervalId = useRef<any>();
  const startInterval = useCallback(() => {
    intervalId.current = setInterval(() => {
      WebApp.HapticFeedback.impactOccurred('soft');
      setProgress((prev) => {
        if (prev >= 100) {
          dispatch(rootActions.changeBalance(0.2));
          stop();
          clearInterval(intervalId.current);
          return 0;
        }
        return prev + 1;
      });
    }, 60);
  }, []);

  const onStartTouch = () => {
    play();
    startInterval();
  };
  const onEndTouch = () => {
    stop();
    setProgress(0);
    clearInterval(intervalId.current);
  };
  useEffect(() => {
    play();
    stop();
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
      <motion.div
        transition={transition}
        animate={{
          translateX: [120, 0, 0],
          translateY: [130, 0, 0],
          opacity: [0, 1, 1],
        }}
      >
        <Image
          src={tocnhiCat}
          onTouchStart={onStartTouch}
          onTouchEnd={onEndTouch}
          onMouseDown={onStartTouch}
          onMouseUp={onEndTouch}
          className="prevent-select"
        />
      </motion.div>
      <Box position="absolute" bottom={-16} left={0} w="100%" px={20}>
        <Progress value={progress} colorScheme="green" size="md" />
      </Box>
    </Box>
  );
};

export default TonchiCatAppear;
