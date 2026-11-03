import {
  Accessibility, Anchor, Baby, BadgeCheck, Banknote, Bell, BookOpen, BookUser, Briefcase, Building2, Calculator,
  CalendarDays, Car, ChartColumn, Clock, Coins, Container, Cpu, Factory, FileCheck, FilePen, FileText,
  Fingerprint, Fish, Flag, Fuel, Gavel, Globe, GraduationCap, Hammer, HeartPulse, Handshake, House, IdCard,
  KeyRound, Landmark, Leaf, Lightbulb, Lock, Mail, Map, Megaphone, MessageCircle, Network, Package, Phone,
  Pill, Plane, QrCode, Receipt, Rocket, Scale, School, Search, ShieldCheck, Ship, Siren, Smartphone,
  Sprout, Stamp, Stethoscope, Tractor, Trees, Truck, User, UserCheck, Users, Vote, Wallet, Wheat, Wifi,
  Wrench, type LucideIcon, type LucideProps,
} from "lucide-react";
import type { IconName } from "@/lib/benin/types";

const MAP: Record<IconName, LucideIcon> = {
  "id-card": IdCard, fingerprint: Fingerprint, passport: BookUser, car: Car, truck: Truck, ship: Ship,
  anchor: Anchor, scale: Scale, gavel: Gavel, shield: ShieldCheck, siren: Siren, building: Building2,
  landmark: Landmark, briefcase: Briefcase, receipt: Receipt, calculator: Calculator, map: Map,
  trees: Trees, leaf: Leaf, "file-text": FileText, "file-check": FileCheck, stamp: Stamp,
  "qr-code": QrCode, wallet: Wallet, smartphone: Smartphone, "heart-pulse": HeartPulse,
  stethoscope: Stethoscope, pill: Pill, baby: Baby, "graduation-cap": GraduationCap,
  "book-open": BookOpen, school: School, users: Users, user: User, "user-check": UserCheck,
  globe: Globe, plane: Plane, home: House, hammer: Hammer, factory: Factory, wheat: Wheat,
  coins: Coins, banknote: Banknote, chart: ChartColumn, search: Search, bell: Bell, mail: Mail,
  phone: Phone, message: MessageCircle, megaphone: Megaphone, vote: Vote, handshake: Handshake,
  lightbulb: Lightbulb, rocket: Rocket, cpu: Cpu, key: KeyRound, lock: Lock, clock: Clock,
  calendar: CalendarDays, flag: Flag, package: Package, container: Container, fuel: Fuel,
  wrench: Wrench, tractor: Tractor, signature: FilePen, "badge-check": BadgeCheck, fish: Fish,
  sprout: Sprout, accessibility: Accessibility, network: Network, wifi: Wifi,
};

export function Icon({ name, ...props }: { name: IconName } & Omit<LucideProps, "ref">) {
  const Cmp = MAP[name];
  return <Cmp aria-hidden="true" {...props} />;
}
