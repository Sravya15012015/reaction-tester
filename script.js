const shapeElement = document.getElementById("shape");
const resultDisplay = document.getElementById("result");
let startTimestamp;
let lastLeft = 0;
let lastTop = 0;

// Generate a random hex color
function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let colorCode = "#";
  for (let i = 0; i < 6; i++) {
    colorCode += letters[Math.floor(Math.random() * 16)];
  }
  return colorCode;
}

// Show the shape at a new random position and size
function showShape() {
  let leftPos;
  let topPos;

  // Keep generating position until it differs enough from last one
  do {
    leftPos = Math.random() * (window.innerWidth - 300);
    topPos = Math.random() * (window.innerHeight - 300);
  } while (
    Math.abs(leftPos - lastLeft) < 50 &&
    Math.abs(topPos - lastTop) < 50
  );

  lastLeft = leftPos;
  lastTop = topPos;

  const size = Math.random() * 200 + 100;

  shapeElement.style.left = leftPos + "px";
  shapeElement.style.top = topPos + "px";
  shapeElement.style.width = size + "px";
  shapeElement.style.height = size + "px";

  // Randomly make it circle or square
  shapeElement.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";

  shapeElement.style.backgroundColor = generateRandomColor();
  shapeElement.style.display = "block";

  startTimestamp = new Date().getTime();
}

// Show the shape after a random delay (0-2 sec)
function triggerDelayedAppearance() {
  setTimeout(showShape, Math.random() * 2000);
}

// Calculate and display reaction time
function displayReactionTime() {
  const endTimestamp = new Date().getTime();
  const timeInSeconds = (endTimestamp - startTimestamp) / 1000;
  const timeInMinutes = timeInSeconds / 60;

  resultDisplay.textContent = `Reaction Time: ${timeInSeconds.toFixed(
    2
  )}s (${timeInMinutes.toFixed(2)}m)`;

  shapeElement.style.backgroundColor = generateRandomColor();

  // Clear the result after 3 seconds
  setTimeout(() => {
    resultDisplay.textContent = "";
  }, 3000);
}

// When shape is clicked, hide it, show reaction time, and schedule next shape
shapeElement.onclick = () => {
  shapeElement.style.display = "none";
  displayReactionTime();
  triggerDelayedAppearance();
};

// Start the first shape
triggerDelayedAppearance();