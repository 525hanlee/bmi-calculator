var data = JSON.parse(localStorage.getItem("data")) || [];
var list = document.querySelector('.show-data');

function addData() {
  var cm = document.querySelector('.input-cm').value;
  var kg = document.querySelector('.input-kg').value;
  if (cm == '' || kg == '' && cm.length > 3 || kg.length > 3) {
    alert('請輸入正確的數值');
    return;
  }
  var bmi = Math.round((kg/((cm/100)*(cm/100)))*100)/100;
  var judge = '';
  var today = new Date();
  var date = today.getFullYear() + "/" +  (today.getMonth()+1) + "/"+ today.getDate();
  var color = '';
  if (bmi < 18.5) {
    judge = '體重過輕';
    color = '#31BAF9';
  }else if (bmi >= 18.5 && bmi < 25) {
    judge = '理想';
    color = '#86D73F';
  }else if (bmi >= 25 && bmi < 30) {
    judge = '體重過重';
    color = '#FF982D';
  }else if (bmi >= 30 && bmi < 35) {
    judge = '輕度肥胖';
    color = '#FF6C03';
  }else if (bmi >= 35 && bmi < 40) {
    judge = '中度肥胖';
    color = '#FF6C03';
  }else{
    judge = '重度肥胖';
    color = '#FF1200';
  }
  data.unshift({
    color: color,
    judge: judge,
    bmi: bmi,
    cm: cm,
    kg: kg,
    date: date,
  });
  localStorage.setItem('data',JSON.stringify(data));
  showResult();
  showList();
}

function showList() {
  var str = '';
  for (var i = 0; i < data.length; i++) {
    str += '<div class="card" data-num="'+i+'" style="border-color:'+data[i].color+'">';
    str += '<div class="show-judge">'+data[i].judge+'</div>';
    str += '<div class="show-bmi"><span>BMI </span>'+data[i].bmi+'</div>';
    str += '<div class="show-kg"><span>weight </span>'+data[i].kg+'kg</div>';
    str += '<div class="show-cm"><span>height </span>'+data[i].cm+'cm</div>';
    str += '<div class="show-date"><span>'+data[i].date+'</span></div>';
    str += '</div>';
  }
  list.innerHTML = str;
}

function showResult() {
  var str = '';
  var result = document.querySelector('.input-data-send');
  str += '<div class="input-data-result">';
  str += '<div class="result-bmi" style="border-color:'+data[0].color+';color:'+data[0].color+'">';
  str += '<h1>'+data[0].bmi+'</h1>';
  str += '<span>BMI</span>';
  str += '<button  style="background-color:'+data[0].color+'">';
  str += '<img src="./img/icons_loop.png" alt="返回">';
  str += '</button>';
  str += '</div>';
  str += '<h2 style="color:'+data[0].color+'">'+data[0].judge+'</h2>';
  str += '</div>';
  result.innerHTML = str;
  document.querySelector('.result-bmi button').addEventListener('click',function(){
    result.innerHTML = '<input type="button" value="看結果" class="input-send">';
    document.querySelector('.input-send').addEventListener('click',addData);
  });
}

function deleteData(event) {
  var num = event.target.className;
  var str = event.target.dataset.num;
  if (num !== 'card') {
    return;
  }
  data.splice(str,1);
  localStorage.setItem('data',JSON.stringify(data));
  showList();
}

showList();
document.querySelector('.input-send').addEventListener('click',addData);
document.querySelector('.show-data').addEventListener('click',deleteData);
