from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

# Load student data from JSON file
def load_student_data():
    with open('students.json') as f:
        return json.load(f)

# Route to serve the HTML page
@app.route('/')
def index():
    return render_template('index.html')

# API endpoint to handle search requests
@app.route('/search', methods=['POST'])
def search():
    student_data = load_student_data()
    search_term = request.form['searchTerm'].lower()

    found_students = []
    for student in student_data:
        if (student['Roll Number'].lower() == search_term) or (student['Student Name'].lower() == search_term):
            found_students.append(student)

    return jsonify(found_students)

if __name__ == '__main__':
    app.run(debug=True)
