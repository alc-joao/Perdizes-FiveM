'use client';

import { motion } from 'framer-motion';

import { statsPanelContent } from './constants';
import { statsPanelAnimation } from './animations';

import { Container, StatsTitle, StatItem, StatHeader, StatBar, StatProgress } from './styles';

type Stat = {
  title: string;
  value: string;
  percentage: number;
};

type StatsPanelProps = {
  stats: Stat[];
};

const MotionContainer = motion(Container);

export function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <MotionContainer variants={statsPanelAnimation} initial="hidden" animate="visible">
      <StatsTitle>
        <img src={statsPanelContent.icon} alt="" />
        {statsPanelContent.title}
      </StatsTitle>

      {stats.map((item) => (
        <StatItem key={item.title}>
          <StatHeader>
            <span>{item.title}</span>
            <span>{item.value}</span>
          </StatHeader>

          <StatBar>
            <StatProgress $percentage={item.percentage} />
          </StatBar>
        </StatItem>
      ))}
    </MotionContainer>
  );
}
