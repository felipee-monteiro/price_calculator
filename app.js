// const matrix = [ [2,4,6,8], [12,14,16,18], [20,24,28,32], [32,34,36,38], [42,44,46,48] ];

// let [operators] = matrix;

// let [mult, divide, dimi, sum] = operators; 
// let [,...restArray] = matrix;

// const resultOperatorsMultiply = restArray[0].map( value => mult * value); 

// const resultOperatorsDivide = restArray[1].map( value =>  value / divide);

// const resultOperatorsDiminute = restArray[2].map(value => value - dimi);

// const resultOperatorsSum = restArray[3].map(value => sum + value);

// const finalResultArray = operators.concat(resultOperatorsMultiply, resultOperatorsDivide, resultOperatorsDiminute, resultOperatorsSum);

// const finalResult = finalResultArray.reduce((acc, currentValue) => acc + currentValue, 0);




let addButton = document.getElementById("addButton");
let moneyH3 = document.getElementById("totalMoney");
let dimiMoney = document.getElementById("dimiMoney");
let inputName = document.getElementById("name");
let inputValue = document.getElementById("value");
let itemHTML = document.getElementById("itemData");
let ammountItem = document.getElementById("ammount");
let moneyData = localStorage.getItem("moneyInfo") !== null ? JSON.parse(localStorage.getItem("moneyInfo")) : [{totalMoney: Number(window.prompt("Qual valor deseja Administrar ?")),items: []}];
let [{items, totalMoney}] = moneyData;

moneyH3.innerText = `R$ ${totalMoney}`;
dimiMoney.innerText = "R$ 0";

addButton.onclick = () => {
     
     let newProductValue = Math.abs(inputValue.value);
     let newProductName = inputName.value;

     if (newProductName.trim() === "" || newProductValue === 0){
        window.alert("Por favor, preencha todos os Campos Corretamente.") 
        return;
     }

     items.push({
     	name: newProductName,
        ammount: Number(ammountItem.value),
        value: newProductValue,
     });

     const createElementsAndInsertIntoPage = (item, index) => {
            const h6 = createElement("h6", {className: "d-flex justify-content-between"});
            const button = createElement("button", {id: index, className: "btn-close"});

            h6.textContent = `${item.ammount} - ${item.name} - R$ ${item.value * item.ammount}`;
            h6.append(button);
            itemHTML.append(h6);    
     }

    const init = () => {
            itemHTML.innerHTML = "";
            items.forEach((item, index) => {
               item["id"] = index;
               if (item.ammount === 0) item.ammount++;
               createElementsAndInsertIntoPage(item, index);
            });
     };

     const updateValuesFromPage = () => {
        let sumAllValuesDimi = () => items.reduce((acc, item) => acc + item.value * item.ammount, 0);
        const sumAllValuesDimiAsNumber = Number(sumAllValuesDimi()).toFixed(2);
     
        moneyH3.innerText = `R$ ${totalMoney - sumAllValuesDimi()}`;
        dimiMoney.innerText = `R$ ${sumAllValuesDimiAsNumber}`;
    }

     const createElement = (elementName, attr = null) => {
        const el = document.createElement(elementName);
        const {id, className} = attr;

        if (attr !== undefined) {
            el.setAttribute("id", id);
            el.className = className; 
        }

        return el;
     };

     const removeItemFromPage = (i) => {       
            const newArrayMoneyItems = items.filter(item => item.id !== i);
            
            items = newArrayMoneyItems;

            updateValuesFromPage();

            init();

            localStorage.setItem("moneyInfo", JSON.stringify([{totalMoney, items}]));
     };

    itemHTML.addEventListener("click", e => {
        const clickedElement = e.target;
        const idElementAsNumber = Number(e.target.id);

        if (clickedElement.tagName === "BUTTON") {
             removeItemFromPage(idElementAsNumber);
        }
    });

     localStorage.setItem("moneyInfo", JSON.stringify([{totalMoney, totalMoney}]));

     inputName.value = "";
     inputValue.value = "";
     
     updateValuesFromPage();
     init();

};