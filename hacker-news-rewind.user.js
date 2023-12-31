// ==UserScript==
// @name         Hacker News Rewind
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  The page be refreshed by moving the filtered start and end dates back by one day. This feature enables you to track the most popular articles for N days in the past.
// @author       Kemal Ogun Isik
// @match        https://hn.algolia.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=news.ycombinator.com
// @require      https://code.jquery.com/jquery-latest.js
// @grant        none
// @unwrap
// ==/UserScript==

/*global $*/

(function() {
    'use strict';

    let urlParams = new URLSearchParams(window.location.search);
    let dateStart = urlParams.get('dateStart');
    let dateEnd = urlParams.get('dateEnd');

    function rewind() {
        let delay = 86400; // One day
        urlParams.set("dateStart", dateStart - delay);
        urlParams.set("dateEnd", dateEnd - delay);
        window.location.search = urlParams.toString();
    }

    var observer = new MutationObserver((r, o) => {
        // wait until the search bar container appears in DOM
        let parents = $(".SearchFilters_filters")
        if (parents.length === 1) {
            if (!(dateStart === null && dateEnd == null)) {
                let parent = parents[0]
                let span = $("<span class='SearchFilters_filterContainer'><button>&lt;-</button></span>").click(rewind);
                parent.appendChild(span[0]);
                o.disconnect();
            }
        }
    })
    observer.observe(document.body, { subtree: true, childList: true })
})();
