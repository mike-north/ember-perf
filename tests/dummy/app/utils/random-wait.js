import Ember from 'ember';

export default function(maxWait=2000, minWait=0) {
  return new Ember.RSVP.Promise((resolve) => {
    let wait = minWait + Math.random() * (maxWait - minWait);
    setTimeout(resolve, wait);
  });
}
