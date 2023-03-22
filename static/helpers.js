"use strict";if(Array.prototype.find=Array.prototype.find||function(e){return this.filter(e)[0]},Array.from=Array.from||function(e){return Array.prototype.slice.call(e)},NodeList.prototype.forEach=NodeList.prototype.forEach||function(e){Array.from(this).forEach(e)},String.prototype.includes=String.prototype.includes||function(e){return this.indexOf(e)>=0},String.prototype.startsWith=String.prototype.startsWith||function(e){return this.substr(0,e.length)===e},Math.sign=Math.sign||function(e){return(e=+e)?e>0?1:-1:e},!window.hasOwnProperty("HTMLDetailsElement")&&!window.hasOwnProperty("mockHTMLDetailsElement")){window.mockHTMLDetailsElement=!0;const e="details:not([open]) > :not(summary) {display: none}";document.head.appendChild(document.createElement("style")).textContent=e,addEventListener("click",(function(e){if("SUMMARY"!==e.target.nodeName)return;const t=e.target.parentElement;t.hasAttribute("open")?t.removeAttribute("open"):t.setAttribute("open","")}))}window.helpers=window.helpers||{clamp:function(e,t,o){if(o<t){var n=o;o=t,t=n}return o<e?o:t>e?t:e},_xhr:function(e,t,o,n){const r=new XMLHttpRequest;r.open(e,t),r.responseType="json",r.timeout=1e4,o.responseType&&(r.responseType=o.responseType),o.timeout&&(r.timeout=o.timeout),"POST"===e&&r.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),r.onloadend=function(){if(200===r.status)n.on200&&(""===r.responseType&&"string"==typeof r.response?n.on200(JSON.parse(r.response)):n.on200(r.response));else{if(0===r.status)return;n.onNon200&&n.onNon200(r)}},r.ontimeout=function(){n.onTimeout&&n.onTimeout(r)},r.onerror=function(){n.onError&&n.onError(r)},o.payload?r.send(o.payload):r.send()},_xhrRetry:function(e,t,o,n){if(o.retries<=0)return console.warn("Failed to pull",o.entity_name),void(n.onTotalFail&&n.onTotalFail());helpers._xhr(e,t,o,n)},xhr:function(e,t,o,n){if(!o.retries||o.retries<=1)return void helpers._xhr(e,t,o,n);o.entity_name||(o.entity_name="unknown"),o.retry_timeout||(o.retry_timeout=1e3);const r=o.retries;let i=1;const s=function(){console.warn("Pulling "+o.entity_name+" failed... "+i+++"/"+r),setTimeout((function(){o.retries--,helpers._xhrRetry(e,t,o,n)}),o.retry_timeout)};n._onError=n.onError,n.onError=function(e){n._onError&&n._onError(e),s()},n._onTimeout=n.onTimeout,n.onTimeout=function(e){n._onTimeout&&n._onTimeout(e),s()},helpers._xhrRetry(e,t,o,n)},storage:function(){let e=!1;try{e=!!localStorage.setItem}catch(e){}return e?{get:function(e){if(localStorage[e])try{return JSON.parse(decodeURIComponent(localStorage[e]))}catch(t){helpers.storage.remove(e)}},set:function(e,t){localStorage[e]=encodeURIComponent(JSON.stringify(t))},remove:function(e){localStorage.removeItem(e)}}:(console.info("Storage: localStorage is disabled or unaccessible. Cookies used as fallback"),{get:function(e){const t=e+"=",o=document.cookie.split("; ").find((function(e){return e.startsWith(t)}));if(o){const n=o.replace(t,"");if(0===n.length)return;try{return JSON.parse(decodeURIComponent(n))}catch(t){helpers.storage.remove(e)}}},set:function(e,t){const o=encodeURIComponent(JSON.stringify(t)),n=new Date;n.setFullYear(n.getFullYear()+2),document.cookie=e+"="+o+"; expires="+n.toGMTString()},remove:function(e){document.cookie=e+"=; Max-Age=0"}})}()};