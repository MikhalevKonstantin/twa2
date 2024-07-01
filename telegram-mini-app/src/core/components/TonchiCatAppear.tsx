import tocnhiCat from '@core/assets/images/tonchi-cat.png';
import { Box, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const TonchiCatAppear = () => {
  const transition = {
    type: 'spring',
    duration: 1,
  };
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
        <Image src={tocnhiCat} />
      </motion.div>
    </Box>
  );
};

export default TonchiCatAppear;
