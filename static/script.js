document.getElementById("searchButton").addEventListener("click", searchStudent);
document.getElementById("downloadButton").addEventListener("click", downloadReport);

function searchStudent() {
    var searchTerm = document.getElementById("searchInput").value.toLowerCase();
    fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `searchTerm=${searchTerm}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                document.getElementById("reportCardContainer").innerHTML = generateReportCard(data[0]);
            } else {
                document.getElementById("reportCardContainer").innerHTML = "<p>No student found with the given search term.</p>";
            }
        });
}

function generateReportCard(student) {
    var reportCardHTML = `
        <div class="container">
            <h2>Tribhuvan University : Results</h2>
            <img class="logo" src="/static/logo.png" alt="Logo">
            <p><strong>Symbol No.:</strong> ${student["Roll Number"]}</p>
            <p><strong>Name of the Student:</strong> ${student["Student Name"]}</p>
            <p><strong>Level:</strong> ${student["Grade"]}</p>
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>GPA</th>
                    </tr>
                </thead>
                <tbody>
    `;

    Object.keys(student.Subjects).forEach(function(subject) {
        reportCardHTML += `
            <tr>
                <td>${subject}</td>
                <td>${student.Subjects[subject].Grade}</td>
                <td>${student.Subjects[subject].GPA}</td>
            </tr>
        `;
    });

    reportCardHTML += `
                </tbody>
            </table>
            <p class="highlight"><strong>SGPA:</strong> ${student["SGPA"]}</p>
            <p class="highlight"><strong>Semester Grade:</strong> ${student["Semester Grade"]}</p>
            <p class="highlight"><strong>Remarks:</strong> ${student["Remarks"]}</p>
            <hr>
            
        </div>
    `;

    return reportCardHTML;
}

function downloadReport() {
    var reportContainer = document.getElementById("reportCardContainer");

    html2canvas(reportContainer, {
        backgroundColor: "#ffffff", // Set background color to white
        alpha: false, // Ensure background is fully opaque
        onrendered: function(canvas) {
            var imageData = canvas.toDataURL("image/png");

            var a = document.createElement("a");
            a.href = imageData;
            a.download = "report.png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    });
}