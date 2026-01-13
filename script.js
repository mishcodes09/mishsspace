// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
const closeMenu = document.getElementById("closeMenu");
const body = document.body;

function openMobileNav() {
  hamburger.classList.add("active");
  mobileNav.classList.add("active");
  body.style.overflow = "hidden"; // Prevent scrolling when menu is open
}

function closeMobileNav() {
  hamburger.classList.remove("active");
  mobileNav.classList.remove("active");
  body.style.overflow = ""; // Restore scrolling
}

// Event Listeners
hamburger.addEventListener("click", openMobileNav);
closeMenu.addEventListener("click", closeMobileNav);

// Close menu when clicking outside content
mobileNav.addEventListener("click", function (e) {
  if (e.target === mobileNav) {
    closeMobileNav();
  }
});

// Close menu with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && mobileNav.classList.contains("active")) {
    closeMobileNav();
  }
});

// Close menu when clicking on mobile nav links
document.querySelectorAll(".mobile-nav-links a").forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

const tooltip = document.getElementById("hover-tooltip");
const images = document.querySelectorAll(".about-images img");

images.forEach((img) => {
  img.addEventListener("mousemove", (e) => {
    tooltip.innerText = img.dataset.tooltip; // get text from data-tooltip
    tooltip.style.left = `${e.pageX}px`;
    tooltip.style.top = `${e.pageY}px`;
    tooltip.style.opacity = 1;
  });

  img.addEventListener("mouseleave", () => {
    tooltip.style.opacity = 0;
  });
});

// Education Timeline Interaction
const timelineYears = document.querySelectorAll(".timeline-year");
const educationContent = document.getElementById("education-content");

// Education data - matches your screenshot
const educationData = {
  2025: {
    degree: "Bsc Computer & Information Science",
    school: "Varsity College",
    dates: "2023 - 2025",
  },
  2024: {
    degree: "Bsc Computer & Information Science",
    school: "Varsity College",
    dates: "2023 - 2025",
  },
  2023: {
    degree: "Bsc Computer & Information Science",
    school: "Varsity College",
    dates: "2023 - 2025",
  },
  2022: {
    degree: "HCert Web & Application Development",
    school: "Varsity College",
    dates: "2022",
  },
  2021: {
    degree: "",
    school: "",
    dates: "",
  },
  2020: {
    degree: "High School",
    school: "Beaconhurst High",
    dates: "2016 - 2020",
  },
};

// Function to update education content
function updateEducationContent(year) {
  const data = educationData[year];

  if (data.degree) {
    educationContent.innerHTML = `
            <div class="education-item">
                <div class="education-degree">${data.degree}</div>
                <div class="education-school">${data.school}</div>
                <div class="education-dates">${data.dates}</div>
            </div>
        `;
  } else {
    educationContent.innerHTML = `
            <div class="education-item">
                <div class="education-school">I took a gap year</div>
            </div>
        `;
  }
}

// Set default active year (2025)
let activeYear = "2025";
timelineYears[0].classList.add("active");

// Add click events to timeline years
timelineYears.forEach((yearElement, index) => {
  yearElement.addEventListener("click", () => {
    const year = yearElement.getAttribute("data-year");

    // Remove active class from all years
    timelineYears.forEach((y) => y.classList.remove("active"));

    // Add active class to clicked year
    yearElement.classList.add("active");

    // Update content
    updateEducationContent(year);
    activeYear = year;
  });
});

// Initialize with 2025 data
updateEducationContent(activeYear);

const slides = document.querySelectorAll(".slide");

slides.forEach((slide) => {
  slide.addEventListener("click", () => {
    removeCurrentActives();
    slide.classList.add("active");
  });
});

function removeCurrentActives() {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
}

// Skills Section JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".skills-filter-btn");
  const skillCategories = document.querySelectorAll(".skill-category-custom");

  // Filter functionality
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      // Show/hide categories based on filter
      skillCategories.forEach((category) => {
        const categoryType = category.getAttribute("data-category");

        // Add fade-in animation
        category.style.opacity = "0";
        category.style.transform = "translateY(10px)";

        setTimeout(() => {
          if (filterValue === "all" || categoryType === filterValue) {
            category.style.display = "block";

            // Trigger reflow for animation
            void category.offsetWidth;

            // Apply fade-in effect
            category.style.opacity = "1";
            category.style.transform = "translateY(0)";
            category.style.transition =
              "opacity 0.5s ease, transform 0.5s ease";
          } else {
            category.style.display = "none";
          }
        }, 150);
      });
    });
  });

  // Add hover effect to skill items
  const skillItems = document.querySelectorAll(".skill-item-custom");
  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "rgba(255, 153, 0, 0.05)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "transparent";
    });
  });

  // Add a subtle animation to the page load
  const skillCategoriesArray = Array.from(skillCategories);
  skillCategoriesArray.forEach((category, index) => {
    setTimeout(() => {
      category.style.opacity = "1";
      category.style.transform = "translateY(0)";
    }, 100 * index);
  });

  // Add navigation link for skills section
  const desktopNav = document.querySelector(".desktop-nav");
  const mobileNavLinks = document.querySelector(".mobile-nav-links");

  // Add Skills link to desktop navigation
  const desktopSkillsItem = document.createElement("li");
  const desktopSkillsLink = document.createElement("a");
  desktopSkillsLink.href = "#skills";
  desktopSkillsLink.textContent = "Skills";
  desktopSkillsItem.appendChild(desktopSkillsLink);

  // Insert Skills link after Projects in desktop nav
  const desktopNavItems = Array.from(desktopNav.children);
  const projectsIndex = Array.from(desktopNavItems).findIndex(
    (item) =>
      item.querySelector("a") &&
      item.querySelector("a").textContent === "Projects"
  );

  if (projectsIndex !== -1) {
    desktopNav.insertBefore(
      desktopSkillsItem,
      desktopNav.children[projectsIndex + 1]
    );
  }

  // Add Skills link to mobile navigation
  const mobileSkillsItem = document.createElement("li");
  const mobileSkillsLink = document.createElement("a");
  mobileSkillsLink.href = "#skills";
  mobileSkillsLink.textContent = "Skills";
  mobileSkillsLink.onclick = function () {
    closeMobileNav();
  };
  mobileSkillsItem.appendChild(mobileSkillsLink);

  // Insert Skills link after Projects in mobile nav
  const mobileNavItems = Array.from(mobileNavLinks.children);
  const mobileProjectsIndex = Array.from(mobileNavItems).findIndex(
    (item) =>
      item.querySelector("a") &&
      item.querySelector("a").textContent === "Projects"
  );

  if (mobileProjectsIndex !== -1) {
    mobileNavLinks.insertBefore(
      mobileSkillsItem,
      mobileNavLinks.children[mobileProjectsIndex + 1]
    );
    // Reapply animation delays
    Array.from(mobileNavLinks.children).forEach((item, index) => {
      item.style.animationDelay = `${0.1 * (index + 1)}s`;
    });
  }
});
