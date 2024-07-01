import { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';

interface OnboardingProps {
  step: number;
}

const Container = styled.div<OnboardingProps>`
  max-height: 1200px;
  max-width: 600px;
  margin: auto;
  height: ${(props) => (props.step > 3 ? (props.step == 4 ? 20 : 100) : 100)}vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  background-color: ${(props) => (props.step > 3 ? '#3489CD' : '#fff')};
  transition: ${(props) => (props.step > 4 ? 'height 0.6s' : '0s')};
`;

const TopCircleImage = styled.img<OnboardingProps>`
  display: ${(props) => (props.step > 3 ? 'none' : 'block')};
  width: 100%;
  height: auto;
  margin-top: -66%;
  rotate: -90deg;
  transition: transform 0.3s cubic-bezier(0.6, -0.8, 0.4, 1.2);
  transform: rotate(${(props) => (props.step - 1) * 90}deg);
`;

const TopTonchiFlippedImage = styled.img<OnboardingProps>`
  visibility: ${(props) => (props.step > 3 ? 'visible' : 'hidden')};
  width: 100%;
  max-width: 600px;
  height: auto;
  position: absolute;
  top: -50px;
  transition: all 1s cubic-bezier(0, 0, 0.4, 1.07);
  transform: translateY(${(props) => (props.step == 5 ? 50 : 0)}px);

  &:hover {
    cursor: pointer;
  }
`;

const Content = styled.div<OnboardingProps>`
  display: ${(props) => (props.step > 3 ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  min-height: 30vh;
  height: 100%;
  margin-bottom: 60px;
`;

const Header = styled.div`
  font-family: 'SF Pro', Arial, sans-serif;
  font-size: 28px;
  font-weight: 700;
  width: 290px;
  margin-top: 80px;
  text-align: center;
  color: #000000;
`;

const SubHeader = styled.div`
  font-family: 'SF Pro', Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 19.09px;
  text-align: center;
  margin: 20px auto 80px;
  width: 160px;
  color: #000000;
`;

const NextButton = styled.button<OnboardingProps>`
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  font-family: Inter, Arial, sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 24.2px;
  text-align: center;

  text-wrap: nowrap;
  height: 61px;

  width: ${(props) => (props.step == 3 ? 202 : 144)}px;
  transition: width 0.6s;

  &:hover {
    background-color: #0056b3;
  }
`;

const OnboardingPage = () => {
  if (!WebApp.isExpanded) {
    WebApp.expand();
  }
  const navigate = useNavigate();
  // State variables
  const [step, setStep] = useState<number>(1);
  const [headerText, setHeaderText] = useState<string>('Welcome to TONCHI');
  const [subText, setSubText] = useState<string>('');
  const [buttonText, setButtonText] = useState<string>('Next');

  // Function to handle next step
  const nextStep = () => {
    let newStep = step + 1;
    setStep(newStep);
    console.log('newStep', newStep);
    switch (newStep) {
      case 2:
        setHeaderText('Play To Learn');
        setSubText('Collect Tonchies find some tasks');
        break;
      case 3:
        setHeaderText(`Use virtual wallet to\u00A0interact with game`);
        setButtonText('Let’s start!');
        break;
      case 4:
        setTimeout(() => {
          newStep++;
          setStep(newStep);
          console.log('newStep', newStep);
        }, 10);
        setTimeout(() => {
          navigate('/home');
        }, 3000);
        break;
      default:
        break;
    }
  };

  const toHome = () => {
    navigate('/home');
  };

  return (
    <Container step={step}>
      <TopTonchiFlippedImage
        onClick={toHome}
        step={step}
        src={'tonchi_flipped.png'}
      />
      <TopCircleImage step={step} src={'onboarding-tonchi-circle.png'} />
      <Content step={step}>
        <div>
          <Header>{headerText}</Header>
          {step === 2 && <SubHeader>{subText}</SubHeader>}
        </div>
        <NextButton step={step} className="next-btn" onClick={nextStep}>
          {buttonText}
        </NextButton>
      </Content>
    </Container>
  );
};

export default OnboardingPage;
