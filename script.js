
/**  Gregorian & Jalali (Hijri_Shamsi,Solar) Date Converter Functions
 Author: JDF.SCR.IR =>> Download Full Version :  http://jdf.scr.ir/jdf
 License: GNU/LGPL _ Open Source & Free :: Version: 2.81 : [2020=1399]
 */

function gregorian_to_jalali(gy, gm, gd) {
    var g_d_m, jy, jm, jd, gy2, days;
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    gy2 = (gm > 2) ? (gy + 1) : gy;
    days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
    jy = -1595 + (33 * ~~(days / 12053));
    days %= 12053;
    jy += 4 * ~~(days / 1461);
    days %= 1461;
    if (days > 365) {
        jy += ~~((days - 1) / 365);
        days = (days - 1) % 365;
    }
    if (days < 186) {
        jm = 1 + ~~(days / 31);
        jd = 1 + (days % 31);
    } else {
        jm = 7 + ~~((days - 186) / 30);
        jd = 1 + ((days - 186) % 30);
    }
    return [jy, jm, jd];
}

function getFirstDay(date,day) {
    let week = [1, 2, 3, 4, 5, 6, 7];
    let index = day-1;
    while (date !== 1) {
        date--;
        index--;
        if (index === -1) {
            index = 6;
        }
    }
    return week[index];
}

let lastDay;
let currentMonth=true;

function generateDays (startDay,numberOfDays){
    let j=1;
    for(i=1;i<43;i++){
        let day_item=document.createElement("div");
        day_item.classList.add("day");
        if (j===thisDate && currentMonth){
            day_item.classList.add("today");
        }
        document.querySelector(".days").append(day_item);
        if( i>=startDay && numberOfDays>=j ){
            day_item.textContent=j.toString();
            j++;
        }
        else {
            day_item.textContent=" ";
        }
        if(numberOfDays===j){
            lastDay=i+1;
        }
    }
}

function clean(){
    for(i=1;i<43;i++){
        let d=document.querySelector(".days");
        d["lastChild"].remove();
    }
}

const months=[
    0,
    farvardin= ["فروردین",31],
    ordibehesht= ["اردیبهشت",31],
    khordad= ["خرداد",31],
    tir= ["تیر",31],
    mordad= ["مرداد",31],
    shahrivar= ["شهریور",31],
    mehr= ["مهر",30],
    aban= ["آبان",30],
    azar= ["آذر",30],
    daymah= ["دی",30],
    bahman= ["بهمن",30],
    esfand= ["اسفند",29],
];

const today= new Date();
let thisYear = today.getFullYear();
let thisMonth = today.getMonth()+1;
let thisDate = today.getDate(); //the day of the month
let thisDay = today.getDay(); // the number of the week
if (thisDay<6){  // Coordinate the day of the week
    thisDay=thisDay+2;
}
else
{
    thisDay=thisDay-5;
}
let currentDate = gregorian_to_jalali(thisYear,thisMonth,thisDate);
thisYear=currentDate[0];
thisMonth=currentDate[1];
thisDate=currentDate[2];

let startDay = getFirstDay(thisDate,thisDay);
generateDays(startDay,months[thisMonth][1]);
document.querySelector(".title").textContent=months[thisMonth][0] +" "+ thisYear;

let pastMonth = thisMonth-1;
let nextMonth = thisMonth+1;

document.querySelector(".before").onclick=function (){
    if(pastMonth===thisMonth){
        currentMonth=true;
        clean();
        generateDays(startDay,months[thisMonth][1]);
        document.querySelector(".title").textContent=months[thisMonth][0] +" "+ thisYear;
    }
    else{
        currentMonth=false;
        let firstDay = getFirstDay(months[pastMonth][1],startDay)-1;
        clean();
        generateDays(firstDay,months[pastMonth][1]);
        document.querySelector(".title").textContent=months[pastMonth][0] +" "+ thisYear;
    }
    pastMonth--;
    if (pastMonth===0){
        pastMonth=12;
        thisYear--;
    }
    nextMonth--;
    if (nextMonth===0){
        nextMonth=12;
    }
}

document.querySelector(".after").onclick=function (){
    if(nextMonth===thisMonth){
        currentMonth=true;
        clean();
        generateDays(startDay,months[thisMonth][1]);
        document.querySelector(".title").textContent=months[thisMonth][0] +" "+ thisYear;
    }
    else{
        currentMonth=false;
        let firstDay = getFirstDay(42-lastDay,7) ;
        clean();
        generateDays(firstDay,months[nextMonth][1]);
        document.querySelector(".title").textContent=months[nextMonth][0] +" "+ thisYear;
    }
    if (pastMonth===13){
        pastMonth=1;
        thisYear--;
    }
    nextMonth++;
    if (nextMonth===13){
        nextMonth=1;
        thisYear++;
    }
}
