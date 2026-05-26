'use client';

import { motion } from 'framer-motion';

import { Container, WelcomeText, MainTitle } from './styles';

import { headerIntroContent } from './constants';
import { headerIntroAnimation } from './animations';

const MotionContainer = motion(Container);

export function HeaderIntro() {
  return (
    <MotionContainer variants={headerIntroAnimation} initial="hidden" animate="visible">
      <WelcomeText>{headerIntroContent.welcomeText}</WelcomeText>

      <MainTitle>{headerIntroContent.title}</MainTitle>
    </MotionContainer>
  );
}
