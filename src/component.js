const player = document.querySelector('.player');
const fire = document.querySelector('.fire');
const root = document.querySelector('.root');
const enemy = document.querySelector('.enemy');

const playerHeight = player.clientHeight;
const playerWidth = player.clientWidth;

const fireHeight = fire.clientHeight;

const windowHeight = document.documentElement.clientHeight;
const windowWidth = document.documentElement.clientWidth;

const maxHeight = windowHeight - playerHeight;
const enemyHeight = enemy.clientHeight;

var enemyTop;
var fireTop;
var enemyLeft;
var fireLeft;

const getRandomHeight = (elHeight) => {
  return Math.floor(Math.random() * (windowHeight - elHeight - 50) + 50);
};

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case ' ':
      const fireClone = fire.cloneNode(true);
      const fireX = player.offsetTop + playerHeight / 2 - fireHeight / 2;
      const fireY = playerWidth;
      root.appendChild(fireClone);
      // player.offsetTop - количество пикселей от верха экрана до верхней границы игрока
      // offsetLeft - количество пикселей от левого края экрана до элемента
      // playerHeight / 2 - середина высоты игрока
      // fireHeight / 2 - середина элемента огня
      fireClone.style.visibility = 'visible';
      fireClone.style.top = fireX + 'px';
      fireClone.style.left = fireY + 'px';
      setInterval(() => {
        let goRight = fireClone.offsetLeft;
        if (goRight < windowWidth - 110) {
          goRight += 20;
          fireClone.style.left = goRight + 'px';
          fireLeft = fireClone.offsetLeft;
          fireTop = fireClone.offsetTop;
        } else {
          fireClone.remove();
        }
        if (
          fireLeft + fireHeight >= enemyLeft - 10 &&
          fireLeft <= enemyLeft + enemyHeight + 10 &&
          fireTop + fireHeight >= enemyTop - 10 &&
          fireTop <= enemyTop + enemyHeight + 10
        ) {
          fireClone.remove();
        }
      }, 100);
      break;
    case 'ArrowUp':
      if (player.offsetTop >= 0) {
        const goUp = player.offsetTop;
        player.style.top = goUp - 5 + 'px';
      }
      break;
    case 'ArrowDown':
      if (player.offsetTop < maxHeight - 5) {
        const goDown = player.offsetTop;
        player.style.top = goDown + 5 + 'px';
      }
      break;
    default:
      break;
  }
});

setInterval(() => {
  const enemyClone = enemy.cloneNode(true);
  enemyClone.style.visibility = 'visible';
  enemyClone.style.top = getRandomHeight(enemyHeight) + 'px';
  console.log(enemyClone.style.top);
  root.appendChild(enemyClone);

  setInterval(() => {
    let goLeft = enemyClone.offsetLeft;
    if (enemyClone.offsetLeft > 0) {
      goLeft -= 1;
      enemyClone.style.left = goLeft + 'px';
      enemyLeft = enemyClone.offsetLeft;
      enemyTop = enemyClone.offsetTop;
    } else {
      enemyClone.remove();
    }
    if (
      fireLeft + fireHeight >= enemyLeft - 10 &&
      fireLeft <= enemyLeft + enemyHeight + 10 &&
      fireTop + fireHeight >= enemyTop - 10 &&
      fireTop <= enemyTop + enemyHeight + 10
    ) {
      enemyClone.remove();
      console.log('Попал!');
    }
  }, 1);
}, 1000);