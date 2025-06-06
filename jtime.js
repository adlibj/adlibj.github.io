var txt = document.getElementById("txt");
setInterval(showTime, 20, txt);

function padZero(strings,n){
  return (n < 10) ? `0${n}` : `${n}`;
}

function showTime(ele){
  var d = new Date();
  ele.textContent = padZero`${d.getHours()}` + ":" + padZero`${d.getMinutes()}` + ":" + padZero`${d.getSeconds()}`;
}