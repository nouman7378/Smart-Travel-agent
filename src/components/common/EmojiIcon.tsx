import React from 'react';
import {
  BadgeDollarSign,
  BedDouble,
  Bot,
  BriefcaseBusiness,
  Camera,
  Calendar,
  Car,
  Globe,
  Hotel,
  Landmark,
  Lightbulb,
  MapPin,
  MessageCircle,
  Mountain,
  Plane,
  Rocket,
  Shield,
  Star,
  Sun,
  Target,
  Users,
} from 'lucide-react';

interface EmojiIconProps {
  icon: string | React.ReactNode;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  '\u{1F3E8}': Hotel,
  '\u{2708}': Plane,
  '\u{1F697}': Car,
  '\u{1F4B0}': BadgeDollarSign,
  '\u{1F4C5}': Calendar,
  '\u{2B50}': Star,
  '\u{1F465}': Users,
  '\u{1F30D}': Globe,
  '\u{1F4AC}': MessageCircle,
  '\u{1F392}': BriefcaseBusiness,
  '\u{1F3AF}': Target,
  '\u{1F4CD}': MapPin,
  '\u{1F916}': Bot,
  '\u{1F680}': Rocket,
  '\u{1F3D6}': Sun,
  '\u{1F3D4}': Mountain,
  '\u{1F3DB}': Landmark,
  '\u{1F5D3}': Calendar,
  '\u{1F9F3}': BriefcaseBusiness,
  '\u{1F6CC}': BedDouble,
  '\u{1F6E1}': Shield,
  '\u{1F4A1}': Lightbulb,
  '\u{1F527}': BriefcaseBusiness,
  '\u{1F4F7}': Camera,
};

const EmojiIcon: React.FC<EmojiIconProps> = ({ icon, className = 'h-5 w-5' }) => {
  if (typeof icon !== 'string') {
    return <div className={className}>{icon}</div>;
  }
  const normalizedIcon = icon.replace('\uFE0F', '');
  const IconComponent = iconMap[normalizedIcon] || Star;
  return <IconComponent className={className} aria-hidden="true" />;
};

export default EmojiIcon;
