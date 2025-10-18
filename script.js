const projectFiles = [
  "projects/blumli/index.html",
  "projects/pianixi/index.html",
  "projects/project3/index.html"
];

const container = document.getElementById("projects-container");
let currentIndex = 0;
let iframe;

// Load project with fade transition
function loadProject(index, fade = true) {
  if (!fade) {
    renderProject(index);
    return;
  }

  // Fade out
  container.style.opacity = "0";
  setTimeout(() => {
    renderProject(index);
    // Fade in
    setTimeout(() => {
      container.style.opacity = "1";
    }, 50);
  }, 400); // matches CSS transition
}

// Render iframe content
function renderProject(index) {
  container.innerHTML = "";
  iframe = document.createElement("iframe");
  iframe.src = projectFiles[index];
  iframe.style.width = "100vw";
  iframe.style.height = "100vh";
  iframe.style.border = "none";
  iframe.loading = "lazy";
  container.appendChild(iframe);
}

// Navigation
document.getElementById("next-project").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % projectFiles.length;
  loadProject(currentIndex);
});

document.getElementById("prev-project").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + projectFiles.length) % projectFiles.length;
  loadProject(currentIndex);
});

// Initial render
renderProject(currentIndex);
