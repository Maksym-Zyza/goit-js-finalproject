const combination = [
  [1, 2, 3],
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
const winner = { X: false, O: false };
let player = "X";
let count = 0;
let step = 0;

content.insertAdjacentHTML("afterbegin", createMarkup());
content.addEventListener("click", handlerClick);

function handlerClick({ target }) {
  if (!target.classList.contains("js-item") || target.textContent) {
    return;
  }

  const id = Number(target.dataset.id);
  if (player === "X") {
    historyX.push(id);
    historyX.length >= 3 && checkWinner(historyX, "X");
  } else {
    historyO.push(id);
    historyO.length >= 3 && checkWinner(historyO, "O");
  }

  target.textContent = player;
  player = player === "X" ? "O" : "X";
  step += 1;
  count > 1 && showWinner();
  step === 9 && modalShow("Game is over!");
}

function checkWinner(history, player) {
  const result = combination.some((item) =>
    item.every((id) => history.includes(id))
  );
  winner[player] = result;
  count += Object.values(winner).filter((el) => el).length;
}

function createMarkup() {
  let markup = "";
  for (let i = 1; i < 10; i += 1) {
    markup += `<div class="item js-item" data-id="${i}"></div>`;
  }
  return markup;
}

function showWinner() {
  let message = `Player ${winner.X ? "X" : "O"} is winner!`;
  if (winner.X && winner.O) message = "Friendship won!";
  modalShow(message);
}

function modalShow(message) {
  const instance = basicLightbox.create(
    `<div style="background: white; padding: 40px; border-radius: 8px">
      <h1>${message}</h1>
    </div>`,
    {
      handler: null,
      onShow(instance) {
        this.handler = onEscape.bind(instance);
        document.addEventListener("keydown", this.handler);
      },
      onClose() {
        document.removeEventListener("keydown", this.handler);
        resetGame();
      },
    }
  );
  instance.show();
}

function resetGame() {
  content.innerHTML = createMarkup();
  historyX.splice(0, historyX.length);
  historyO.splice(0, historyO.length);
  player = "X";
  winner.X = false;
  winner.O = false;
  count = 0;
  step = 0;
}

function onEscape({ code }) {
  code === "Escape" && this.close();
}
