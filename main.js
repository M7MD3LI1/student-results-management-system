// =========================================================
// 1. Student Class (Classes, Encapsulation, Getters & Setters)
// =========================================================
class Student {
    // Private fields protected inside the class using #
    #name;
    #subject1;
    #subject2;
    #subject3;
    #attendance;

    // Constructor initializes student properties through setters for validation
    constructor(name, subject1, subject2, subject3, attendance) {
        this.name = name;
        this.subject1 = subject1;
        this.subject2 = subject2;
        this.subject3 = subject3;
        this.attendance = attendance;
    }

    // Setter and Getter for Student Name
    set name(value) {
        if (typeof value !== "string" || value.trim() === "") {
            throw new Error("Student name is required and cannot be empty.");
        }
        this.#name = value.trim();
    }

    get name() {
        return this.#name;
    }

    // Setter and Getter for Subject 1 Grade
    set subject1(value) {
        if (value === "" || value === null || value === undefined || isNaN(Number(value))) {
            throw new Error("Subject 1 grade is required and must be a valid number.");
        }
        const grade = Number(value);
        if (grade < 0 || grade > 100) {
            throw new Error("Subject 1 grade must be between 0 and 100.");
        }
        this.#subject1 = grade;
    }

    get subject1() {
        return this.#subject1;
    }

    // Setter and Getter for Subject 2 Grade
    set subject2(value) {
        if (value === "" || value === null || value === undefined || isNaN(Number(value))) {
            throw new Error("Subject 2 grade is required and must be a valid number.");
        }
        const grade = Number(value);
        if (grade < 0 || grade > 100) {
            throw new Error("Subject 2 grade must be between 0 and 100.");
        }
        this.#subject2 = grade;
    }

    get subject2() {
        return this.#subject2;
    }

    // Setter and Getter for Subject 3 Grade
    set subject3(value) {
        if (value === "" || value === null || value === undefined || isNaN(Number(value))) {
            throw new Error("Subject 3 grade is required and must be a valid number.");
        }
        const grade = Number(value);
        if (grade < 0 || grade > 100) {
            throw new Error("Subject 3 grade must be between 0 and 100.");
        }
        this.#subject3 = grade;
    }

    get subject3() {
        return this.#subject3;
    }

    // Setter and Getter for Attendance Percentage
    set attendance(value) {
        if (value === "" || value === null || value === undefined || isNaN(Number(value))) {
            throw new Error("Attendance percentage is required and must be a valid number.");
        }
        const rate = Number(value);
        if (rate < 0 || rate > 100) {
            throw new Error("Attendance percentage must be between 0% and 100%.");
        }
        this.#attendance = rate;
    }

    get attendance() {
        return this.#attendance;
    }

    // Getter to calculate and return the student's average grade
    get average() {
        const sum = this.#subject1 + this.#subject2 + this.#subject3;
        const avg = sum / 3;
        return Number(avg.toFixed(2));
    }
}

// =========================================================
// 2. Global Students Array & DOM Element References
// =========================================================
let studentsList = [];

// Input Fields
const studentNameInput = document.getElementById("studentName");
const subject1Input = document.getElementById("subject1");
const subject2Input = document.getElementById("subject2");
const subject3Input = document.getElementById("subject3");
const attendanceInput = document.getElementById("attendance");

// Control Buttons
const addStudentBtn = document.getElementById("addStudentBtn");
const graceCommitteeBtn = document.getElementById("graceCommitteeBtn");

// Display Areas
const errorMessageBox = document.getElementById("errorMessageBox");
const errorMessageText = document.getElementById("errorMessageText");
const studentsDisplayArea = document.getElementById("studentsDisplayArea");
const studentsCountBadge = document.getElementById("studentsCountBadge");
const graceReportArea = document.getElementById("graceReportArea");

// =========================================================
// 3. Helper Functions for UI Updates
// =========================================================

// Show red error alert on the page
function showError(message) {
    errorMessageText.textContent = message;
    errorMessageBox.classList.remove("d-none");
}

// Hide and clear the error alert
function clearError() {
    errorMessageText.textContent = "";
    errorMessageBox.classList.add("d-none");
}

// Reset all input fields after adding a student
function clearInputs() {
    studentNameInput.value = "";
    subject1Input.value = "";
    subject2Input.value = "";
    subject3Input.value = "";
    attendanceInput.value = "";
    studentNameInput.focus();
}

// Render the registered students table in the Students List area
function renderStudentsList() {
    studentsCountBadge.textContent = `${studentsList.length} ${studentsList.length === 1 ? "Student" : "Students"}`;

    if (studentsList.length === 0) {
        studentsDisplayArea.innerHTML = `
            <div class="empty-state text-center py-4 text-muted">
                <i class="bi bi-inbox fs-1 d-block mb-2"></i>
                <p class="mb-0">No students added yet. Use the form to register a student.</p>
            </div>
        `;
        return;
    }

    const rowsHTML = studentsList.map(function (student, index) {
        let statusBadge = "";
        if (student.average >= 50) {
            statusBadge = `<span class="badge bg-success">Pass</span>`;
        } else if (student.average >= 40 && student.average <= 49) {
            statusBadge = `<span class="badge bg-warning text-dark">Grace Eligible</span>`;
        } else {
            statusBadge = `<span class="badge bg-danger">Fail</span>`;
        }

        return `
            <tr>
                <td>${index + 1}</td>
                <td class="fw-semibold">${student.name}</td>
                <td>${student.subject1}</td>
                <td>${student.subject2}</td>
                <td>${student.subject3}</td>
                <td>${student.attendance}%</td>
                <td class="fw-bold text-primary">${student.average}</td>
                <td>${statusBadge}</td>
            </tr>
        `;
    }).join("");

    studentsDisplayArea.innerHTML = `
        <div class="table-responsive">
            <table class="table table-hover table-bordered align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Sub 1</th>
                        <th>Sub 2</th>
                        <th>Sub 3</th>
                        <th>Attendance</th>
                        <th>Average</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHTML}
                </tbody>
            </table>
        </div>
    `;
}

// =========================================================
// 4. Add Student Button Event (DOM & Try/Catch)
// =========================================================
addStudentBtn.onclick = function () {
    try {
        // 1. Read values entered by the user
        const nameValue = studentNameInput.value;
        const sub1Value = subject1Input.value;
        const sub2Value = subject2Input.value;
        const sub3Value = subject3Input.value;
        const attendanceValue = attendanceInput.value;

        // 2. Create a new Student instance (Validation happens inside Setters)
        const newStudent = new Student(
            nameValue,
            sub1Value,
            sub2Value,
            sub3Value,
            attendanceValue
        );

        // 3. Add the valid student object to studentsList using push()
        studentsList.push(newStudent);

        // 4. Update the Students List display with calculated average
        renderStudentsList();

        // 5. Clear input fields and any previous error messages
        clearInputs();
        clearError();
    } catch (error) {
        // 6. Catch validation error and display it in the red error box
        showError(error.message);
    }
};

// =========================================================
// 5. Grace Committee Button Event (Filter, Map, Reduce)
// =========================================================
graceCommitteeBtn.onclick = function () {
    clearError();

    // Step 1 - Filter: Extract students whose average is between 40 and 49 (inclusive)
    const strugglingStudents = studentsList.filter(function (student) {
        return student.average >= 40 && student.average <= 49;
    });

    // Step 4 - Prevent Division by Zero if no struggling students exist
    if (strugglingStudents.length === 0) {
        graceReportArea.innerHTML = `
            <div class="alert alert-warning mb-0 d-flex align-items-center" role="alert">
                <i class="bi bi-info-circle-fill fs-5 me-2"></i>
                <div>
                    <strong>No Eligible Students:</strong> No students currently meet the Grace Committee criteria (average between 40 and 49).
                </div>
            </div>
        `;
        return;
    }

    // Step 2 - Map: Add 5 grace marks to each extracted student's average
    // Without modifying the original student data inside studentsList
    const graceResults = strugglingStudents.map(function (student) {
        const newAvg = Number((student.average + 5).toFixed(2));
        return {
            name: student.name,
            oldAverage: student.average,
            newAverage: newAvg
        };
    });

    // Step 3 - Reduce: Sum all new averages after adding grace marks
    const totalNewAverages = graceResults.reduce(function (sum, item) {
        return sum + item.newAverage;
    }, 0);

    // Calculate the overall average for struggling students after grace
    const overallAverageAfterGrace = Number((totalNewAverages / graceResults.length).toFixed(2));

    // Step 5 - Final Report rendered using Template Literals
    const reportRowsHTML = graceResults.map(function (item, index) {
        const finalStatus = item.newAverage >= 50
            ? `<span class="badge bg-success">Passed After Grace</span>`
            : `<span class="badge bg-warning text-dark">Still Below 50</span>`;

        return `
            <tr>
                <td>${index + 1}</td>
                <td class="fw-semibold">${item.name}</td>
                <td>${item.oldAverage}</td>
                <td class="fw-bold text-success">${item.newAverage} (+5)</td>
                <td>${finalStatus}</td>
            </tr>
        `;
    }).join("");

    graceReportArea.innerHTML = `
        <div class="p-3 mb-3 rounded bg-light border">
            <div class="row text-center g-3">
                <div class="col-sm-6">
                    <div class="text-muted small">Students Eligible for Grace</div>
                    <div class="fs-4 fw-bold text-primary">${graceResults.length}</div>
                </div>
                <div class="col-sm-6">
                    <div class="text-muted small">Overall Average After Grace</div>
                    <div class="fs-4 fw-bold text-success">${overallAverageAfterGrace}</div>
                </div>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table table-bordered table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th>#</th>
                        <th>Student Name</th>
                        <th>Average Before Grace</th>
                        <th>Average After Grace</th>
                        <th>Final Result</th>
                    </tr>
                </thead>
                <tbody>
                    ${reportRowsHTML}
                </tbody>
            </table>
        </div>
    `;
};