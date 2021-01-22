/*!
 * MarinDeck JS (by taiy)
 * Copyright 2020 taiy https://github.com/taiyme
 * Apache License Version 2.0 https://www.apache.org/licenses/LICENSE-2.0
 * Forked from alwaysms (by @_phocom) https://greasyfork.org/ja/scripts/405029-alwaysms
 * Date: 2021-01-23 05:30 JST
 */

// 圧縮サイト => https://javascript-minifier.com/
// 圧縮等を効率化できる方法を教えてください https://twitter.com/20041203t

(()=>{
  'use strict';
  const deck = () => {
    const elms = document.querySelectorAll('time');
    for (const elm of elms) {
      // if (!elm.classList.contains('js-timestamp')) continue;
      elm.classList.remove('js-timestamp');
      const time = elm.querySelector('a');
      const span = elm.querySelector('span');
      if (time) {
        const id = time.href.split('/')[5];
        const set = formatDate(getDateFromSnowFrake(id));
        if (set) time.innerHTML = set;
      }
      if (span) {
        const data = elm.dataset.time;
        const set = formatDate(new Date(Number(data)));
        if (set) span.innerHTML = set;
      }
    }
  }
  const getDateFromSnowFrake = (id) => {
    const numid = Number(id);
    if (numid < 10000000000) return false;
    const unixTime = Math.floor(numid / 4194304) + 1288834974657;
    return new Date(unixTime);
  }
  const formatDate = (date) => {
    if (Object.prototype.toString.call(date) !== '[object Date]') return false;
    const nowUnix  = new Date().getTime(),    // 現在の時刻
          dateUnix = date.getTime();          // ツイートの時刻
    const yyyy = date.getFullYear()     .toString().padStart(4, '0'),
            MM = (date.getMonth()+1)    .toString().padStart(2, '0'),
            dd = date.getDate()         .toString().padStart(2, '0'),
            HH = date.getHours()        .toString().padStart(2, '0'),
            mm = date.getMinutes()      .toString().padStart(2, '0'),
            ss = date.getSeconds()      .toString().padStart(2, '0'),
           SSS = date.getMilliseconds() .toString().padStart(3, '0');
    if (nowUnix - dateUnix <= (3600000 * 2)){ // 3600000msec = 1時間 * nで好きな時間にできる
      return `${HH}:${mm}:${ss}.${SSS}`       // 時:分:秒.ミリ秒
    }
    return `${yyyy}/${MM}/${dd}`              // その他の処理(いまは年/月/日)
  }
  setInterval(deck, 1000);
})();
