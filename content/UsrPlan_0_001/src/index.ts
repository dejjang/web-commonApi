import { TIMELINE, PLANTYPE } from "./lib/util";

function main3() {
  var $svg = document.getElementsByClassName("canvas")[0];
  let scr_w = $svg.clientWidth;
  let scr_h = $svg.clientHeight;

  let tl = new TIMELINE({ w: scr_w, h: scr_h });

  let my_plan: PLANTYPE = {
    pk: 0,
    cls: "plan",
    name: "홍길동",
    disc: "무술훈련",
    start_time: `2022-05-08T01:30:00`, //month/day h:m
    end_time: `2022-05-08T02:30:00`, //month/day h:m
    color: "white",
    fill: "blue",
  }; //'name', 'discription', 'start_time', 'end_time'

  tl.addPlan(my_plan);

  let my_plan2: PLANTYPE = {
    pk: 1,
    cls: "plan",
    name: "콩쥐",
    disc: "청소하기",
    start_time: `2022-05-08T01:30:00`, //month/day h:m,
    end_time: `2022-05-08T04:00:00`, //month/day h:m,
    color: "white",
    fill: "red",
  }; //'name', 'discription', 'start_time', 'end_time'

  tl.addPlan(my_plan2);

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
