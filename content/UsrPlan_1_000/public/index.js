/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/const_html.ts":
/*!*******************************!*\
  !*** ./src/lib/const_html.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


//desciption wnd outlinethe next right
/*
export const CONST_SVG_VIEW_HTML = `
{__indent__}\t<svg class="view_time-line" width="{__scr_w__}" height="{__scr_h__}" >
{__indent__}\t</svg>
`;*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CONST_DESCRIPTION_HTML = void 0;
exports.CONST_DESCRIPTION_HTML = "\n{__indent__}\t\t<div class=\"el_msgbox_tlt\">\n{__indent__}\t\t\t<span class=\"el_txt\">{__name__}</span>\n{__indent__}\t\t</div>\n{__indent__}\t\t<div class=\"el_msgbox_body\">\n{__indent__}\t\t\t<span class=\"el_txt\">\uAE30\uAC04: {__duration__} hour</span>\n{__indent__}\t\t\t<span class=\"el_txt\">\uB0B4\uC6A9: {__plan__}</span>\n{__indent__}\t\t</div>\n";


/***/ }),

/***/ "./src/lib/util.ts":
/*!*************************!*\
  !*** ./src/lib/util.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TIMELINE = exports.aspect_ratio = exports.arrangement_plan = void 0;
var const_html_1 = __webpack_require__(/*! ./const_html */ "./src/lib/const_html.ts");
var COMPILE = "DEBUG"; // 'RELEASE'
var FILENAME = "util.tss";
function ERR_TRACE(filename, classname, funcname) {
    if (filename === void 0) { filename = ""; }
    if (funcname === void 0) { funcname = ""; }
    console.log(COMPILE === "DEBUG"
        ? "[err] ".concat(filename, "/").concat(classname !== null && classname !== void 0 ? classname : "", "/").concat(funcname)
        : "404 error");
}
var arrangement_plan = /** @class */ (function () {
    //constructor
    function arrangement_plan(plan_list) {
        if (plan_list === void 0) { plan_list = []; }
        this._plan_list = plan_list;
        this._sorted_plan_list = [];
    }
    // public begin
    //run
    arrangement_plan.prototype.run = function () {
        var funcname = "run";
        try {
            var before_sort_list = this.init();
            return this.sort_time_intersection(before_sort_list);
        }
        catch (err) {
            debugger;
            ERR_TRACE(FILENAME, arrangement_plan.cls_name, funcname);
            return [];
        }
    };
    // public end
    // private begin
    arrangement_plan.prototype.init = function () {
        var _this = this;
        var funcname = "init";
        try {
            var before_sort_list_1 = [];
            this._plan_list.map(function (plan, idx) {
                var target_day_idx = new Date(plan.start_time).getDay(); //day_idx : 0~6[sun ~ sat];
                var tmp_sort_plan = {
                    id: idx,
                    day_idx: target_day_idx,
                    cell_devide_idx: -1,
                    cell_devide_size: -1,
                    time_duration: _this.getDurationTime(plan),
                    plan_item: plan,
                };
                before_sort_list_1.push(tmp_sort_plan);
            });
            return before_sort_list_1;
        }
        catch (err) {
            ERR_TRACE(FILENAME, arrangement_plan.cls_name, funcname);
            return [];
        }
    };
    arrangement_plan.prototype.sort_time_intersection = function (before_sort_list) {
        var funcname = "check_time_intersection";
        try {
            var intersection_list_1 = [];
            //before_sort_list 를 duration이 작은순으로 sort
            var after_sort_list_1 = before_sort_list.sort(function (a, b) {
                if (a.time_duration > b.time_duration)
                    return 1;
                if (a.time_duration < b.time_duration)
                    return -1;
                if (a.time_duration == b.time_duration)
                    return 0;
                return 0;
            });
            // 인터섹션이 되는 plan을 add
            //오름차순의 sort된 리스트를 순회하며
            after_sort_list_1.map(function (target_plan, tg_idx) {
                //target_plan과 compare_plan의 time intersection 들을 추출
                var intersections = after_sort_list_1.filter(function (compare_plan, cp_idx) {
                    //자기 자신은 skip
                    if (tg_idx === cp_idx)
                        return false;
                    // day가 같고 time 교집합인 체크
                    if (target_plan.day_idx === compare_plan.day_idx &&
                        target_plan.plan_item.start_time <
                            compare_plan.plan_item.end_time &&
                        target_plan.plan_item.end_time > compare_plan.plan_item.start_time)
                        return true;
                });
                intersection_list_1.push({
                    my: target_plan,
                    intersections: intersections,
                });
            });
            // cell_devide_idx 부여
            this.get_cell_devide_idx(intersection_list_1);
            // cell_devide_size 계산
            this.get_cell_devide_size(intersection_list_1);
            return intersection_list_1.map(function (value) {
                return value.my;
            });
        }
        catch (err) {
            debugger;
            ERR_TRACE(FILENAME, arrangement_plan.cls_name, funcname);
            return;
        }
    };
    arrangement_plan.prototype.get_cell_devide_size = function (intersection_list) {
        var funcname = "get_cell_devide_size";
        try {
            //idx들을 SET을 이용하여 size 계산
            var cell_devide_idx_SET_1 = new Map();
            intersection_list.map(function (sort_plan, idx) {
                cell_devide_idx_SET_1.set(sort_plan.my.cell_devide_idx, sort_plan.my.id);
            });
            //각 plan의 SORT_PLANTYPE의 cell_devide_size 에 적용
            intersection_list.map(function (sort_plan, idx) {
                //intersection 0 이면 size 1
                // intersection 0 아니면 cell_devide_idx_SET의 사이즈
                sort_plan.my.cell_devide_size =
                    sort_plan.intersections.length == 0 ? 1 : cell_devide_idx_SET_1.size;
            });
            return;
        }
        catch (err) {
            debugger;
            ERR_TRACE(FILENAME, arrangement_plan.cls_name, funcname);
            return;
        }
    };
    arrangement_plan.prototype.get_cell_devide_idx = function (intersection_list) {
        var funcname = "get_cell_devide_idx";
        try {
            //intersection_list 의 idx를 '-1'값인 Array로 가져간다.
            var idx_list_1 = new Array(intersection_list.length).fill(-1, 0, intersection_list.length);
            //intersection_list를 돌며
            intersection_list.map(function (sort_plan, idx //plan들의 고유 id
            ) {
                var cnt = 0;
                //sort_plan.my의 idx가 -1 일 경우 0
                idx_list_1[sort_plan.my.id] =
                    idx_list_1[sort_plan.my.id] < 0
                        ? 0 //idx_list['id'] 에 cnt 적용
                        : idx_list_1[sort_plan.my.id];
                //sort_plan.my 적용
                sort_plan.my.cell_devide_idx = idx_list_1[sort_plan.my.id];
                //sort_plan. intersections 적용
                sort_plan.intersections.map(function (intersection_plan, idx) {
                    //my의 cell_devide_idx -1 이 아닐경우
                    if (intersection_plan.cell_devide_idx > 0)
                        return;
                    //intersections의 cell_devide_idx -1일경우
                    //idx_list['id'] 에 값이 있는지 확인
                    if (idx_list_1[intersection_plan.id] < 0) {
                        // 값이 -1 이면
                        // idx_list['id'] 에 ++cnt 적용
                        idx_list_1[intersection_plan.id] = ++cnt;
                        // intersections의 cell_devide_idx cnt적용
                        intersection_plan.cell_devide_idx = cnt;
                    }
                    //값이 -1이 아니면
                    // cell_devide_idx 있음
                });
            });
            return;
        }
        catch (err) {
            debugger;
            ERR_TRACE(FILENAME, arrangement_plan.cls_name, funcname);
            return;
        }
    };
    arrangement_plan.prototype.getDurationTime = function (plan_data) {
        var st_time = new Date(plan_data.start_time);
        var ed_time = new Date(plan_data.end_time);
        var duration_ms = Math.abs(ed_time.getTime() - st_time.getTime());
        return duration_ms / (1000 * 3600); //duration_h
    };
    arrangement_plan.cls_name = "re_arrangement_plan";
    return arrangement_plan;
}());
exports.arrangement_plan = arrangement_plan;
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
        this._aspect_week = new aspect_ratio(screen_size["w"], 7);
        this._aspect_time = new aspect_ratio(screen_size["h"], 25);
        this._offset_width = 30;
        this._offset_height = 10;
        this._planSet = [];
        //div의 DJ_time-line에 outline draw
        this.build_outLine();
    }
    // *public begin*
    //['name', 'desc', 'date_start', 'date_end', 'fill_color']
    TIMELINE.prototype.addPlan = function (plan) {
        this._planSet.push(plan);
    };
    TIMELINE.prototype.draw = function () {
        this.rowHead();
        this.vertical_head(); // 요일 column 표시
        this.row_timeline(); //hour tick
        this.current_day_disp(); //요일및 일자 표시
        this.curr_time_line_disp(); //현재시간표시
        this.apply_plan(); //draw rect
        // 루트노드에 view노드 링크
        this._$root.appendChild(this._$view);
        this._$root.appendChild(this._$desc);
        return;
    };
    // *public end*
    // *private begin*
    TIMELINE.prototype.build_outLine = function () {
        //todo
        //root cls:DJ_time-line
        this._$root = document.getElementsByClassName("DJ_time-line")[0];
        //build svg view
        //<svg class="canvas" width="1000" height="2000" ></svg>
        this._$view = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this._$view.setAttribute("class", "view_time-line");
        this._$view.setAttribute("width", "".concat(this._screen_size["w"]));
        this._$view.setAttribute("height", "".concat(this._screen_size["h"]));
        //build description
        this._$desc = document.createElement("div");
        this._$desc.setAttribute("class", "bl_wrap_msgbox");
        this._$desc.innerHTML = const_html_1.CONST_DESCRIPTION_HTML;
    };
    TIMELINE.prototype.apply_plan = function () {
        var _this = this;
        var $tmp_wrap = document.createDocumentFragment();
        //week column
        var sort_cls = new arrangement_plan(this._planSet);
        var sort_plan = sort_cls.run();
        sort_plan.map(function (sort_plan, idx) {
            var week_x = _this.getWeekPos(sort_plan, idx);
            //time line
            var plan_y = _this.getTimeLinePos(sort_plan.plan_item);
            var key = [
                "id",
                "x",
                "height",
                "y",
                "width",
                "fill",
                "fill-opacity",
                "rx",
                "ry",
                "start_time",
                "end_time",
            ];
            var val = [
                "".concat(sort_plan.plan_item.pk),
                week_x["start_x"],
                plan_y["height"],
                plan_y["start_y"],
                week_x["width"],
                "".concat(sort_plan.plan_item.fill),
                "0.4",
                "10",
                "10",
                "".concat(sort_plan.plan_item.start_time),
                "".concat(sort_plan.plan_item.end_time),
            ];
            var $rect = _this.create_shape("rect", key, val);
            $rect.setAttribute("id", "pk_".concat(sort_plan.plan_item.pk));
            //pc evt register
            $rect.addEventListener("mouseenter", _this.onMouseEnter.bind(_this));
            $rect.addEventListener("mouseleave", _this.onMouseLeave.bind(_this));
            //mobile evt register
            $rect.addEventListener("touchend", _this.onTouch.bind(_this));
            $tmp_wrap.appendChild($rect);
        });
        var nodes = $tmp_wrap.childNodes;
        this._$view.appendChild($tmp_wrap);
        return;
    };
    TIMELINE.prototype.update_descitionBox = function (pk_name, st_time) {
        var desc_html = const_html_1.CONST_DESCRIPTION_HTML;
        desc_html = this.set_indent(desc_html, 0);
        //pk_0
        var regfilter = /^pk_(?<pk>\d)$/;
        var reg = pk_name.match(regfilter);
        var pk_num = Number(reg[1]);
        //plan inform register
        //pk번호로 plan 데이터 추출
        var plan_data = this._planSet.filter(function (plan) { return plan.pk === pk_num && plan.start_time === st_time; } //pk고유번호
        )[0];
        //time duration
        var duration_h = this.getDurationTime(plan_data);
        var tags = ["name", "duration", "plan"];
        desc_html = this.replaceHtml(desc_html, tags, [
            "".concat(plan_data.name),
            "".concat(duration_h),
            plan_data.disc,
        ]);
        // update
        var $desc_box = document.getElementsByClassName("bl_wrap_msgbox")[0];
        $desc_box.innerHTML = desc_html;
    };
    TIMELINE.prototype.getDurationTime = function (plan_data) {
        var st_time = new Date(plan_data.start_time);
        var ed_time = new Date(plan_data.end_time);
        var duration_ms = ed_time.getTime() - st_time.getTime();
        return duration_ms / (1000 * 3600); //duration_h
    };
    TIMELINE.prototype.getWeekPos = function (plan, idx) {
        //let usrs = this.another_usr();
        var usr_size = plan.cell_devide_size;
        this._aspect_week.pOffset = this._offset_width * 2;
        var plan_w = (this._aspect_week.getPosition_px(1) / usr_size) * 0.95;
        //usr에따른 plan_w 나누기
        //2개의plan: cell_w에서 1/2의 각 95% 비율 적용
        //3개의plan: cell_w에서 1/3의 각 95% 비율 적용
        //plan_w = (plan_w / usrs.size) * 0.95; //cell_w의 95%
        var cell_w = this._aspect_week.getPosition_px(1);
        var usr_idx = plan.cell_devide_idx;
        var usr_offset = (cell_w / usr_size) * usr_idx;
        //day pos
        var day = new Date(plan.plan_item.start_time).getDay();
        var st_plan_pos = this._aspect_week.getPosition_px(day) +
            this._offset_width * 2 +
            usr_offset; //hour 칸
        return { start_x: st_plan_pos, width: plan_w };
    };
    TIMELINE.prototype.getTimeLinePos = function (plan) {
        //time start
        var cell_h = this._aspect_time.getPosition_px(1);
        var hours = new Date(plan.start_time).getHours();
        var st_pos_y = this._aspect_time.getPosition_px(hours) + cell_h; //hour 칸
        var min = new Date(plan.start_time).getMinutes();
        var st_min = min * (cell_h / 60); //min 칸면적
        //time end
        hours = new Date(plan.end_time).getHours();
        var ed_pos_y = this._aspect_time.getPosition_px(hours) + cell_h; //hour 칸
        min = new Date(plan.end_time).getMinutes();
        var ed_min = min * (cell_h / 60); //min 칸면적
        // calcul height
        var st_pos = st_pos_y + st_min;
        var height = ed_pos_y + ed_min - (st_pos_y + st_min);
        return { start_y: st_pos, height: height };
    };
    TIMELINE.prototype.set_indent = function (html, tap_num) {
        var indents = new Array(1);
        indents = indents.fill("\t", 0, 1);
        return html.replace(/{__indent__}/g, indents.join());
    };
    TIMELINE.prototype.replaceHtml = function (html, find_tags, vals) {
        //todo
        find_tags.map(function (tag, idx) {
            html = html.replace("{__".concat(tag, "__}"), "".concat(vals[idx]));
        });
        return html;
    };
    // 다른 유저의 중첩 일정 갯수
    TIMELINE.prototype.another_usr = function () {
        //todo
        //svg 에 올려진 all plan
        var usr_map = new Map();
        var cnt = 0;
        this._planSet.forEach(function (val, idx) {
            if (usr_map.has(val.pk))
                usr_map.set(val.pk, [val.name, cnt++]); //같은 pk 일경우
            else
                usr_map.set(val.pk, [val.name, cnt++]); //다른 pk 일 경우
        });
        return usr_map;
    };
    TIMELINE.prototype.create_shape = function (type, prop, val) {
        var xmlns = "http://www.w3.org/2000/svg";
        var $element = document.createElementNS(xmlns, type);
        prop.map(function (prop, idx) {
            $element.setAttribute(prop, String(val[idx]));
        });
        return $element;
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
        this._$view.appendChild($tmp_wrap);
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
        this._$view.appendChild($tmp_wrap);
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
        this._$view.appendChild($tmp_wrap);
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
        this._$view.appendChild($tmp_wrap);
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
        this._$view.appendChild($tmp_wrap);
    };
    // *private end*
    //ver1.000
    // *callback begin*
    //e: TouchEvent
    //e: MouseEvent
    TIMELINE.prototype.onMouseEnter = function (e) {
        //todo
        //plan 설명 창
        //msg view position
        var $rect = e.target;
        var margin = 5;
        var pos_x = Number($rect.attributes[1].nodeValue) +
            Number($rect.attributes[4].nodeValue) +
            margin;
        var $msg = document.querySelector(".bl_wrap_msgbox");
        $msg.style.display = "block";
        $msg.style.top = "".concat(e.clientY, "px");
        $msg.style.left = "".concat(pos_x, "px");
        //update plan
        var pk_name = $rect.attributes[0].nodeValue;
        var st_time = $rect.attributes[9].nodeValue;
        this.update_descitionBox(pk_name, st_time);
    };
    TIMELINE.prototype.onMouseLeave = function (e) {
        //todo
        //msg window
        var $msg = document.querySelector(".bl_wrap_msgbox");
        $msg.style.display = "none";
    };
    //mobile event begin
    TIMELINE.prototype.onTouch = function (e) {
        //todo
        var $rect = e.target;
        var margin = 5;
        var pos_x = Number($rect.attributes[1].nodeValue) +
            Number($rect.attributes[4].nodeValue) +
            margin;
        var $msg = document.querySelector(".bl_wrap_msgbox");
        $msg.style.display = "block";
        $msg.style.top = "".concat(e.changedTouches[0].clientY, "px");
        $msg.style.left = "".concat(pos_x, "px");
        //update plan
        var pk_name = $rect.attributes[0].nodeValue;
        var st_time = $rect.attributes[9].nodeValue;
        this.update_descitionBox(pk_name, st_time);
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
    var tl = new util_1.TIMELINE({ w: 1000, h: 2000 });
    var my_plan = {
        pk: 0,
        cls: "plan",
        name: "홍길동",
        disc: "무술훈련",
        start_time: "2022-05-29T01:00:00",
        end_time: "2022-05-29T01:30:00",
        color: "white",
        fill: "blue",
    }; //'name', 'discription', 'start_time', 'end_time'
    tl.addPlan(my_plan);
    var my_plan2 = {
        pk: 0,
        cls: "plan",
        name: "홍길동",
        disc: "청소하기",
        start_time: "2022-05-29T03:00:00",
        end_time: "2022-05-29T04:00:00",
        color: "white",
        fill: "blue",
    }; //'name', 'discription', 'start_time', 'end_time'
    tl.addPlan(my_plan2);
    var my_plan3 = {
        pk: 1,
        cls: "plan",
        name: "이순신",
        disc: "거북선만들기",
        start_time: "2022-05-29T01:00:00",
        end_time: "2022-05-29T06:00:00",
        color: "white",
        fill: "red",
    }; //'name', 'discription', 'start_time', 'end_time'
    tl.addPlan(my_plan3);
    var my_plan4 = {
        pk: 1,
        cls: "plan",
        name: "이순신",
        disc: "거북선테스트",
        start_time: "2022-05-29T06:00:00",
        end_time: "2022-05-29T07:00:00",
        color: "white",
        fill: "red",
    }; //'name', 'discription', 'start_time', 'end_time'
    tl.addPlan(my_plan4);
    var my_plan5 = {
        pk: 0,
        cls: "plan",
        name: "홍길동",
        disc: "근두운연습",
        start_time: "2022-05-29T07:00:00",
        end_time: "2022-05-29T08:00:00",
        color: "white",
        fill: "blue",
    }; //'name', 'discription', 'start_time', 'end_time'
    tl.addPlan(my_plan5);
    var my_plan6 = {
        pk: 1,
        cls: "plan",
        name: "이순신",
        disc: "훈시",
        start_time: "2022-05-29T07:00:00",
        end_time: "2022-05-29T08:00:00",
        color: "white",
        fill: "red",
    }; //'name', 'discription', 'start_time', 'end_time'
    tl.addPlan(my_plan6);
    var my_plan7 = {
        pk: 2,
        cls: "plan",
        name: "유관순",
        disc: "태극기만들기",
        start_time: "2022-05-29T07:00:00",
        end_time: "2022-05-29T08:00:00",
        color: "white",
        fill: "black",
    }; //'name', 'discription', 'start_time', 'end_time'
    tl.addPlan(my_plan7);
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