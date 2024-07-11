import { Box, Circle, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface TutorialProps {
  steps: {
    id: string;
    text: string;
    onClick: () => void;
    xOffset?: number;
    yOffset?: number;
  }[];
  currentStep: number;
  opacity: number;
}

const Tutorial = ({ steps, currentStep, opacity }: TutorialProps) => {
  const [circlePosition, setCirclePosition] = useState({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    (async () => {
      setTimeout(
        () => {
          const cords = window.document
            .querySelector('.' + steps[currentStep].id)
            ?.getBoundingClientRect();
          if (cords) {
            setCirclePosition({
              x: cords.x + cords.width / 2 + (steps[currentStep].xOffset || 0),
              y: cords.y + cords.height / 2 + (steps[currentStep].yOffset || 0),
            });
          } else {
            setCirclePosition({ x: 0, y: 0 });
          }
        },
        circlePosition ? 750 : 0
      );
    })();
  }, [currentStep]);
  return (
    <Box position="absolute" top={0} left={0} zIndex={50}>
      <Circle
        position="absolute"
        left={circlePosition.x - 50}
        top={circlePosition.y - 50}
        size={100}
        onClick={steps[currentStep].onClick}
        cursor="pointer"
      />
      {steps[currentStep].text !== '' && (
        <Box
          position="absolute"
          left={circlePosition.x - 150}
          top={circlePosition.y + 50}
          w="100%"
        >
          <Text color="white" textAlign="center" w={137}>
            {steps[currentStep].text}
          </Text>
        </Box>
      )}
      <svg
        height="100vh"
        width="100vw"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        opacity={opacity}
        style={{
          transition: 'linear 0.2s opacity',
        }}
      >
        <defs>
          <mask id="cut-off-bottom">
            <rect x="0" y="0" width="100vw" height="100vh" fill="white" />
            <circle
              cx={circlePosition.x}
              cy={circlePosition.y}
              r="50"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100vw"
          height="100vh"
          mask="url(#cut-off-bottom)"
          fill="black"
          opacity={0.5}
        />
      </svg>
    </Box>
  );
};

export default Tutorial;
