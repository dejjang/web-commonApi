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
        this._screen_size = screen_size;
        this._$root = document.getElementsByClassName("canvas")[0];
        this._aspect_week = new aspect_ratio(screen_size["w"], 7);
        this._aspect_time = new aspect_ratio(screen_size["h"], 25);
        var pos_x = this._aspect_week.getPosition_px(1);
        this._offset_pos = { x: 100, y: 10 };
        this._offset_width = 30;
        this._offset_height = 10;
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
        this.rowHead();
        this.vertical_head();
        this.row_timeline();
        this.current_day_disp(); //요일및 일자 표시
        this.curr_time_line_disp(); //현재시간표시
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
    TIMELINE.prototype.rowHead = function () {
        var _this = this;
        var cell_w = this._aspect_week.getPosition_px(1);
        var cell_h = this._aspect_time.getPosition_px(1);
        this._aspect_week.pOffset = this._offset_width * 2;
        // 좌측 time head offset
        //week
        var key = [
            "x",
            "y",
            "fill",
            "font-size",
            "text-anchor",
            "alignment-baseline",
        ];
        var day_colors = [
            "red",
            "black",
            "black",
            "black",
            "black",
            "black",
            "blue",
        ];
        // 날짜 표시
        var findDate = function (offset_day) {
            if (offset_day === void 0) { offset_day = 0; }
            var day = new Date();
            day.setDate(day.getDate() + offset_day);
            return day.toDateString().split(" ")[2];
        };
        var day_idx = new Date().getDay(); //현재 요일 idx
        var $tmp_wrap = document.createDocumentFragment();
        var week = ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"];
        week.map(function (week, idx) {
            var pos_x = _this._aspect_week.getPosition_px(idx);
            var val = [
                pos_x + _this._offset_width * 4,
                cell_h / 2,
                day_colors[idx],
                "15px",
                "middle",
                "middle",
            ];
            var $node = _this.create_shape("text", key, val);
            $node.textContent = "".concat(findDate(idx - day_idx), "(").concat(week, ")");
            $tmp_wrap.appendChild($node);
        });
        this._$root.appendChild($tmp_wrap);
    };
    TIMELINE.prototype.vertical_head = function () {
        // to do
        var $tmp_wrap = document.createDocumentFragment();
        this._aspect_time.pOffset = this._offset_height;
        var cell_h = this._aspect_time.getPosition_px(1);
        // time head gide line
        var key = ["x1", "y1", "x2", "y2", "stroke", "stroke-width"];
        var val = [
            this._offset_width * 2,
            0,
            this._offset_width * 2,
            this._screen_size["h"],
            "black",
            "0.5px",
        ];
        var $node = this.create_shape("line", key, val);
        $tmp_wrap.appendChild($node);
        // 좌측 time head offset
        key = ["x", "y", "fill", "font-size", "text-anchor", "alignment-baseline"];
        for (var hour = 0; hour < 26; hour++) {
            var pos_y = this._aspect_time.getPosition_px(hour) + cell_h;
            var val_1 = [
                this._offset_width,
                pos_y,
                "black",
                "15px",
                "middle",
                "middle",
            ];
            var $node_1 = this.create_shape("text", key, val_1);
            $node_1.textContent = "".concat(hour.toString().length < 2 ? "0" + hour : hour, "h"); //두자리수 표현
            $tmp_wrap.appendChild($node_1);
        }
        this._$root.appendChild($tmp_wrap);
    };
    TIMELINE.prototype.row_timeline = function () {
        //todo
        var $tmp_wrap = document.createDocumentFragment();
        var cell_h = this._aspect_time.getPosition_px(1);
        var line_size = this._screen_size["w"];
        var key = ["x1", "y1", "x2", "y2", "stroke", "stroke-width"];
        //time line draw
        for (var hour = 0; hour < 25; hour++) {
            var pos_y = this._aspect_time.getPosition_px(hour) + cell_h;
            var val = [0, pos_y, line_size, pos_y, "#1abc9c", "0.2px"];
            var $node = this.create_shape("line", key, val);
            $tmp_wrap.appendChild($node);
        }
        this._$root.appendChild($tmp_wrap);
    };
    TIMELINE.prototype.current_day_disp = function () {
        //todo
        var cur_date = new Date();
        var day_idx = cur_date.getDay();
        var scr_h = this._screen_size["h"];
        var cell_w = this._aspect_week.getPosition_px(1);
        var pos_x = this._aspect_week.getPosition_px(day_idx) + this._offset_width * 2;
        var key = ["x", "height", "y", "width", "fill", "fill-opacity"];
        var val = [pos_x, scr_h, 0, cell_w, "#b2bec3", "0.4"];
        var $node = this.create_shape("rect", key, val);
        var $tmp_wrap = document.createDocumentFragment();
        $tmp_wrap.appendChild($node);
        this._$root.appendChild($tmp_wrap);
    };
    TIMELINE.prototype.curr_time_line_disp = function () {
        //todo
        var $tmp_wrap = document.createDocumentFragment();
        var day_idx = new Date().getDay();
        var curr_hour = new Date().getHours();
        var curr_min = new Date().getMinutes();
        var cell_w = this._aspect_week.getPosition_px(1);
        var cell_h = this._aspect_time.getPosition_px(1);
        this._aspect_time.pOffset = this._offset_height;
        var pos_x = this._aspect_week.getPosition_px(day_idx) + this._offset_width * 2;
        var pos_y = this._aspect_time.getPosition_px(curr_hour) + cell_h; //hour 칸
        var min_ratio = curr_min * (cell_h / 60); //min 칸면적
        var key = ["x1", "y1", "x2", "y2", "stroke", "stroke-width"];
        var val = [
            pos_x,
            pos_y + min_ratio,
            pos_x + cell_w,
            pos_y + min_ratio,
            "#ff0000",
            "1px",
        ];
        var $node = this.create_shape("line", key, val);
        $tmp_wrap.appendChild($node);
        this._$root.appendChild($tmp_wrap);
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
let xmlns = "http://www.w3.org/2000/svg";
let $horizon_line = document.createElementNS(xmlns, "line");
$horizon_line.setAttribute("x1", "0");
$horizon_line.setAttribute("y1", "0");
$horizon_line.setAttribute("x2", "0");
$horizon_line.setAttribute("y2", "100");
$horizon_line.setAttribute("stroke", "black");
$horizon_line.setAttribute("stroke-width", "2px");
*/

})();

/******/ })()
;
//# sourceMappingURL=index.js.map