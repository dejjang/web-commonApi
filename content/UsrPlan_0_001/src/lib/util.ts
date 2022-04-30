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
  constructor(screen_size: {}) {
    this._screen_size = screen_size;
    this._$root = document.getElementsByClassName("canvas")[0];

    this._aspect_week = new aspect_ratio(screen_size["w"], 7);
    this._aspect_time = new aspect_ratio(screen_size["h"], 24);

    let pos_x = this._aspect_week.getPosition_px(1);
    this._offset_pos = { x: 100, y: 10 };
    this._offset_width = 50;
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
    let days = [1, 2, 3, 4, 5, 6, 7]; //LDH8282 매개변수에서 입력가능하도록
    this.rowHead(days);
    this.vertical_head();
    this.row_timeline();
    this.current_day_disp(); //매개변수 현재 일자에 셀렉
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
  private rowHead(days: number[]): void {
    let $tmp_wrap = document.createDocumentFragment();
    let week = ["일", "월", "화", "수", "목", "금", "토"];
    let cell_w = this._aspect_week.getPosition_px(1);
    let head_cell_h = 55; //
    // 좌측 time head offset
    this._aspect_week.pOffset = this._offset_width;
    //week
    let key = ["x", "y", "fill", "font-size", "text-anchor"];
    week.map((week, idx) => {
      let pos_x = this._aspect_week.getPosition_px(idx) + this._offset_width;
      let val = [pos_x + cell_w / 2, head_cell_h, "black", "15px", "middle"];
      let $node = this.create_shape("text", key, val);
      $node.textContent = `${days[idx]}(${week})`;
      $tmp_wrap.appendChild($node);
    });

    this._$root.appendChild($tmp_wrap);
  }

  private vertical_head(): void {
    // to do
    let $tmp_wrap = document.createDocumentFragment();
    let cell_h = this._aspect_time.getPosition_px(1);
    this._aspect_time.pOffset = cell_h;
    // 좌측 time head offset

    let key = ["x", "y", "fill", "font-size", "text-anchor"];
    for (let hour = 0; hour < 25; hour++) {
      let pos_y = this._aspect_time.getPosition_px(hour) + cell_h;
      let val = [
        this._offset_width,
        pos_y + cell_h / 2,
        "black",
        "15px",
        "middle",
      ];
      let $node = this.create_shape("text", key, val);
      $node.textContent = `${hour.toString().length < 2 ? "0" + hour : hour}h`;
      $tmp_wrap.appendChild($node);
    }
    this._$root.appendChild($tmp_wrap);
  }
  private row_timeline(): void {
    //todo
    let $tmp_wrap = document.createDocumentFragment();
    let cell_w = this._aspect_week.getPosition_px(1);
    let cell_h = this._aspect_time.getPosition_px(1);
    let line_size = this._screen_size["w"];
    let key = ["x1", "y1", "x2", "y2", "stroke", "stroke-width"];
    let text_center = 28;
    for (let hour = 0; hour < 25; hour++) {
      let pos_y = this._aspect_time.getPosition_px(hour) + cell_h + text_center;
      let val = [0, pos_y, line_size, pos_y, "#1abc9c", "0.2px"];
      let $node: Element = this.create_shape("line", key, val);
      $tmp_wrap.appendChild($node);
    }
    this._$root.appendChild($tmp_wrap);
  }
  private current_day_disp(): void {
    //todo
  }
  //LDH8282 func: current_time_line_disp
  //LDH8282 func: mouse over event descript
  // *private end*
}
