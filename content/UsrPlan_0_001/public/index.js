/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/util.ts":
/*!*************************!*\
  !*** ./src/lib/util.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.aspect_ratio = void 0;
var aspect_ratio = /** @class */ (function () {
    function aspect_ratio(screen_size, disp_size, offset) {
        if (offset === void 0) { offset = 0; }
        this._screen_size = screen_size;
        this._disp_size = disp_size;
        this._offset = offset;
        this.calcul_ratio();
    }
    Object.defineProperty(aspect_ratio.prototype, "pOffset", {
        // *property*
        get: function () {
            return this._offset;
        },
        enumerable: false,
        configurable: true
    });
    // set pOffset(value: number) {
    //   this._offset = value;
    // }
    // *public begin*
    aspect_ratio.prototype.getPosition_px = function (pos_space) {
        return pos_space * this._ratio_px + this._offset;
    };
    // *public end*
    // *private begin*
    aspect_ratio.prototype.calcul_ratio = function () {
        this._ratio_px = (this._screen_size - this._offset) / this._disp_size;
    };
    return aspect_ratio;
}());
exports.aspect_ratio = aspect_ratio;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var util_1 = __webpack_require__(/*! ./lib/util */ "./src/lib/util.ts");
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
function main2() {
    // aspect ratio'
    var offset = 10;
    var scr_w = $svg.clientWidth;
    var scr_h = $svg.clientHeight - offset;
    var aspect_w = new util_1.aspect_ratio(scr_w, 7); //월~일 (7의배수)
    var aspect_h = new util_1.aspect_ratio(scr_h, 24, offset); //0h~24h (24의 배수)
    var pos_x = aspect_w.getPosition_px(1);
    var pos_y = aspect_h.getPosition_px(24);
    //let screen_h = $svg.clientHeight; //px
    var key = ["x1", "y1", "x2", "y2", "stroke", "stroke-width"];
    var val = [0, pos_y, 500, pos_y, "#1abc9c", "2px"];
    var $node = create_shape("line", key, val);
    var $tmp_wrap = document.createDocumentFragment();
    $tmp_wrap.appendChild($node);
    $svg.appendChild($tmp_wrap);
}
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
main2();
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

})();

/******/ })()
;
//# sourceMappingURL=index.js.map