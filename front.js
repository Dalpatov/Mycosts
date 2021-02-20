let mainArr = [];
let textUP = "";
let valueUP = null;
let inputText = null;
let inputValue = null;
let indexEdit = null;
let summCost = 0;

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
  // localStorage.setItem('tasks', JSON.stringify(mainArr));
  render();
}

onClick = async ()=>{
  mainArr.push({
    text: textUP,
    value: valueUP
  });
  const resp = await fetch("http://localhost:8000/createTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      text: valueInput,
      isCheck: false
    })
  });
  let result = await resp.json();
  mainArr = result.data;
    valueUP = null;
    textUP = "";
    inputText.value = "";
    inputValue.value = null;
  render();
}

updateText = (event) =>{
  textUP = event.target.value;
}
updateValue = (event) =>{
  valueUP = event.target.value;
}

render = () =>{
    summCost = 0;
    mainArr.forEach(i => {
    summCost += Number(i.value)
  });
     let lession = document.querySelector(".lesion");
     lession.innerText = `Итого: ${summCost} руб.`;
  
    let content = document.getElementById("content-page");       
      while(content.firstChild){                                   
        content.removeChild(content.firstChild);                 
      }

    mainArr.map((item, index) => {

       let recText = item.text;
       let recValue = item.value;
      
      let container = document.createElement("div");
        container.id = `mark - ${index}`;
        container.className = 'mark-container';

      let costCont = document.createElement("div");
        costCont.className = 'cost-container';
        container.appendChild(costCont);

        if (index === indexEdit){
          let inpText = document.createElement('input');
          inpText.type = "text";
          inpText.value = recText ;         
          inpText.addEventListener('change',updateNewText);
          container.appendChild(inpText);  
          
          let inpValue = document.createElement("input");
          inpValue.type = "number";
          inpValue.value = recValue;
          inpValue.addEventListener("change", updateNewValue);
          container.appendChild(inpValue);
               
        }else{
          let text = document.createElement("p");
          text.innerText = `${index + 1}) ${item.text}`;
          costCont.appendChild(text);

          let cash = document.createElement("p");
          cash.innerText = `${item.value} руб.`;
          costCont.appendChild(cash);
        }

        if(indexEdit === index){
          let imageSave = document.createElement('img');
          imageSave.src = "https://image.flaticon.com/icons/png/512/61/61807.png";
          imageSave.className = "but";
          container.appendChild(imageSave);
          imageSave.onclick = function(){
          saveOnClick(index);
        };
        
                  
        }else{
          let imageEdit = document.createElement('img');
          imageEdit.src = "https://image.flaticon.com/icons/png/512/61/61456.png";
          imageEdit.className = "but";
          container.appendChild(imageEdit);
          imageEdit.onclick = function(){
          editOnClick(index);
        }
                 
          let imageDelete = document.createElement('img');
          imageDelete.src = "https://image.flaticon.com/icons/png/512/61/61848.png";
          imageDelete.className = "but";
          container.appendChild(imageDelete);
          imageDelete.onclick = function(){
          delOnClick(index);
      }
      }
      content.appendChild(container);
    })
  }
    delOnClick = async (index) =>{
      // mainArr.splice(index, 1);
      let allID = mainArr[index]._id;
      const resp = await fetch(`http://localhost:8000/deleteCost?_id=${allID}`, {
        method: "DELETE",
    });
    let result = await resp.json();
    mainArr = result.data;
      render(); 
    }
    
    editOnClick = (index) =>{
      indexEdit = index;
      // localStorage.setItem('tasks', JSON.stringify(mainArr));
      render()
    }
    
    updateNewText = (event)=>{
       mainArr[indexEdit].text = event.target.value; 
      //  localStorage.setItem('tasks', JSON.stringify(mainArr));
       render();
    }

    updateNewValue = (event)=>{
      mainArr[indexEdit].value = event.target.value; 
     //  localStorage.setItem('tasks', JSON.stringify(mainArr));
      render();
   }
    
    saveOnClick = async () =>{
      const resp = await fetch("http://localhost:8000/updateTask", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          _id: mainArr[index]._id,
           text: mainArr[indexEdit].text,
           value: mainArr[indexEdit].value
        })
      });
      let result = await resp.json();
      indexEdit = null;
      mainArr = result.data;
      localStorage.setItem('tasks', JSON.stringify(mainArr));
      render()
    }