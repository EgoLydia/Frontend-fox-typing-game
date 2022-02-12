const quote = document.getElementById("quote");
const input = document.getElementById("typed-value");
const start = document.getElementById("start");
const message = document.getElementById("message");
const quotes = [
  "Live long and prosper",
  "What does God need with a starship",
  "Logic is the beginning of wisdom, not the end",
  "Live now make now always the most precious time. Now will never come again",
  "Could you please continue the petty bickering? I find it most intriguing",
  "You may find that having is not so pleasing a thing as wanting. This is not logical, but it is often true",
  "Please, Mrs. Troi! and it’s Worf, not Woof",
  "Insufficient facts always invite danger",
  "I am a doctor, not a bricklayer",
  "Make it so!",
];

let targetWord;
let wordQueue;
let highlightPosition;
let startTime;

function startGame() {
  document.body.className = "";
  message.innerHTML = "";

  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quoteText = quotes[quoteIndex];

  wordQueue = quoteText.split("");
  quote.innerHTML = wordQueue.map((word) => `<span>${word}</span>`).join("");

  highlightPosition = 0;
  quote.childNodes[highlightPosition].className = "highlight";
  startTime = new Date().getTime();

  document.body.className = "";
  start.className = "started";
  setTimeout(() => {
    start.className = "button";
  }, 2000);
}

function checkInput() {
  const currentWord = wordQueue[0];
  const typedValue = input.value;

  if (currentWord !== typedValue) {
    input.className = currentWord.startsWith(typedValue) ? "" : "error";
    return;
  }

  wordQueue.shift();
  input.value = "";
  quote.childNodes[highlightPosition].className = "";

  if (wordQueue.length === 0) {
    gameOver();
    return;
  }

  highlightPosition++;
  quote.childNodes[highlightPosition].className = "highlight";
}

function gameOver() {
  const elapsedTime = new Date().getTime() - startTime;
  document.body.className = "winner";
  message.innerHTML = `
    <span class="congrats">Congratulations! </span>;<br>
    You finished in ${elapsedTime / 1000} seconds,`;
}

start.addEventListener("click", startGame);
input.addEventListener("input", checkInput);
