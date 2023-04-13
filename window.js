// ==UserScript==
// @name         Window Test
// @version      1.0
// @description  Test
// @author       dragongirlsnout
// @match        https://www.tumblr.com/dashboard
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tumblr.com
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.4.min.js
// ==/UserScript==


'use strict';
var $ = window.jQuery;

function $css() {
    let $style = $("<style>", {id: "safeScrollStyle2"});
    $(document.head).append($style);
    $style.append("#apeture {position: fixed; top: 80px; right: 40px; border-radius: 4px; background-color: white; padding: 8px;} ");
    $style.append(".safeScrollFilterTagList {padding: 0px;} ");
    $style.append(".safeScrollFilterTag {border: 2px solid gainsboro; border-radius: 4px; margin: 2px; padding: 4px; display: inline-block; width: 80%; overflow: hidden;} ");
    $style.append(".safeScrollFilterTag:hover {border-color: cornflowerblue;} ");
}
$css();
function $tag($t, obj) {
    if (obj === "dummy") return
    let $li = $("<li style=\"list-style: none; position: relative;\"></li>");
    $t.append($li);
    let $filterTag = $("<span>", {class: "safeScrollFilterTag"});
    $li.append($filterTag);
    $filterTag.text(obj);
    let $x = $("<span>x</span>");
    $li.append($x);
    $x.css({"display": "inline-block", "position": "absolute", "top": "6px", "right": "8px"});
    $x.click(function() {$t.remove($li);});
    console.log($x);
    let arr = JSON.parse(localStorage.safeScrollFilter);
    let n = arr.indexOf(obj);
    if (n !== -1) {
        arr.splice(n);
    }
    else {console.log("Failed to remove object from array");}
    localStorage.safeScrollFilter = JSON.stringify(arr); 
}

$(function() {
    if (!localStorage.safeScrollFilter) {
        localStorage.setItem("safeScrollFilter", "dummy");
    }
    let $apeture = $("<div>", {id: "apeture"});
    $(document.body).append($apeture);
    $apeture.append("<p>safeScroll settings</p>");
    let $filterList = $("<ul>", {class: "safeScrollFilterTagList"});
    $apeture.append($filterList);
    if (localStorage.safeScrollFilter !== "dummy") {
        let filter = JSON.parse(localStorage.safeScrollFilter);
        filter.sort();
        for (let i of filter) {
            $tag($filterList, i);
        }
    }
    let $input = $("<input>", {name: "safeScrollInput", placeholder: "add new filter item"});
    $apeture.append($input);
    $input.keydown(function(event) {
        if (event.which === 13) {
            let val = $input.val().toLowerCase();
            let arr;
            if (localStorage.safeScrollFilter !== "dummy") {arr = JSON.parse(localStorage.safeScrollFilter);}
            else {arr = [];}
            if (!arr.includes(val)) {
                arr.push(val);
                localStorage.safeScrollFilter = JSON.stringify(arr);
                console.log(`Added ${val} to safeScrollFilter`);
                $tag($filterList, val);
            }
        }
    });
});
