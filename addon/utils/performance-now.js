export default function performanceNow() {
  if ('performance' in window && typeof window.performance.now === 'function') {
    return window.performance.now();
  } else {
    return new Date().valueOf();
  }
}
