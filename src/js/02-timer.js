import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/confetti.css';

import Notiflix from 'notiflix';

const refs = {
  formInput: document.querySelector('#datetime-picker'),
  timer: document.querySelector('.timer'),
  startBtn: document.querySelector('[data-start]'),
  timerField: document.querySelectorAll('.field'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSecs: document.querySelector('[data-seconds]'),
};

let deltaTime = 0;
setDisabled(refs.startBtn);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    deltaTime = new Date(selectedDates).getTime() - new Date().getTime();
    if (deltaTime <= 0) {
      setDisabled(refs.startBtn);
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      removeDisabled(refs.startBtn);
    }
  },
};

flatpickr('input', options);

function timerValues(days, hours, minutes, seconds) {
  refs.timerDays.textContent = days;
  refs.timerHours.textContent = hours;
  refs.timerMinutes.textContent = minutes;
  refs.timerSecs.textContent = seconds;
}

function countTime() {
  let timerId = setInterval(() => {
    deltaTime = deltaTime - 1000;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    console.log(`${days}:${hours}:${minutes}:${seconds}`);
    timerValues(days, hours, minutes, seconds);
    if (deltaTime < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

function setDisabled(e) {
  e.setAttribute('disabled', 'disabled');
}

function removeDisabled(e) {
  e.removeAttribute('disabled');
}

refs.startBtn.addEventListener('click', () => {
  countTime();
  setDisabled(refs.startBtn);
});
function pad(value) {
  return value.toString().padStart(2, 0);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}
refs.timer.style.display = 'flex';
refs.timerField.forEach(e => {
  e.style.marginRight = 30 + 'px';
});
