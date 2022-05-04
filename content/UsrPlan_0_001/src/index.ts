import { TIMELINE } from "./lib/util";

function main3() {
  var $svg = document.getElementsByClassName("canvas")[0];
  let scr_w = $svg.clientWidth;
  let scr_h = $svg.clientHeight;

  let tl = new TIMELINE({ w: scr_w, h: scr_h });
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
