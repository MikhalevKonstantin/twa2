import { Text } from '@chakra-ui/react';

const quizSteps = [
  {
    question: '',
    text: (
      <Text color="#1f1f1f">
        Your first crypto wallet integrated within Telegram.
        Receive, send, buy and exchange your own crypto easily and fast.
        The Telegram Wallet can be simply found in the Telegram panel.
      </Text>
    ),
    title: 'Wallet',
    rightCardIndex: 1,
  },
  {
    question: '',
    title: "Of course it's the Telegram",
    text: (
      <Text>
        It's where we are now. 
        Telegram is your favourite instant 
        messaging cross-platform.
        Did you know that it can help you 
        to explore and get your first crypto?
      </Text>
    ),
    rightCardIndex: 0,
  },
  {
    question: '',
    title: 'Protect Your Telegram Wallet',
    text: (
      <Text>
        There is a two-step verification (2SV). 
        You will create a really strong password for your account.
        Make sure you save your password securely and lock it safely.
        Tss... Don't tell anyone.
      </Text>
    ),
    rightCardIndex: 2,
  },
  {
    question: 'How to get TONs?',
    title: 'Swap',
    text: (
      <Text>
        Paris
      </Text>
    ),
    rightCardIndex: 3,
  },
];

export default quizSteps;
