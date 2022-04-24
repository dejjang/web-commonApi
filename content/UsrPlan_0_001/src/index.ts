import { aspect_ratio } from "./lib/util";

var $svg = document.getElementsByClassName("canvas")[0];
//let $svg = document.querySelector(".canvas");
//let CONST_LINE = '<line class="line_{idx}" x1={x1} y1={y1} x2={x2} y2={y2} />';

function replace_html(src: string, key: string[], val: any[]): string {
  key.map((key, idx) => {
    src = src.replace(`{${key}}`, String(val[idx]));
  });

  return src;
}
function create_shape(type: string, prop: string[], val: any[]): Element {
  let xmlns = "http://www.w3.org/2000/svg";
  let $horizon_line = document.createElementNS(xmlns, type);
  prop.map((prop, idx) => {
    $horizon_line.setAttribute(prop, String(val[idx]));
  });
  return $horizon_line;
}
const LM = 2;

function main2() {
  // aspect ratio'
  let offset = 10;
  let scr_w = $svg.clientWidth;
  let scr_h = $svg.clientHeight - offset;

  let aspect_w = new aspect_ratio(scr_w, 7); //월~일 (7의배수)
  let aspect_h = new aspect_ratio(scr_h, 24, offset); //0h~24h (24의 배수)

  let pos_x = aspect_w.getPosition_px(1);
  let pos_y = aspect_h.getPosition_px(24);

  //let screen_h = $svg.clientHeight; //px

  let key = ["x1", "y1", "x2", "y2", "stroke", "stroke-width"];
  let val = [0, pos_y, 500, pos_y, "#1abc9c", "2px"];
  let $node: Element = create_shape("line", key, val);
  let $tmp_wrap = document.createDocumentFragment();
  $tmp_wrap.appendChild($node);
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