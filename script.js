const projects = [
{
  name: "Blumli - Positive Affirmations",
  description: "Discover Blumli, your personal space for daily affirmations, self-love, and confidence. With over 100,000 affirmations across 100+ categories, you’ll always find words to inspire and uplift. Start your day with fresh, tailored affirmations to boost motivation, cultivate positivity, and focus on your goals. Personalize themes, schedule notifications, or use the Mirror feature to internalize words of confidence. Blumli is your daily companion for growth, happiness, and becoming your best self.",
  images: ["images/blumli-1.png", "images/blumli-2.png"]
},
  {
    name: "Pianixi - Learn Music Notes",
  description: "Learn to read piano notes quickly and effortlessly with Pianixi. Play interactive games, explore different clefs, and unlock themes to personalize your practice. Build accuracy and confidence while having fun—perfect for beginners and anyone looking to sharpen their skills.",
  images: ["images/pianixi-1.png", "images/pianixi-2.png"]
},
  {
    name: "Project 3",
    description: "Description for Project 3",
    images: ["images/project-1.png"]
  }
];

const projectsContainer = document.getElementById("projects-container");

// Helper: create project slide
function createProjectSlide(project) {
  const projectDiv = document.createElement("div");
  projectDiv.className = "project-slide";

  // Phone container
  const phoneContainer = document.createElement("div");
  phoneContainer.className = "phone-container";

  const img = document.createElement("img");
  img.src = project.images[0];
  img.className = "carousel-image";
  phoneContainer.appendChild(img);

  const frame = document.createElement("img");
  frame.src = "images/phone-frame.png";
  frame.className = "phone-frame";
  phoneContainer.appendChild(frame);

// Left arrow
const prevBtn = document.createElement("button");
prevBtn.className = "arrow left";
const prevIcon = document.createElement("span");
prevIcon.className = "material-icons";
prevIcon.textContent = "arrow_back_ios_new"; // Material icon
prevBtn.appendChild(prevIcon);
phoneContainer.appendChild(prevBtn);

// Right arrow
const nextBtn = document.createElement("button");
nextBtn.className = "arrow right";
const nextIcon = document.createElement("span");
nextIcon.className = "material-icons";
nextIcon.textContent = "arrow_forward_ios"; // Material icon
nextBtn.appendChild(nextIcon);
phoneContainer.appendChild(nextBtn);


  // Prevent image dragging
  img.addEventListener('dragstart', e => e.preventDefault());

  // Inner carousel (phone images)
  let currentImage = 0;
  const showImage = (i) => { img.src = project.images[i]; }
  prevBtn.addEventListener("click", () => {
    currentImage = (currentImage - 1 + project.images.length) % project.images.length;
    showImage(currentImage);
  });
  nextBtn.addEventListener("click", () => {
    currentImage = (currentImage + 1) % project.images.length;
    showImage(currentImage);
  });

  // Project info
  const projectInfo = document.createElement("div");
  projectInfo.className = "project-info";
  const title = document.createElement("h2");
  title.textContent = project.name;
  const desc = document.createElement("p");
  desc.textContent = project.description;
  projectInfo.appendChild(title);
  projectInfo.appendChild(desc);

  projectDiv.appendChild(phoneContainer);
  projectDiv.appendChild(projectInfo);

  return projectDiv;
}

// --- Create slides with clones for infinite looping ---
projects.forEach(project => projectsContainer.appendChild(createProjectSlide(project)));

const slides = Array.from(projectsContainer.children);
const firstClone = createProjectSlide(projects[0]);
const lastClone = createProjectSlide(projects[projects.length - 1]);

projectsContainer.appendChild(firstClone);
projectsContainer.prepend(lastClone);

let currentProject = 1; // start at first real slide
const totalProjects = slides.length;

// --- Carousel update ---
function updateProjectCarousel(noTransition = false) {
  const slideWidth = projectsContainer.children[0].getBoundingClientRect().width;
  if (noTransition) projectsContainer.style.transition = 'none';
  else projectsContainer.style.transition = 'transform 0.5s ease-in-out';
  projectsContainer.style.transform = `translateX(-${currentProject * slideWidth}px)`;
}

// --- Outer arrows ---
document.getElementById("next-project").addEventListener("click", () => {
  currentProject++;
  updateProjectCarousel();
});

document.getElementById("prev-project").addEventListener("click", () => {
  currentProject--;
  updateProjectCarousel();
});

// --- After transition, handle clone jump ---
projectsContainer.addEventListener('transitionend', () => {
  const children = projectsContainer.children;
  if (children[currentProject] === firstClone) currentProject = 1;
  if (children[currentProject] === lastClone) currentProject = totalProjects;
  updateProjectCarousel(true);
});

// --- Swipe/drag support ---
let startX = 0;
let isDragging = false;

const pointerDown = (e) => {
  startX = e.clientX || e.touches[0].clientX;
  isDragging = true;
};

const pointerMove = (e) => {
  if (!isDragging) return;
  const currentX = e.clientX || e.touches[0].clientX;
  const dx = currentX - startX;
  const slideWidth = projectsContainer.children[0].getBoundingClientRect().width;
  projectsContainer.style.transition = 'none';
  projectsContainer.style.transform = `translateX(${-currentProject * slideWidth + dx}px)`;
};

const pointerUp = (e) => {
  if (!isDragging) return;
  const endX = e.clientX || (e.changedTouches ? e.changedTouches[0].clientX : startX);
  const dx = endX - startX;
  const threshold = 50;
  if (dx < -threshold) currentProject++;
  if (dx > threshold) currentProject--;
  updateProjectCarousel();
  isDragging = false;
};

projectsContainer.addEventListener('mousedown', pointerDown);
projectsContainer.addEventListener('mousemove', pointerMove);
projectsContainer.addEventListener('mouseup', pointerUp);
projectsContainer.addEventListener('mouseleave', pointerUp);

projectsContainer.addEventListener('touchstart', pointerDown);
projectsContainer.addEventListener('touchmove', pointerMove);
projectsContainer.addEventListener('touchend', pointerUp);
projectsContainer.addEventListener('touchcancel', pointerUp);

// Handle window resize
window.addEventListener('resize', () => updateProjectCarousel(true));

// Initial render
updateProjectCarousel(true);
