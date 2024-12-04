import { Github, Globe, Linkedin, LucideIcon, Mail, Twitter } from 'lucide-react';

const PLATFORM_ICONS: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  website: Globe,
  email: Mail,
};

interface SocialIconProps {
  platform: string;
  className?: string;
}

export function SocialIcon({ platform, className }: SocialIconProps) {
  const lowerPlatform = platform.toLowerCase();
  const Icon = PLATFORM_ICONS[lowerPlatform] || Globe;

  return <Icon className={className} />;
}
