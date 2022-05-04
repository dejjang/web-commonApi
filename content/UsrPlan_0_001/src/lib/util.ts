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
  private _offset_pos: POSITION;
  private _offset_width: number;
  private _offset_height: number;
  constructor(screen_size: {}) {
    this._screen_size = screen_size;
    this._$root = document.getElementsByClassName("canvas")[0];

    this._aspect_week = new aspect_ratio(screen_size["w"], 7);
    this._aspect_time = new aspect_ratio(screen_size["h"], 25);

    let pos_x = this._aspect_week.getPosition_px(1);
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
  public draw(): void {
    this.rowHead();
    this.vertical_head();
    this.row_timeline();
    this.current_day_disp(); //요일및 일자 표시
    this.curr_time_line_disp(); //현재시간표시
    return;
  }
  // *public end*

  // *private begin*
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
  //LDH8282 func: mouse over event descript
  // *private end*
}
