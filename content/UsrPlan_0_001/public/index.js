/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
var $svg = document.getElementsByClassName("canvas")[0];
//let $svg = document.querySelector(".canvas");
//let CONST_LINE = '<line class="line_{idx}" x1={x1} y1={y1} x2={x2} y2={y2} />';
function replace_html(src, key, val) {
    key.map(function (key, idx) {
        src = src.replace("{".concat(key, "}"), String(val[idx]));
    });
    return src;
}
function create_shape(type, prop, val) {
    var xmlns = "http://www.w3.org/2000/svg";
    var $horizon_line = document.createElementNS(xmlns, type);
    prop.map(function (prop, idx) {
        $horizon_line.setAttribute(prop, String(val[idx]));
    });
    return $horizon_line;
}
var LM = 2;
function main() {
    var $tmp_wrap = document.createDocumentFragment();
    var key = ["x1", "y1", "x2", "y2", "stroke", "stroke-width"];
    var val = [0, 0, 0, 500, "#1abc9c", "1px"];
    // 1. 10개 가로라인 만들기 10px
    for (var i = 0; i < 10; i++) {
        val[0] = val[2] = i * 50 + LM;
        var $node = create_shape("line", key, val);
        $tmp_wrap.appendChild($node);
    }
    // 1. 10개 세로라인 만들기 10px
    val = [0, 0, 500, 0, "#2c3e50", "1px"];
    for (var i = 0; i < 10; i++) {
        val[1] = val[3] = i * 50 + LM;
        var $node = create_shape("line", key, val);
        $tmp_wrap.appendChild($node);
    }
    // 2. 수직라인 만들기 10px
    // 3.
    $svg.appendChild($tmp_wrap);
}
main();
/*
let xmlns = "http://www.w3.org/2000/svg";
let $horizon_line = document.createElementNS(xmlns, "line");
$horizon_line.setAttribute("x1", "0");
$horizon_line.setAttribute("y1", "0");
$horizon_line.setAttribute("x2", "0");
$horizon_line.setAttribute("y2", "100");
$horizon_line.setAttribute("stroke", "black");
$horizon_line.setAttribute("stroke-width", "2px");
*/
// use Fragment
//let $tmp_wrap = document.createDocumentFragment();
//$tmp_wrap.appendChild($horizon_line);
// use appendChild
//$svg.appendChild($horizon_line);
// use innerHTML
//$svg.innerHTML = $horizon_line.outerHTML;

/******/ })()
;
//# sourceMappingURL=index.js.map