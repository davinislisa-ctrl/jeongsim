"use client";

import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  Calculator,
  FileText,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  Quote,
  Briefcase,
  Award,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/* ============================
   애니메이션 훅 - 스크롤 시 페이드인
   ============================ */
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

/* ============================
   카운트업 애니메이션 훅
   ============================ */
function useCountUp(end: number, duration: number = 2000, shouldStart: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);

  return count;
}

/* ============================
   네비게이션 컴포넌트
   ============================ */
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "소개", href: "#about" },
    { label: "스킬", href: "#skills" },
    { label: "프로젝트", href: "#projects" },
    { label: "가이드", href: "#guide" },
    { label: "후기", href: "#testimonials" },
    { label: "문의", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <a href="#" className="font-mono text-lg font-bold text-primary">
            {"김정심"}
          </a>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-accent transition-colors duration-200 text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href="#contact">문의하기</a>
            </Button>
          </div>

          {/* 모바일 햄버거 메뉴 */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="메뉴 열기"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-md rounded-lg mt-2 p-4 shadow-xl">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-3 text-muted-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href="#contact" onClick={() => setIsOpen(false)}>문의하기</a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ============================
   히어로 섹션
   ============================ */
function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* 배경 그라데이션 효과 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* 프로필 이미지 */}
          <div className="relative">
            <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20">
              <img
                src="/images/profile.jpg"
                alt="김정심 프로필 사진"
                className="w-full h-full object-cover"
              />
            </div>
            {/* 장식 링 */}
            <div className="absolute -inset-4 border-2 border-accent/20 rounded-full animate-pulse" />
          </div>

          {/* 텍스트 콘텐츠 */}
          <div className="text-center lg:text-left">
            <p className="font-mono text-accent text-sm sm:text-base mb-2">
              안녕하세요, 저는
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              김정심<span className="text-primary">입니다</span>
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-medium mb-6">
              세무회계사무원
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed">
              세무회계를 편하고 쉽게 접근합니다.
              <br />
              <span className="text-accent">수임 거래처</span>가 필요자료를 용이하게 주고받을 수 있도록 도와드립니다.
            </p>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                <a href="#contact">
                  프로젝트 문의하기
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10">
                <a href="#projects">프로젝트 보기</a>
              </Button>
              <Button asChild size="lg" className="bg-[#FEE500] hover:bg-[#FEE500]/90 text-[#3C1E1E] border-none">
                <a href="https://open.kakao.com/o/g0yKP2si" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 fill-current" />
                  상담하기 오픈단톡방
                </a>
              </Button>
            </div>

            {/* SNS 아이콘 */}
            <div className="flex gap-4 mt-8 justify-center lg:justify-start">
              <a
                href="mailto:kyong9144@naver.com"
                className="p-3 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-all duration-200"
                aria-label="이메일"
              >
                <Mail size={20} />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

/* ============================
   About 섹션
   ============================ */
function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  const keywords = ["#사용자중심", "#데이터기반", "#협업", "#정확성", "#신뢰"];

  return (
    <section id="about" className="py-20 lg:py-32 bg-card/30">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-12">
          <p className="font-mono text-accent text-sm mb-2">01. About Me</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            소개
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 경력 요약 */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              경력 요약
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              10년 이상의 세무회계 경력을 보유한 전문가입니다. 
              <span className="text-accent font-medium"> 국세청 조사과 과장 출신 세무사</span>와 
              <span className="text-primary font-medium"> 상속·양도 전문 세무사</span> 아래에서 
              다양한 실무 경험을 쌓았습니다.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              복잡한 세무 문제도 명쾌하게 해결하고, 고객의 이익을 최우선으로 생각합니다.
              정확하고 신속한 업무 처리로 신뢰받는 세무회계 서비스를 제공합니다.
            </p>
          </div>

          {/* 일하는 방식 */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              일하는 방식
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-secondary/50 border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <CheckCircle className="w-6 h-6 text-accent mb-2" />
                  <h4 className="font-medium text-foreground">정확한 분석</h4>
                  <p className="text-sm text-muted-foreground">데이터 기반의 정확한 세무 분석</p>
                </CardContent>
              </Card>
              <Card className="bg-secondary/50 border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <Users className="w-6 h-6 text-accent mb-2" />
                  <h4 className="font-medium text-foreground">원활한 소통</h4>
                  <p className="text-sm text-muted-foreground">고객과의 적극적인 커뮤니케이션</p>
                </CardContent>
              </Card>
              <Card className="bg-secondary/50 border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <TrendingUp className="w-6 h-6 text-accent mb-2" />
                  <h4 className="font-medium text-foreground">절세 전략</h4>
                  <p className="text-sm text-muted-foreground">합법적인 절세 방안 제시</p>
                </CardContent>
              </Card>
              <Card className="bg-secondary/50 border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <BookOpen className="w-6 h-6 text-accent mb-2" />
                  <h4 className="font-medium text-foreground">지속적 학습</h4>
                  <p className="text-sm text-muted-foreground">최신 세법 동향 파악</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* 키워드 태그 */}
        <div className="flex flex-wrap gap-3 justify-center mt-12">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   스킬 섹션
   ============================ */
function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation();

  const skills = [
    { name: "월별 미수/미지급 장부확인", level: 95, icon: Calculator },
    { name: "상속·양도 세무 서비스", level: 90, icon: FileText },
    { name: "조세 불복 대응", level: 85, icon: TrendingUp },
    { name: "절세 컨설팅", level: 92, icon: Award },
  ];

  const tools = [
    { name: "위하고", link: "https://www.wehago.com" },
    { name: "세무사랑", link: null },
    { name: "엑셀", link: null },
    { name: "한글", link: null },
    { name: "국세청 홈택스", link: "https://www.hometax.go.kr" },
    { name: "위택스", link: "https://www.wetax.go.kr" },
  ];

  return (
    <section id="skills" className="py-20 lg:py-32">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-12">
          <p className="font-mono text-accent text-sm mb-2">02. Skills & Tools</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            스킬 & 툴
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* 스킬 프로그레스 바 */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">전문 분야</h3>
            {skills.map((skill) => {
              const Icon = skill.icon;
              const count = useCountUp(skill.level, 1500, isVisible);
              return (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="text-foreground font-medium">{skill.name}</span>
                    </div>
                    <span className="font-mono text-accent">{count}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                      style={{ width: isVisible ? `${skill.level}%` : "0%" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 사용 툴 */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6">사용 프로그램</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {tools.map((tool) => (
                tool.link ? (
                  <a
                    key={tool.name}
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Card className="bg-secondary/50 border-border hover:border-primary hover:scale-105 transition-all duration-200 cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <span className="text-foreground font-medium">{tool.name}</span>
                        <ExternalLink className="w-3 h-3 inline-block ml-1 text-muted-foreground" />
                      </CardContent>
                    </Card>
                  </a>
                ) : (
                  <Card
                    key={tool.name}
                    className="bg-secondary/50 border-border hover:border-primary hover:scale-105 transition-all duration-200 cursor-default"
                  >
                    <CardContent className="p-4 text-center">
                      <span className="text-foreground font-medium">{tool.name}</span>
                    </CardContent>
                  </Card>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================
   프로젝트 섹션
   ============================ */
function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation();

  const projects = [
    {
      title: "절세 스킬 전수",
      role: "세무 컨설턴트",
      description: "기업과 개인을 위한 맞춤형 절세 전략을 수립하고 실행합니다. 합법적인 범위 내에서 세금 부담을 최소화하는 방법을 안내해드립니다.",
      tags: ["절세", "컨설팅", "세금전략"],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
    },
    {
      title: "상속·증여 계산 서비스",
      role: "상속세 전문가",
      description: "복잡한 상속·증여세를 쉽고 정확하게 계산해드립니다. 사전 증여 계획부터 상속세 신고까지 원스톱 서비스를 제공합니다.",
      tags: ["상속세", "증여세", "재산계획"],
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
    },
    {
      title: "조세 불복 전문 대응",
      role: "세무 대리인",
      description: "부당한 세금 부과에 대해 전문적으로 대응합니다. 회사의 이익을 최우선으로 생각하며 국세청 조사 경험을 바탕으로 최적의 결과를 이끌어냅니다.",
      tags: ["조세불복", "세무조사", "이의신청"],
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
    },
  ];

  return (
    <section id="projects" className="py-20 lg:py-32 bg-card/30">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-12">
          <p className="font-mono text-accent text-sm mb-2">03. Projects</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            대표 프로젝트
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group bg-card border-border overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <p className="text-sm text-accent mb-3 font-mono">{project.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   거래처 가이드 섹션 (은행별 빠른조회 통합)
   ============================ */
function GuideSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [guideCategory, setGuideCategory] = useState<"bank" | "hometax" | "loan">("bank");
  const [selectedBank, setSelectedBank] = useState("신한");
  const [hometaxDevice, setHometaxDevice] = useState<"pc" | "mobile">("pc");

  const loanData: Record<string, string> = {
    "신한": "대출 → 대출이자납입확인서",
    "국민": "뱅킹관리 → 제증명서 발급 → 연말정산증명서 (또는 대출이자납입증명서)",
    "우리": "대출 → 이자납입 → 이자납입내역서조회",
    "하나": "대출 → 대출거래내역조회 → 이자납입내역서",
    "농협": "뱅킹관리 → 증명서 → 연말정산증명서 (또는 대출거래내역조회)",
    "기업": "뱅킹관리 → 제증명서발급 → 대출관련증명서",
    "하나(기업)": "기업대출 → 대출계좌조회 → 이자납입내역조회"
  };

  const bankData: Record<string, { menu: string; steps: string[] }> = {
    "신한": {
      menu: "[관리/서비스] → [계좌조회서비스] → [빠른조회계좌 등록]",
      steps: ["뱅킹 로그인", "관리/서비스 메뉴 이동", "빠른조회계좌 등록", "계좌/비밀번호 설정"]
    },
    "국민": {
      menu: "[뱅킹관리] → [계좌관리] → [빠른조회서비스]",
      steps: ["KB스타뱅킹 로그인", "뱅킹관리 메뉴 선택", "빠른조회서비스 등록", "비밀번호 6자리 설정"]
    },
    "우리": {
      menu: "[뱅킹관리] → [뱅킹계좌관리] → [스피드조회계좌등록/해지]",
      steps: ["우리은행 뱅킹 로그인", "뱅킹계좌관리 이동", "스피드조회계좌 등록", "조회 암호 설정"]
    },
    "하나": {
      menu: "[마이하나] → [계좌정보관리] → [빠른조회관리]",
      steps: ["하나원큐 로그인", "계좌정보관리 선택", "빠른조회관리 등록", "간편 비밀번호 설정"]
    },
    "농협": {
      menu: "[MY뱅크] → [뱅킹서비스관리] → [빠른조회]",
      steps: ["NH농협 로그인", "뱅킹서비스관리 이동", "빠른조회 서비스 신청", "계좌번호 및 비번 입력"]
    },
    "기업": {
      menu: "[뱅킹관리] → [계좌관리] → [빠른계좌조회서비스 신청/해지]",
      steps: ["IBK기업은행 로그인", "뱅킹관리 메뉴 선택", "빠른계좌조회 신청", "조회 전용 비번 설정"]
    },
    "제일": {
      menu: "[서비스 및 설정] → [통장관리] → [스피드조회등록]",
      steps: ["SC제일은행 로그인", "통장관리 메뉴 이동", "스피드조회 서비스 등록", "비밀번호 설정"]
    },
    "새마을": {
      menu: "[개인정보관리] → [즉시조회 계좌관리]",
      steps: ["새마을금고 로그인", "개인정보관리 선택", "즉시조회 계좌 등록", "조회용 비번 설정"]
    },
    "우체국": {
      menu: "[예금간편서비스] → [간편조회계좌등록]",
      steps: ["우체국예금 로그인", "예금간편서비스 이동", "간편조회계좌 등록", "비밀번호 6자리 설정"]
    }
  };

  const banks = Object.keys(bankData);

  const hometaxData = {
    pc: {
      menu: "[세무대리·납세관리] → [나의 세무대리 관리] → [나의 세무대리 수임동의]",
      steps: [
        "홈택스 접속 및 로그인 (공동/금융인증서 또는 간편인증)",
        "상단 [세무대리·납세관리] 메뉴 선택",
        "[나의 세무대리 관리] → [나의 세무대리 수임동의] 클릭",
        "세무대리인 정보 확인 후 [동의] 체크 및 확인"
      ]
    },
    mobile: {
      menu: "[전체메뉴] → [세무대리·납세관리] → [나의 세무대리 관리] → [기장대리 수임동의]",
      steps: [
        "손택스 앱 접속 및 로그인 (공동/금융인증서 등)",
        "하단 [전체메뉴] 버튼 클릭",
        "[세무대리·납세관리] → [나의 세무대리 관리] 선택",
        "[기장대리 수임동의] 클릭 후 내역 확인 및 동의"
      ]
    }
  };

  return (
    <section id="guide" className="py-16 bg-secondary/10">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            거래처 업무 가이드
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            원활한 업무 처리를 위한 필수 등록 가이드입니다.
          </p>
        </div>

        {/* 카테고리 선택 */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-card rounded-xl border border-border shadow-inner overflow-x-auto no-scrollbar">
            <button
              onClick={() => setGuideCategory("bank")}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                guideCategory === "bank"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              은행 빠른조회
            </button>
            <button
              onClick={() => setGuideCategory("hometax")}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                guideCategory === "hometax"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              세무대리 수임동의
            </button>
            <button
              onClick={() => setGuideCategory("loan")}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                guideCategory === "loan"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              대출이자 납입확인서
            </button>
          </div>
        </div>

        {guideCategory === "bank" ? (
          <>
            {/* 은행 선택 탭 (가로 스크롤 가능) */}
            <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar">
              {banks.map((bank) => (
                <button
                  key={bank}
                  onClick={() => setSelectedBank(bank)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 border-2 ${
                    selectedBank === bank
                      ? "bg-primary border-primary text-primary-foreground shadow-lg"
                      : "bg-card border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {bank}은행
                </button>
              ))}
            </div>

            <Card className="overflow-hidden border-2 border-primary/20 shadow-2xl">
              <div className="bg-primary px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold text-primary-foreground flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  {selectedBank}은행 빠른조회 등록 방법
                </h2>
                <span className="hidden sm:inline-block text-xs bg-white/20 text-white px-2 py-1 rounded-full font-mono">
                  BANK GUIDE
                </span>
              </div>
              
              <CardContent className="p-6 sm:p-8 bg-card">
                <div className="mb-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <p className="text-sm font-semibold text-primary mb-1">메뉴 경로:</p>
                  <p className="text-foreground font-medium">{bankData[selectedBank].menu}</p>
                </div>

                <div className="space-y-6">
                  {bankData[selectedBank].steps.map((step, index) => (
                    <div key={index} className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          {index + 1}
                        </div>
                        {index < bankData[selectedBank].steps.length - 1 && (
                          <div className="w-0.5 h-full bg-primary/10 mt-1" />
                        )}
                      </div>
                      <div className="pb-4">
                        <h3 className="font-bold text-foreground text-base sm:text-lg">{step}</h3>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-dashed border-primary/30">
                  <div className="flex items-start gap-3 bg-primary/5 p-4 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-primary">필독:</strong> 등록 후 <strong>계좌번호</strong>와 설정하신 <strong>조회용 비밀번호(6자리)</strong>를 세무사에게 알려주시면 인증서 없이 실시간 장부 정리가 가능합니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : guideCategory === "hometax" ? (
          <>
            {/* 홈택스 기기 선택 */}
            <div className="flex justify-center mb-8 gap-4">
              <button
                onClick={() => setHometaxDevice("pc")}
                className={`flex-1 max-w-[200px] py-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                  hometaxDevice === "pc"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/30"
                }`}
              >
                <Calculator className="w-6 h-6" />
                <span className="font-bold">PC (홈택스)</span>
              </button>
              <button
                onClick={() => setHometaxDevice("mobile")}
                className={`flex-1 max-w-[200px] py-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                  hometaxDevice === "mobile"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/30"
                }`}
              >
                <Calculator className="w-6 h-6 rotate-90" />
                <span className="font-bold">모바일 (손택스)</span>
              </button>
            </div>

            <Card className="overflow-hidden border-2 border-primary/20 shadow-2xl">
              <div className="bg-primary px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold text-primary-foreground flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {hometaxDevice === "pc" ? "홈택스" : "손택스"} 세무대리 수임동의 방법
                </h2>
                <span className="hidden sm:inline-block text-xs bg-white/20 text-white px-2 py-1 rounded-full font-mono">
                  HOMETAX GUIDE
                </span>
              </div>
              
              <CardContent className="p-6 sm:p-8 bg-card">
                <div className="mb-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <p className="text-sm font-semibold text-primary mb-1">메뉴 경로:</p>
                  <p className="text-foreground font-medium">{hometaxData[hometaxDevice].menu}</p>
                </div>

                <div className="space-y-6">
                  {hometaxData[hometaxDevice].steps.map((step, index) => (
                    <div key={index} className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          {index + 1}
                        </div>
                        {index < hometaxData[hometaxDevice].steps.length - 1 && (
                          <div className="w-0.5 h-full bg-primary/10 mt-1" />
                        )}
                      </div>
                      <div className="pb-4">
                        <h3 className="font-bold text-foreground text-base sm:text-lg">{step}</h3>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-dashed border-primary/30">
                  <div className="flex items-start gap-3 bg-primary/5 p-4 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-primary">주의:</strong> 기존에 등록된 세무대리인이 있는 경우, 먼저 <strong>해임</strong> 절차를 진행하신 후 새로운 수임동의가 가능합니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card className="overflow-hidden border-2 border-primary/20 shadow-2xl">
              <div className="bg-primary px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold text-primary-foreground flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  은행별 대출이자 납입확인서 발급 경로
                </h2>
                <span className="hidden sm:inline-block text-xs bg-white/20 text-white px-2 py-1 rounded-full font-mono">
                  LOAN INTEREST GUIDE
                </span>
              </div>
              
              <CardContent className="p-0 bg-card">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-primary/5 text-primary uppercase font-bold border-b border-primary/10">
                      <tr>
                        <th className="px-6 py-4">은행명</th>
                        <th className="px-6 py-4">발급 메뉴 경로 (인터넷뱅킹 기준)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {Object.entries(loanData).map(([bank, path], index) => (
                        <tr key={index} className="hover:bg-primary/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-foreground whitespace-nowrap">{bank}은행</td>
                          <td className="px-6 py-4 text-muted-foreground">{path}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-6 sm:p-8 border-t border-border">
                  <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    공통 발급 및 제출 안내
                  </h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>준비물:</strong> 공동인증서, 금융인증서 또는 간편인증 로그인이 필요합니다.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>기간 설정:</strong> 전년도 1월 1일부터 12월 31일까지 등 필요한 기간을 정확히 설정해 주세요.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>제출 방법:</strong> PDF 파일로 저장하여 이메일로 보내주시거나, 출력 후 팩스로 전달해 주시면 됩니다.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong>주의사항:</strong> 대출이 개인사업자 명의라면 <strong>기업뱅킹</strong>으로 접속해야 조회가 가능할 수 있습니다.</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </>
        )
      }
      </div>
    </section>
  );
}

/* ============================
   추천/후기 섹션
   ============================ */
function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation();

  const testimonials = [
    {
      name: "박현우",
      role: "중소기업 대표",
      content: "김정심 님 덕분에 복잡했던 세무 문제가 깔끔하게 정리되었습니다. 특히 절세 전략이 탁월해서 매년 상당한 금액을 절약하고 있습니다. 항상 빠르고 정확한 업무 처리에 감사드립니다.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "이서연",
      role: "개인사업자",
      content: "상속세 관련해서 막막했는데, 처음부터 끝까지 친절하게 안내해주셔서 큰 도움이 되었습니다. 어려운 세금 문제도 쉽게 설명해주시고, 덕분에 안심하고 맡길 수 있었습니다.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-32">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-12">
          <p className="font-mono text-accent text-sm mb-2">04. Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            고객 후기
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/30 transition-colors"
            >
              <CardContent className="p-8">
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   CTA 섹션
   ============================ */
function CTASection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p className="font-mono text-accent text-sm mb-2">05. Contact</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          의뢰하고 싶다면?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          세무 관련 문의사항이 있으시면 언제든지 연락주세요.
          <br />
          빠르고 정확한 답변으로 도움을 드리겠습니다.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 group"
        >
          <a href="mailto:kyong9144@naver.com">
            <Mail className="mr-2 w-5 h-5" />
            이메일 보내기
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>
    </section>
  );
}

/* ============================
   푸터
   ============================ */
function Footer() {
  const socialLinks = [
    { icon: Mail, href: "mailto:kyong9144@naver.com", label: "이메일" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-mono text-primary font-bold mb-1">{"<김정심 />"}</p>
            <p className="text-sm text-muted-foreground">
              kyong9144@naver.com
            </p>
          </div>

          <div className="flex gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="p-3 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-all duration-200"
                  aria-label={link.label}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} 김정심. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            세무회계를 편하고 쉽게 접근합니다.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ============================
   메인 페이지
   ============================ */
export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <GuideSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
