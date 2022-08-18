
function getTax(province){

    provinceTaxesDictionary={
        "Ontario" : 0.13,
        "Quebec" : 0.14975,
        "Alberta" : 0.05,
        "British Columbia" : 0.12,
        "Manitoba" : 0.12,
        "Saskatchewan" : 0.11,
        "Newfoundland" : 0.15,
        "Nova Scotia" : 0.15,
        "New Brunswick" : 0.15,
        "PEI" : 0.15,
        "Nunavut" : 0.05,
        "NW" : 0.05,
        "Yukon" : 0.05,
    }

    return provinceTaxesDictionary[province];
}


function getAdvertisedPrice(noTermCost, upfrontEdgeAmount, financingCreditAmount){
    const advertisedPrice = document.getElementById("advertised");
    const breakTag = document.createElement("br");
    const spanTag = document.createElement("span");
    spanTag.className = "inlineCalcSummary";

    answer = Number.parseFloat((noTermCost - upfrontEdgeAmount) / 24 - financingCreditAmount).toFixed(2);
    
    advertisedPrice.innerHTML = "Advertised Cost: $" + answer + " + applicable taxes on approved credit";
    advertisedPrice.appendChild(breakTag);
    spanTag.appendChild(document.createTextNode("($" + noTermCost + " - $" + upfrontEdgeAmount + " / 24) - $" + financingCreditAmount) );
    advertisedPrice.appendChild(spanTag);

    return answer;
}


function getBillPrice(noTermCost, upfrontEdgeAmount, downpayment, volpayment){
    const billPrice = document.getElementById("billPrice");
    const breakTag = document.createElement("br");
    const spanTag = document.createElement("span");
    spanTag.className = "inlineCalcSummary";

    answer = Number.parseFloat((noTermCost - downpayment - volpayment - upfrontEdgeAmount) / 24).toFixed(2);

    billPrice.innerHTML = "Actual Cost on Bill: $" + answer + " + applicable taxes";
    billPrice.appendChild(breakTag);

    spanTag.appendChild(document.createTextNode("($" + noTermCost + " - $" + downpayment + " - $" + volpayment + " - $" + upfrontEdgeAmount + " / 24) with the promo credit coming off the plan Monthly Service Fee"));
    billPrice.appendChild(spanTag);

    const breakTagTaxAdd = document.createElement("br");
    const spanTagTaxAdd = document.createElement("span");
    spanTagTaxAdd.className = "inlineCalcSummary";

    billPrice.appendChild(breakTagTaxAdd);
    spanTagTaxAdd.appendChild(document.createTextNode("The plan's taxes will be reduced as a result"));
    billPrice.appendChild(spanTagTaxAdd);

}


function getMonthlyTax(noTermCost, tax){
    const monthlyTax = document.getElementById("monthlyTax");
    const breakTag = document.createElement("br");
    const spanTag = document.createElement("span");
    spanTag.className = "inlineCalcSummary";

    answer = Number.parseFloat((noTermCost * tax) / 24).toFixed(2);

    monthlyTax.innerHTML = "Applicable Taxes on Bill: $" + (answer);
    monthlyTax.appendChild(breakTag);

    spanTag.appendChild(document.createTextNode("($" + noTermCost + " x " + tax +") / 24"));
    monthlyTax.appendChild(spanTag);

    return answer;
}


function getTaxAfterPromoCredit(financingCreditAmount, tax){
    const promoTax = document.getElementById("promoTax");
    const breakTag = document.createElement("br");
    const spanTag = document.createElement("span");
    spanTag.className = "inlineCalcSummary";

    answer = Number.parseFloat(financingCreditAmount * tax * -1).toFixed(2);

    promoTax.innerHTML = "Tax Deduction from Promo Credit: $" + (answer);
    promoTax.appendChild(breakTag);

    spanTag.appendChild(document.createTextNode("$-" + financingCreditAmount + " x " + tax));
    promoTax.appendChild(spanTag);

    return answer * -1;
}


function getActualTax(monthlyTax, taxDeduction){
    const actualTax = document.getElementById("actualTax");
    const breakTag = document.createElement("br");
    const spanTag = document.createElement("span");
    spanTag.className = "inlineCalcSummary";

    answer = Number.parseFloat(monthlyTax - taxDeduction).toFixed(2);
    actualTax.innerHTML = "Actual Tax (Not displayed on Bill): $" + answer;

    actualTax.appendChild(breakTag);

    spanTag.appendChild(document.createTextNode("$" + monthlyTax + " - $" + taxDeduction));
    actualTax.appendChild(spanTag);

    return answer;

}


function updatePhone(phoneName){
    const phoneElement = document.getElementById("phone");
    phoneElement.textContent = phoneName;
}


function addToHistory(){
    const history = document.getElementById("history");
    const historyEntries = document.getElementById("historyEntries");
    const results = document.getElementById("results");

    
    const copy = results.cloneNode(true);
    console.log(results);
    console.log(copy);
    // TODO Change the ID before writing to page
    
    historyEntries.appendChild(copy);
    history.className = "displayBlock";
    
    return;
}


function clearHistory(){
    document.getElementById("historyEntries").innerHTML = " ";

    const history = document.getElementById("history");
    history.className = "hiddenBlock";
    return;
}


function populateDownPayment() {

    const downpaymentSelect = document.getElementById("downpayment");
    downpaymentSelect.innerHTML = "";

    const noTermCost = document.getElementById("noterm").value;
    const mediumRisk = Number.parseFloat(noTermCost * 0.2).toFixed(2);
    const highRisk = Number.parseFloat(noTermCost * 0.4).toFixed(2);

    const lowRiskOption = document.createElement("option");
    const mediumRiskOption = document.createElement("option");
    const highRiskOption = document.createElement("option");

    const lowTextNode = document.createTextNode("0% - $0");
    const medTextNode = document.createTextNode("20% - $" + mediumRisk);
    const highTextNode = document.createTextNode("40% - $" + highRisk);

    lowRiskOption.appendChild(lowTextNode);
    mediumRiskOption.appendChild(medTextNode);
    highRiskOption.appendChild(highTextNode);

    downpaymentSelect.appendChild(lowRiskOption);
    downpaymentSelect.appendChild(mediumRiskOption);
    downpaymentSelect.appendChild(highRiskOption);
}


function populateVolPayment(){
    const volpaymentSelect = document.getElementById("volpayment");
    volpaymentSelect.innerHTML = "";

    const noPayOption = document.createElement("option");
    const noPayTextNode = document.createTextNode("$0");
    noPayOption.appendChild(noPayTextNode);
    volpaymentSelect.appendChild(noPayOption);

    const noTermCost = document.getElementById("noterm").value;
    const upfrontEdgeAmount = document.getElementById("ueamount").value;
    const financingCreditAmount = document.getElementById("fincredit").value;
    const mandatoryPaymentLiContent = document.getElementById("downpayment").value;
    
    const mandatoryPaymentAmountArray = mandatoryPaymentLiContent.split('$');
    const mandatoryPaymentAmount = mandatoryPaymentAmountArray[mandatoryPaymentAmountArray.length - 1];
    

    const remainingFin = Number.parseFloat(noTermCost - mandatoryPaymentAmount - upfrontEdgeAmount - (24 * financingCreditAmount));
    const increments = Math.floor(remainingFin / 120);

    for (let i = 1; i <= increments; i++){
        const newOption = document.createElement("option");
        const newTextNode = document.createTextNode("$" + (120 * i));

        newOption.appendChild(newTextNode);
        volpaymentSelect.appendChild(newOption);
    }
}

function calculate(flag = 1){
    const noTermCost = document.getElementById("noterm").value;
    const upfrontEdgeAmount = document.getElementById("ueamount").value;
    const financingCreditAmount = document.getElementById("fincredit").value;

    const downpayment = document.getElementById("downpayment").value;
    const downpaymentAmountArray = downpayment.split('$');
    const downpaymentAmount = downpaymentAmountArray[downpaymentAmountArray.length - 1];

    const volpayment = document.getElementById("volpayment").value;
    const volpaymentArray = volpayment.split('$');
    const volpaymentAmount = volpaymentArray[volpaymentArray.length - 1];

    
    const province = document.getElementById("province").value;
    const phoneName = document.getElementById("phoneName").value;
    const tax = getTax(province);

    const totalFinanced = document.getElementById("totalFinanced");
    noTermPlusTax = Number.parseFloat(noTermCost * (1 + tax)).toFixed(2);
    totalFinanced.innerHTML = "Total Cost of Phone (includes taxes) BEFORE Upfront Edge Credit: $" + noTermPlusTax;

    const totalTaxes = document.getElementById("taxes");
    const totalTax = Number.parseFloat(noTermCost * tax).toFixed(2);
    totalTaxes.innerHTML = "Total Taxes: $" + (totalTax);

    if (flag !== 0){
        updatePhone(phoneName);
    }
    
    const advertisedPrice = getAdvertisedPrice(noTermCost, upfrontEdgeAmount, financingCreditAmount);
    getBillPrice(noTermCost, upfrontEdgeAmount, downpaymentAmount, volpaymentAmount);

    const monthlyTax = getMonthlyTax(noTermCost, tax);
    const taxDeduction = getTaxAfterPromoCredit(financingCreditAmount, tax);
    const actualTax = getActualTax(monthlyTax, taxDeduction);

    finalResult = document.getElementById("finalResult")
    
    
    finalResult.textContent = "Summary: Advertised Price $" + advertisedPrice + " + Actual Tax $" + actualTax + " = $" + (Number.parseFloat(advertisedPrice) + Number.parseFloat(actualTax)) + " monthly";

    const results = document.getElementById("resultsBlock")
    results.className = "displayBlock";


    return;
}


const noTermEl = document.getElementById("noterm");
noTermEl.addEventListener("focusout", () => {
    populateDownPayment();
    populateVolPayment();
}, false);

const ueEl = document.getElementById("ueamount");
ueEl.addEventListener("focusout", () => {
    populateVolPayment();
}, false);

const creditEl = document.getElementById("fincredit");
creditEl.addEventListener("focusout", () => {
    populateVolPayment();
}, false);


const mandatoryPaymentEl = document.getElementById("downpayment");
mandatoryPaymentEl.addEventListener("change", () => {
    console.log("Fired");
    populateVolPayment();
}, false);


const calcButton = document.getElementById("calcButton");
calcButton.addEventListener("click", calculate, false);

const addToHistoryButton = document.getElementById("addToHistoryButton");
addToHistoryButton.addEventListener("click", addToHistory, false);

const clearHistoryButton = document.getElementById("clearHistoryButton");
clearHistoryButton.addEventListener("click", clearHistory, false);

populateDownPayment();
populateVolPayment();
calculate(0);
