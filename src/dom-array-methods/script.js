const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calcWealthBtn = document.getElementById('calculate-wealth');
const main = document.getElementById('main');

let data = []; 

getRandomUser(); 
getRandomUser();
getRandomUser();

async function getRandomUser() {
  // Fetch random user and add money
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

const addData = function (obj) {
  data.push(obj);
  updateDOM();
};

function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

function showMillionaires() {
  data = data.filter(user => user.money > 1000000);
  updateDOM();
}

function sortRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function calculateWealth() {
  const sum = data.reduce((acc, obj) => acc + obj.money, 0);
  console.log(sum);
  const element = document.createElement('div');
  element.innerHTML = `<h3> Total Wealth: <strong>${formatMoney(
    sum
  )}<strong></h3>`;
  main.appendChild(element);
}

addUserBtn.addEventListener('click', getRandomUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
showMillionaireBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortRichest);
calcWealthBtn.addEventListener('click', calculateWealth);
