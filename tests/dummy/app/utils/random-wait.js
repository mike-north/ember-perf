import Ember from 'ember';

const { RSVP } = Ember;
const { Promise } = RSVP;

export default function(maxWait = 2000, minWait = 0) {
  return new Promise((resolve) => {
    let wait = minWait + Math.random() * (maxWait - minWait);
    setTimeout(resolve, wait);
  });
}
