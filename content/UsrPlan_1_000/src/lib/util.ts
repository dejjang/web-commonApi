import { CONST_DESCRIPTION_HTML } from "./const_html";
var COMPILE = "DEBUG"; // 'RELEASE'
const FILENAME = "util.tss";
function ERR_TRACE(
  filename: string = "",
  classname?: string,
  funcname: string = ""
): void {
  console.log(
    COMPILE === "DEBUG"
      ? `[err] ${filename}/${classname ?? ""}/${funcname}`
      : `404 error`
  );
}

export type PLANTYPE = {
  pk: number;
  cls: string;
  name: string;
  disc: string;
  start_time: string;
  end_time: string;
  color: string;
  fill: string;
}; //'name', 'discription', 'start_time', 'end_time'

type SORT_PLANTYPE = {
  id: number;
  day_idx: number;
  cell_devide_idx: number;
  cell_devide_size: number;
  time_duration: number;
  plan_item: PLANTYPE;
};
export class arrangement_plan {
  static cls_name = "re_arrangement_plan";
  private _plan_list: PLANTYPE[];
  private _sorted_plan_list: SORT_PLANTYPE[];

  //constructor
  constructor(plan_list: PLANTYPE[] = []) {
    this._plan_list = plan_list;
    this._sorted_plan_list = [];
  }
  // public begin

  //run
  public run(): SORT_PLANTYPE[] {
    let funcname: string = "run";
    try {
      let before_sort_list: SORT_PLANTYPE[] = this.init();
      return this.sort_time_intersection(before_sort_list);
    } catch (err) {
      debugger;
      ERR_TRACE(FILENAME, arrangement_plan.cls_name, funcname);
      return [];
    }
  }
  // public end

  // private begin
  private init(): SORT_PLANTYPE[] {
    const funcname = "init";
    try {
      let before_sort_list = [];
      this._plan_list.map((plan: PLANTYPE, idx: number) => {
        let target_day_idx: number = new Date(plan.start_time).getDay(); //day_idx : 0~6[sun ~ sat];
        let tmp_sort_plan: SORT_PLANTYPE = {
          id: idx,
          day_idx: target_day_idx,
          cell_devide_idx: -1,
          cell_devide_size: -1,
          time_duration: this.getDurationTime(plan),
          plan_item: plan,
        };
        before_sort_list.push(tmp_sort_plan);
      });
      return before_sort_list;
    } catch (err) {
      ERR_TRACE(FILENAME, arrangement_plan.cls_name, funcname);
      return [];
    }
  }
  private sort_time_intersection(
    before_sort_list: SORT_PLANTYPE[]
  ): SORT_PLANTYPE[] {
    let funcname: string = "check_time_intersection";

    try {
      let intersection_list: {
        my: SORT_PLANTYPE;
        intersections: SORT_PLANTYPE[];
      }[] = [];
      //before_sort_list 를 duration이 작은순으로 sort
      let after_sort_list = before_sort_list.sort(
        (a: SORT_PLANTYPE, b: SORT_PLANTYPE) => {
          if (a.time_duration > b.time_duration) return 1;
          if (a.time_duration < b.time_duration) return -1;
          if (a.time_duration == b.time_duration) return 0;
          return 0;
        }
      );

      // 인터섹션이 되는 plan을 add
      //오름차순의 sort된 리스트를 순회하며
      after_sort_list.map((target_plan: SORT_PLANTYPE, tg_idx: number) => {
        //target_plan과 compare_plan의 time intersection 들을 추출
        let intersections: SORT_PLANTYPE[] = after_sort_list.filter(
          (compare_plan: SORT_PLANTYPE, cp_idx: number) => {
            //자기 자신은 skip
            if (tg_idx === cp_idx) return false;

            // day가 같고 time 교집합인 체크
            if (
              target_plan.day_idx === compare_plan.day_idx &&
              target_plan.plan_item.start_time <
                compare_plan.plan_item.end_time &&
              target_plan.plan_item.end_time > compare_plan.plan_item.start_time
            )
              return true;
          }
        );
        intersection_list.push({
          my: target_plan,
          intersections: intersections,
        });
      });
      // cell_devide_idx 부여
      this.get_cell_devide_idx(intersection_list);
      // cell_devide_size 계산
      this.get_cell_devide_size(intersection_list);

      return intersection_list.map(
        (value: { my: SORT_PLANTYPE; intersections: SORT_PLANTYPE[] }) => {
          return value.my;
        }
      );
    } catch (err) {
      debugger;
      ERR_TRACE(FILENAME, arrangement_plan.cls_name, funcname);
      return;
    }
  }
  private get_cell_devide_size(
    intersection_list: {
      my: SORT_PLANTYPE;
      intersections: SORT_PLANTYPE[];
    }[]
  ): void {
    const funcname = "get_cell_devide_size";
    try {
      //idx들을 SET을 이용하여 size 계산
      let cell_devide_idx_SET = new Map<number, number>();
      intersection_list.map(
        (
          sort_plan: { my: SORT_PLANTYPE; intersections: SORT_PLANTYPE[] },
          idx: number
        ) => {
          cell_devide_idx_SET.set(
            sort_plan.my.cell_devide_idx,
            sort_plan.my.id
          );
        }
      );
      //각 plan의 SORT_PLANTYPE의 cell_devide_size 에 적용
      intersection_list.map(
        (
          sort_plan: { my: SORT_PLANTYPE; intersections: SORT_PLANTYPE[] },
          idx: number
        ) => {
          //intersection 0 이면 size 1
          // intersection 0 아니면 cell_devide_idx_SET의 사이즈
          sort_plan.my.cell_devide_size =
            sort_plan.intersections.length == 0 ? 1 : cell_devide_idx_SET.size;
        }
      );

      return;
    } catch (err) {
      debugger;
      ERR_TRACE(FILENAME, arrangement_plan.cls_name, funcname);
      return;
    }
  }
  private get_cell_devide_idx(
    intersection_list: {
      my: SORT_PLANTYPE;
      intersections: SORT_PLANTYPE[];
    }[]
  ): void {
    const funcname = "get_cell_devide_idx";
    try {
      //intersection_list 의 idx를 '-1'값인 Array로 가져간다.
      let idx_list: number[] = new Array(intersection_list.length).fill(
        -1,
        0,
        intersection_list.length
      );
      //intersection_list를 돌며
      intersection_list.map(
        (
          sort_plan: {
            my: SORT_PLANTYPE;
            intersections: SORT_PLANTYPE[];
          },
          idx: number //plan들의 고유 id
        ) => {
          let cnt = 0;

          //sort_plan.my의 idx가 -1 일 경우 0

          idx_list[sort_plan.my.id] =
            idx_list[sort_plan.my.id] < 0
              ? 0 //idx_list['id'] 에 cnt 적용
              : idx_list[sort_plan.my.id];
          //sort_plan.my 적용
          sort_plan.my.cell_devide_idx = idx_list[sort_plan.my.id];
          //sort_plan. intersections 적용
          sort_plan.intersections.map(
            (intersection_plan: SORT_PLANTYPE, idx: number) => {
              //my의 cell_devide_idx -1 이 아닐경우
              if (intersection_plan.cell_devide_idx > 0) return;

              //intersections의 cell_devide_idx -1일경우
              //idx_list['id'] 에 값이 있는지 확인
              if (idx_list[intersection_plan.id] < 0) {
                // 값이 -1 이면
                // idx_list['id'] 에 ++cnt 적용
                idx_list[intersection_plan.id] = ++cnt;
                // intersections의 cell_devide_idx cnt적용
                intersection_plan.cell_devide_idx = cnt;
              }
              //값이 -1이 아니면
              // cell_devide_idx 있음
            }
          );
        }
      );
      return;
    } catch (err) {
      debugger;
      ERR_TRACE(FILENAME, arrangement_plan.cls_name, funcname);
      return;
    }
  }
  private getDurationTime(plan_data: PLANTYPE): number {
    let st_time = new Date(plan_data.start_time);
    let ed_time = new Date(plan_data.end_time);
    let duration_ms = Math.abs(ed_time.getTime() - st_time.getTime());
    return duration_ms / (1000 * 3600); //duration_h
  }
  // private end
}

export class aspect_ratio {
  private _screen_size: number;
  private _disp_size: number;
  private _ratio_px: number;
  private _offset: number;

  constructor(screen_size: number, disp_size: number, offset: number = 0) {
    this._screen_size = screen_size;
    this._disp_size = disp_size;
    this._offset = offset;
    this.calcul_ratio();
  }
  // *property*
  get pOffset() {
    return this._offset;
  }

  set pOffset(value: number) {
    this._offset = value;
    this.calcul_ratio();
  }

  // *public begin*
  public getPosition_px(pos_space: number): number {
    return pos_space * this._ratio_px;
  }
  // *public end*

  // *private begin*
  private calcul_ratio(): void {
    this._ratio_px = (this._screen_size - this._offset) / this._disp_size;
  }
  // *private end*
}

type POSITION = { [x: string]: number; y: number };

export class TIMELINE {
  private _$root: HTMLDivElement;
  private _$view: SVGElement;
  private _$desc: HTMLDivElement;

  private _screen_size: {};
  private _aspect_week: aspect_ratio;
  private _aspect_time: aspect_ratio;
  private _offset_width: number;
  private _offset_height: number;
  private _planSet: PLANTYPE[];

  constructor(screen_size: {}) {
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
  public addPlan(plan: PLANTYPE): void {
    this._planSet.push(plan);
  }
  public draw(): void {
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
  }
  // *public end*

  // *private begin*
  private build_outLine(): void {
    //todo
    //root cls:DJ_time-line
    this._$root = document.getElementsByClassName(
      "DJ_time-line"
    )[0] as HTMLDivElement;

    //build svg view
    //<svg class="canvas" width="1000" height="2000" ></svg>
    this._$view = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this._$view.setAttribute("class", "view_time-line");
    this._$view.setAttribute("width", `${this._screen_size["w"]}`);
    this._$view.setAttribute("height", `${this._screen_size["h"]}`);

    //build description
    this._$desc = document.createElement("div");
    this._$desc.setAttribute("class", "bl_wrap_msgbox");
    this._$desc.innerHTML = CONST_DESCRIPTION_HTML;
  }
  private apply_plan(): void {
    let $tmp_wrap = document.createDocumentFragment();
    //week column
    let sort_cls = new arrangement_plan(this._planSet);
    let sort_plan: SORT_PLANTYPE[] = sort_cls.run();

    sort_plan.map((sort_plan: SORT_PLANTYPE, idx: number) => {
      let week_x = this.getWeekPos(sort_plan, idx);
      //time line
      let plan_y = this.getTimeLinePos(sort_plan.plan_item);

      let key = [
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
      let val = [
        `${sort_plan.plan_item.pk}`,
        week_x["start_x"],
        plan_y["height"],
        plan_y["start_y"],
        week_x["width"],
        `${sort_plan.plan_item.fill}`,
        "0.4",
        "10",
        "10",
        `${sort_plan.plan_item.start_time}`,
        `${sort_plan.plan_item.end_time}`,
      ];
      let $rect: Element = this.create_shape("rect", key, val);
      $rect.setAttribute("id", `pk_${sort_plan.plan_item.pk}`);
      //pc evt register
      $rect.addEventListener("mouseenter", this.onMouseEnter.bind(this));
      $rect.addEventListener("mouseleave", this.onMouseLeave.bind(this));
      //mobile evt register
      $rect.addEventListener("touchend", this.onTouch.bind(this));

      $tmp_wrap.appendChild($rect);
    });
    let nodes = $tmp_wrap.childNodes;
    this._$view.appendChild($tmp_wrap);
    return;
  }

  private update_descitionBox(pk_name: string, st_time: string) {
    let desc_html: string = CONST_DESCRIPTION_HTML;
    desc_html = this.set_indent(desc_html, 0);
    //pk_0
    let regfilter = /^pk_(?<pk>\d)$/;
    let reg = pk_name.match(regfilter);
    let pk_num = Number(reg[1]);

    //plan inform register
    //pk번호로 plan 데이터 추출

    let plan_data: PLANTYPE = this._planSet.filter(
      (plan) => plan.pk === pk_num && plan.start_time === st_time //pk고유번호
    )[0];

    //time duration
    let duration_h = this.getDurationTime(plan_data);

    let tags = ["name", "duration", "plan"];
    desc_html = this.replaceHtml(desc_html, tags, [
      `${plan_data.name}`,
      `${duration_h}`,
      plan_data.disc,
    ]);

    // update
    let $desc_box: HTMLDivElement = document.getElementsByClassName(
      "bl_wrap_msgbox"
    )[0] as HTMLDivElement;
    $desc_box.innerHTML = desc_html;
  }

  private getDurationTime(plan_data: PLANTYPE): Number {
    let st_time = new Date(plan_data.start_time);
    let ed_time = new Date(plan_data.end_time);
    let duration_ms = ed_time.getTime() - st_time.getTime();
    return duration_ms / (1000 * 3600); //duration_h
  }
  private getWeekPos(plan: SORT_PLANTYPE, idx: number): {} {
    //let usrs = this.another_usr();
    let usr_size: number = plan.cell_devide_size;

    this._aspect_week.pOffset = this._offset_width * 2;
    let plan_w = (this._aspect_week.getPosition_px(1) / usr_size) * 0.95;

    //usr에따른 plan_w 나누기
    //2개의plan: cell_w에서 1/2의 각 95% 비율 적용
    //3개의plan: cell_w에서 1/3의 각 95% 비율 적용
    //plan_w = (plan_w / usrs.size) * 0.95; //cell_w의 95%
    let cell_w = this._aspect_week.getPosition_px(1);
    let usr_idx = plan.cell_devide_idx;
    let usr_offset = (cell_w / usr_size) * usr_idx;

    //day pos
    let day = new Date(plan.plan_item.start_time).getDay();
    let st_plan_pos =
      this._aspect_week.getPosition_px(day) +
      this._offset_width * 2 +
      usr_offset; //hour 칸

    return { start_x: st_plan_pos, width: plan_w };
  }
  private getTimeLinePos(plan: PLANTYPE): {} {
    //time start
    let cell_h = this._aspect_time.getPosition_px(1);
    let hours = new Date(plan.start_time).getHours();
    let st_pos_y = this._aspect_time.getPosition_px(hours) + cell_h; //hour 칸
    let min = new Date(plan.start_time).getMinutes();
    let st_min = min * (cell_h / 60); //min 칸면적
    //time end
    hours = new Date(plan.end_time).getHours();
    let ed_pos_y = this._aspect_time.getPosition_px(hours) + cell_h; //hour 칸
    min = new Date(plan.end_time).getMinutes();
    let ed_min = min * (cell_h / 60); //min 칸면적

    // calcul height
    let st_pos = st_pos_y + st_min;
    let height = ed_pos_y + ed_min - (st_pos_y + st_min);

    return { start_y: st_pos, height: height };
  }
  private set_indent(html: string, tap_num: 0): string {
    let indents = new Array(1);
    indents = indents.fill("\t", 0, 1);
    return html.replace(/{__indent__}/g, indents.join());
  }
  private replaceHtml(
    html: string,
    find_tags: string[],
    vals: string[]
  ): string {
    //todo
    find_tags.map((tag, idx) => {
      html = html.replace(`{__${tag}__}`, `${vals[idx]}`);
    });

    return html;
  }

  // 다른 유저의 중첩 일정 갯수
  private another_usr(): Map<number, any[]> {
    //todo
    //svg 에 올려진 all plan
    let usr_map: Map<number, any[]> = new Map();
    let cnt: number = 0;
    this._planSet.forEach((val, idx) => {
      if (usr_map.has(val.pk))
        usr_map.set(val.pk, [val.name, cnt++]); //같은 pk 일경우
      else usr_map.set(val.pk, [val.name, cnt++]); //다른 pk 일 경우
    });

    return usr_map;
  }

  private create_shape(type: string, prop: string[], val: any[]): Element {
    let xmlns = "http://www.w3.org/2000/svg";
    let $element = document.createElementNS(xmlns, type);
    prop.map((prop, idx) => {
      $element.setAttribute(prop, String(val[idx]));
    });
    return $element;
  }

  // 7개의 요일 표시
  private rowHead(): void {
    let cell_w = this._aspect_week.getPosition_px(1);
    let cell_h = this._aspect_time.getPosition_px(1);
    this._aspect_week.pOffset = this._offset_width * 2;
    // 좌측 time head offset
    //week
    let key = [
      "x",
      "y",
      "fill",
      "font-size",
      "text-anchor",
      "alignment-baseline",
    ];
    let day_colors = [
      "red",
      "black",
      "black",
      "black",
      "black",
      "black",
      "blue",
    ];

    // 날짜 표시
    let findDate = (offset_day = 0) => {
      let day = new Date();
      day.setDate(day.getDate() + offset_day);
      return day.toDateString().split(" ")[2];
    };
    let day_idx = new Date().getDay(); //현재 요일 idx
    let $tmp_wrap = document.createDocumentFragment();
    let week = [`일`, `월`, `화`, `수`, `목`, `금`, `토`];
    week.map((week, idx) => {
      let pos_x = this._aspect_week.getPosition_px(idx);
      let val = [
        pos_x + this._offset_width * 4,
        cell_h / 2,
        day_colors[idx],
        "15px",
        "middle",
        "middle",
      ];
      let $node = this.create_shape("text", key, val);
      $node.textContent = `${findDate(idx - day_idx)}(${week})`;
      $tmp_wrap.appendChild($node);
    });

    this._$view.appendChild($tmp_wrap);
  }

  private vertical_head(): void {
    // to do
    let $tmp_wrap = document.createDocumentFragment();
    this._aspect_time.pOffset = this._offset_height;
    let cell_h = this._aspect_time.getPosition_px(1);

    // time head gide line
    let key = ["x1", "y1", "x2", "y2", "stroke", "stroke-width"];
    let val = [
      this._offset_width * 2,
      0,
      this._offset_width * 2,
      this._screen_size["h"],
      "black",
      "0.5px",
    ];
    let $node: Element = this.create_shape("line", key, val);
    $tmp_wrap.appendChild($node);

    // 좌측 time head offset
    key = ["x", "y", "fill", "font-size", "text-anchor", "alignment-baseline"];
    for (let hour = 0; hour < 26; hour++) {
      let pos_y = this._aspect_time.getPosition_px(hour) + cell_h;
      let val = [
        this._offset_width,
        pos_y,
        "black",
        "15px",
        "middle",
        "middle",
      ];
      let $node = this.create_shape("text", key, val);
      $node.textContent = `${hour.toString().length < 2 ? "0" + hour : hour}h`; //두자리수 표현
      $tmp_wrap.appendChild($node);
    }
    this._$view.appendChild($tmp_wrap);
  }
  private row_timeline(): void {
    //todo
    let $tmp_wrap = document.createDocumentFragment();
    let cell_h = this._aspect_time.getPosition_px(1);

    let line_size = this._screen_size["w"];
    let key = ["x1", "y1", "x2", "y2", "stroke", "stroke-width"];

    //time line draw
    for (let hour = 0; hour < 25; hour++) {
      let pos_y = this._aspect_time.getPosition_px(hour) + cell_h;
      let val = [0, pos_y, line_size, pos_y, "#1abc9c", "0.2px"];
      let $node: Element = this.create_shape("line", key, val);
      $tmp_wrap.appendChild($node);
    }
    this._$view.appendChild($tmp_wrap);
  }
  private current_day_disp(): void {
    //todo
    let cur_date = new Date();
    let day_idx = cur_date.getDay();
    let scr_h = this._screen_size["h"];
    let cell_w = this._aspect_week.getPosition_px(1);
    let pos_x =
      this._aspect_week.getPosition_px(day_idx) + this._offset_width * 2;

    let key = ["x", "height", "y", "width", "fill", "fill-opacity"];
    let val = [pos_x, scr_h, 0, cell_w, "#b2bec3", "0.4"];
    let $node: Element = this.create_shape("rect", key, val);
    let $tmp_wrap = document.createDocumentFragment();
    $tmp_wrap.appendChild($node);
    this._$view.appendChild($tmp_wrap);
  }
  private curr_time_line_disp() {
    //todo
    let $tmp_wrap = document.createDocumentFragment();

    let day_idx = new Date().getDay();
    let curr_hour = new Date().getHours();
    let curr_min = new Date().getMinutes();

    let cell_w = this._aspect_week.getPosition_px(1);
    let cell_h = this._aspect_time.getPosition_px(1);
    this._aspect_time.pOffset = this._offset_height;

    let pos_x =
      this._aspect_week.getPosition_px(day_idx) + this._offset_width * 2;
    let pos_y = this._aspect_time.getPosition_px(curr_hour) + cell_h; //hour 칸
    let min_ratio = curr_min * (cell_h / 60); //min 칸면적

    let key = ["x1", "y1", "x2", "y2", "stroke", "stroke-width"];
    let val = [
      pos_x,
      pos_y + min_ratio,
      pos_x + cell_w,
      pos_y + min_ratio,
      "#ff0000",
      "1px",
    ];
    let $node: Element = this.create_shape("line", key, val);

    $tmp_wrap.appendChild($node);
    this._$view.appendChild($tmp_wrap);
  }
  // *private end*
  //ver1.000
  // *callback begin*
  //e: TouchEvent
  //e: MouseEvent
  private onMouseEnter(e: MouseEvent): void {
    //todo
    //plan 설명 창
    //msg view position
    let $rect: HTMLDivElement = e.target as HTMLDivElement;
    let margin = 5;
    let pos_x: number =
      Number($rect.attributes[1].nodeValue) +
      Number($rect.attributes[4].nodeValue) +
      margin;

    let $msg: HTMLElement = document.querySelector(".bl_wrap_msgbox");
    $msg.style.display = "block";
    $msg.style.top = `${e.clientY}px`;
    $msg.style.left = `${pos_x}px`;

    //update plan
    let pk_name = $rect.attributes[0].nodeValue;
    let st_time = $rect.attributes[9].nodeValue;
    this.update_descitionBox(pk_name, st_time);
  }
  private onMouseLeave(e: MouseEvent): void {
    //todo
    //msg window
    let $msg: HTMLElement = document.querySelector(".bl_wrap_msgbox");
    $msg.style.display = "none";
  }
  //mobile event begin
  private onTouch(e: TouchEvent): void {
    //todo
    let $rect: HTMLDivElement = e.target as HTMLDivElement;
    let margin = 5;
    let pos_x: number =
      Number($rect.attributes[1].nodeValue) +
      Number($rect.attributes[4].nodeValue) +
      margin;

    let $msg: HTMLElement = document.querySelector(".bl_wrap_msgbox");
    $msg.style.display = "block";
    $msg.style.top = `${e.changedTouches[0].clientY}px`;
    $msg.style.left = `${pos_x}px`;

    //update plan
    let pk_name = $rect.attributes[0].nodeValue;
    let st_time = $rect.attributes[9].nodeValue;
    this.update_descitionBox(pk_name, st_time);
  }
  //mobile event end
  // *callback end*
  //ver2.000
  //LDH8282 선택된 날짜의 그 week 표시
  //LDH8282 모바일 버전 미디어쿼리 적용
}
