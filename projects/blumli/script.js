
  const images = ["images/blumli-1.png", "images/blumli-2.png", "images/blumli-3.png", "images/blumli-4.png", "images/blumli-5.png"];
  let current = 0;

  const container = document.querySelector(".phone-container");

  // Create image elements for crossfade morph
  const imageElements = images.map((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "carousel-image" + (i === 0 ? " active" : "");
    container.appendChild(img);
    return img;
  });

  const prev = document.querySelector(".arrow.left");
  const next = document.querySelector(".arrow.right");

  function showImage(i) {
    imageElements.forEach((img, idx) => {
      img.classList.toggle("active", idx === i);
    });
  }

  prev.addEventListener("click", () => {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  });

  next.addEventListener("click", () => {
    current = (current + 1) % images.length;
    showImage(current);
  });

