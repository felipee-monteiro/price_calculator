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
let moneyData = localStorage.getItem("moneyInfo") !== null ? JSON.parse(localStorage.getItem("moneyInfo")) : [{totalMoney: Number(window.prompt("Qual o valor que deseja Administrar ?")),items: []}];
let [moneyInfo] = moneyData;

moneyH3.innerText = `R$ ${moneyInfo.totalMoney}`;
dimiMoney.innerText = "R$ 0";

addButton.onclick = () => {;
     
     let newProductValue = Math.abs(inputValue.value);
     let newProductName = inputName.value;
     let {totalMoney, items} = moneyInfo;

     if (newProductName == "" || newProductValue === 0){
        window.alert("Por favor, preencha todos os Campos Corretamente.") 
        return;
     }

     items.push({
     	name: newProductName,
        ammount: Number(ammountItem.value),
        value: newProductValue,
     });

     itemHTML.innerHTML = "";

     let sumAllValuesDimi = () => items.reduce((acc, item) => acc + (item.value * item.ammount), 0);
     totalMoney = totalMoney - sumAllValuesDimi();

     moneyH3.innerText = `R$ ${totalMoney}`;
     dimiMoney.innerText = `R$ ${sumAllValuesDimi()}`;

     const createElement = (elementName, attr = null) => {
        const el = document.createElement(elementName);
        const {id, className} = attr;

        if (attr !== undefined) {
            el.setAttribute("id", id);
            el.className = className; 
        }

        return el;
     };

     const createElementsAndInsertIntoPage = (item, index) => {
            let h6 = createElement("h6", {className: "d-flex justify-content-between"});
            let button = createElement("button", {id: index, className: "btn-close"});

            h6.textContent = `${item.ammount} - ${item.name} - R$ ${item.value * item.ammount}`;;
     	    h6.appendChild(button);
     	    itemHTML.appendChild(h6); 	
     }

     const removeItemFromPageAndUpdateValues = (i) => {
            const el = document.getElementById(`${i}`);
            const parent = el.parentNode;
            parent.remove();

            let [{value, id}] = items.filter(item => item.id === i);
            const [deleted] = items.splice(id, 1); 

            console.log(deleted);

            moneyH3.innerText = `R$ ${totalMoney + value}`;
            dimiMoney.innerText = `R$ ${sumAllValuesDimi()}`;
            
            localStorage.setItem("moneyInfo", JSON.stringify(moneyData));
     };

     items.forEach((item, index) => {
     	    item["id"] = index;
            if (item.ammount === 0) item.ammount++;
            createElementsAndInsertIntoPage(item, index);
     });

     itemHTML.addEventListener("click", e => {
            const clickedElement = e.target;
            const idElementAsNumber = Number(e.target.id);

            if (clickedElement.tagName === "BUTTON") {
                removeItemFromPageAndUpdateValues(idElementAsNumber);
            }
     });

     localStorage.setItem("moneyInfo", JSON.stringify(moneyData));

     inputName.value = "";
     inputValue.value = "";

};