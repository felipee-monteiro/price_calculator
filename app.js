let addButton = document.getElementById("addButton");
let moneyH3 = document.getElementById("totalMoney");
let dimiMoney = document.getElementById("dimiMoney");
let inputName = document.getElementById("name");
let inputValue = document.getElementById("value");
let itemHTML = document.getElementById("itemData");
let ammountItem = document.getElementById("ammount");
let moneyData = localStorage.getItem("moneyInfo") === null ? [{totalMoney: Number(window.prompt("Qual valor deseja Administrar ?")), items: new Array()}] : JSON.parse(localStorage.getItem("moneyInfo"));
let [{totalMoney, items}] = moneyData;

updateValuesFromPage();

function createElement(elementName, attr = null) {
    const el = document.createElement(elementName);
    if(attr !== null && typeof attr === 'object') {
        Object.keys(attr).forEach(function(i, ind) {
            el.setAttribute(i, attr[i]);
        });
    }
    return el;
};

function createElementsAndInsertIntoPage(item, index) {
    const div = createElement("div", {class: "d-flex align-items-center justify-content-between"});
    const h6 = createElement("h6");
    const button = createElement("button", {id: index, class: "btn-close"});

    h6.textContent = `${ item.ammount } - ${ item.name } - R$${item.value} - (R$ ${ item.value * item.ammount })`;
    div.appendChild(h6);
    div.appendChild(button);
    itemHTML.classList.remove("hidden");
    itemHTML.append(div);
}

function init() {
    itemHTML.innerHTML = "";
    items.forEach((item, index) => {
        item["id"] = index;
        if(item.ammount === 0) item.ammount++;
        createElementsAndInsertIntoPage(item, index);
    });
}

init();

function removeItemFromPage(i) {
    items = items.filter(item => item.id !== i);
    updateValuesFromPage();
    init();
    localStorage.setItem("moneyInfo", JSON.stringify([{totalMoney, items}]));
}

function updateValuesFromPage(){
    let sumAllValuesDimi = () => items.reduce((acc, item) => acc + item.value * item.ammount, 0);
    const sumAllValuesDimiAsNumber = Number(sumAllValuesDimi()).toFixed(2);
    const totalValues = totalMoney - sumAllValuesDimi();

    moneyH3.innerText = `R$ ${ totalValues }`;
    dimiMoney.innerText = `R$ ${ sumAllValuesDimiAsNumber }`;
    itemHTML.classList.add("hidden");
    if (totalValues <= 100) {
        alert("Seu saldo está prestes a esgotar.");
    }
}

itemHTML.addEventListener("click", e => {
    const clickedElement = e.target;
    const idElementAsNumber = Number(e.target.id);

    if(clickedElement.tagName === "BUTTON") {
        removeItemFromPage(idElementAsNumber);
    }
});

addButton.onclick = () => {
    let newProductValue = Math.abs(inputValue.value);
    let newProductName = inputName.value;

    if(newProductName.trim() === "" || newProductValue === 0) {
        window.alert("Por favor, preencha todos os Campos Corretamente.");
        return;
    }

    items.push({
        name: newProductName,
        ammount: Number(ammountItem.value),
        value: newProductValue,
    });

    localStorage.setItem("moneyInfo", JSON.stringify([{totalMoney, items}]));

    inputName.value = "";
    inputValue.value = "";

    updateValuesFromPage();
    init();
};