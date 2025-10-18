const projects = [
  {
    name: "Project 1",
    description: "This is the description for Project 1.",
    images: ["images/blumli-1.png", "images/blumli-2.png", "images/blumli-3.png"]
  },
  {
    name: "Project 2",
    description: "Description for Project 2.",
    images: ["images/pianixi-1.png", "images/pianixi-2.png"]
  }
];

const projectsContainer = document.getElementById("projects-container");

// Create slides
projects.forEach((project) => {
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

  const prevBtn = document.createElement("button");
  prevBtn.className = "arrow left";
  prevBtn.textContent = "‹";
  phoneContainer.appendChild(prevBtn);

  const nextBtn = document.createElement("button");
  nextBtn.className = "arrow right";
  nextBtn.textContent = "›";
  phoneContainer.appendChild(nextBtn);

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

  // Project description
  const projectInfo = document.createElement("div");
  projectInfo.className = "project-info";
  const title = document.createElement("h2");
  title.textContent = project.name;
  const desc = document.createElement("p");
  desc.textContent = project.description;
  projectInfo.appendChild(title);
  projectInfo.appendChild(desc);

  // Combine
  projectDiv.appendChild(phoneContainer);
  projectDiv.appendChild(projectInfo);

  projectsContainer.appendChild(projectDiv);
});

// Outer carousel
let currentProject = 0;
const totalProjects = projects.length;
const outerTrack = projectsContainer;

const updateProjectCarousel = () => {
  const slideWidth = outerTrack.children[0].getBoundingClientRect().width;
  outerTrack.style.transform = `translateX(-${currentProject * slideWidth}px)`;
};

document.getElementById("next-project").addEventListener("click", () => {
  currentProject = (currentProject + 1) % totalProjects;
  updateProjectCarousel();
});

document.getElementById("prev-project").addEventListener("click", () => {
  currentProject = (currentProject - 1 + totalProjects) % totalProjects;
  updateProjectCarousel();
});

window.addEventListener('resize', updateProjectCarousel);
