/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/util.ts":
/*!*************************!*\
  !*** ./src/lib/util.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIMELINE = exports.aspect_ratio = void 0;
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
        set: function (value) {
            this._offset = value;
            this.calcul_ratio();
        },
        enumerable: false,
        configurable: true
    });
    // *public begin*
    aspect_ratio.prototype.getPosition_px = function (pos_space) {
        return pos_space * this._ratio_px;
    };
    // *public end*
    // *private begin*
    aspect_ratio.prototype.calcul_ratio = function () {
        this._ratio_px = (this._screen_size - this._offset) / this._disp_size;
    };
    return aspect_ratio;
}());
exports.aspect_ratio = aspect_ratio;
var TIMELINE = /** @class */ (function () {
    function TIMELINE(screen_size) {
        this._$root = document.getElementsByClassName("canvas")[0];
        this._aspect_week = new aspect_ratio(screen_size["w"], 7);
        this._aspect_time = new aspect_ratio(screen_size["h"], 24);
        var pos_x = this._aspect_week.getPosition_px(1);
        this._offset_pos = { x: 100, y: 10 };
        /*
        let key = ["x", "height", "y", "width", "fill"];
        let val = [offset_x * 1, screen_size["h"] + offset_y, 0, pos_x, "#b2bec3"];
        let $node: Element = this.create_shape("rect", key, val);
        let $tmp_wrap = document.createDocumentFragment();
        $tmp_wrap.appendChild($node);
        $svg.appendChild($tmp_wrap);
        */
    }
    // *public begin*
    //LDH8282 func: addplan(['name', 'desc', 'date_start', 'date_end', 'fill_color'])
    TIMELINE.prototype.draw = function () {
        var days = [1, 2, 3, 4, 5, 6, 7];
        this.rowHead(days);
        this.vertical_head();
        return;
    };
    // *public end*
    // *private begin*
    TIMELINE.prototype.create_shape = function (type, prop, val) {
        var xmlns = "http://www.w3.org/2000/svg";
        var $horizon_line = document.createElementNS(xmlns, type);
        prop.map(function (prop, idx) {
            $horizon_line.setAttribute(prop, String(val[idx]));
        });
        return $horizon_line;
    };
    // 7개의 요일 표시
    TIMELINE.prototype.rowHead = function (days) {
        var _this = this;
        var $tmp_wrap = document.createDocumentFragment();
        var week = ["일", "월", "화", "수", "목", "금", "토"];
        var cell_w = this._aspect_week.getPosition_px(1);
        var cell_h = 30;
        // 좌측 time head offset
        var offset_w = 50;
        this._aspect_week.pOffset = offset_w;
        //week
        var key = ["x", "y", "fill", "font-size", "text-anchor"];
        week.map(function (week, idx) {
            var pos_x = _this._aspect_week.getPosition_px(idx) + offset_w;
            var val = [pos_x + cell_w / 2, cell_h, "black", "15px", "middle"];
            var $node = _this.create_shape("text", key, val);
            $node.textContent = "".concat(days[idx], "(").concat(week, ")");
            $tmp_wrap.appendChild($node);
        });
        this._$root.appendChild($tmp_wrap);
    };
    TIMELINE.prototype.vertical_head = function () {
        // to do
    };
    return TIMELINE;
}());
exports.TIMELINE = TIMELINE;


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
function main3() {
    var $svg = document.getElementsByClassName("canvas")[0];
    var scr_w = $svg.clientWidth;
    var scr_h = $svg.clientHeight;
    var tl = new util_1.TIMELINE({ w: scr_w, h: scr_h });
    tl.draw();
}
main3();
/*
function main2() {
  // aspect ratio'
  let offset = 10;
  let scr_w = $svg.clientWidth;
  let scr_h = $svg.clientHeight - offset;

  let aspect_w = new aspect_ratio(scr_w, 7); //월~일 (7의배수)
  let aspect_h = new aspect_ratio(scr_h, 24, offset); //0h~24h (24의 배수)

  //column 칸
  let pos_x = aspect_w.getPosition_px(1);
  let key = ["x", "height", "y", "width", "fill"];
  let val = [pos_x * 1, scr_h + offset, 0, pos_x, "#b2bec3"];
  let $node: Element = create_shape("rect", key, val);
  let $tmp_wrap = document.createDocumentFragment();
  $tmp_wrap.appendChild($node);

  // 요일 표시
  //mon
  let cell_w = aspect_w.getPosition_px(1);
  pos_x = aspect_w.getPosition_px(0);
  key = ["x", "y", "fill", "font-size", "text-anchor"];
  val = [pos_x + cell_w / 2, 10 + offset, "black", "15px", "middle"];
  $node = create_shape("text", key, val);
  $node.textContent = "월";
  $tmp_wrap.appendChild($node);

  //tue
  pos_x = aspect_w.getPosition_px(1);
  key = ["x", "y", "fill", "font-size", "text-anchor"];
  val = [pos_x + cell_w / 2, 10 + offset, "black", "15px", "middle"];
  $node = create_shape("text", key, val);
  $node.textContent = "화";
  $tmp_wrap.appendChild($node);

  //wen
  pos_x = aspect_w.getPosition_px(2);
  key = ["x", "y", "fill", "font-size", "text-anchor"];
  val = [pos_x + cell_w / 2, 10 + offset, "black", "15px", "middle"];
  $node = create_shape("text", key, val);
  $node.textContent = "수";
  $tmp_wrap.appendChild($node);

  //row

  //let screen_h = $svg.clientHeight; //px
  for (let i = 1; i < 25; i++) {
    let pos_y = aspect_h.getPosition_px(i);
    key = ["x1", "y1", "x2", "y2", "stroke", "stroke-width"];
    val = [0, pos_y, 550, pos_y, "#dfe6e9", "px"];
    $node = create_shape("line", key, val);
    $tmp_wrap.appendChild($node);
  }

  $svg.appendChild($tmp_wrap);
}

function main() {
  let $tmp_wrap = document.createDocumentFragment();
  let key = ["x1", "y1", "x2", "y2", "stroke", "stroke-width"];
  let val = [0, 0, 0, 500, "#1abc9c", "1px"];

  // 1. 10개 가로라인 만들기 10px
  for (let i = 0; i < 10; i++) {
    val[0] = val[2] = i * 50 + LM;
    let $node: Element = create_shape("line", key, val);

    $tmp_wrap.appendChild($node);
  }

  // 1. 10개 세로라인 만들기 10px
  val = [0, 0, 500, 0, "#2c3e50", "1px"];
  for (let i = 0; i < 10; i++) {
    val[1] = val[3] = i * 50 + LM;
    let $node: Element = create_shape("line", key, val);

    $tmp_wrap.appendChild($node);
  }

  // 2. 수직라인 만들기 10px
  // 3.
  $svg.appendChild($tmp_wrap);
}
*/
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