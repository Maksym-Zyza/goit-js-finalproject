const combination = [
  [1, 2, 3], //[ 1, 7, 2, 5]
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [1, 5, 9],
  [3, 5, 7],
  [3, 6, 9],
];

const content = document.querySelector(".js-content");
const historyX = [];
const historyO = [];
let player = "X";

content.insertAdjacentHTML("afterbegin", createMarkup());
content.addEventListener("click", handlerClick);

function handlerClick({ target }) {
  if (!target.classList.contains("js-item") || target.textContent) {
    return;
  }

  const id = Number(target.dataset.id);
  let isWinner = false;

  if (player === "X") {
    historyX.push(id);
    isWinner = historyX.length >= 3 && checkWinner(historyX);
  } else {
    historyO.push(id);
    isWinner = historyO.length >= 3 && checkWinner(historyO);
  }

  target.textContent = player;

  if (isWinner) {
    showWinner(player);
    resetGame();
    return;
  }

  player = player === "X" ? "O" : "X";
}

function resetGame() {
  content.innerHTML = createMarkup();
  historyX.splice(0, historyX.length);
  historyO.splice(0, historyO.length);
  player = "X";
}

function checkWinner(history) {
  return combination.some((item) => item.every((id) => history.includes(id)));
}

function createMarkup() {
  let markup = "";

  for (let i = 1; i < 10; i += 1) {
    markup += `<div class="item js-item" data-id="${i}"></div>`;
  }

  return markup;
}

function showWinner(player) {
  const instance = basicLightbox.create(
    `
<div class="box">
    <h1>Player - ${player} is winner</h1>
</div>
`,
    {
      handler: null,
      onShow(instance) {
        console.log(this);
        this.handler = onEscape.bind(instance);
        document.addEventListener("keydown", this.handler);
      },
      onClose() {
        document.removeEventListener("keydown", this.handler);
      },
    }
  );

  instance.show();
}

function onEscape({ code }) {
  if (code === "Escape") {
    console.log(this);
    this.close();
  }
}
