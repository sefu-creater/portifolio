import Container from "@/components/Container";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  ExternalLink,
  Frame,
  Github,
  SearchCheck,
  Eye,
  MonitorSmartphone,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const aboutStats = [
  { label: "Years of experience", value: "3+" },
  { label: "Technologies mastered", value: "5+" },
  { label: "Companies worked with", value: "15+" },
];

type Skill = {
  name: string;
  level: string;
  progress: number;
  icon: string;
};

type SkillGroup = {
  title: string;
  skills: Skill[];
};

type Project = {
  title: string;
  badge: string;
  description: string;
  href: string;
  actionLabel?: string;
  demoHref?: string;
  sourceHref?: string;
  media?: string;
  mockup?: "resume" | "java" | "sales" | "teacher";
};

const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: [
      { name: "HTML", level: "Expert", progress: 100, icon: "H5" },
      { name: "CSS", level: "Expert", progress: 100, icon: "C3" },
      { name: "JavaScript", level: "Advanced", progress: 90, icon: "JS" },
      { name: "TypeScript", level: "Advanced", progress: 90, icon: "TS" },
      { name: "Java", level: "Intermediate", progress: 70, icon: "JV" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "React (Js & Ts)", level: "Advanced", progress: 90, icon: "R" },
      { name: "Vue (Js & Ts)", level: "Advanced", progress: 90, icon: "V" },
      { name: "Angular", level: "Beginner", progress: 50, icon: "A" },
      { name: "React Native", level: "Advanced", progress: 90, icon: "RN" },
      { name: "Node.js", level: "Intermediate", progress: 70, icon: "N" },
    ],
  },
  {
    title: "State Management",
    skills: [
      { name: "Redux Toolkit", level: "Advanced", progress: 90, icon: "RT" },
      { name: "Pinia", level: "Advanced", progress: 90, icon: "P" },
      { name: "Zustand", level: "Intermediate", progress: 80, icon: "Z" },
    ],
  },
  {
    title: "APIs",
    skills: [
      { name: "GraphQL (Apollo)", level: "Intermediate", progress: 80, icon: "GQ" },
      { name: "REST API", level: "Advanced", progress: 90, icon: "API" },
    ],
  },
  {
    title: "Database & ORM",
    skills: [
      { name: "MongoDB", level: "Beginner", progress: 50, icon: "DB" },
      { name: "Mongoose", level: "Beginner", progress: 50, icon: "MG" },
    ],
  },
];

const projects: Project[] = [
  {
    title: "SmartChat",
    badge: "React Project",
    description:
      "A smart AI-powered chatbot interface built with React, enabling interactive communication using modern UI components.",
    media: "/assets/translate_bot.webm",
    href: "https://translatebot.app/",
    demoHref: "https://translatebot.app/",
  },
  {
    title: "E-shop",
    badge: "React Project",
    description:
      "A modern e-commerce web app for browsing and purchasing products, featuring product pages, cart functionality, and a responsive design.",
    media: "/assets/unqueue.webm",
    href: "https://unqueue.shop/",
    demoHref: "https://unqueue.shop/",
  },
  {
    title: "Resume Builder",
    badge: "React Project",
    description:
      "A React-based web app that allows users to easily create, preview, and download professional resumes with a clean and intuitive interface.",
    mockup: "resume",
    href: "#contact",
    actionLabel: "View Project",
  },
  {
    title: "Java Servlet App",
    badge: "Java Project",
    description:
      "A Java servlet project for practicing server-side web development with servlet request and response handling.",
    mockup: "java",
    href: "https://github.com/jabo-arnold-landry/test-java-serlvlet",
    sourceHref: "https://github.com/jabo-arnold-landry/test-java-serlvlet",
  },
  {
    title: "Sales Order",
    badge: "Java Project",
    description:
      "A sales order management project built in Java for organizing customer orders, products, and sales workflow.",
    mockup: "sales",
    href: "https://github.com/sefu-creater/sales-order",
    sourceHref: "https://github.com/sefu-creater/sales-order",
  },
  {
    title: "Teacher Profile Manager",
    badge: "PHP Project",
    description:
      "A simple web application for school administrators to add, view, and manage teacher profiles and qualifications.",
    mockup: "teacher",
    href: "https://github.com/sefu-creater/teacher-profile",
    sourceHref: "https://github.com/sefu-creater/teacher-profile",
  },
];

const services = [
  {
    service: "Frontend Development",
    description:
      "Creating stellar user interfaces and web experiences using the latest technologies.",
    icon: Code2,
  },
  {
    service: "UX Design",
    description:
      "Building intuitive, user-centric designs that drive engagement and conversion.",
    icon: Frame,
  },
  {
    service: "SEO Optimization",
    description:
      "Enhancing your website's visibility in search engines for increased organic traffic.",
    icon: SearchCheck,
  },
  {
    service: "Responsive Design",
    description:
      "Designing websites that look and perform equally well on all devices and screen sizes.",
    icon: MonitorSmartphone,
  },
  {
    service: "Backend Development",
    description:
      "Developing robust, scalable server-side logic for a wide range of web applications.",
    icon: Eye,
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              <span className={styles.pill}>html</span>
              <span className={styles.pill}>css</span>
              <span className={styles.pill}>javascript</span>
              <span className={styles.pill}>typescript</span>
              <span className={styles.pill}>php</span>
              <span className={styles.pill}>python</span>
              <span className={styles.pill}>c programming</span>
              <span className={styles.pill}>sql</span>
              <span className={styles.pill}>postgres</span>
              <span className={styles.pill}>next.js</span>
              <span className={styles.pill}>tailwindcss</span>
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  NIYIMFASHA Seph.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                An experienced full-stack website developer with a passion for
                crafting unique digital experiences.
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6"
            >
              <Link href="mailto:niyimfasha@proton.me" passHref>
                <Button>
                  Get in touch <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#about"))}
              >
                Learn more
              </Button>
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            className="mt-14 flex h-full w-full items-center justify-center xl:mt-0"
          >
            <Image
              src="/profile.jpeg"
              alt="NIYIMFASHA Seph"
              width={400}
              height={400}
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section className="pt-24">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="mx-auto my-20 max-w-6xl"
          >
            <span className="text-gradient clash-grotesk text-sm font-semibold uppercase">
              About Me
            </span>
            <div className="mt-4 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <h2 className="text-3xl font-semibold leading-tight text-foreground xl:text-5xl">
                  I build clean, responsive web apps with strong frontend
                  craft and practical full-stack thinking.
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground xl:text-lg">
                  My work focuses on React, TypeScript, APIs, and polished user
                  interfaces. I enjoy turning rough ideas into usable products
                  that feel fast, organized, and easy to understand.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {aboutStats.map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <span className="clash-grotesk text-gradient block text-4xl font-semibold xl:text-5xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground xl:text-sm">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" data-scroll-section className="py-16">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="mx-auto max-w-6xl"
          >
            <h2 className="clash-grotesk text-center text-3xl font-semibold text-foreground xl:text-4xl">
              My Skills
            </h2>

            <div className="mt-10 space-y-7">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <div className="mb-5 bg-white px-4 py-2 text-center text-sm font-bold text-red-600">
                    {group.title}
                  </div>
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {group.skills.map((skill) => (
                      <SkillCard key={skill.name} skill={skill} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section className="py-20">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="mx-auto max-w-6xl"
          >
            <h2 className="clash-grotesk text-center text-3xl font-semibold text-foreground xl:text-4xl">
              My Projects
            </h2>

            <ProjectCarousel />
          </div>
        </section>

        {/* Services */}
        <section id="services" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col justify-start space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  Need more info?
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    I got you.
                  </span>
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                  Here are some of the services I offer. If you have any
                  questions, feel free to reach out.
                </p>
              </div>
              {services.map((service) => (
                <div
                  key={service.service}
                  className="flex flex-col items-start rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                >
                  <service.icon className="my-6 text-primary" size={20} />
                  <span className="text-lg tracking-tight text-foreground">
                    {service.service}
                  </span>
                  <span className="mt-2 tracking-tighter text-muted-foreground">
                    {service.description}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Let&apos;s work{" "}
              <span className="text-gradient clash-grotesk">together.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;m currently available for freelance work and open to
              discussing new projects.
            </p>
            <Link href="mailto:niyimfasha@proton.me" passHref>
              <Button className="mt-6">Get in touch</Button>
            </Link>
          </div>
        </section>
      </div>
    </Container>
  );
}

function ProjectCarousel() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setActiveSlide(api.selectedScrollSnap());
    };

    handleSelect();
    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || isPaused) return;

    const timer = window.setInterval(() => {
      api.scrollNext();
    }, 3500);

    return () => {
      window.clearInterval(timer);
    };
  }, [api, isPaused]);

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (
      event.relatedTarget &&
      event.currentTarget.contains(event.relatedTarget as Node)
    ) {
      return;
    }

    setIsPaused(false);
  }

  return (
    <div
      className="mt-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={handleBlur}
    >
      <Carousel setApi={setApi} opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-5">
          {projects.map((project) => (
            <CarouselItem
              key={project.title}
              className="basis-[88%] pl-5 sm:basis-1/2 lg:basis-1/3"
            >
              <ProjectCard project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 border-white/10 bg-[#131f31]/95 text-white hover:bg-[#1b2738] sm:flex" />
        <CarouselNext className="-right-4 border-white/10 bg-[#131f31]/95 text-white hover:bg-[#1b2738] sm:flex" />
      </Carousel>

      <div className="mt-5 flex justify-center gap-2">
        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            aria-label={`Show ${project.title}`}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-2.5 w-2.5 rounded-full bg-white/25 transition",
              activeSlide === index && "w-8 bg-[#248cff]",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full min-h-[430px] flex-col rounded-md border border-white/10 bg-[#131f31] p-4 text-center shadow-md transition duration-300 hover:-translate-y-1 hover:border-primary/50">
      <ProjectPreview project={project} />
      <h3 className="mt-4 text-lg font-semibold text-foreground">
        {project.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
        {project.description}
      </p>
      <ProjectActions project={project} />
    </article>
  );
}

function ProjectActions({ project }: { project: Project }) {
  const hasProjectLinks = [project.demoHref, project.sourceHref].some(Boolean);

  if (hasProjectLinks) {
    return (
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {project.demoHref && (
          <Button
            asChild
            size="sm"
            className="bg-[#248cff] px-4 text-white hover:bg-[#1478e6]"
          >
            <Link
              href={project.demoHref}
              target={isExternalLink(project.demoHref) ? "_blank" : undefined}
              rel={isExternalLink(project.demoHref) ? "noreferrer" : undefined}
            >
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
              Live Demo
            </Link>
          </Button>
        )}
        {project.sourceHref && (
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-white/15 bg-transparent px-4 text-white hover:bg-white/10"
          >
            <Link
              href={project.sourceHref}
              target={isExternalLink(project.sourceHref) ? "_blank" : undefined}
              rel={isExternalLink(project.sourceHref) ? "noreferrer" : undefined}
            >
              <Github className="mr-1.5 h-3.5 w-3.5" />
              Source Code
            </Link>
          </Button>
        )}
      </div>
    );
  }

  const isExternal = isExternalLink(project.href);

  return (
    <Button
      asChild
      size="sm"
      className="mx-auto mt-5 bg-[#248cff] px-5 text-white hover:bg-[#1478e6]"
    >
      <Link
        href={project.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
      >
        {project.actionLabel ?? "View Project"}
      </Link>
    </Button>
  );
}

function isExternalLink(href: string) {
  return href.startsWith("http");
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <article className="rounded-md border border-white/5 bg-[#1b2738] p-5 shadow-md">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#248cff]/20 text-[11px] font-bold text-[#248cff]">
          {skill.icon}
        </span>
        <h3 className="text-sm font-bold text-slate-100">{skill.name}</h3>
      </div>
      <p className="mt-4 text-xs text-slate-300">Level: {skill.level}</p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-700">
        <div
          className="h-full rounded-full bg-[#248cff]"
          style={{ width: `${skill.progress}%` }}
        />
      </div>
    </article>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  if (project.mockup === "resume") {
    return (
      <div className="relative aspect-video overflow-hidden rounded-md border border-white/10 bg-slate-100 p-4 text-left text-slate-900">
        <ProjectBadge text={project.badge} />
        <p className="text-2xl font-black leading-6 text-[#248cff]">
          Stand Out
        </p>
        <p className="mt-1 text-xl font-black leading-5">
          with Professional Resumes
        </p>
        <p className="mt-3 max-w-[85%] text-[10px] leading-4 text-slate-500">
          Craft the perfect resume with elegant templates, live preview, and
          export-ready controls.
        </p>
      </div>
    );
  }

  if (project.mockup === "java") {
    return (
      <div className="relative aspect-video overflow-hidden rounded-md border border-white/10 bg-[#09111f] p-4 text-left">
        <ProjectBadge text={project.badge} />
        <div className="mb-4 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <p className="font-mono text-[11px] leading-5 text-slate-300">
          <span className="text-[#248cff]">public class</span>{" "}
          ServletApp {"{"}
        </p>
        <p className="pl-4 font-mono text-[11px] leading-5 text-slate-300">
          doGet(request, response);
        </p>
        <p className="font-mono text-[11px] leading-5 text-slate-300">{"}"}</p>
      </div>
    );
  }

  if (project.mockup === "sales") {
    return (
      <div className="relative aspect-video overflow-hidden rounded-md border border-white/10 bg-slate-100 p-4 text-left text-slate-900">
        <ProjectBadge text={project.badge} />
        <div className="flex items-center justify-between">
          <p className="text-lg font-black text-[#248cff]">Sales Orders</p>
          <span className="rounded bg-green-100 px-2 py-1 text-[10px] font-bold text-green-700">
            Paid
          </span>
        </div>
        <div className="mt-4 space-y-2">
          {["Customer", "Product", "Quantity"].map((item) => (
            <div key={item} className="flex items-center justify-between rounded bg-white px-3 py-2 text-[11px] shadow-sm">
              <span>{item}</span>
              <span className="h-2 w-16 rounded-full bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (project.mockup === "teacher") {
    return (
      <div className="relative aspect-video overflow-hidden rounded-md border border-white/10 bg-[#0d1829] p-4 text-left">
        <ProjectBadge text={project.badge} />
        <p className="text-lg font-black text-white">Teacher Profiles</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Math", "Science", "English"].map((subject) => (
            <div key={subject} className="rounded bg-white/10 p-2">
              <span className="block h-8 w-8 rounded-full bg-[#248cff]/80" />
              <p className="mt-2 text-[10px] font-semibold text-white">
                {subject}
              </p>
              <span className="mt-1 block h-1.5 rounded-full bg-white/20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (project.media?.endsWith(".webm")) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-md bg-[#0b1423]">
        <ProjectBadge text={project.badge} />
        <video
          src={project.media}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  if (project.media) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-md bg-[#0b1423]">
        <ProjectBadge text={project.badge} />
        <Image
          src={project.media}
          alt={project.title}
          width={640}
          height={360}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return null;
}

function ProjectBadge({ text }: { text: string }) {
  return (
    <span className="absolute right-2 top-2 z-10 rounded bg-[#248cff] px-2 py-1 text-[10px] font-semibold text-white">
      {text}
    </span>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
