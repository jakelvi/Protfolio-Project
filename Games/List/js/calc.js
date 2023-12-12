const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let save = [
  {
    num1: Number,
    num2: Number,
    answer: Number,
  },
];

const welcome = () => {};

let n1 = 0;
let n2 = 0;
const selectNums = () => {
  document.querySelector("#numBtn").addEventListener("click", (e) => {
    e.preventDefault();
    let { value: valueMin } = document.querySelector("#myMin");
    let { value: valueMax } = document.querySelector("#myMax");
    n1 = getRandomIntInclusive(+valueMin, +valueMax);
    n2 = getRandomIntInclusive(+valueMin, +valueMax);
    let quest = document.querySelector("#quest");
    let operation = document.querySelector("#mathSelect");
    let operationValue = operation.value;
    quest.innerText = `${n1} ${operationValue} ${n2} =`;
    math();
  });
};
const math = () => {
  document.querySelector("#checkBtn").addEventListener("click", (e) => {
    e.preventDefault();
    let { value } = document.querySelector("#answer");
    let inpAnswer = document.querySelector("#answer");
    let history = document.querySelector("#history");
    if (n1 + n2 == value) {
      inpAnswer.style.backgroundColor = "green";
      let newAnswer = document.createElement("div");
      newAnswer.innerHTML = `${n1} + ${n2} = ${value}`;
      newAnswer.style.backgroundColor = "green";
      history.appendChild(newAnswer);
    } else {
      inpAnswer.style.backgroundColor = "red";
      let newAnswer = document.createElement("div");
      newAnswer.innerHTML = `${n1} + ${n2} = ${value}`;
      newAnswer.style.backgroundColor = "red";
      history.appendChild(newAnswer);
    }
    save = [...save, { num1: n1, num2: n2, answer: value }];
    saveData();
  });
};

const saveData = () => {
  localStorage.setItem("calcs", JSON.stringify(save));
};

window.addEventListener("load", () => {
  document.querySelector("#start").addEventListener("click", () => {
    let shadow = document.querySelector(".shadow");
    shadow.style.display = "none";
    let { value: nameV } = document.querySelector("#nameInp");
    let h2 = document.querySelector("#welcome > h2");
    h2.innerHTML = `welcome ${nameV}!`;
    let h3 = document.querySelector("#welcome > h3");
    h3.style.display = "block";
    selectNums();
  });
});

document.querySelector("#newBtn").addEventListener("click", (ev) => {
  ev.preventDefault();
  let { value: valueMin } = document.querySelector("#myMin");
  let { value: valueMax } = document.querySelector("#myMax");
  n1 = getRandomIntInclusive(+valueMin, +valueMax);
  n2 = getRandomIntInclusive(+valueMin, +valueMax);
  let quest = document.querySelector("#quest");
  let operation = document.querySelector("#mathSelect");
  let operationValue = operation.value;
  quest.innerText = `${n1} ${operationValue} ${n2} =`;
  math();
  let inpAnswer = document.querySelector("#answer");
  inpAnswer.value = "";
  inpAnswer.style.backgroundColor = "white";
});