import { Text } from '@chakra-ui/react';

const quizSteps = [
  {
    question: 'What is the wallet icon?',
    text: (
      <>
        <Text color="#1f1f1f">
          The Telegram Wallet, integrated within the Telegram messaging app, is
          designed to provide users with easy access to cryptocurrency
          management and decentralized finance (DeFi) services. Here are some
          key features and aspects of the Telegram Wallet:
        </Text>
        <Text fontWeight={500} pt={2}>
          Custodial and Self-Custodial Wallets
          <br />
          TON Space
          <br />
          Ease of Use
          <br />
          Security
          <br />
          DeFi Integration
        </Text>
      </>
    ),
    title: 'Wallet',
    rightCardIndex: 1,
  },
  {
    question: 'What app allow you to use crypto fast and easy?',
    title: "Of course it's the Telegram",
    text: (
      <Text>
        Telegram, a hugely popular messaging app with over 500 million users, is
        playing a big role in making cryptocurrency more accessible. Here’s how:{' '}
        <br />
        1. In-App Crypto Features Telegram has integrated cryptocurrency
        features directly into the app. This means users can send and receive
        digital currencies as easily as they send messages, without needing any
        extra apps.
        <br /> 2. Easy-to-Use Wallet Telegram includes a built-in wallet for
        storing and managing digital assets. This makes it simple for users to
        keep track of their cryptocurrency securely. <br />
        3. Crypto Bots Telegram’s bot system allows for various crypto
        activities like trading, making payments, and learning about blockchain.
        These bots make it easier for users to engage with cryptocurrency
        directly within Telegram.
        <br /> 4. Security and Privacy Telegram is known for its strong security
        and privacy features, which are crucial for users handling digital
        assets. This trust helps encourage more people to use Telegram’s crypto
        services. <br />
        5. Community and Support Telegram has a large, active community and
        strong developer support. This fosters innovation and makes it easier
        for new users to get help and learn about cryptocurrency. <br /> By
        making cryptocurrency easy to use and secure, Telegram is helping
        millions of people start using digital money. This could lead to more
        widespread acceptance and everyday use of cryptocurrency in the future.
      </Text>
    ),
    rightCardIndex: 0,
  },
  {
    question: 'How to Protect Your Telegram Wallet?',
    title: 'How to Protect Your Telegram Wallet',
    text: (
      <Text>
        Protecting your Telegram wallet involves a combination of secure
        practices and utilizing Telegram’s built-in security features. Here are
        some essential steps to ensure your wallet remains safe: <br /> 1.
        Enable Two-Step Verification Two-step verification (2SV) adds an extra
        layer of security to your Telegram account. Here’s how to enable it: Go
        to Settings: Open Telegram and navigate to the settings menu. Privacy
        and Security: Select "Privacy and Security." Two-Step Verification: Tap
        on "Two-Step Verification" and follow the prompts to set up an
        additional password. This ensures that even if someone gains access to
        your SMS verification code, they cannot log into your account without
        the additional password. <br />
        2. Use a Strong, Unique Password When setting up your two-step
        verification password, choose a strong and unique password. Avoid using
        easily guessable information such as birthdays or common words. A strong
        password typically includes a mix of letters, numbers, and special
        characters. <br />
        3. Enable Passcode Lock Adding a passcode lock to your Telegram app
        prevents unauthorized access to your account if someone gains physical
        access to your device. Go to Settings: Open Telegram and go to the
        settings menu. Privacy and Security: Select "Privacy and Security."
        Passcode Lock: Tap on "Passcode Lock" and set up a passcode. You can
        also enable biometric authentication (fingerprint or facial recognition)
        if your device supports it.
        <br /> 4. Use Biometric Authentication If available, enable biometric
        authentication for an extra layer of security. This ensures that only
        you can access your Telegram wallet. Go to Settings: Open Telegram and
        navigate to "Privacy and Security." Passcode Lock: Ensure you have set a
        passcode, then enable the biometric authentication option.
        <br /> 5. Keep Your Private Keys Secure Telegram's wallet stores private
        keys on your device. Make sure your device is secure by: Regularly
        Updating Your Device: Keep your operating system and Telegram app
        updated to protect against vulnerabilities. Using Antivirus Software:
        Install reputable antivirus software to detect and remove malware.
        <br /> 6. Be Cautious with Public Wi-Fi Avoid accessing your Telegram
        wallet over public Wi-Fi networks, as they can be insecure and
        susceptible to hacking. Use a virtual private network (VPN) if you need
        to use public Wi-Fi.
        <br /> 7. Backup and Recovery Regularly back up your wallet’s recovery
        phrase or private keys in a secure location. This ensures you can
        restore your wallet if you lose your device. Write It Down: Store your
        recovery phrase on paper in a secure place, such as a safe. Avoid
        Digital Storage: Do not store your recovery phrase in digital form where
        it can be easily accessed or hacked.
        <br /> 8. Beware of Phishing Scams Be cautious of phishing attempts
        where attackers try to trick you into revealing your private
        information. Verify Sources: Only interact with official Telegram
        channels and avoid clicking on suspicious links or downloading unknown
        files. Double-Check URLs: Ensure you are on the correct website or app
        before entering sensitive information. Conclusion By enabling Telegram's
        security features, using strong passwords, keeping your device secure,
        and being cautious of potential threats, you can significantly enhance
        the security of your Telegram wallet. Taking these proactive steps will
        help protect your digital assets from unauthorized access and potential
        loss.
      </Text>
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
