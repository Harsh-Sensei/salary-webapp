const baseSalary = {
    Asma: 11800,
    Jalpa: 11000,
    Manju: 9000,
    Hansa: 9000,
    Shrusti: 9000,
    Urvasi: 9000,
    Madhuben: 9000,
    Gitaben: 9000,
    Ushaben: 9000,
    Nightayaben: 9000
};

const salaryDays = {
    Asma: 26,
    Jalpa: 26,
    Manju: 26,
    Hansa: 26,
    Shrusti: 26,
    Urvasi: 26,
    Madhuben: 28,
    Gitaben: 28,
    Ushaben: 28,
    Nightayaben: 28
};


const employees = [
    "Asma",
    "Jalpa",
    "Manju",
    "Hansa",
    "Shrusti",
    "Urvasi",
    "Madhuben",
    "Gitaben",
    "Ushaben",
    "Nightayaben"
];

window.onload = () => {
    const employeesDiv = document.getElementById('employees');
    employees.forEach(employee => {
        employeesDiv.innerHTML += generateEmployeeForm(employee);
    });
};

function generateEmployeeForm(name) {
    return `
        <div class="employee" id="${name}">
            <h3>${name}</h3>
            <label for="${name}-leaves">Number of leaves taken:</label>
            <input type="number" id="${name}-leaves" placeholder="Enter number of leaves">
            <label for="${name}-extra">Number of extra days worked:</label>
            <input type="number" id="${name}-extra" placeholder="Enter number of extra days">
            <p id="${name}-salary">Calculated Salary: </p>
        </div>
    `;
}

function calculateSalaries() {
    employees.forEach(employee => {
        const leaves = parseInt(document.getElementById(`${employee}-leaves`).value) || 0;
        const extraDays = parseInt(document.getElementById(`${employee}-extra`).value) || 0;
        const amt = baseSalary[employee]/salaryDays[employee];
        const deductionPerLeave = amt;
        const additionPerExtraDay = amt;
        
        let calculatedSalary = baseSalary[employee] - (leaves * deductionPerLeave) + (extraDays * additionPerExtraDay);
        document.getElementById(`${employee}-salary`).innerText = `Calculated Salary: ₹${calculatedSalary}`;
    });
}
