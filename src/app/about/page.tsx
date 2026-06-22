import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { getTeamMembers } from '@/lib/data';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About — BIGWEB Digital',
  description: "We're a revenue-obsessed digital agency. We don't build pretty websites. We build machines that convert traffic into money.",
};

const VALUES = [
  {
    num: '01',
    title: 'Outcomes over aesthetics.',
    desc: "We've killed more \"award-worthy\" designs than we can count because they didn't convert. We'll always choose a 3% conversion lift over a design trophy.",
  },
  {
    num: '02',
    title: 'Honest before comfortable.',
    desc: "If we think you're not ready for what we offer, we'll tell you. If the problem isn't in your website, we'll tell you that too. Honesty builds longer relationships.",
  },
  {
    num: '03',
    title: 'Specificity over scope creep.',
    desc: "Every engagement we offer has a defined scope, a defined deliverable, and a defined outcome. You always know what you're getting — before you pay.",
  },
  {
    num: '04',
    title: 'Data, then intuition.',
    desc: 'Opinions are cheap. Data is expensive. We start every project by understanding what the numbers say — then we apply expertise on top of evidence.',
  },
];

const TEAM_STATS = [
  { num: 'Since 2018', label: 'Building elite revenue systems' },
  { num: '40+', label: 'Businesses transformed' },
  { num: '$2M+', label: 'In client revenue generated' },
  { num: '94%', label: 'Client retention rate' },
];

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();
  return <AboutClient teamMembers={teamMembers} values={VALUES} teamStats={TEAM_STATS} />;
}
