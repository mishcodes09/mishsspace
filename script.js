/* ============================================================
   mishsspace — script.js
   ============================================================ */

// ── Mobile nav ───────────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
const closeMenuBtn = document.getElementById("closeMenu");

function openMobileNav() {
  hamburger.classList.add("active");
  hamburger.setAttribute("aria-expanded", "true");
  mobileNav.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMobileNav() {
  hamburger.classList.remove("active");
  hamburger.setAttribute("aria-expanded", "false");
  mobileNav.classList.remove("active");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", openMobileNav);
closeMenuBtn.addEventListener("click", closeMobileNav);

// Close on backdrop click
mobileNav.addEventListener("click", (e) => {
  if (e.target === mobileNav) closeMobileNav();
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileNav.classList.contains("active"))
    closeMobileNav();
});

// Keyboard support for hamburger (Enter / Space)
hamburger.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openMobileNav();
  }
});

// ── Smooth scroll ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
    }
  });
});
// ── Project data ─────────────────────────────────────────────
const projects = [
  {
    id: 2,
    title: "IBM-RevenueX",
    category: "fullstack",
    description:
      "AI-powered sales and revenue automation agent with predictive analytics.",
    image: "images/4.png",
    tech: ["React", "Firebase", "AI"],
    liveUrl: "https://ibm-revenuex-frontend.onrender.com/",
    githubUrl: "https://github.com/mishcodes09/IBM-RevenueX",
    status: "live",
  },
  {
    id: 3,
    title: "Madolo Innovative Construction",
    category: "fullstack",
    description:
      "Full-stack marketing site for Madolo Construction — Next.js 15, and WhatsApp",
    image: "images/1.png",
    tech: ["Next.js", "React", "TailwindCSS", "WhatsApp"],
    liveUrl: "https://www.madolo.org.za/",
    githubUrl: "https://github.com/mishcodes09/madolo-construction.git",
    status: "live",
  },
  {
    id: 6,
    title: "Mzongwana ",
    category: "Frontend",
    description:
      "Non Profit organization website built with Framer, showcasing their mission and initiatives.",
    image: "images/2.png",
    tech: ["Framer"],
    liveUrl: "https://mzongwana.org/",
    githubUrl: null,
    status: "live",
  },

  {
    id: 6,
    title: "Algoa Bus Redesign",
    category: "fullstack",
    description:
      "Redesign & Development of Algoa Bus website, enhancing user experience and functionality.",
    image: "images/3.png",
    tech: ["Vue", "TailwindCSS"],
    liveUrl: "https://sidepr.netlify.app/",
    githubUrl: "https://github.com/mishcodes09/algoabus.git",
    status: "live",
  },
];

// ── Projects render ─────────────────────────────────────────
const projectsGrid = document.getElementById("projectsGrid");

function renderProjects() {
  projectsGrid.innerHTML = projects
    .map((project, index) => {
      const liveLinkHtml = project.liveUrl
        ? `<a href="${project.liveUrl}" target="_blank" rel="noopener" class="project-link primary">Live Site</a>`
        : `<span class="project-link disabled">Coming Soon</span>`;

      const githubLinkHtml = project.githubUrl
        ? `<a href="${project.githubUrl}" target="_blank" rel="noopener" class="project-link secondary">GitHub</a>`
        : `<span class="project-link disabled">Private</span>`;

      const isLast = index === projects.length - 1;
      const spanClass = projects.length % 2 !== 0 && isLast ? " span-2" : "";

      return `
      <article class="showcase-card reveal${spanClass}" data-category="${project.category}" role="listitem"
               style="transition-delay: ${index * 0.08}s">
        <img src="${project.image}" alt="${project.title}" loading="lazy" />
        <span class="status-badge ${project.status}">${project.status.replace("-", " ")}</span>
        <div class="showcase-caption">
          <p class="showcase-category">${project.category}</p>
          <h3 class="showcase-name">${project.title}</h3>
          <p class="showcase-desc">${project.description}</p>
          <div class="tech-stack">
            ${project.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
          </div>
          <div class="showcase-links">
            ${liveLinkHtml}
            ${githubLinkHtml}
          </div>
        </div>
      </article>`;
    })
    .join("");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  document.querySelectorAll(".showcase-card.reveal").forEach((card) => {
    revealObserver.observe(card);
  });
}

renderProjects();

// ── Image tooltip ─────────────────────────────────────────────
const tooltip = document.getElementById("hover-tooltip");

document.querySelectorAll(".about-images img").forEach((img) => {
  img.addEventListener("mousemove", (e) => {
    tooltip.textContent = img.dataset.tooltip;
    tooltip.style.left = `${e.pageX}px`;
    tooltip.style.top = `${e.pageY}px`;
    tooltip.style.opacity = "1";
  });
  img.addEventListener("mouseleave", () => {
    tooltip.style.opacity = "0";
  });
});

// ── Dark mode toggle ──────────────────────────────────────────
const themeToggle = document.getElementById("theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme");

function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  themeToggle.innerHTML = dark
    ? '<i class="fas fa-sun" aria-hidden="true"></i>'
    : '<i class="fas fa-moon" aria-hidden="true"></i>';
  themeToggle.setAttribute(
    "aria-label",
    dark ? "Switch to light mode" : "Switch to dark mode",
  );
}

applyTheme(savedTheme === "dark" || (!savedTheme && prefersDark));

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "light" : "dark");
  applyTheme(!isDark);
});
