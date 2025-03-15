const container = document.getElementById('container');
function createGrid(cont,sqr) {
  for (let i = 1; i<=sqr; i++) {
    let cell = document.createElement("div");
    cell.setAttribute("id", i.toString());
    //addClickEvent(cell);
    cont.appendChild(cell);
  }
}
function contClick(cell) {
  let id = Number(cell.id);
  let ids = [20, 1, 19, 21, 2, 40];
  if (window.innerWidth <= 900) ids = [10, 1, 9, 11, 2, 20];
  clickEvent(id);
  ids.forEach((x) => {
    let timer;
    if (x == ids[0] || x == ids[1]) timer = 100;
    if (x == ids[2] || x == ids[3]) timer = 200;
    if (x == ids[4] || x == ids[5]) timer = 300;
    setTimeout(() => {
      clickEvent(id+x);
      clickEvent(id-x);
    }, timer);
  })
}
function clickEvent(id) {
  document.getElementById((id).toString()) === null ? 
    null :(document.getElementById((id).toString()).classList.add("click"))
  setTimeout(() => {
    document.getElementById((id).toString()) === null ? 
      null : (document.getElementById((id).toString()).classList.remove("click"))
  }, 1000)
}

function nGridCell(n) {
  let cellWidth = window.innerWidth/n;
  let i = 0;
  let c = 0;
  while (i<window.innerHeight) {
    c++;
    i += cellWidth;
  }
  return c*n;
}
function setGrid() {
  let n;
  if (window.innerWidth <= 900) n = 10;
  else n = 20;
  createGrid(container, nGridCell(n));
}
addEventListener('resize', () => {
  container.innerHTML = "";
  setGrid();
})
setGrid();

let isMouseDown = false;

document.addEventListener("dragstart", (event) => {
  event.preventDefault();
});

document.addEventListener('mousedown', () => {
  isMouseDown = true;
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
});

document.addEventListener('touchstart', () => {
  isMouseDown = true;
});

document.addEventListener('touchend', () => {
  isMouseDown = false;
});

['mousedown', 'mousemove', 'touchstart', 'touchmove'].forEach(event => {
  document.addEventListener(event, (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    let rects = document.querySelectorAll('#container > div');

    rects.forEach((x) => {
      let rect = x.getBoundingClientRect();

      if (
        isMouseDown &&
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom
      ) {
        contClick(x);
      }
    })
  })
});
//const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//
//let interval = null;
//
//document.querySelector("h1").onmouseover = event => {  
//  let iteration = 0;
//
//  clearInterval(interval);
//
//  interval = setInterval(() => {
//    event.target.innerText = event.target.innerText
//      .split("")
//      .map((letter, index) => {
//        if(index < iteration) {
//          return event.target.dataset.value[index];
//        }
//
//        return letters[Math.floor(Math.random() * 26)]
//      })
//      .join("");
//
//    if(iteration >= event.target.dataset.value.length){ 
//      clearInterval(interval);
//    }
//
//    iteration += 1 / 3;
//  }, 30);
//}
