import { TIMELINE, PLANTYPE } from "./lib/util";

function main3() {
  let tl = new TIMELINE({ w: 1000, h: 2000 });

  let my_plan: PLANTYPE = {
    pk: 0,
    cls: "plan",
    name: "홍길동",
    disc: "무술훈련",
    start_time: `2022-05-29T01:00:00`, //month/day h:m
    end_time: `2022-05-29T01:30:00`, //month/day h:m
    color: "white",
    fill: "blue",
  }; //'name', 'discription', 'start_time', 'end_time'

  tl.addPlan(my_plan);

  let my_plan2: PLANTYPE = {
    pk: 0,
    cls: "plan",
    name: "홍길동",
    disc: "청소하기",
    start_time: `2022-05-29T03:00:00`, //month/day h:m,
    end_time: `2022-05-29T04:00:00`, //month/day h:m,
    color: "white",
    fill: "blue",
  }; //'name', 'discription', 'start_time', 'end_time'

  tl.addPlan(my_plan2);

  let my_plan3: PLANTYPE = {
    pk: 1,
    cls: "plan",
    name: "이순신",
    disc: "거북선만들기",
    start_time: `2022-05-29T01:00:00`, //month/day h:m,
    end_time: `2022-05-29T06:00:00`, //month/day h:m,
    color: "white",
    fill: "red",
  }; //'name', 'discription', 'start_time', 'end_time'
  tl.addPlan(my_plan3);

  let my_plan4: PLANTYPE = {
    pk: 1,
    cls: "plan",
    name: "이순신",
    disc: "거북선테스트",
    start_time: `2022-05-29T06:00:00`, //month/day h:m,
    end_time: `2022-05-29T07:00:00`, //month/day h:m,
    color: "white",
    fill: "red",
  }; //'name', 'discription', 'start_time', 'end_time'
  tl.addPlan(my_plan4);
  let my_plan5: PLANTYPE = {
    pk: 0,
    cls: "plan",
    name: "홍길동",
    disc: "근두운연습",
    start_time: `2022-05-29T07:00:00`, //month/day h:m,
    end_time: `2022-05-29T08:00:00`, //month/day h:m,
    color: "white",
    fill: "blue",
  }; //'name', 'discription', 'start_time', 'end_time'
  tl.addPlan(my_plan5);

  let my_plan6: PLANTYPE = {
    pk: 1,
    cls: "plan",
    name: "이순신",
    disc: "훈시",
    start_time: `2022-05-29T07:00:00`, //month/day h:m,
    end_time: `2022-05-29T08:00:00`, //month/day h:m,
    color: "white",
    fill: "red",
  }; //'name', 'discription', 'start_time', 'end_time'
  tl.addPlan(my_plan6);

  let my_plan7: PLANTYPE = {
    pk: 2,
    cls: "plan",
    name: "유관순",
    disc: "태극기만들기",
    start_time: `2022-05-29T07:00:00`, //month/day h:m,
    end_time: `2022-05-29T08:00:00`, //month/day h:m,
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
