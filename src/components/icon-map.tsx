import {
  Atom,
  BookOpenText,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  Calculator,
  CircleHelp,
  ClipboardCheck,
  Code2,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  House,
  LayoutDashboard,
  Lightbulb,
  Mail,
  Medal,
  MessageCircle,
  MessagesSquare,
  MonitorCog,
  Phone,
  PhoneCall,
  Quote,
  Settings2,
  ShieldCheck,
  Sigma,
  Sparkles,
  Star,
  Trophy,
  UserRound,
  Users,
  type LucideIcon
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Atom,
  BookOpenText,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  Calculator,
  CircleHelp,
  ClipboardCheck,
  Code2,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  House,
  LayoutDashboard,
  Lightbulb,
  Mail,
  Medal,
  MessageCircle,
  MessagesSquare,
  MonitorCog,
  Phone,
  PhoneCall,
  Quote,
  Settings2,
  ShieldCheck,
  Sigma,
  Sparkles,
  Star,
  Trophy,
  UserRound,
  Users
};

export function IconByName({
  name,
  className
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Sparkles;
  return <Icon className={className} />;
}
