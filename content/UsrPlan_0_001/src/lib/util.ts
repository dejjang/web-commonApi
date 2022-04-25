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

  // set pOffset(value: number) {
  //   this._offset = value;
  // }

  // *public begin*
  public getPosition_px(pos_space: number): number {
    return pos_space * this._ratio_px + this._offset;
  }
  // *public end*

  // *private begin*
  private calcul_ratio(): void {
    this._ratio_px = (this._screen_size - this._offset) / this._disp_size;
  }
  // *private end*
}

export class TIMELINE {
  constructor() {}

  // *public begin*
  //LDH8282 func: addplan(['name', 'desc', 'date_start', 'date_end', 'fill_color'])
  //LDH8282 func: draw
  // *public end*

  // *private begin*
  //LDH8282 func: vertical_head
  //LDH8282 func: horizontal_head
  //LDH8282 func: current_day_column
  //LDH8282 func: time_line_disp
  //LDH8282 func: mouse over event descript
  // *private end*
}
