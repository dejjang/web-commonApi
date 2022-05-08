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
  private _$root: any;
  private _screen_size: {};
  private _aspect_week: aspect_ratio;
  private _aspect_time: aspect_ratio;
  private _offset_width: number;
  private _offset_height: number;
  private _planSet: PLANTYPE[];

  constructor(screen_size: {}) {
    this._screen_size = screen_size;
    this._$root = document.getElementsByClassName("canvas")[0];

    this._aspect_week = new aspect_ratio(screen_size["w"], 7);
    this._aspect_time = new aspect_ratio(screen_size["h"], 25);

    let pos_x = this._aspect_week.getPosition_px(1);
    this._offset_width = 30;
    this._offset_height = 10;
    this._planSet = [];

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
  public addPlan(plan: PLANTYPE): void {
    this._planSet.push(plan);
  }
  public draw(): void {
    this.rowHead();
    this.vertical_head(); // 요일 column 표시
    this.row_timeline(); //hour tick
    this.current_day_disp(); //요일및 일자 표시
    this.curr_time_line_disp(); //현재시간표시
    this.apply_plan();
    return;
  }
  // *public end*

  // *private begin*
  private apply_plan(): void {
    //LDH8282 다른색 겹치는시간 day width 대비 비율 분리
    let usrs = this.another_usr();

    //LDH8282 같은색 겹치는시간 plan 합치기
    //intersection = same_usr_intersection_merge(target_idx)

    this._planSet.map((plan, idx) => {
      // plan_background 모서리둥근 사각형
      this._aspect_week.pOffset = this._offset_width * 2;
      let plan_w = (this._aspect_week.getPosition_px(1) / usrs.size) * 0.95;

      //usr에따른 plan_w 나누기
      //2개의plan: cell_w에서 1/2의 각 95% 비율 적용
      //3개의plan: cell_w에서 1/3의 각 95% 비율 적용
      //plan_w = (plan_w / usrs.size) * 0.95; //cell_w의 95%
      let cell_w = this._aspect_week.getPosition_px(1);
      let usr_idx = usrs.get(plan.pk)[1];
      let usr_offset = (cell_w / usrs.size) * usr_idx;

      //day pos
      let day = new Date(plan.start_time).getDay();
      let plan_pos_x =
        this._aspect_week.getPosition_px(day) +
        this._offset_width * 2 +
        usr_offset; //hour 칸

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
      let height = ed_pos_y + ed_min - (st_pos_y + st_min);
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
        `${plan.pk}`,
        plan_pos_x,
        height,
        st_pos_y + st_min,
        plan_w,
        `${plan.fill}`,
        "0.4",
        "10",
        "10",
        `${plan.start_time}`,
        `${plan.end_time}`,
      ];
      let $node: Element = this.create_shape("rect", key, val);
      let $tmp_wrap = document.createDocumentFragment();
      $tmp_wrap.appendChild($node);
      this._$root.appendChild($tmp_wrap);

      //LDH8282 plan text: 디스크립션
    });

    return;
  }
  //LDH8282 같은 유저의 중첩일정 병합
  //private same_usr_intersection_merge(target_idx: number){
  //todo
  //}
  // 다른 유저의 중첩 일정 갯수
  private another_usr(): Map<number, any[]> {
    //todo
    //svg 에 올려진 all plan
    let usr_map: Map<number, any[]> = new Map();
    let cnt: number = 0;
    this._planSet.forEach((val, idx) => {
      usr_map.set(val.pk, [val.name, cnt++]);
    });

    return usr_map;
  }
  private create_shape(type: string, prop: string[], val: any[]): Element {
    let xmlns = "http://www.w3.org/2000/svg";
    let $horizon_line = document.createElementNS(xmlns, type);
    prop.map((prop, idx) => {
      $horizon_line.setAttribute(prop, String(val[idx]));
    });
    return $horizon_line;
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

    this._$root.appendChild($tmp_wrap);
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
    this._$root.appendChild($tmp_wrap);
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
    this._$root.appendChild($tmp_wrap);
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
    this._$root.appendChild($tmp_wrap);
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
    this._$root.appendChild($tmp_wrap);
  }
  //ver1.000
  //LDH8282 func: mouse over event descript
  // *private end*

  //ver2.000
  //LDH8282 선택된 날짜의 그 week 표시
}
