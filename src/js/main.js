import 'bootstrap';
import '../scss/style.scss';

const button = document.createElement('button');

button.classList.add('btn', 'btn-lg', 'btn-outline-danger'),
  (button.textContent = 'click Me');

document.querySelector('#root').appendChild(button);
