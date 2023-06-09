import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
let currentTime = 0;
const STORAGE_KEY = 'videoplayer-current-time';

populateTime();

player.on(
  'timeupdate',
  throttle(function (evt) {
    currentTime = evt.seconds;
    localStorage.setItem(STORAGE_KEY, currentTime);
  }, 1000)
);

function populateTime() {
  const savedTime = localStorage.getItem(STORAGE_KEY);
  if (savedTime) {
    player
      .setCurrentTime(savedTime)
      .then(function (seconds) {
        // seconds = the actual time that the player seeked to
      })
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

          default:
            // some other error occurred
            break;
        }
      });
  }
}
