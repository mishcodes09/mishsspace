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
    image: "images/revenue.png",
    tech: ["React", "Firebase", "AI"],
    liveUrl: "https://ibm-revenuex-frontend.onrender.com/",
    githubUrl: "https://github.com/mishcodes09/IBM-RevenueX",
    status: "live",
  },
  {
    id: 3,
    title: "Edna Mode",
    category: "design",
    description:
      "A tribute to Edna Mode from The Incredibles. Stylish portfolio website.",
    image: "images/design.png",
    tech: ["HTML", "CSS", "Figma"],
    liveUrl: "https://mishcodes09.github.io/SheCodes-Challange/",
    githubUrl: "https://github.com/mishcodes09/SheCodes-Challange",
    status: "live",
  },
  {
    id: 6,
    title: "Videographer Portfolio",
    category: "design",
    description:
      "Personal portfolio with dark mode and smooth scroll animations.",
    image: "images/mwadi.png",
    tech: ["Framer"],
    liveUrl: "https://mwadi-portfolio.framer.media/",
    githubUrl: null,
    status: "live",
  },
];

// ── Projects render + filter ──────────────────────────────────
const projectsGrid = document.getElementById("projectsGrid");
const filterBtns = document.querySelectorAll(".filter-btn");
const emptyState = document.getElementById("emptyState");

function renderProjects(filter = "all") {
  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  if (filtered.length === 0) {
    projectsGrid.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  projectsGrid.innerHTML = filtered
    .map((project, index) => {
      const overlayHtml =
        project.status !== "coming-soon"
          ? `<div class="project-overlay">
           <a href="${project.liveUrl}" target="_blank" rel="noopener" class="overlay-btn" title="View live">
             <i class="fas fa-external-link-alt"></i>
           </a>
           <a href="${project.githubUrl}" target="_blank" rel="noopener" class="overlay-btn" title="View code">
             <i class="fab fa-github"></i>
           </a>
         </div>`
          : "";

      const liveLinkHtml = project.liveUrl
        ? `<a href="${project.liveUrl}" target="_blank" rel="noopener" class="project-link primary">Live Site</a>`
        : `<span class="project-link disabled">Coming Soon</span>`;

      const githubLinkHtml = project.githubUrl
        ? `<a href="${project.githubUrl}" target="_blank" rel="noopener" class="project-link secondary">GitHub</a>`
        : `<span class="project-link disabled">Private</span>`;

      return `
      <article class="project-card" data-category="${project.category}" role="listitem"
               style="animation-delay: ${index * 0.05}s">
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}" loading="lazy" />
          ${overlayHtml}
          <span class="status-badge ${project.status}">${project.status.replace("-", " ")}</span>
        </div>
        <p class="project-category">${project.category}</p>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="tech-stack">
          ${project.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
        </div>
        <div class="project-links">
          ${liveLinkHtml}
          ${githubLinkHtml}
        </div>
      </article>`;
    })
    .join("");
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
});

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
