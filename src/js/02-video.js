import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const VCT_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onPlay = function (event) {
  localStorage.setItem(VCT_KEY, event.seconds);
  //   console.log(event.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

// const currentTime = JSON.parse(localStorage.getItem(VCT_KEY));
// if (currentTime !== null) {
//   player
//     .setCurrentTime(currentTime)
//     .then(function (seconds) {
//       console.log(seconds);
//     })
//     .catch(function (error) {
//       switch (error.name) {
//         case 'RangeError':
//           break;
//         default:
//           break;
//       }
//     });
// }

// або так!!!
player.setCurrentTime(JSON.parse(localStorage.getItem(VCT_KEY)) || 0);
