const baseSalary = {
    Asma: 11400,
    Jalpa: 7000,
    Manju: 9000,
    Hansa: 11000,
    Shrusti: 11600,
    Urvasi: 4500,
    Madhuben: 8000,
    Gitaben: 7500,
    Ushaben: 7800,
    Jamnaben: 9000,
    DrShivali: 18300
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
    Jamnaben: 28,
    DrShivali: 26
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
    "Jamnaben",
    "DrShivali" 
];

let rows = []

window.onload = () => {
    const employeesDiv = document.getElementById('employees');
    employees.forEach(employee => {
        employeesDiv.innerHTML += generateEmployeeForm(employee);
    });

    document.getElementById('csv-file-input').addEventListener('change', handleFileSelect, false);
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

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            processCSV(contents);
        };
        reader.readAsText(file);
    }
}

function processCSV(data) {
    rows = data.split('\n').filter(row => row.trim() !== '');
    const headers = rows[0].split(',');

    if (headers.length !== employees.length || !headers.every((val, index) => val.trim() === employees[index].trim())) {
        alert('CSV file does not match the required format.');
        return;
    }

    displayCSVTable(headers, rows);
    // console.log("Displaying done")
}

function displayCSVTable(headers, rows) {
    const container = document.getElementById('csv-table-container');
    let tableHTML = '<table><thead><tr>';

    headers.forEach(header => {
        tableHTML += `<th>${header}</th>`;
    });

    tableHTML += '</tr></thead><tbody><tr>';
    rows.forEach((row, index) => {
        if (index >= 1){
            const values = rows[index].split(',');
            values.forEach(value => {
                tableHTML += `<td>${value}</td>`;
            });
            tableHTML += '</tr>';
        }

    })

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
}

function calculateSalaries() {
   let total = 0;
    employees.forEach(employee => {
        const leaves = parseInt(document.getElementById(`${employee}-leaves`).value) || 0;
        const extraDays = parseInt(document.getElementById(`${employee}-extra`).value) || 0;
        const amt = baseSalary[employee]/salaryDays[employee];
        const deductionPerLeave = amt;
        const additionPerExtraDay = amt;
        
        let calculatedSalary = Math.round(baseSalary[employee] - (leaves * deductionPerLeave) + (extraDays * additionPerExtraDay));
        total += calculatedSalary;
	document.getElementById(`${employee}-salary`).innerText = `Calculated Salary: ₹${calculatedSalary}`;
    });
   document.getElementById(`salary-btn`).innerText = `Salary Total = ₹${total}`;
}

function downloadCSV() {
    const csvFilename = document.getElementById('csv-filename').value || 'salaries.csv';
    let csvContent = 'data:text/csv;charset=utf-8,';

    // Add previous data
    if (rows.length === 0){
    	employees.forEach((value, index) => {
	    if (index === (employees.length-1) ){
	    	csvContent += value + '\n';
	    }
	    else {
		csvContent += value + ',';
	    }
		
	})
    }
    rows.forEach((value, index) => {
        csvContent += value + '\n';
    });

    // Add salary data
    const salaries = employees.map(employee => {
        const leaves = parseInt(document.getElementById(`${employee}-leaves`).value) || 0;
        const extraDays = parseInt(document.getElementById(`${employee}-extra`).value) || 0;

        const amt = baseSalary[employee]/salaryDays[employee];
        const deductionPerLeave = amt;
        const additionPerExtraDay = amt;

        return Math.round(baseSalary[employee] - (leaves * deductionPerLeave) + (extraDays * additionPerExtraDay));
    });


    csvContent += salaries.join(',') + '\n';

    // Create a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', csvFilename);
    document.body.appendChild(link); // Required for FF

    link.click();
    document.body.removeChild(link); // Clean up
}