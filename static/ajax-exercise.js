'use strict';

// PART 1: SHOW A FORTUNE

const displayFunction = document.querySelector('#get-fortune-button');

let showFortune = () => {

  fetch('/fortune')
  .then((response) => response.text())
  .then((fortune) => {
    document.getElementById('fortune-text').innerHTML = fortune;
  });
}

displayFunction.addEventListener('click', showFortune)

// OTHER WAY TO DO THE SAME 
// function showFortune(evt) {
//   // TODO: get the fortune and show it in the #fortune-text div
  
//   fetch('/fortune')
//     .then((response) => response.text())
//     .then((fortune) => {
//       document.getElementById('fortune-text').innerHTML = fortune;
//     });
// }
// document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;

  // TODO: request weather with that URL and show the forecast in #weather-info

  fetch(`${url}?${zipcode}`)
    .then((response) => response.json())
    .then((weather) => {
      document.getElementById('weather-info').innerHTML = weather['forecast'];
    });
}
document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)

  const formInputs = {
    qty: document.getElementById('qty-field').value,    
    melon_type: document.getElementById('melon-type-field').value,
  };
  // console.log(formInputs);

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log(responseJson);
      let orderStatusDiv = document.getElementById('order-status');

      if (responseJson['code'] === 'ERROR') {
        orderStatusDiv.classList.add('order-error');    //adding class 'order-error' to the div with id='order-status' that comer from css file

      } else {
        orderStatusDiv.classList.remove('order-error');
      };
        document.getElementById('order-status').innerHTML = responseJson['msg'];
    });
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);


// FURTHER STUDY
const image = document.getElementById('get-dog-image');
 
let getImage = () => {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then((response) => response.json())  
    .then((responseJson) => {
      console.log(responseJson);
      
      // document.getElementById('dog-image').classList.add()
      document.getElementById('dog-image').innerHTML += `<img src = "${responseJson['message']}">`;
    });
}
image.addEventListener('click', getImage);
