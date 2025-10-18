import { TimeLine_01Entry } from "@/components/ui/release-time-line";
import { Calendar, Package, Sparkles, Zap } from "lucide-react";

export const dataExperience: TimeLine_01Entry[] = [
  {
    icon: Package,
    title: "Frontend Developer",
    subtitle: "Sep 2024 • Des 2024",
    projectName: "PT Aksamedia Mulia Digital · Magang",
    description:
      "Built responsive web interfaces for edubrand.id using Vue.js and collaborated with UI/UX and backend teams to enhance usability and maintainability.",
    items: [
      "Developed responsive and user-friendly UI for edubrand.id using Vue.js.",
      "Collaborated with UI/UX and backend teams to improve platform quality.",
      "Implemented cross-browser support and optimized UI performance.",
    ],
    image: "/img/experience/edubrand.png",
    button: {
      url: "https://edubrand.id",
      text: "Visit Web",
    },
  },
  {
    icon: Sparkles,
    title: "Frontend Developer",
    subtitle: "Jun 2024 • Sep 2024",
    projectName: "Candidate College · Magang",
    description:
      "Developed a responsive education platform using Next.js, implementing Figma designs and integrating APIs for consistent user experience.",
    items: [
      "Built dynamic education platform using Next.js and Figma designs.",
      "Integrated REST APIs ensuring consistent user experience across pages.",
      "Applied Atomic Design principles for scalable UI components.",
    ],
    image: "/img/experience/candidate.png",
    button: {
      url: "https://candidate-college.vercel.app/",
      text: "Visit Web",
    },
  },
  {
    icon: Zap,
    title: "Web Developer",
    subtitle: "Nov 2023 • Feb 2024",
    projectName: "SmartPath · Magang",
    description:
      "Contributed to software development using React.js and Next.js, focusing on responsive and interactive UI components.",
    items: [
      "Developed responsive UI components using React.js and Next.js.",
      "Translated visual designs into clean, functional web code.",
      "Maintained design quality using Atomic Design methodology.",
    ],
    image: "/img/experience/smartpath.png",
    button: {
      url: "https://smartpath.id",
      text: "Visit Web",
    },
  },
  {
    icon: Calendar,
    title: "Frontend Developer",
    subtitle: "Nov 2022 • Jun 2023",
    projectName: "Finplan.id · Magang",
    description:
      "Designed and implemented responsive frontend components, ensuring smooth API integration and accessibility across devices.",
    items: [
      "Built responsive web interface and reusable UI components.",
      "Integrated backend APIs to ensure smooth data flow.",
      "Collaborated with team to improve cross-device accessibility.",
    ],
    image: "/img/experience/finplan.png",
    button: {
      url: "https://www.finplan.id",
      text: "Visit Web",
    },
  },
];
