// Home Page Content - Hero, About, Work, Articles, Contact sections
export const HOME_CONTENT = {
  // Hero Section
  hero: {
    greeting: "Hello, I'm",
    name: "Taopik Hidayat",
  },

  // About Section
  about: {
    title: "About",
    content: [
      "I'm a developer exploring the evolving landscape of AI and Web3 technologies. My journey involves continuous learning and experimentation, always seeking to understand how these tools can create meaningful solutions.",
      "I approach technology with curiosity and humility, recognizing that the field is constantly evolving. When I'm not coding, you'll find me sketching ideas, exploring new concepts, or enjoying a thoughtful cup of coffee while pondering the next challenge."
    ]
  },

  // Work/Projects Section
  work: {
    title: "Work",
    content: "I'm building projects that reflect my curiosity about technology and its potential to create meaningful change. Each piece represents a step in my learning journey, an experiment in thoughtful development, and an effort to contribute solutions that matter.",
    linkText: "VIEW PROJECTS",
    linkHref: "/projects"
  },

  // Articles Section
  articles: {
    title: "Articles",
    content: "Here I share thoughts and learnings from my journey with technology and creativity. These writings reflect my ongoing exploration of ideas, from practical tutorials to reflections on how technology shapes our world and influences human creativity.",
    linkText: "VIEW ARTICLES",
    linkHref: "/articles"
  },

  // Contact Section
  contact: {
    title: "Contact",
    content: "Have an idea or want to connect? I'd love to hear from you and explore how we might collaborate on something meaningful. Whether it's technology, creativity, or just sharing perspectives on the world we're shaping together.",
    linkText: "VIEW CONTACT",
    linkHref: "/contact"
  }
} as const;
