/*!
 * MarinDeck JS (by taiy)
 * Copyright 2020 taiy https://github.com/taiyme
 * Apache License Version 2.0 https://www.apache.org/licenses/LICENSE-2.0
 * Forked from alwaysms (by @_phocom) https://greasyfork.org/ja/scripts/405029-alwaysms
 * Date: 2021-02-02 01:30 JST
 */

// 圧縮サイト => https://javascript-minifier.com/
// 圧縮等を効率化できる方法を教えてください https://twitter.com/20041203t

(()=>{
  'use strict';
  const deck = () => {
    const elms = document.querySelectorAll('time');
    for (const elm of elms) {
      // if (!elm.classList.contains('js-timestamp')) continue;  // .js-timestampがなかったらスキップ
      elm.classList.remove('js-timestamp');     // .js-timestampを消す(時刻上書き防止)
      const time = elm.querySelector('a');
      const span = elm.querySelector('span');
      if (time) {
        const id = time.href.split('/')[5];     // href属性からTweetIDを取得
        const set = formatDate(getDateFromSnowFrake(id));
        if (set) time.innerHTML = set;
      }
      if (span) {
        const data = elm.dataset.time;          // data-time属性からUnixTimeを取得
        const set = formatDate(new Date(Number(data)));
        if (set) span.innerHTML = set;
      }
    }
    const details = document.querySelectorAll('.tweet-detail>.margin-tl.txt-mute.txt-size-variable--12');
    for (const detail of details) {
      const link = detail.querySelectorAll('a')[0];
      if (link) {
        const id = link.href.split('/')[5];     // href属性からTweetIDを取得
        const set = formatDate(getDateFromSnowFrake(id), true);
        if (set) link.innerHTML = set;
      }
    }
  }
  const getDateFromSnowFrake = (id) => {
    const numid = Number(id);
    if (numid < 10000000000) return false;
    const unixTime = Math.floor(numid / 4194304) + 1288834974657;
    return new Date(unixTime);
  }
  const formatDate = (date, isFull = false) => {
    if (Object.prototype.toString.call(date) !== '[object Date]') return false;
    const nowUnix  = new Date().getTime(),    // 現在の時刻
          dateUnix = date.getTime(),          // ツイートの時刻
          zeropad = (str, len) => str.toString().padStart(len, '0');
    const yyyy = zeropad(date.getFullYear()    , 4),
            MM = zeropad((date.getMonth()+1)   , 2),
            dd = zeropad(date.getDate()        , 2),
            HH = zeropad(date.getHours()       , 2),
            mm = zeropad(date.getMinutes()     , 2),
            ss = zeropad(date.getSeconds()     , 2),
           SSS = zeropad(date.getMilliseconds(), 3);
    if (isFull) {                             // ↓isFullがtrueのとき、年/月/日 時:分:秒.ミリ秒にする
      return `${yyyy}/${MM}/${dd} ${HH}:${mm}:${ss}.${SSS}`;
    }
    if (nowUnix - dateUnix <= (3600000 * 2)) {// 3600000msec = 1時間 * nで好きな時間にできる
      return `${HH}:${mm}:${ss}.${SSS}`;      // 時:分:秒.ミリ秒
    }
    return `${yyyy}/${MM}/${dd}`;             // その他の処理(いまは年/月/日)
  }
  setInterval(deck, 1000);
})();
