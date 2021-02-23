/*!
 * MsecDeck (by taiy)
 * Copyright 2021 taiy https://github.com/taiyme
 * Apache License Version 2.0 https://www.apache.org/licenses/LICENSE-2.0
 * Forked from MarinDeck JS (by taiy) https://github.com/taiyme/marindeck-cssjs
 * Date: 2021-02-23 13:30 JST
 */

//? コマンドメモ: terser -c -m -f 'quote_style=1' --comments '/^!/' -o msecdeck/msecdeck.min.js -- msecdeck/msecdeck.js

{
  'use strict'
  const msecdeck = () => {
    const timestamps = document.querySelectorAll('.tweet-timestamp:not([data-msecdeck=done])')
    if (timestamps.length) {
      for (const timestamp of timestamps) {
        timestamp.classList.remove('js-timestamp')
        timestamp.dataset.msecdeck = 'done'
        const timestampChildren = timestamp.children[0]
        const tsTagName = timestampChildren.tagName.toLowerCase()
        const isLink = tsTagName === 'a'
        if (isLink) {
          const id = Number(timestampChildren.href.split('/')[5])
          const isOldId = id < 100000000000000
          const ts = format(isOldId ? new Date(Number(timestamp.dataset.time)) : snowflake(id))
          timestampChildren.textContent = ts
        }
        const isSpan = tsTagName === 'span'
        if (isSpan) {
          const id = Number(timestamp.dataset.time)
          const ts = format(new Date(id))
          timestampChildren.textContent = ts
        }
      }
    }
    const details = document.querySelectorAll('.tweet-detail>.js-card-container+div.txt-mute>a:first-child:not([data-msecdeck=done])')
    if (details.length) {
      for (const detail of details) {
        detail.dataset.msecdeck = 'done'
        const id = Number(detail.href.split('/')[5])
        const isOldId = id < 100000000000000
        const ts = format(isOldId ? new Date(detail.textContent.replace(/(am|pm)\s·/,'')) : snowflake(id), true)
        detail.textContent = ts
      }
    }
  }
  const snowflake = (tweetId) => {
    const id = tweetId
    const unixtime = Math.floor(id / 4194304) + 1288834974657
    return new Date(unixtime)
  }
  const format = (date, isFull = false) => {
    const nowunix = new Date().getTime()
    const dateunix = date.getTime()
    const zeropad = (date, length) => {
      return date.toString().padStart(length, '0')
    }
    const yyyy = zeropad( date.getFullYear()    , 4)
    const   MM = zeropad((date.getMonth()+1)    , 2)
    const   dd = zeropad( date.getDate()        , 2)
    const   HH = zeropad( date.getHours()       , 2)
    const   mm = zeropad( date.getMinutes()     , 2)
    const   ss = zeropad( date.getSeconds()     , 2)
    const  SSS = zeropad( date.getMilliseconds(), 3)
    const days = `${yyyy}/${MM}/${dd}`
    const msec = `${HH}:${mm}:${ss}.${SSS}`
    const full = `${days} ${msec}`
    if (isFull) {
      return full
    }
    if ((nowunix - dateunix) >= (3600000 * 2)) {
      return days
    }
    return msec
  }
  const body = document.body
  const observer = new MutationObserver(() => {
    msecdeck()
  })
  const config = {
    childList: true,
    attributes: false,
    characterData: false,
    subtree: true
  }
  observer.observe(body, config)
  msecdeck()
}
