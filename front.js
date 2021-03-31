let mainArr = [];
let textUP = "";
let valueUP = null;
let dateUP = null;
let datefinish = null;
let inputText = null;
let inputValue = null;
let indexEdit = null;
let summCost = 0;
let flagtxt = null;

window.onload = async function init() {  
  inputText = document.getElementById("cost-name");
  inputText.addEventListener("change", updateText);
  inputValue = document.getElementById("cost-value");
  inputValue.addEventListener("change", updateValue); 

const resp = await fetch("http://localhost:8000/allTasks", {
  method: "GET"
});
let result = await resp.json();
  mainArr = result.data;
render();
}

updateText = (event) => {
  textUP = event.target.value;
}

updateValue = (event) => {
  valueUP = event.target.value;
}
onClick = async () => {
  const resp = await fetch("http://localhost:8000/createTask", {
    method: "POST",
    headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*"
  },
    body: JSON.stringify({
      text: textUP,
      date: datefinish,  
      value: valueUP,
  })   
  });
let result = await resp.json();
  if(textUP !== "" && textUP !== Number && valueUP !== Number && valueUP !== null) {     
    valueUP = null;
    textUP = "";
    inputText.value = "";
    inputValue.value = null;
    datefinish = null;
    mainArr = result.data;
    render();
  } else {
    alert("Ведите данные");
  }
}

render = () => {
  mainArr.forEach(i => {
    summCost += Number(i.value);
  });
  let d = new Date().toLocaleDateString();
  d2 = d.split("/");
  d2 = d2[2] + "-" + d2[1] + "-" + d2[0];
  datefinish = d2;
 
  let lession = document.querySelector(".lesion");
  lession.innerText = `Итого: ${summCost} руб.`;
  let content = document.getElementById("content-page");       
    while(content.firstChild) {                                   
      content.removeChild(content.firstChild);                 
    }
mainArr.map((item, index) => {
  console.log(mainArr)
  let recText = item.text;
  let recValue = item.value; 
  let recDate = item.date;
  summCost = 0;
  let container = document.createElement("div");
  container.id = `mark - ${index}`;
  container.className = 'mark-container';
  let textCont = document.createElement("div");
  textCont.className = "text-container";
  container.appendChild(textCont);
  let dataCont = document.createElement("div");
  dataCont.className = "dataCont-container";
  container.appendChild(dataCont);            
  let costCont = document.createElement("div");
  costCont.className = "cost-container";
  container.appendChild(costCont); 

  if (index === indexEdit) {
    if (flagtxt) {
      if (flagtxt === 1) {
        let inpText = document.createElement('input');
        inpText.type = "text";
        inpText.value = recText; 
        inpText.className = "newinptxt"
        inpText.addEventListener('change',updateNewText);
        textCont.appendChild(inpText);

        let dateP = document.createElement("p");
        dateP.innerText  = recDate;
        dateP.className = "dateP-location";        
        container.appendChild(dateP);          
        dateP.ondblclick = function() { 
          indexEdit = index;           
          flagtxt = 2;  
          render()          
        }
        dataCont.appendChild(dateP);

        let cash = document.createElement("p");
        cash.innerText = `${item.value} руб.`;
        cash.className = "cash-location";          
        container.appendChild(cash);
        cash.ondblclick = function() {           
          indexEdit = index;
          flagtxt = 2;
        render();
        }
        costCont.appendChild(cash);

      } else if (flagtxt === 3) {
        let dataText = document.createElement('input');
        dataText.type = "date";
        dataText.value = recDate; 
        dataText.className = "newinpdata";
        dataText.addEventListener('change',updateNewDate);
        dataCont.appendChild(dataText); 

        let text = document.createElement("p");
        text.innerText = `${index + 1}) ${item.text}`;
        text.className = "txt-location";        
        container.appendChild(text);          
        text.ondblclick = function(){   
          indexEdit = index         
          flagtxt = 1;
        render()  
        }
        textCont.appendChild(text);

        let cash = document.createElement("p");
        cash.innerText = `${item.value} руб.`;
        cash.className = "cash-location";          
        container.appendChild(cash);
        cash.ondblclick = function() {           
          indexEdit = index;
          flagtxt = 1;
        render();
      }
        costCont.appendChild(cash);  

      } else {
        let inpValue = document.createElement("input");
        inpValue.type = "number";
        inpValue.value = recValue;
        inpValue.className = "newinpval"
        inpValue.addEventListener("change", updateNewValue);
        costCont.appendChild(inpValue);

        let text = document.createElement("p");
        text.innerText = `${index + 1}) ${item.text}`;
        text.className = "txt-location";        
        container.appendChild(text);          
        text.ondblclick = function() {   
          indexEdit = index         
          flagtxt = 3;
          render()  
        }
        textCont.appendChild(text);

        let dateP = document.createElement("p");
        dateP.innerText  = recDate;
        dateP.className = "dateP-location";        
        container.appendChild(dateP);          
        dateP.ondblclick = function() { 
          indexEdit = index;           
          flagtxt = 3;  
        render()          
        }
        dataCont.appendChild(dateP);
      }
    } else {
      let inpText = document.createElement('input');
      inpText.type = "text";
      inpText.value = recText; 
      inpText.className = "newinptxt"
      inpText.addEventListener('change', updateNewText);
      textCont.appendChild(inpText); 

      let dataText = document.createElement('input');
      dataText.type = "date";
      dataText.value = recDate; 
      dataText.className = "newinpdata"
      dataText.addEventListener('change', updateNewDate);
      dataCont.appendChild(dataText); 

      let inpValue = document.createElement("input");
      inpValue.type = "number";
      inpValue.value = recValue;
      inpValue.className = "newinpval"
      inpValue.addEventListener("change", updateNewValue);
      costCont.appendChild(inpValue);
    }
  } else {       
    let text = document.createElement("p");
    text.innerText = `${index + 1}) ${item.text}`;
    text.className = "txt-location";        
    container.appendChild(text);          
    text.ondblclick = function(){ 
      indexEdit = index;           
      flagtxt = 1;  
      render()          
    }
    textCont.appendChild(text);

    let dateP = document.createElement("p");
    dateP.innerText  = recDate;  
    dateP.className = "dateP-location";        
    container.appendChild(dateP);          
    dateP.ondblclick = function(){ 
      indexEdit = index;           
      flagtxt = 3;  
      render()          
    }
    dataCont.appendChild(dateP);

    let cash = document.createElement("p");
    cash.innerText = `${item.value} руб.`;
    cash.className = "cash-location";          
    container.appendChild(cash);
    cash.ondblclick = function(){           
      indexEdit = index;           
      flagtxt = 2;  
      render()          
    }   
    costCont.appendChild(cash);       
  }
   
    let imgCont = document.createElement("div");
    imgCont.className = 'img-container';
    container.appendChild(imgCont);

  if (indexEdit === index) {
    let imageSave = document.createElement('img');
    imageSave.src = "file:///home/user/Downloads/floppy-disk.svg";
    imageSave.className = "but";
    imgCont.appendChild(imageSave);
    imageSave.onclick = function(){
     saveOnClick(index);
    }
                  
    let imageAbort = document.createElement('img');
    imageAbort.src = "file:///home/user/Downloads/x-button.svg";
    imageAbort.className = "but";
    imgCont.appendChild(imageAbort);
    imageAbort.onclick = function(){            
      indexEdit = index;
      mainArr[indexEdit].value = recValue;
      mainArr[indexEdit].text = recText;
      mainArr[indexEdit].date = recDate;
      indexEdit = -1;
      render()
  };
                  
  } else {
    let imageEdit = document.createElement('img');
    imageEdit.src = "file:///home/user/Downloads/edit.svg";
    imageEdit.className = "but";
    imgCont.appendChild(imageEdit);
    imageEdit.onclick = function(){
     editOnClick(index);
    }
                 
    let imageDelete = document.createElement('img');
    imageDelete.src = "file:///home/user/Downloads/delete.svg";
    imageDelete.className = "but";
    imgCont.appendChild(imageDelete);
    imageDelete.onclick = function(){
      delOnClick(index);
    }
  }
    content.appendChild(container);
})
}

delOnClick = async (index) => { 
  let allID = mainArr[index]._id;
    const resp = await fetch(`http://localhost:8000/deleteTask?_id=${allID}`, {
      method: "DELETE",
});
  let result = await resp.json();
  mainArr = result.data;
  render(); 
}

editOnClick = (index) => {       
 indexEdit = index;
render()
}

updateNewText = (event)=> {
 mainArr[indexEdit].text = event.target.value; 
}

updateNewDate = (event)=> {
  mainArr[indexEdit].date = event.target.value; 
}

updateNewValue = (event)=>{
 mainArr[indexEdit].value = event.target.value; 
}

    
saveOnClick = async (index) =>{
 const body = {
  _id: mainArr[indexEdit]._id,
  text: mainArr[indexEdit].text,
  date: mainArr[indexEdit].date,
  value: mainArr[indexEdit].value, 
 };
 indexEdit = null;
 flagtxt = null;
 datefinish = null;
 const resp = await fetch("http://localhost:8000/updateTask", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*"
  },
body: JSON.stringify(body)
});
let result = await resp.json();       
mainArr = result.data;      
localStorage.setItem('tasks', JSON.stringify(mainArr));
render()
}
    