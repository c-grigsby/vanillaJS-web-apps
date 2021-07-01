const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calcWealthBtn = document.getElementById('calculate-wealth');
const main = document.getElementById('main');

let data = []; // initialize an array for data

getRandomUser(); // begin with 3 random users
getRandomUser();
getRandomUser();

// Get Random User

// 1) Fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  //console.log(data);
  const user = data.results[0];
  //console.log(user);
  //create a newUser object from the data
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  //console.log(newUser);
  addData(newUser);
}

// 2) Add the new object to the data array
const addData = function (obj) {
  data.push(obj);
  updateDOM();
};

// 3) Update DOM
function updateDOM(providedData = data) {
  //Clear main div
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    //add this HTML to the DOM
    main.appendChild(element);
  });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
//Short and fast solution
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Double Money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Filter only millionaires
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);
  updateDOM();
}

// Sort by richest random user
function sortRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Total Value of Wealth
function calculateWealth() {
  const sum = data.reduce((acc, obj) => acc + obj.money, 0);
  console.log(sum);
  const element = document.createElement('div');
  element.innerHTML = `<h3> Total Wealth: <strong>${formatMoney(
    sum
  )}<strong></h3>`;
  main.appendChild(element);
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
showMillionaireBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortRichest);
calcWealthBtn.addEventListener('click', calculateWealth);
