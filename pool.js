const weightedCategories=[
 "rechnen","rechnen","rechnen","rechnen","rechnen",
 "sach","sach","sach","sach","sach",
 "prozent","prozent","prozent","prozent",
 "geometrie","geometrie","geometrie","geometrie",
 "einheiten","einheiten"
];

function genTask(taskText,answer,lines){
 return {task:taskText,answer:answer,solution:steps(lines,answer)};
}

const TASKPOOL={

rechnen:[
 ...Array.from({length:25},()=>()=> {
   let a=Math.floor(Math.random()*200)+20;
   let b=Math.floor(Math.random()*15)+2;
   let ans=a*b;
   return genTask(
     `Berechne: <b>${a}·${b}</b>`,
     ans,
     [`Multiplikation: ${a}·${b}`,`Ausrechnen`]
   );
 })
],

einheiten:[
 ...Array.from({length:20},()=>()=> {
   let m=Math.floor(Math.random()*20)+1;
   let ans=m*100;
   return genTask(
     `Rechne um: <b>${m} m = ? cm</b>`,
     ans,
     [`1 m = 100 cm`,`${m}·100`, `Ausrechnen`]
   );
 })
],

geometrie:[
 ...Array.from({length:20},()=>()=> {
   let a=Math.floor(Math.random()*15)+2;
   let ans=4*a;
   return genTask(
     `Quadrat Seite ${a} cm → Umfang?`,
     ans,
     [`Formel: U=4·a`,`Einsetzen: 4·${a}`,`Ausrechnen`]
   );
 })
],

sach:[
 ...Array.from({length:20},()=>()=> {
   let price=Math.floor(Math.random()*5)+1;
   let amount=Math.floor(Math.random()*10)+2;
   let ans=price*amount;
   return genTask(
     `${amount} Artikel à ${price}€ → Gesamtpreis?`,
     ans,
     [`Preis pro Stück: ${price}€`,`Anzahl: ${amount}`,`${amount}·${price}`]
   );
 })
],

prozent:[
 ...Array.from({length:20},()=>()=> {
   let g=Math.floor(Math.random()*400)+100;
   let p=[10,20,25,50][Math.floor(Math.random()*4)];
   let ans=g*p/100;
   return genTask(
     `Berechne: <b>${p}% von ${g}</b>`,
     ans,
     [`Formel: W=G·p/100`,`Einsetzen: ${g}·${p}/100`,`Ausrechnen`]
   );
 })
]

};
