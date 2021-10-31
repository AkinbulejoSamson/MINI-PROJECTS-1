const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const newYear = '1 Jan 2022';

function countdown() {
  const newYearDate = new Date(newYear).getTime();
  const currDate = new Date().getTime();

  const totalSeconds = (newYearDate - currDate) / 1000;

  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  daysEl.innerHTML = days;
  hoursEl.innerHTML = hours;
  minutesEl.innerHTML = minutes;
  secondsEl.innerHTML = seconds;  
}
//initial call
countdown();

setInterval(countdown, 1000);

function formatTime() {
  return time < 10 ? (`0${time}`) : time;
}