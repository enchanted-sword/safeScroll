// ==UserScript==
// @name         safeScroll
// @version      1.2.3
// @description  Test
// @author       dragongirlsnout
// @match        https://www.tumblr.com/dashboard
// @icon         https://raw.githubusercontent.com/enchanted-sword/safeScroll/main/Icon.png
// @downloadURL  https://raw.githubusercontent.com/enchanted-sword/safeScroll/main/safeScroll.js
// @updateURL    https://raw.githubusercontent.com/enchanted-sword/safeScroll/main/safeScroll.js
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.4.min.js
// ==/UserScript==


'use strict';
var $ = window.jQuery;

function $css() {
    let $style = $("<style>", {id: "safeScrollStyle"});
    $(document.head).append($style);
    $style.append("#sSIcon {position: fixed; top: 88px; right: 48px; z-index: 69;}")
    $style.append("#apeture {width: 240px; position: fixed; top: 80px; right: 40px; border-radius: 4px; background-color: white; padding: 8px;} ");
    $style.append(".safeScrollFilterTagList {padding: 0px; max-height: 240px; overflow-y: scroll;} ");
    $style.append(".safeScrollFilterTag {border: 2px solid gainsboro; border-radius: 4px; margin-bottom: 4px; padding: 4px; display: inline-block; width: 100%; overflow: hidden;} ");
    $style.append(".safeScrollFilterTag:hover {border-color: cornflowerblue;} ");
    $style.append("#sSI {all: unset; background-color: gainsboro; border-radius: 4px; width: 208px; padding: 3px; margin-top: 4px;} ");
    if (localStorage.safeScrollFilterStyle && localStorage.safeScrollFilterStyle === "hide") {
        $style.append(".filterDiv {display: none;} " );
        $style.append(".safeScrollNotice {height: 40px; padding-top: 40px; background-image: linear-gradient(45deg, #ff94ff, #0094ff); text-align: center; cursor: pointer;} ");
        $style.append(".safeScrollNotice:hover {opacity: 0.8}");
    }
    else {$style.append(".filterDiv {position: relative; filter: blur(20px); transition: filter 0.5s;}" );}
    $style.append(".safeScrollCover {pointer-events: auto; position: absolute; opacity: 0.8; transition: opacity 0.6s; top: 0px; left: 0px; background-image: linear-gradient(45deg, #ff94ff, #0094ff);}" );
    $style.append(".boldHeader {font-size: 112%; display: block; margin-bottom: 8px;}");
}

$css();

function $tag($t, obj) {
    if (obj === "dummy") return
    let $filterTag = $("<button>", {type: "button", name: `button${obj}`, class: "safeScrollFilterTag"});
    $t.append($filterTag);
    $filterTag.text(obj);
    $filterTag.dblclick(function() {
        $filterTag.hide("slow");
        let arr = JSON.parse(localStorage.safeScrollFilter);
        let n = arr.indexOf(obj);
        if (n !== -1) {
            arr.splice(n);
        }
        else throw "Failed to remove object from array";
        localStorage.safeScrollFilter = JSON.stringify(arr);
    });
}

function tagSearch(items, filters) {
    for (let x of filters) {
        if (items.indexOf(x) !== -1) {
            return true;
        }
        else continue;
    }
    return false;
}

function fill(HTMLCol, arr) {
    for (let i = 0; i < HTMLCol.length; ++i) {
        arr.push(HTMLCol.eq(i).text().toLowerCase());
    }
}

function filter() {
    let filterTags = JSON.parse(localStorage.safeScrollFilter);
    let filterStyle = localStorage.safeScrollFilterStyle;
    if (filterStyle === "disable") {return}
    let posts = $(".j8ha0").find(".FtjPK:not(.safeScrollFiltered, .safeScrollSafe)");
    for (let i = 0; i < posts.length; ++i) {
        let post = posts.eq(i);
        let items = [];
        let bsug4 = post.find(".BSUG4");
        let ksdlh = post.find(".KSDLH");
        let sqhc2 = post.find(".sqHC2");
        let kwflb = post.find(".KWFLb");
        fill(bsug4, items);
        fill(sqhc2, items);
        fill(ksdlh, items);
        if (kwflb.length > 0 || tagSearch(items, filterTags)) {
            post.addClass("safeScrollFiltered");
            let contents = post.find(".GzjsW, .k31gt");
            for (let l in contents) {
                let content = contents.eq(l);
                content.addClass("filterDiv");
                if (filterStyle === "default") {
                    let cover = $("<div>", {class: "safeScrollCover"});
                    content.append(cover);
                    cover.css({width: `${content.width()}`, height: `${content.height()}`});
                    content.mouseenter(function() {
                        content.css("filter", "none");
                        cover.hide();
                        cover.css({pointerEvents: "none", opacity: "0"});
                    });
                    content.mouseleave(function() {
                        content.css("filter", "blur(20px)");
                        cover.show();
                        cover.css({pointerEvents: "none", opacity: "0.8"});
                    });
                }
                else if (filterStyle === "blur") {
                    content.mouseenter(function() {
                        content.css("filter", "none");
                    });
                    content.mouseleave(function() {
                        content.css("filter", "blur(20px)");
                    });
                }
                else if (filterStyle === "hide") {
                    let notice = $("<div>", {class: "safeScrollNotice"});
                    content.parent().append(notice);
                    notice.text("click to show hidden content");
                    notice.click(function() {
                        content.show("slow");
                        notice.hide("slow");
                    });
                }
            }
        }
        else {
            post.addClass("safeScrollSafe");
        }
    }
}

$(function() {
    if (!localStorage.safeScrollFilter) {
        localStorage.setItem("safeScrollFilter", "dummy");
    }
    if (!localStorage.safeScrollFilterStyle) {
        localStorage.setItem("safeScrollFilterStyle", "default");
    }
    let $icon = $("<img>", {src: "https://raw.githubusercontent.com/enchanted-sword/safeScroll/main/Icon.png", width: 24, height: 24, id: "sSIcon"});
    $icon.click(function() {
        $apeture.toggle("slow");
    });
    $(document.body).append($icon);
    let $apeture = $("<div>", {id: "apeture"});
    $apeture.hide();
    $(document.body).append($apeture);
    $apeture.append("<b class=\'boldHeader\' style=\'font-size: 128%;\'>safeScroll settings</b>");
    $apeture.append("<b class=\'boldHeader\'>filter list</b>");
    $apeture.append("<p style=\'font-size: 69%;\'>tags should be prefixed with #</p>");
    $apeture.append("<p style=\'font-size: 69%;\'>double-click an item to remove it from the filter</p>");
    let $filterList = $("<div>", {class: "safeScrollFilterTagList"});
    $apeture.append($filterList);
    if (localStorage.safeScrollFilter !== "dummy") {
        let filter = JSON.parse(localStorage.safeScrollFilter);
        filter.sort();
        for (let i of filter) {
            $tag($filterList, i);
        }
    }
    let $input = $("<input>", {name: "safeScrollInput", placeholder: "add new filter item", id: "sSI"});
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
                $input.val("");

            }
        }
    });
    let $plus = $("<span>");
    $plus.text("\u2795");
    $plus.css({cursor: "pointer", display: "inline-block", height: "25px", marginLeft: "4px"});
    $apeture.append($plus);
    $plus.click(function() {
        let val = $input.val().toLowerCase();
        if (!val) return
        let arr;
        if (localStorage.safeScrollFilter !== "dummy") {arr = JSON.parse(localStorage.safeScrollFilter);}
        else {arr = [];}
        if (!arr.includes(val)) {
            arr.push(val);
            localStorage.safeScrollFilter = JSON.stringify(arr);
            console.log(`Added ${val} to safeScrollFilter`);
            $tag($filterList, val);
            $input.val("");
        }
    });
    $apeture.append("<b class=\'boldHeader\'>filter style</b>");
    $apeture.append("<p style=\'font-size: 69%;\'>reload the page to update filter style</p>");
    let $styleForm = $("<form>", {id: "safeScrollStyleForm"});
    $apeture.append($styleForm);
    let $radio0 = $("<input>", {type: "radio", id: "safeScrollStyleInput0", name: "safeScrollStyleInput", value: "default"});
    $styleForm.append($radio0);
    $radio0.focus(function() {
        localStorage.safeScrollFilterStyle = "default";
    });
    let $label0 = $(`<label><b>default:</b><br><span style="margin-left: 22px;">blur + translucent overlay</span></label><br>`);
    $styleForm.append($label0);
    let $radio1 = $("<input>", {type: "radio", id: "safeScrollStyleInput1", name: "safeScrollStyleInput", value: "blur"});
    $styleForm.append($radio1);
    $radio1.focus(function() {
        localStorage.safeScrollFilterStyle = "blur";
    });
    $radio1.css("margin-top", "16px");
    let $label1 = $(`<label><b>blur:</b><br><span style="margin-left: 22px;">blur only</span></label><br>`);
    $styleForm.append($label1);
    let $radio2 = $("<input>", {type: "radio", id: "safeScrollStyleInput2", name: "safeScrollStyleInput", value: "hide"});
    $styleForm.append($radio2);
    $radio2.focus(function() {
        localStorage.safeScrollFilterStyle = "hide";
    });
    $radio2.css("margin-top", "16px");
    let $label2 = $(`<label><b>hide:</b><br><span style="margin-left: 22px;">hide content of filtered posts</span></label><br>`);
    $styleForm.append($label2);
    let $radio3 = $("<input>", {type: "radio", id: "safeScrollStyleInput3", name: "safeScrollStyleInput", value: "disable"});
    $styleForm.append($radio3);
    $radio3.focus(function() {
        localStorage.safeScrollFilterStyle = "disable";
    });
    $radio3.css("margin-top", "16px");
    let $label3 = $(`<label><b>disable:</b><br><span style="margin-left: 22px;">disable filtering</span></label><br>`);
    $styleForm.append($label3);
    $(`input[value='${localStorage.safeScrollFilterStyle}']`).attr("checked", "true");
    $(document).ready(filter);
    $(window).on("load", filter);
    $(document).scroll(filter);
});
