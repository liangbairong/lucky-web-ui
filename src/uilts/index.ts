/* 节流函数 */
// export const throttle = (fn, delay) => {
//   let timer;
//   return function () {
//     let _this = this;
//     let args = arguments;
//     if (timer) {
//       return;
//     }
//     timer = setTimeout(function () {
//       fn.apply(_this, args);
//       timer = null;
//     }, delay)
//   }
// }

/* 防抖函数 */
export const debounce = (fn:Function|any, delay:number) => {
  let timer:object|any = null;
  return function (this:unknown) {
    let _this = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(_this, args);
    }, delay);
  };
}
