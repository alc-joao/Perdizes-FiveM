import { Metadata } from 'next';
import { SkillCheckClient as SkillCheck } from '@/components/organisms/skill-check/loader';

export const metadata: Metadata = {
  title: 'Skill Check',
  description: 'NUI skill check minigame',
};

export default function Home() {
  return <SkillCheck />;
}
