export default function performanceNow() {
  if ('performance' in window) {
    return window.performance.now();
  } else {
    return new Date().valueOf();
  }
}
