const purchasePrice = document.querySelector('.purchase-price');
const downPaymentPc = document.querySelector('.down-payment-percentage');
const mortgageTerm = document.querySelector('.mortgage-term');
const amortPeriod = document.querySelector('.amortization-period');
const submitBtn = document.querySelector('.input-submit');
const output = document.querySelector('.output-table');

let data = {};

submitBtn.addEventListener('click', () => {
    if (!isNaN(purchasePrice.value) && !isNaN(downPaymentPc.value) && !isNaN(mortgageTerm.value) && !isNaN(amortPeriod.value)) {
        data['purchasePrice'] = purchasePrice.value;
        data['downPaymentPc'] = downPaymentPc.value;
        data['mortgageTerm'] = mortgageTerm.value;
        data['amortPeriod'] = amortPeriod.value;
        output.textContent = 'You entered all numbers!';
        calcMinPcAndPayment(data);
        validatePercentage(data);
        calcInsurancePremium(data);
        calcTermAndPeriod(data);
        displayAmortizationSchedule(data);
    } else {
        output.textContent = 'Please enter all number values.';
    }
});

function calcMinPcAndPayment(data) {
    if (data['purchasePrice'] <= 500000) {
        data['minimumPercentage'] = 0.05;
        data['minimumDownPayment'] = data['purchasePrice'] * data['minimumPercentage'];
    } else if (500000 < data['purchasePrice'] <= 100000) {
        data['minimumDownPayment'] = 500000 * 0.05 + (data['purchasePrice'] - 500000) * 0.1;
        data['minimumPercentage'] = (data['minimumDownPayment'] / data['purchasePrice']);
    } else {
        data['minimumPercentage'] = 0.2;
        data['minimumDownPayment'] = data['purchasePrice'] * data['minimumPercentage'];
    }
}

function validatePercentage(data) {
    data['minDownPaymentPc'] = (data['minimumDownPayment'] / data['purchasePrice']) * 100;
    if (data['downPaymentPc'] >= data['minDownPaymentPc'] && data['downPaymentPc'] <= 100) {
        data['downPaymentAmt'] = data['purchasePrice'] * (data['downPaymentPc'] * 100);
    } else {
        console.log("Please enter a value between the minimum and 100");
        return false;
    }
}

function calcInsurancePremium(data) {
    if (5 <= data['downPaymentInputPercent'] < 10) {
        data['insurPrem'] = (data['purchasePrice'] - data['downPaymentAmt']) * 4 / 100;
    } else if (10 <= data['downPaymentInputPercent'] < 15) {
        data['insurPrem'] = (data['purchasePrice'] - data['downPaymentAmt']) * 3.1 / 100;
    } else if (15 <= data['downPaymentInputPercent'] < 20) {
        data['insurPrem'] = (data['purchasePrice'] - data['downPaymentAmt']) * 2.8 / 100;
    } else {
        data['insurPrem'] = 0;
    }
    data['principalAmt'] = data['purchasePrice'] - data['downPaymentAmount'] + data['insurPrem'];
}

function calcTermAndPeriod(data) {
    rates = {1:0.0595, 2:0.059, 3:0.056, 5:0.0529, 10:0.06}
    if (!(data['mortgageterm'] in rates)) {
        console.log("Term not valid -- enter 1, 2, 3, 5, or 10.");
    }
    if (!(5 <= data['amortPeriod'] && data['amortPeriod'] & 5 == 0)) {
        console.log("Enter a period between 5 and 25 years that is a multiple of 5.");
    }

    data['eMonthlyInterest'] = ((1 + rates[data['mortgage-term']]/2)**2)**(1/12) - 1;
    data['monthlyPayment'] = data['principalAmount']*(data['eMonthlyInterest']*(1 + data['eMonthlyInterest'])**(data['amortPeriod']*12))/((1+data['eMonthlyInterest'])**(data['amortPeriod']*12) - 1);
}

function displayAmortizationSchedule(data) {


    let openingBalance = data['principalAmt']
    let monthlyInterestAmt = openingBalance * data['eMonthlyInterest']
    let monthlyPrincipal = data['monthlyPayment'] - monthlyInterestAmt
    let closingBalance = openingBalance - monthlyPrincipal
    let sumPrincipal = 0
    let sumInterest = 0
    let term = data['mortgage-term'] * 12
    let values = {1: month, 2: openingBalance, 3: data['monthlyPayment'], 4: monthlyPrincipal, 5: monthlyInterestAmt, 6: closingBalance}

    for (month in range(1, term+1)) {
        const row = document.createElement('tr');
        output.appendChild(row);
        for (let i = 0; i < 6; i++) {
            const cell = document.createElement('td');
            let cellText = document.createTextNote(values(i));
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        sumInterest += monthlyInterestAmt
        sumPrincipal += monthlyPrincipal
        openingBalance -= monthlyPrincipal
        monthlyInterestAmt = openingBalance * data['eMonthlyInterest']
        monthlyPrincipal = data['monthlyPayment'] - monthlyInterestAmt
        closingBalance = openingBalance - monthlyPrincipal
    }
    
    //print(f'{"Total"}{sumPrincipal):>39.2f} {sumInterest):>13.2f}')
}