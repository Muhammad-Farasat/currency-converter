let fromSelect = document.querySelector(".from-input select");
let toSelect = document.querySelector(".to-input select");
let exRate = document.querySelector(".result p");
let amount = document.querySelector(".amount input");
let btn = document.querySelector(".btn button");
let arr = [fromSelect, toSelect];
let rev = document.querySelector(".reverse i");
let img1 = document.querySelector(".from-input i");
let img2 = document.querySelector(".to-input i");



arr.forEach((select, i) => {
    for(let curCode in cur_List){
        const selected = ( i === 0 && curCode === "PKR") || (i === 1 && curCode === "INR") ? "selected" : "";
        select.insertAdjacentHTML("beforeend", `<option value="${curCode}" 
        ${selected}>${curCode}</option>`)
    }

    select.addEventListener('change', () => {
        const val = select.value;
        let imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/w20/${cur_List[val].toLowerCase()}.png`
    })
}) 
async function exChangeRate(){
    const amountVal = amount.value || 1;
    exRate.innerText = "Exchanging value...";

    try{
        const response = await fetch(`https://v6.exchangerate-api.com/v6/6c4bc25d0d0d4b7f39d7ae73/latest/${fromSelect.value}`);
        const result = await response.json();
        const exCahnge = result.conversion_rates[toSelect.value];
        const total = (amountVal * exCahnge).toFixed(2);
        exRate.innerText = `${amountVal} ${fromSelect.value} = ${total} ${toSelect.value}`
    }
    catch(error){
        exRate.innerText = "Sorry Something went wrong..."
    }
}

window.addEventListener('load', exChangeRate);
btn.addEventListener('click', (e) => {
    e.preventDefault();
    exChangeRate();
})
btn.addEventListener('keyup', (event)=> {
    if(event.key === "Enter"){
        exChangeRate();
    }
})
rev.addEventListener('click', () =>{
    [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
    [fromSelect, toSelect].forEach((farasat) => {
    const code = farasat.value;
    let tag = farasat.parentElement.querySelector("img");
    tag.src = `https://flagcdn.com/w20/${cur_List[code].toLowerCase()}.png`
    exChangeRate();
})})
