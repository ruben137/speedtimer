window.onload=()=>{
 h=0;m=0;s=0;mls=0; timeStarted=0;

  time=document.getElementById('time');
  interval=0;
  Event();
}

let object={
  start:null,
  time:document.getElementById("time"),
  tap:document.getElementById('screen'),
  delete:document.getElementById('delete')
 }
  
function Event(){
 
 if(screen.width>1050){
  window.addEventListener("keypress", red)
  window.addEventListener("keyup",()=>object.time.className="black")
 }else{
 object.tap.addEventListener("touchstart", red2)
 object.tap.addEventListener("touchend",()=>object.time.className="black")
 object.tap.addEventListener('touchstart', verde2)
 }

 object.delete.addEventListener('click', ()=>{
   
 })
 
 
  
  scramble()
 
 
}
// This function is to not let the timer start until its color is green
function verde() {
   let interval=setInterval(()=>{
     if(object.time.className=="red" && object.start==null){
          object.time.className="green"
          window.removeEventListener("keypress", red)
          window.addEventListener('keyup', start)
     }
     else if(object.time.className=="red" && object.start==2){
        object.time.className="green"
          window.removeEventListener("keypress", red)
          window.addEventListener('keyup', reset)
     }
   },1000);
  
window.addEventListener('keyup', ()=>clearInterval(interval))
}
// this is the same function but for the mobile version
function verde2() {
   let interval=setInterval(()=>{
     if(object.time.className=="red" && object.start==null){
          object.time.className="green"
          object.tap.removeEventListener("touchstart", red)
          object.tap.addEventListener('touchend', start2)
     }
     else if(object.time.className=="red" && object.start==2){
        object.time.className="green"
          object.tap.removeEventListener("touchstart", red)
          object.tap.addEventListener('touchend', reset2)
     }
   },1000);
  
object.tap.addEventListener('touchend', ()=>clearInterval(interval))
}

const red=()=>{
object.time.className="red"
window.addEventListener('keypress', verde)
}
const red2=()=>{
object.time.className="red"
object.tap.addEventListener('touchstart', verde2)
}

function write(){
  let mt,st,mlst;
mls++;
  
if(mls>99){s++;mls=0}
  if(s>59){m++;s=0;}
  if(m>59){h++;m=0;}


  mlst=('0'+mls).slice(-2);
  st=('0' + s).slice(-2);
  mt=('0' + m).slice(-2);
  ht=('0'+h).slice(-2);
 
  time.innerHTML=`${ht}:${mt}:${st}.${mlst}`;
}

const start= (e)=>{

 if(object.start== 1 && e.code=='Space'){
//Funcion de stop
clearInterval(timeStarted);
object.start=2;

window.addEventListener("keypress", red)

window.removeEventListener('keyup', reset)

window.removeEventListener('keyup', start);

scramble()

}else{
    //Funcion de start
if(object.start==null && e.code=='Space'){

  write();
  timeStarted=setInterval(write,10);
 
  object.start=1;

  window.addEventListener('keyup', start)

  window.addEventListener('keyup', saveTime)
}}};

const start2= ()=>{

 
if(object.start==1){
//Stop function
clearInterval(timeStarted);
object.start=2;

object.tap.addEventListener("touchstart", red)

object.tap.removeEventListener('touchend', reset)

object.tap.removeEventListener('touchend', start);

scramble()

}else{
    //Start function
if(object.start==null){

  write();
  timeStarted=setInterval(write,10);
 
  object.start=1;
  
  object.tap.addEventListener('touchend', start)

  object.tap.addEventListener('touchend', saveTime)
}}};


const reset=(e)=>{

if(object.start==2 && e.code=='Space'){

window.removeEventListener('keyup', reset)

window.addEventListener('keyup', saveTime)

time.innerHTML='00:00:00.00'

h=0;m=0;s=0;mls=0;
 
write();

timeStarted=setInterval(write,10);
window.addEventListener('keyup', start);
object.time.className='black'
 
object.start=1;
}
}
// reset mobile version
const reset2=()=>{

  if(object.start==2 ){

object.tap.removeEventListener('touchend', reset2)

object.tap.addEventListener('touchend', saveTime)

time.innerHTML='00:00:00.00'

h=0;m=0;s=0;mls=0;
 
write();

timeStarted=setInterval(write,10);
object.tap.addEventListener('touchend', start);
object.time.className='black'
 
object.start=1;
}
}

// function to save Time in localStorage
const saveTime=()=>{
  if(screen.width>1050){
      window.removeEventListener('keyup', saveTime)
  }else{
    object.tap.removeEventListener('touchend', saveTime)
  }

  let title=object.time.innerHTML
  
  const tables={title}

  if(localStorage.getItem('table')===null){
  let table=[];
  table.push(tables);
  localStorage.setItem('table', JSON.stringify(table))}
  else{
  let table =JSON.parse(localStorage.getItem('table'));
  table.push(tables);
  localStorage.setItem('table',JSON.stringify(table))
}

setTime()

}
// this function is to transform the time value from string to number and then do the calculations to get the average,best time and worst time
const setTime=()=>{

  let table=JSON.parse(localStorage.getItem('table'));
  let timesView=document.getElementById('table');
  let averageView=document.getElementById('average');
  let bestTimeView=document.getElementById('bestTime');
  let worstTimeView=document.getElementById('worstTime');

 table.map((item)=>{
 if(typeof(item.title)=="string"){
let colon=/:/g;

item.title=item.title.replace(colon,"")
} return item
})

let res=0;

table.forEach((e)=>{
  for(var p in e){
  typeof parseFloat(e[p])=="number"&&(res+=parseFloat(e[p]));
  }})

if(table.length>0){
var result=table.reduce((res,obj)=>{
return (obj.title<res.title) ? obj : res;
})

var resulto=table.reduce((res,obj)=>{
return (obj.title>res.title) ? obj : res;
})}

if(table.length>0){
let average=res/table.length
let averageContainer=document.createElement("p")
averageContainer.className="prom"
let averageTexto=document.createTextNode(`Average:${parseFloat(average).toFixed(2)}s`)
averageContainer.appendChild(averageTexto)
averageView.appendChild(averageContainer)

if(averageView.children.length>1){
  let hijo1=averageView.children[0];
  averageView.removeChild(hijo1)
}

let bestTime=parseFloat(result.title).toFixed(2)
let bestTimeContainer=document.createElement("p")
bestTimeContainer.className="prom"
let bestTimeTexto=document.createTextNode(`Best time:${bestTime}s`)
bestTimeContainer.appendChild(bestTimeTexto)
bestTimeView.appendChild(bestTimeContainer)

if(bestTimeView.children.length>1){
  let hijo1=bestTimeView.children[0];
  bestTimeView.removeChild(hijo1)
}

let worstTime=parseFloat(resulto.title).toFixed(2)
let worstTimeContainer=document.createElement("p")
worstTimeContainer.className="prom"
let worstTimeTexto=document.createTextNode(`Worst time:${worstTime}s`)
worstTimeContainer.appendChild(worstTimeTexto)
worstTimeView.appendChild(worstTimeContainer)

if(worstTimeView.children.length>1){
let hijo1=worstTimeView.children[0];
worstTimeView.removeChild(hijo1)
}

}

timesView.innerHTML=""

for (let i = 0; i < table.length; i++) {
    let title=parseFloat(table[i].title);
 
timesView.innerHTML+=`
<div class="timeContainer">
<p class="timeContainer-p">${title}s</p>
<a class="delete" onclick="deleteTime('${title}')">Delete<a>
</div>`}
if(screen.width>1050){
  if(table.length<6){
  timesView.style.overflowY="unset"
}else
if(table.length>6){
  timesView.style.overflowY="scroll"
}
}else{
  if(table.length<3){
  timesView.style.overflowY="unset"
}else
if(table.length>3){
  timesView.style.overflowY="scroll"
}

}

}

setTime()

function deleteTime(title){

let table=JSON.parse(localStorage.getItem('table'))

table.map(function(item){
 if(typeof(item.title)=="string"){
let colon=/:/g;
item.title=item.title.replace(colon,"")
}
return item
   })
 
   for (let i = 0; i < table.length; i++) {
if(parseFloat(table[i].title)==title){
table.splice(i,1)}}
  localStorage.setItem('table', JSON.stringify(table));
setTime()}



function scramble(){
 let options = ["F", "F2", "F'", "R", "R2", "R'", "U", "U2", "U'", "B", "B2", "B'", "L", "L2", "L'", "D", "D2", "D'"]
    let numOptions = [0, 1, 2, 3, 4, 5] // 0 = F, 1 = R, 2 = U, 3 = B, 4 = L, 5 = D
    let scramble = []
    let scrambleMoves = []
    let bad = true

    while (bad) {
        scramble = []
        for (let i = 0; i < 20; i++) {
            scramble.push(numOptions[getRandomInt(6)])
       
            
        }
      
       
        // check if moves directly next to each other involve the same letter
        for (let i = 0; i < 19; i++) {
            if (scramble[i] == scramble[i + 1]) {
                bad = true
                break
            } else {
                bad = false
            }
        }
    }
   

    let move
    for (let i = 0; i < 20; i++) {
        switch (scramble[i]) {
            case 0:
                move = options[getRandomInt(3)] 
                scrambleMoves.push(move)
                break
            case 1:
                move = options[getRandomIntBetween(3, 6)] 
                scrambleMoves.push(move)
                break
            case 2:
                move = options[getRandomIntBetween(6, 9)]
                scrambleMoves.push(move)
                break
            case 3:
                move = options[getRandomIntBetween(9, 12)] 
                scrambleMoves.push(move)
                break
            case 4:
                move = options[getRandomIntBetween(12, 15)] 
                scrambleMoves.push(move)
                break
            case 5:
                move = options[getRandomIntBetween(15, 18)] // 15,16,17
                scrambleMoves.push(move)
                break
        }
    }
let contenedorScramble=document.getElementsByClassName("scramble")[0]
let parrafoArreglo=document.createElement("p")
let textoArreglo=document.createTextNode(scrambleMoves.join(" "))
parrafoArreglo.appendChild(textoArreglo)
contenedorScramble.appendChild(parrafoArreglo)

if(contenedorScramble.children.length>1){
  let hijo1=contenedorScramble.children[0]
  contenedorScramble.removeChild(hijo1)
}
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) 
}

function getRandomIntBetween(min, max) { 
    return Math.floor(Math.random() * (max - min) + min)
}

scramble()


  










