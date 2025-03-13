function getRandomPercentage() {
  return Math.floor(Math.random() * 100); // Random value between 0 and 100
}

function updateGradient() {
  const loader = document.getElementById("dynamicLoader");
  const percent1 = getRandomPercentage();
  const percent2 = getRandomPercentage();

  loader!.style.background = `conic-gradient(
    #4AD983 ${percent1}%,
    #4F4CE1 ${percent2}%
  )`;
}

setInterval(updateGradient, 1000);
