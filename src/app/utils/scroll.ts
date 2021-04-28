export function animatedScroll(element: any, to: number, duration: number) {
  let start         = element.scrollTop,
      change        = to - start,
      startTs       = performance.now(),
      // t = current time
      // b = start value
      // c = change in value
      // d = duration
      easeInOutQuad = function (t: number, b: number, c: number, d: number) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      },
      animateScroll = function (ts: number) {
        var currentTime   = ts - startTs;
        element.scrollTop = easeInOutQuad(currentTime, start, change, duration);
        if (currentTime < duration) {
          requestAnimationFrame(animateScroll);
        }
        else {
          element.scrollTop = to;
        }
      };
  requestAnimationFrame(animateScroll);
}
