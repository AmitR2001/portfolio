const GITHUB_USERNAME = "AmitR2001";
const MAX_PROJECTS = 6;

// Prioritize repositories that best represent the resume and practical work.
const prioritizedRepos = [
  "Question_Paper_Analyzer_Generator_App_V2",
  "NFC-Care-Tag",
  "society-management",
  "hospital-management-app-NFC"
];

const projectDetails = {
  Question_Paper_Analyzer_Generator_App_V2: {
    title: "AI-Based Question Paper Analyzer & Generator",
    description: "AI-assisted web application for analyzing and generating academic question papers.",
    problemStatement:
      "Teachers often spend a lot of time manually analyzing question papers for difficulty level, syllabus coverage, and Bloom's taxonomy. Creating new, balanced question papers is also repetitive and time-consuming.",
    useCase:
      "I Developed an AI-powered solution that enables educators to upload question papers and automatically analyze them for difficulty, Bloom’s taxonomy classification, and syllabus coverage. The system also generates new assessment content such as MCQs, assignments, and case-based questions based on the analysis. This helps reduce manual effort, improves question quality, and ensures standardized evaluation across assessments."
  },
  "NFC-Care-Tag": {
    title: "NFC Care Tag",
    description:
      "Web application that enables quick patient information access through NFC tags.",
    problemStatement:
      "In emergency situations, first responders often do not have immediate access to a patient's medical history, allergies, or emergency contacts. This delay can affect treatment decisions and patient safety.",
    useCase:
      "I built the NFC Care Tag system to allow instant access to critical patient information during emergencies. Each patient gets an NFC tag with a unique ID linked to their medical profile. When staff scan the tag with an NFC-enabled device, they can immediately view medical history, allergies, and emergency contacts. This supports faster, better-informed treatment and improves hospital admission flow."
  },
  "society-management": {
    title: "Society Management System",
    description:
      "MERN-based application for residential society operations and administration.",
    useCase:
      "Centralizes billing, complaints, amenities, and member management in a single workflow."
  },
  "hospital-management-app-NFC": {
    title: "Hospital Management App (NFC)",
    description:
      "Hospital management application with NFC-enabled emergency mode and patient admission.",
    useCase:
      "Improves admission speed by linking patient data access to NFC scanning in emergency scenarios."
  }
};

const fallbackProjects = [
  {
    name: "Question_Paper_Analyzer_Generator_App_V2",
    html_url: "https://github.com/AmitR2001/Question_Paper_Analyzer_Generator_App_V2",
    language: "JavaScript",
    technologies: ["React", "Python", "Flask", "Node.js", "MongoDB", "PyMuPDF", "Gemini API"]
  },
  {
    name: "NFC-Care-Tag",
    html_url: "https://github.com/AmitR2001/NFC-Care-Tag",
    language: "JavaScript",
    technologies: ["HTML", "CSS", "JavaScript", "SQLite", "Web NFC API", "Node.js", "Express.js"]
  },
  {
    name: "society-management",
    html_url: "https://github.com/AmitR2001/society-management",
    language: "JavaScript",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Bootstrap"]
  },
  {
    name: "hospital-management-app-NFC",
    html_url: "https://github.com/AmitR2001/hospital-management-app-NFC",
    language: "JavaScript",
    technologies: ["HTML", "CSS", "JavaScript", "SQLite", "Node.js", "Express.js", "NFC"]
  }
];

function updateYear() {
  const yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear().toString();
  }
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function fetchLanguages(languagesUrl) {
  try {
    const response = await fetch(languagesUrl);
    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return Object.keys(data).slice(0, 5);
  } catch (error) {
    return [];
  }
}

function buildProjectCard(repo, languages) {
  const fallbackTitle = repo.name.replaceAll("-", " ");
  const details = projectDetails[repo.name] || {};
  const title = details.title || fallbackTitle;
  const shortDescription = details.description || repo.description || "Repository project.";
  const problemStatement = details.problemStatement || "See repository for problem context.";
  const useCase = details.useCase || "See repository for details.";

  let technologies = [];
  if (languages.length > 0) {
    technologies = languages;
  } else if (Array.isArray(repo.technologies) && repo.technologies.length > 0) {
    technologies = repo.technologies;
  } else if (repo.language) {
    technologies = [repo.language];
  }

  const techText = technologies.length > 0 ? technologies.join(", ") : "Not specified";

  return `
    <article class="project-card">
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(shortDescription)}</p>
      <p class="project-tech"><strong>Technologies:</strong> ${escapeHtml(techText)}</p>
      <p><strong>Problem Statement:</strong> ${escapeHtml(problemStatement)}</p>
      <p><strong>Use Case:</strong> ${escapeHtml(useCase)}</p>
      <a class="project-link" href="${escapeHtml(repo.html_url || `https://github.com/${GITHUB_USERNAME}`)}" target="_blank" rel="noopener noreferrer">View on GitHub</a>
    </article>
  `;
}

function renderFallbackProjects(grid) {
  const fallbackMap = new Map(fallbackProjects.map((project) => [project.name, project]));
  const selectedFallback = prioritizedRepos
    .map((name) => fallbackMap.get(name))
    .filter(Boolean)
    .slice(0, MAX_PROJECTS);

  const cards = selectedFallback.map((project) => buildProjectCard(project, []));
  if (cards.length > 0) {
    grid.innerHTML = cards.join("\n");
    return;
  }

  grid.innerHTML = "<p>Projects are temporarily unavailable.</p>";
}

async function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) {
    return;
  }

  grid.innerHTML = "<p>Loading projects from GitHub...</p>";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const endpoint = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;
    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/vnd.github+json"
      },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error("Could not fetch repositories.");
    }

    const repos = await response.json();
    const selected = [];

    for (const name of prioritizedRepos) {
      const matched = repos.find((repo) => repo.name === name);
      if (matched) {
        selected.push(matched);
      }
      if (selected.length === MAX_PROJECTS) {
        break;
      }
    }

    if (selected.length === 0) {
      selected.push(...repos.slice(0, Math.min(MAX_PROJECTS, repos.length)));
    }

    const cards = [];
    for (const repo of selected) {
      const languages = await fetchLanguages(repo.languages_url);
      cards.push(buildProjectCard(repo, languages));
    }

    grid.innerHTML = cards.join("\n");
  } catch (error) {
    renderFallbackProjects(grid);
  }
}

updateYear();
renderProjects();
