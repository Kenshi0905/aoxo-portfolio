import { UserRound, GraduationCap, Feather, Compass, FolderCode, Server, ScanSearch, ChartNoAxesCombined, Gamepad2, Building2, BookOpen, Cpu, Code2, Network, BrainCircuit, FileText, Download, Award, Mail, Github, MapPin, Film, TrainFront, Orbit, Terminal, type LucideIcon } from 'lucide-react';

import type { OrganizationId } from './organizations';

export const RESUME_URL = '/Ashmit-Avash-Resume.pdf?v=2026-09-06';
export const GITHUB_URL = 'https://github.com/Kenshi0905';
export const EMAIL = 'ashmitavash@gmail.com';

export type PortfolioEntry = {
  id: string;
  label: string;
  subtitle: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  collaborators?: string[];
  tags?: string[];
  facts?: { value: string; label: string; score?: number; max?: number }[];
  sections: { title: string; text?: string; points?: string[]; organizations?: OrganizationId[] }[];
  organization?: OrganizationId;
  action?: { label: string; href: string; download?: boolean };
  visual?: 'vault' | 'factlens' | 'forecast' | 'portfolio';
  profile?: { name: string; role: string; photo: string };
};

export type PortfolioCategory = { id: string; label: string; icon: LucideIcon; entries: PortfolioEntry[] };

export const categories: PortfolioCategory[] = [
  {
    id: 'about', label: 'About', icon: UserRound,
    entries: [
      {
        id: 'profile', label: 'Who I am', subtitle: 'A little about the person behind the screen', icon: UserRound,
        eyebrow: 'PLAYER PROFILE', title: 'Curiosity, built into things.',
        profile: { name: 'Ashmit Avash', role: 'Electronics & Computer Science · KIIT', photo: '/images/ashmit-profile.jpeg' },
        description: 'I’m Ashmit, an Electronics and Computer Science student at KIIT. I turn a curiosity for how things work into software, AI experiments, and systems I can call my own.',
        tags: ['AI & machine learning', 'Software development', 'Self-hosted systems'],
        facts: [{ value: 'KIIT', label: 'UNIVERSITY' }, { value: '8.03 / 10', label: 'CGPA', score: 8.03, max: 10 }, { value: 'Bhubaneswar', label: 'HOME BASE' }],
        sections: [
          { title: 'From an idea to something that works', text: 'My projects span an AI-powered fact analysis workflow, predictive models, and a home server for media and games. I enjoy connecting software with the systems underneath it.' },
          { title: 'Learning, together', organizations: ['openai'], text: 'As an OpenAI Campus Lead with the OpenAI Student Collective, I lead campus AI initiatives and organize workshops, discussions, and community activities around AI literacy and peer learning.' },
          { title: 'A creative side, too', organizations: ['wordsmith', 'kfs'], text: 'I’m Vice President of KIIT Wordsmith Society for 2026–2027 and part of the KIIT Film Society content team. My work with Wordsmith also includes serving as Content Lead for Inkspire Magazine.' },
        ],
      },
      {
        id: 'education', label: 'Education', subtitle: 'Electronics meets computer science', icon: GraduationCap,
        eyebrow: 'LEARNING LOG', title: 'Two disciplines. One curious mind.',
        description: 'Pursuing a B.Tech in Electronics and Computer Science at KIIT University, Bhubaneswar, with interests across AI, programming, and infrastructure.',
        tags: ['B.Tech · 2024–present', 'Electronics & Computer Science'],
        facts: [{ value: '8.03 / 10', label: 'CGPA', score: 8.03, max: 10 }, { value: '92.2%', label: 'CLASS X', score: 92.2, max: 100 }, { value: '81.6%', label: 'CLASS XII', score: 81.6, max: 100 }],
        sections: [{ title: 'KIIT University · 2024–present', text: 'B.Tech in Electronics and Computer Science. Building practical experience through software, machine learning, and hardware projects.' }, { title: 'DAV Public School, CDA · 2010–2024', text: 'Completed AISSE and AISSCE, with 92.2% in Class X and 81.6% in Class XII.' }],
      },
      {
        id: 'beyond-code', label: 'Beyond the code', subtitle: 'Words, films, and a love for games', icon: Feather,
        eyebrow: 'SIDE QUESTS', title: 'There’s more to the story.',
        description: 'Writing, film, and gaming sit alongside my technical interests. This portfolio is a small tribute to the console interfaces that made exploring feel like an experience.',
        tags: ['Writing & editing', 'Film', 'Retro gaming'],
        sections: [{ title: 'KIIT Wordsmith Society', organizations: ['wordsmith'], text: 'Vice President for 2026–2027. My work with the society also includes serving as Content Lead for Inkspire Magazine.' }, { title: 'KIIT Film Society', organizations: ['kfs'], text: 'Member of the content team, bringing a storytelling perspective to creative work.' }, { title: 'A little console nostalgia', text: 'KenshiVault includes a self-hosted retro gaming library with Retrom. This XMB-inspired portfolio carries a little of that same spirit.' }],
      },
      {
        id: 'now', label: 'Currently exploring', subtitle: 'The next thing to figure out', icon: Compass,
        eyebrow: 'IN PROGRESS', title: 'Always something to figure out.',
        description: 'Exploring AI and software development, leading campus AI initiatives, and continuing to build and maintain my self-hosted infrastructure.',
        tags: ['Artificial intelligence', 'Linux', 'Software development'],
        sections: [{ title: 'AI & software', text: 'Building on my experience with fact analysis workflows and ensemble forecasting to deepen my programming and problem-solving skills.' }, { title: 'Campus AI community', organizations: ['openai'], text: 'Organizing workshops, discussions, and community activities as an OpenAI Campus Lead, with a focus on AI literacy, responsible adoption, and peer learning.' }, { title: 'KenshiVault', text: 'Maintaining a Linux-based home server for storage, media streaming, photo management, and retro gaming.' }],
      },
    ],
  },
  {
    id: 'projects', label: 'Projects', icon: FolderCode,
    entries: [
      {
        id: 'kenshivault', label: 'KenshiVault', subtitle: 'My own little corner of the cloud', icon: Server,
        eyebrow: '01 / SELF-HOSTED INFRASTRUCTURE', title: 'A home for everything.', visual: 'vault',
        description: 'A dedicated home server built around OpenMediaVault and Docker. One place for media, photos, retro games, and shared storage, accessible across my devices.',
        tags: ['Linux', 'OpenMediaVault', 'Docker', 'Tailscale'],
        facts: [{ value: '03', label: 'MEDIA SERVICES' }, { value: 'Docker', label: 'RUNTIME' }, { value: 'Tailscale', label: 'REMOTE ACCESS' }],
        sections: [{ title: 'Built from the system up', text: 'Repurposed a PC into a NAS and application server. Organized storage, container configurations, application data, and backups into a maintainable layout.' }, { title: 'The services', points: ['Jellyfin for media streaming, Immich for photo backup and management, and Retrom for a centralized retro game library.', 'SMB for shared storage across devices and Tailscale for secure remote access.', 'Linux administration, virtual machines, and system monitoring for ongoing service management.'] }],
      },
      {
        id: 'factlens', label: 'FactLens', subtitle: 'Give every claim a closer look', icon: ScanSearch,
        eyebrow: '02 / AI & SOFTWARE', title: 'A clearer lens on information.', visual: 'factlens',
        organization: 'factlens',
        description: 'An AI-powered fact analysis and verification workflow created for MumbaiHacks, built with modular processing components and an architecture designed to grow.',
        collaborators: ['chilli-garlic-momo'],
        tags: ['Artificial intelligence', 'Fact analysis', 'Modular architecture'],
        sections: [{ title: 'The idea', text: 'Develop a structured workflow for examining information and supporting fact analysis with AI.' }, { title: 'My work', points: ['Developed modular processing components for the analysis and verification workflow.', 'Designed the project architecture around maintainability and future expansion.'] }],
        action: { label: 'Explore repository', href: 'https://github.com/chilli-garlic-momo/factLens' },
      },
      {
        id: 'forecasting', label: 'Ensemble forecasting', subtitle: 'Finding patterns in real-world data', icon: ChartNoAxesCombined,
        eyebrow: '03 / MACHINE LEARNING · NIC INTERNSHIP', title: 'Models that look ahead.', visual: 'forecast',
        organization: 'nic',
        description: 'Predictive trend analysis developed during my summer internship at the National Informatics Centre, Odisha State Centre, including liquor trend forecasting.',
        tags: ['SARIMA / ARIMA', 'XGBoost', 'CatBoost', 'Ridge'],
        facts: [{ value: '05', label: 'MODEL FAMILIES' }, { value: 'May 2026', label: 'INTERNSHIP' }],
        sections: [{ title: 'The approach', text: 'Implemented and evaluated statistical time-series models alongside gradient-boosting models, with Ridge meta-learners for ensemble forecasting.' }, { title: 'Context', text: 'Completed as part of the May 2026 NIC internship. The experience also introduced me to the eAbkari system and its database, payment, auction, and lottery integrations.' }],
      },
      {
        id: 'cinephilia', label: 'Cinephilia', subtitle: 'A home for my film-watching history', icon: Film,
        eyebrow: '04 / FILM & FRONTEND', title: 'A life in films.',
        description: 'A personal film diary that turns Letterboxd viewing history into a searchable dashboard of posters, ratings, and reviews. It currently runs without an active backend and is due for a refresh.',
        tags: ['React', 'TypeScript', 'Vite'],
        sections: [{ title: 'Your viewing history, together', text: 'Brings together Letterboxd CSV exports, watch history, ratings, and reviews in a visual library.' }, { title: 'Made for browsing', text: 'A split-view interface pairs movie artwork with personal notes, with client-side search to find films across the collection.' }],
        action: { label: 'Explore repository', href: `${GITHUB_URL}/Cinephilia` },
      },
      {
        id: 'project-tracs', label: 'Project TRACS', subtitle: 'A closer look at the tracks ahead', icon: TrainFront,
        eyebrow: '05 / RAILWAY DATA & VISUALIZATION', title: 'Reading between the rails.',
        description: 'A railway track monitoring dashboard prototype that brings geometry measurements, defect analysis, and inspection reports into one interface. Built around the Integrated Track Monitoring System concept.',
        collaborators: ['Ross0907'],
        tags: ['React', 'TypeScript', 'Vite'],
        sections: [{ title: 'Making track data readable', text: 'Charts and measurement cards bring gauge, alignment, unevenness, and cross-level data into a shared view.' }, { title: 'From readings to reports', text: 'Separate views organize defect detection, standards comparisons, exception reports, and system architecture for exploring railway inspection workflows.' }],
        action: { label: 'Explore repository', href: `${GITHUB_URL}/project-tracs` },
      },
      {
        id: 'black-hole', label: 'Black Hole Simulation', subtitle: 'An experiment in light and gravity', icon: Orbit,
        eyebrow: '06 / GRAPHICS & SIMULATION', title: 'Watching light bend.',
        description: 'An interactive black hole visualization built with Three.js and WebGL shaders. It explores gravitational lensing, a glowing accretion disk, and a procedural cosmic background in the browser.',
        collaborators: ['Ross0907'],
        tags: ['JavaScript', 'Three.js', 'GLSL'],
        sections: [{ title: 'Explore the view', text: 'Orbit and zoom around the black hole, adjust its mass and viewing distance, and toggle lensing, the accretion disk, and Doppler effects.' }, { title: 'Behind the image', text: 'Shader-based ray marching and simplified Schwarzschild calculations shape the light paths, with adjustable rendering quality.' }],
        action: { label: 'Explore repository', href: `${GITHUB_URL}/Black-Hole-Simulation` },
      },
      {
        id: 'pied-piper', label: 'Pied Piper', subtitle: 'A little WarGames nostalgia in the terminal', icon: Terminal,
        eyebrow: '07 / PYTHON & INTERACTIVE SYSTEMS', title: 'Shall we play a game?',
        description: 'A Python terminal playground inspired by WarGames (1983), combining a strategy simulation with classic arcade games. I’m still developing the simulation and refining the experience.',
        tags: ['Python', 'Terminal UI', 'Simulation'],
        sections: [{ title: 'The terminal as a stage', text: 'A CRT-inspired boot sequence, typewriter text, ASCII maps, and saved preferences bring the film’s computer-room atmosphere to the command line.' }, { title: 'More than one way to play', text: 'Alongside the turn-based strategy simulation, the arcade collection includes chess, Sudoku, poker, Hangman, Minesweeper, and a number-guessing game.' }],
        action: { label: 'Explore repository', href: `${GITHUB_URL}/Pied-Piper` },
      },
      {
        id: 'aoxo', label: 'aoxo / portfolio', subtitle: 'A familiar feeling. A personal interface.', icon: Gamepad2,
        eyebrow: '08 / WEB & INTERACTION', title: 'Press play on my portfolio.', visual: 'portfolio',
        description: 'The site you’re exploring: a personal portfolio inspired by the PlayStation 3 XrossMediaBar, with flowing waves, a horizontal category menu, and controller-style interactions.',
        tags: ['React', 'TypeScript', 'CSS', 'Vite'],
        facts: [{ value: '06', label: 'CATEGORIES' }, { value: '04', label: 'INPUT METHODS' }, { value: '03', label: 'THEMES' }],
        sections: [{ title: 'Designed to explore', text: 'Navigate categories horizontally and entries vertically. Open details, change the atmosphere, or enable subtle interface sounds using the on-screen controls or keyboard.' }, { title: 'Built for different screens', text: 'Responsive layouts, visible focus states, touch navigation, and reduced-motion support keep the experience usable beyond the console inspiration.' }],
      },
    ],
  },
  {
    id: 'experience', label: 'Experience', icon: Building2,
    entries: [
      {
        id: 'nic', label: 'National Informatics Centre', subtitle: 'Summer intern · May 2026', icon: Building2,
        organization: 'nic',
        eyebrow: 'EXPERIENCE / 01', title: 'Learning from real-world systems.',
        description: 'Summer Intern at the National Informatics Centre (NIC), Odisha State Centre. Worked on ensemble forecasting and explored the integrations behind the eAbkari website.',
        tags: ['May 2026', 'Odisha State Centre', 'Machine learning'],
        facts: [{ value: 'Intern', label: 'ROLE' }, { value: '05', label: 'MODEL FAMILIES' }, { value: 'Odisha', label: 'STATE CENTRE' }],
        sections: [{ title: 'Predictive modeling', points: ['Developed ensemble forecasting models for predictive trend analysis, including liquor trends.', 'Implemented and evaluated SARIMA, ARIMA, XGBoost, CatBoost, and Ridge meta-learners.'] }, { title: 'Understanding integrated services', text: 'Worked on the eAbkari website and learned how databases, payment gateways, auction systems, and lottery systems fit together.' }],
      },
      {
        id: 'openai-campus', label: 'OpenAI Campus Lead', subtitle: 'OpenAI Student Collective · 2026–present', icon: BrainCircuit,
        organization: 'openai',
        eyebrow: 'CAMPUS LEADERSHIP / 02', title: 'Making AI a shared learning experience.',
        description: 'OpenAI Campus Lead with the OpenAI Student Collective, leading campus AI initiatives and organizing workshops, discussions, and community activities since 2026.',
        tags: ['AI literacy', 'Responsible adoption', 'Peer learning'],
        facts: [{ value: 'Campus Lead', label: 'ROLE' }, { value: '2026', label: 'SINCE' }],
        sections: [{ title: 'Learning as a community', text: 'Creating opportunities for students to explore AI through workshops, discussions, and shared learning.' }, { title: 'Thoughtful adoption', text: 'Promoting AI literacy and responsible use as part of campus community activities.' }],
      },
      {
        id: 'wordsmith', label: 'KIIT Wordsmith Society', subtitle: 'Vice President · 2026–2027', icon: Feather,
        organization: 'wordsmith',
        eyebrow: 'CREATIVE LEADERSHIP / 03', title: 'Making room for good stories.',
        description: 'Vice President of KIIT Wordsmith Society for 2026–2027, bringing a creative perspective alongside my technical work.',
        tags: ['Leadership', 'Writing', 'KIIT Wordsmith Society'],
        facts: [{ value: 'Vice President', label: 'ROLE' }, { value: '2026–2027', label: 'TERM' }],
        sections: [{ title: 'Inkspire Magazine', text: 'My work with the society also includes serving as Content Lead for Inkspire Magazine.' }, { title: 'A different kind of craft', text: 'Writing and editing are part of an ongoing interest in language, storytelling, and shaping ideas for an audience.' }],
      },
      {
        id: 'film', label: 'KIIT Film Society', subtitle: 'Content team member', icon: BookOpen,
        organization: 'kfs',
        eyebrow: 'CREATIVE EXPERIENCE / 04', title: 'Stories beyond the page.',
        description: 'Member of the content team at KIIT Film Society, exploring the creative side of campus life through film and writing.',
        tags: ['Content team', 'Film', 'Storytelling'],
        facts: [{ value: 'Content Team', label: 'ROLE' }, { value: 'Film', label: 'CRAFT' }],
        sections: [{ title: 'Technical and creative', text: 'Film and writing complement the analytical side of my work, and give me another way to think about how people experience what we make.' }],
      },
    ],
  },
  {
    id: 'skills', label: 'Skills', icon: Cpu,
    entries: [
      {
        id: 'programming', label: 'Programming', subtitle: 'From low-level logic to the web', icon: Code2,
        eyebrow: 'TOOLKIT / 01', title: 'The languages behind the ideas.',
        description: 'A programming foundation across Python, Java, C++, C, and JavaScript, with HTML and CSS for the web.',
        tags: ['Python', 'Java', 'C++', 'C', 'JavaScript', 'HTML', 'CSS'],
        sections: [{ title: 'Putting it into practice', text: 'Applied through AI workflows, predictive models, data processing, and systems projects. This portfolio also uses React and TypeScript.' }],
      },
      {
        id: 'infrastructure', label: 'Infrastructure', subtitle: 'Built, hosted, and maintained', icon: Network,
        eyebrow: 'TOOLKIT / 02', title: 'Comfortable behind the scenes.',
        description: 'Hands-on experience with Linux, containers, storage, networking, virtual machines, and monitoring through my self-hosted home server.',
        tags: ['Docker', 'Linux', 'Virtual machines', 'SMB', 'Git', 'System monitoring', 'Tailscale'],
        sections: [{ title: 'KenshiVault as a learning ground', text: 'Managing services in OpenMediaVault and Docker has made storage, networking, remote access, and service maintenance practical skills.' }],
      },
      {
        id: 'ai-data', label: 'AI & data', subtitle: 'Models, patterns, and processing', icon: BrainCircuit,
        eyebrow: 'TOOLKIT / 03', title: 'Turning data into understanding.',
        description: 'Experience with machine learning, time-series forecasting, AI-powered analysis, data processing, and MySQL.',
        tags: ['SARIMA', 'ARIMA', 'XGBoost', 'CatBoost', 'Ridge', 'MySQL'],
        sections: [{ title: 'Applied experience', text: 'Ensemble forecasting at NIC and the FactLens analysis workflow connect these interests to practical development.' }],
      },
      {
        id: 'electronics', label: 'Electronics & systems', subtitle: 'Learning across hardware and software', icon: Cpu,
        eyebrow: 'TOOLKIT / 04', title: 'Understanding the whole system.',
        description: 'An Electronics and Computer Science background, FPGA and ASIC workshop experience, and an ongoing interest in real-time simulation and instrumentation.',
        tags: ['Electronics', 'FPGA & ASIC workshop', 'Real-time simulation'],
        sections: [{ title: 'Learning across disciplines', text: 'Completed the FPGA and ASIC Workshop by NIT Rourkela. My degree combines electronics and computer science, alongside an interest in real-time simulation.' }],
      },
    ],
  },
  {
    id: 'resume', label: 'Résumé', icon: FileText,
    entries: [
      {
        id: 'download', label: 'Download résumé', subtitle: 'The complete picture, in one page', icon: Download,
        eyebrow: 'RÉSUMÉ / LATEST EDITION', title: 'A little more on paper.',
        description: 'My education, experience, technical skills, projects, and activities in one place. The updated résumé includes my OpenAI Campus Lead role and Vice President role at KIIT Wordsmith Society.',
        tags: ['PDF', '1 page', 'Updated résumé'],
        sections: [{ title: 'At a glance', text: 'B.Tech in Electronics and Computer Science at KIIT, a summer internship at NIC, and projects in AI and self-hosted infrastructure. Campus leadership through the OpenAI Student Collective and KIIT Wordsmith Society.' }],
        action: { label: 'Download PDF', href: RESUME_URL, download: true },
      },
      {
        id: 'milestones', label: 'Milestones', subtitle: 'Workshops, hackathons, and new perspectives', icon: Award,
        eyebrow: 'ACHIEVEMENTS & PARTICIPATION', title: 'Every challenge teaches something.',
        description: 'Learning outside the classroom through technical workshops and hackathons.',
        tags: ['FPGA & ASIC', 'Hackathons', 'Hands-on learning'],
        facts: [{ value: '01', label: 'WORKSHOP' }, { value: '02', label: 'HACKATHONS' }],
        sections: [{ title: 'NIT Rourkela', text: 'Completed the FPGA and ASIC Workshop.' }, { title: 'MUMBAIHACKS', text: 'Participated in the final stage.' }, { title: 'Bharatiya Antariksh Hackathon · ISRO', text: 'Participated in the hackathon.' }],
      },
    ],
  },
  {
    id: 'contact', label: 'Contact', icon: Mail,
    entries: [
      {
        id: 'email', label: 'Say hello', subtitle: EMAIL, icon: Mail,
        eyebrow: 'START A CONVERSATION', title: 'Good things start with a hello.',
        description: 'Have a project in mind, an interesting technical problem, or something you think I should explore? Drop me a line.',
        tags: ['Projects', 'Collaboration', 'A good conversation'],
        sections: [{ title: 'Email', text: EMAIL }, { title: 'Based in', text: 'Bhubaneswar, Odisha, India.' }],
        action: { label: 'Write an email', href: `mailto:${EMAIL}` },
      },
      {
        id: 'github', label: 'GitHub', subtitle: '@Kenshi0905 · Code and experiments', icon: Github,
        eyebrow: 'FIND ME ONLINE', title: 'There’s always another commit.',
        description: 'Find my code and experiments on GitHub. For the FactLens project, you can also visit its repository directly from the Projects category.',
        tags: ['Kenshi0905', 'Software', 'Experiments'],
        sections: [{ title: 'GitHub profile', text: 'github.com/Kenshi0905' }],
        action: { label: 'Visit GitHub', href: GITHUB_URL },
      },
      {
        id: 'location', label: 'Somewhere in Bhubaneswar', subtitle: 'Odisha, India · UTC +05:30', icon: MapPin,
        eyebrow: 'CURRENT COORDINATES', title: 'Bhubaneswar, India.',
        description: 'Studying at KIIT University and building things from Bhubaneswar, Odisha. My local time follows Indian Standard Time.',
        tags: ['Bhubaneswar', 'Odisha', 'IST / UTC +05:30'],
        sections: [{ title: 'Let’s connect', text: 'Email is the easiest way to reach me about a project or collaboration.' }],
        action: { label: 'Say hello', href: `mailto:${EMAIL}` },
      },
    ],
  },
];
