let minuteElm = document.getElementById("minute");
let SecondElm = document.getElementById("second");
let milisecELm = document.getElementById("millisecond");
let HourELm = document.getElementById("hour");

let millisec = 0;
let sec = 0;
let minute = 0;
let hour = 0;

let IntervalId;

function startWatch() {
    if (IntervalId) return
   IntervalId = setInterval(()=>{
    millisec++ 
    milisecELm.innerHTML = millisec;

    if (millisec >= 100) {
        sec++
        SecondElm.innerHTML = sec
        millisec = 0
    } 
     if(sec >= 60){
         minute++
         minuteElm.innerHTML = minute
         sec = 0
         SecondElm.innerHTML = sec
        }   

        if (minute >= 60) {
            hour++
            HourELm.innerHTML = hour;
             minute = 0
             minuteElm.innerHTML = minute
        }
 },10) 
}
function stopWatch() {
    clearInterval(IntervalId)
    IntervalId = null
}

function resetWatch() {
    clearInterval(IntervalId);
    IntervalId = null
 
    millisec = 0;
    sec = 0;
    minute = 0;

    
    milisecELm.textContent = "00";
    SecondElm.textContent = "00";
    minuteElm.textContent = "00";
    
}

 