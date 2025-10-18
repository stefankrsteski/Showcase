const projects = [
  {
    name: "Project 1",
    images: ["images/blumli-1.png", "images/blumli-2.png", "images/blumli-3.png"]
  },
  {
    name: "Project 2",
    images: ["images/pianixi-1.png", "images/pianixi-2.png"]
  }
];

const projectsContainer = document.getElementById("projects-container");

projects.forEach((project, index) => {
  const projectDiv = document.createElement("div");
  projectDiv.className = "project";

  const title = document.createElement("h2");
  title.textContent = project.name;
  projectDiv.appendChild(title);

  // Phone frame container
  const phoneContainer = document.createElement("div");
  phoneContainer.className = "phone-container";

  // Carousel image
  const img = document.createElement("img");
  img.src = project.images[0];
  img.className = "carousel-image";
  phoneContainer.appendChild(img);

  // Phone frame overlay
  const frame = document.createElement("img");
  frame.src = "images/phone-frame.png";
  frame.className = "phone-frame";
  phoneContainer.appendChild(frame);

  // Arrows
  const prevBtn = document.createElement("button");
  prevBtn.className = "arrow left";
  prevBtn.textContent = "‹";
  phoneContainer.appendChild(prevBtn);

  const nextBtn = document.createElement("button");
  nextBtn.className = "arrow right";
  nextBtn.textContent = "›";
  phoneContainer.appendChild(nextBtn);

  let current = 0;
  const showImage = (i) => { img.src = project.images[i]; }

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + project.images.length) % project.images.length;
    showImage(current);
  });

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % project.images.length;
    showImage(current);
  });

  projectDiv.appendChild(phoneContainer);
  projectsContainer.appendChild(projectDiv);
});
