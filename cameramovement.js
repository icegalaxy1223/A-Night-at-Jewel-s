const background = document.querySelector("#background"); // your container
const office = document.querySelector("#office"); // your long image

//
let direction = 0; // -1 = left, +1 = right, 0 = stop

background.addEventListener("mousemove", (e) => {
  const rect = background.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const width = rect.width;

  if (x < width * 0.2) {
    direction = 1; // move right (image pans right)
  } else if (x > width * 0.8) {
    direction = -1; // move left (image pans left)
  } else {
    direction = 0; // stop
  }
});

function animate() {
  if (direction !== 0) {
    const backgroundRect = background.getBoundingClientRect();
    const officeRect = office.getBoundingClientRect();

    // current left position
    let currentLeft = parseInt(office.style.left || "0");

    // max boundaries
    const maxLeft = 0;
    const maxRight = -(office.width - backgroundRect.width);

    // move image
    currentLeft += direction * 5; // speed = 5px per frame

    // clamp within bounds
    if (currentLeft > maxLeft) currentLeft = maxLeft;
    if (currentLeft < maxRight) currentLeft = maxRight;

    office.style.left = currentLeft + "px";
  }

  requestAnimationFrame(animate);
}

animate(); // start loop
