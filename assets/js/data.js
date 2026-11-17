/**
 * Pratibha Dwivedi - Minimal & Professional Portfolio Data Store
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Pratibha Dwivedi",
    role: "MERN Full Stack Developer",
    typedTitles: [
      "MERN Full Stack Developer",
      "React.js Frontend Engineer",
      "Node.js & Express API Developer",
      "MongoDB Database Architect"
    ],
    avatar: "assets/images/pratibha.jpg",
    phone: "+91 91299 37416",
    phoneRaw: "919129937416",
    email: "dwivedipratibhaamethi@gmail.com",
    location: "Amethi, UP, India",
    resumeUrl: "Pratibha_Dwivedi_Resume.pdf",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    whatsappUrl: "https://wa.me/919129937416",
    shortBio: "MERN Full Stack Developer crafting responsive, database-driven web applications with React, Node.js, Express, and MongoDB. Currently Full Stack Intern at Digicoders.",
    highlights: [
      { icon: "zap", title: "Modern React UI", desc: "Component architecture, hooks, Tailwind CSS" },
      { icon: "server", title: "RESTful APIs", desc: "Node.js, Express, JWT auth & middleware" },
      { icon: "database", title: "MongoDB Modeling", desc: "Schema design, Mongoose & aggregation" }
    ]
  },

  stats: [
    { value: "4+", label: "Featured Projects" },
    { value: "MERN", label: "Core Stack" },
    { value: "2", label: "Industry Experiences" },
    { value: "100%", label: "Responsive UI" }
  ],

  skills: [
    // Languages
    { name: "JavaScript (ES6+)", category: "languages", icon: "js" },
    { name: "HTML5", category: "languages", icon: "html" },
    { name: "CSS3", category: "languages", icon: "css" },

    // Frontend
    { name: "React.js", category: "frontend", icon: "react" },
    { name: "Tailwind CSS", category: "frontend", icon: "tailwind" },
    { name: "Bootstrap", category: "frontend", icon: "bootstrap" },
    { name: "Responsive UI", category: "frontend", icon: "mobile" },

    // Backend
    { name: "Node.js", category: "backend", icon: "node" },
    { name: "Express.js", category: "backend", icon: "express" },
    { name: "REST APIs", category: "backend", icon: "api" },
    { name: "JWT Auth", category: "backend", icon: "shield" },

    // Database
    { name: "MongoDB", category: "database", icon: "mongodb" },
    { name: "Mongoose ODM", category: "database", icon: "database" },

    // Tools
    { name: "Git & GitHub", category: "tools", icon: "git" },
    { name: "Postman", category: "tools", icon: "send" },
    { name: "VS Code", category: "tools", icon: "code" },
    { name: "Vercel & Render", category: "tools", icon: "cloud" }
  ],

  projects: [
    {
      id: "pd-shop-market",
      title: "PD Shop Market",
      subtitle: "Full-Stack E-commerce Platform",
      category: "mern",
      image: "assets/images/ecommerce.jpg",
      tagline: "End-to-end shopping platform with full Admin CRUD management",
      shortDescription: "Complete e-commerce application with product catalogs, category filters, shopping cart, and a dedicated admin dashboard for full product/category CRUD operations.",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      highlights: [
        "Product catalog with real-time category filtering and search",
        "Dedicated Admin Panel for full Product & Category CRUD",
        "Secure RESTful APIs built with Express.js and Node.js",
        "Persistent MongoDB database schemas via Mongoose"
      ],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "erp-management-system",
      title: "ERP Management System",
      subtitle: "Institute Management Platform",
      category: "management",
      image: "assets/images/erp.jpg",
      tagline: "Centralized academic administration for courses, students, and records",
      shortDescription: "Developed an institute management platform to manage courses, students, and institutional data using React.js, structured JSON flows, and authenticated REST APIs.",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
      highlights: [
        "Comprehensive student & course management with search",
        "Secure REST APIs with authentication and role access",
        "Reusable modular React components with form validation",
        "Optimized data querying with MongoDB Atlas"
      ],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "shripra-tiffin",
      title: "SHRIPRA Tiffin Service",
      subtitle: "Food & Meal Ordering App",
      category: "mern",
      image: "assets/images/food.jpg",
      tagline: "Meal ordering platform with live cart controls and order tracking",
      shortDescription: "A modern food & tiffin ordering application with meal discovery, smart cart with live quantity controls, streamlined checkout, order tracking, and user profiles.",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "CSS3"],
      highlights: [
        "Daily meal menus with search and dietary categorization",
        "Interactive cart with dynamic quantity increment/decrement",
        "Simple checkout flow with address & delivery preferences",
        "Real-time order tracking dashboard from kitchen to dispatch"
      ],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: "jalmitra",
      title: "JalMitra",
      subtitle: "Water Supply Management Platform",
      category: "management",
      image: "assets/images/water.jpg",
      tagline: "Dual-sided platform coordinating clean water distribution",
      shortDescription: "Engineered dual-interface software for consumers and water suppliers featuring real-time inventory tracking, water tanker order placement, payment flow, and delivery status.",
      techStack: ["MERN Stack", "React.js", "Node.js", "Express.js", "MongoDB"],
      highlights: [
        "Separate dedicated interfaces for consumers and suppliers",
        "Live supplier inventory control and delivery scheduling",
        "Consumer ordering flow with volume and slot selection",
        "Transparent payment workflow and delivery fulfillment"
      ],
      liveUrl: "#",
      githubUrl: "#"
    }
  ],

  experiences: [
    {
      role: "Full Stack Intern",
      company: "Digicoders",
      period: "Apr 2026 – Present",
      badge: "Current Role",
      bullets: [
        "Build and maintain full-stack features on live projects using the MERN stack.",
        "Design responsive React interfaces, build REST APIs with MongoDB, and debug and deploy on Vercel and Render."
      ],
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"]
    },
    {
      role: "Trainee (45 Days)",
      company: "Hindustan Aeronautics Limited (H.A.L)",
      period: "May 2025",
      badge: "Industrial Training",
      bullets: [
        "Developed an AMC Complaint Management System using modern web technologies and REST API integration.",
        "Streamlined ticket logging and department resolution workflows."
      ],
      tech: ["JavaScript", "REST APIs", "Web Tech", "Database Integration"]
    }
  ],

  education: [
    {
      degree: "Bachelor of Computer Application (BCA)",
      institution: "Rajarshi Rananjay Post Graduate College",
      location: "Amethi, UP",
      period: "2023 – 2026"
    },
    {
      degree: "Advanced Diploma in Computer Application (ADCA)",
      institution: "Indian Institute of Computer Science Management",
      location: "Amethi, UP",
      period: "2023 – 2024"
    }
  ],

  certifications: [
    {
      title: "Summer Training Certificate",
      issuer: "Hindustan Aeronautics Limited (H.A.L)",
      period: "May 2025"
    },
    {
      title: "Technical Certificate in JavaScript",
      issuer: "Great Learning",
      period: "Verified"
    }
  ]
};

if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
