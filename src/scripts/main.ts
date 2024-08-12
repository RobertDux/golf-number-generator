const SIZE = 2;
const LOWER = 1;
const UPPER = 60;

let isRunning = false;

const buttonElem = document.querySelector(".btn") as HTMLButtonElement;
const outputElems = document.querySelectorAll(".output .number");

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function increaseNumber(
  element: Element,
  start: number,
  end: number,
  speed = 100
): Promise<void> {
  if (start <= end) {
    element.textContent = start.toString();
    await sleep(speed);
    increaseNumber(element, start + 1, end, speed);
  }
}

function resetNumbers() {
  for (const elem of outputElems) {
    elem.textContent = "0";
  }
}

async function drawNumber(): Promise<void> {
  if (isRunning) {
    return;
  }

  isRunning = true;

  const number = randomInt(LOWER, UPPER);
  const text = number.toString().padStart(SIZE, "0");
  const chars = text.split("").map(Number);

  resetNumbers();

  for (let i = 0; i < SIZE; i++) {
    await increaseNumber(outputElems[i], 0, chars[i], 125);
    await sleep(500);
  }

  isRunning = false;
}

buttonElem.addEventListener("click", drawNumber, false);
