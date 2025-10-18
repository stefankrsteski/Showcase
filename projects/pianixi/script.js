const images = ["images/blumli-1.png", "images/blumli-2.png"];
let current = 0;
const img = document.querySelector(".carousel-image");
const prev = document.querySelector(".arrow.left");
const next = document.querySelector(".arrow.right");

function showImage(i) {
  img.src = images[i];
}

prev.addEventListener("click", () => {
  current = (current - 1 + images.length) % images.length;
  showImage(current);
});

next.addEventListener("click", () => {
  current = (current + 1) % images.length;
  showImage(current);
});
