import { Text } from '@chakra-ui/react';

const quizSteps = [
  {
    question: 'Where to keep crypto safe?',
    text: (
      <>
        <Text fontSize="16px" textAlign="center" pb={3}>
          Your first crypto wallet integrated <br />
          within Telegram.
        </Text>
        <Text fontSize="16px" textAlign="center" pb={3}>
          Receive, send, buy and exchange <br />
          your own crypto easy and fast.
        </Text>
        <Text fontSize="16px" textAlign="center">
          The Telegram Wallet can be simply found <br />
          in the Telegram panel.
        </Text>
      </>
    ),
    title: 'Brilliant!',
    rightCardIndex: 1,
  },
  {
    question: 'What’s your favourite messaging app?',
    title: 'Superstar!',
    text: (
      <>
        <Text fontSize="16px" textAlign="center" pb={3}>
          It's where we are now. <br />
          Telegram is your favourite instant messaging cross-platform.
        </Text>
        <Text fontSize="16px" textAlign="center">
          Did you know that it can help you to <br />
          explore and get your first crypto?
        </Text>
      </>
    ),
    rightCardIndex: 0,
  },
  {
    question: 'How to protect your Telegram Wallet?',
    title: 'Awesome!',
    text: (
      <>
        <Text fontSize="16px" textAlign="center" pb={3}>
          There is a two-step verification (2SV). <br />
          You will create a really strong <br />
          password for your account.
        </Text>
        <Text fontSize="16px" textAlign="center" pb={3}>
          Make sure you save your password <br />
          securely and lock it safely.
        </Text>
        <Text fontSize="16px" textAlign="center">
          Tss... Don't tell anyone.
        </Text>
      </>
    ),
    rightCardIndex: 2,
  },
  {
    question: 'How to get TONs?',
    title: 'Swap',
    text: 'Paris',
    rightCardIndex: 3,
  },
];

export default quizSteps;
