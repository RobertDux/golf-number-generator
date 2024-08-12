const SIZE = 3;
const LOWER = 1;
const UPPER = 60;

let index = 0;

const buttonElem = document.querySelector(".btn") as HTMLButtonElement;
const outputElems = document.querySelectorAll(".output .number");

function getFromList() {
  return [74, 34, 25, 9, 12, 45, 23, 12, 8, 55, 31, 5, 14, 26][index];
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
  const number = getFromList();
  const text = number.toString().padStart(SIZE, "0");
  const chars = text.split("").map(Number);

  resetNumbers();

  for (let i = 0; i < SIZE; i++) {
    increaseNumber(outputElems[i], 0, chars[i], 600);
    await sleep(1500);
  }

  index++;
}

buttonElem.addEventListener("click", drawNumber, false);
