/* ---------------------------------------------------
   1. Your content lives here.
   Add a new project or club writeup by adding an object
   to one of these lists — no HTML editing required.

   `pdf` should be a path to a file inside the /pdfs folder.
   Leave `pdf` as "" (empty string) for a card that only
   links out, with no inline viewer.
--------------------------------------------------- */
const PROJECTS = [
  {
    title: "Project title one",
    description: "One or two sentences on what this project is and what you did.",
    tags: ["Python", "Machine Learning"],
    pdf: "pdfs/project-one.pdf",
    link: "" // optional external link, e.g. a GitHub repo
  },
  {
    title: "Project title two",
    description: "One or two sentences on what this project is and what you did.",
    tags: ["Research"],
    pdf: "pdfs/project-two.pdf",
    link: ""
  },
  {
    title: "Project title three",
    description: "One or two sentences on what this project is and what you did.",
    tags: ["CAD", "Hardware"],
    pdf: "",
    link: "https://github.com/yourusername/some-repo"
  }
];

const BALLOON_DOCS = [
  {
    title: "Mission writeup",
    description: "Post-flight report: payload design, flight data, and recovery notes.",
    tags: ["Flight report"],
    pdf: "pdfs/balloon-mission-report.pdf",
    link: ""
  }
];

/* ---------------------------------------------------
   2. Card rendering
--------------------------------------------------- */
function renderCards(list, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  list.forEach((item, i) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const tagsHtml = (item.tags || [])
      .map((t) => `<span>${t}</span>`)
      .join("");

    let actionsHtml = "";
    if (item.pdf) {
      actionsHtml += `<button class="card-btn" data-pdf="${item.pdf}" data-title="${item.title}">Read PDF</button>`;
    }
    if (item.link) {
      actionsHtml += `<a class="card-btn card-btn-ghost" href="${item.link}" target="_blank" rel="noopener">View link</a>`;
    }

    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="project-tags">${tagsHtml}</div>
      <div class="project-card-actions">${actionsHtml}</div>
    `;

    container.appendChild(card);
  });
}

renderCards(PROJECTS, "projectGrid");
renderCards(BALLOON_DOCS, "balloonGrid");

/* ---------------------------------------------------
   3. PDF viewer overlay
--------------------------------------------------- */
const overlay = document.getElementById("pdfOverlay");
const pdfFrame = document.getElementById("pdfFrame");
const pdfTitle = document.getElementById("pdfOverlayTitle");
const pdfOpenLink = document.getElementById("pdfOverlayOpen");
const pdfClose = document.getElementById("pdfOverlayClose");

function openPdf(path, title) {
  pdfFrame.src = path;
  pdfTitle.textContent = title || "Document";
  pdfOpenLink.href = path;
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
}

function closePdf() {
  overlay.hidden = true;
  pdfFrame.src = "";
  document.body.style.overflow = "";
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-pdf]");
  if (btn) {
    openPdf(btn.dataset.pdf, btn.dataset.title);
  }
});

pdfClose.addEventListener("click", closePdf);

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closePdf();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !overlay.hidden) closePdf();
});

/* ---------------------------------------------------
   4. Mobile sidebar toggle
--------------------------------------------------- */
const sidebar = document.getElementById("sidebar");
const navToggle = document.getElementById("navToggle");

navToggle.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ---------------------------------------------------
   5. Highlight active section link while scrolling
--------------------------------------------------- */
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.dataset.section === id);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
);

sections.forEach((section) => observer.observe(section));
