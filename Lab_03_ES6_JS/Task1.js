// ============================================
// TASK 1 — STUDENT MANAGEMENT SYSTEM
// ES6 Class · Constructor · Template Literals
// ============================================

class Student {
  constructor(id, name, semester, courses) {
    this.id       = id;
    this.name     = name;
    this.semester = semester;
    this.courses  = courses; // array
  }

  // Template literal to build card HTML
  getCardHTML() {
    const tags = this.courses
      .map(c => `<span class="sc-tag">${c.trim()}</span>`)
      .join('');

    return `
      <div class="student-card">
        <div class="sc-id">Student ID &mdash; STU-${this.id}</div>
        <div class="sc-name">${this.name}</div>
        <div class="sc-meta">📚 Semester ${this.semester} &nbsp;•&nbsp; ${this.courses.length} Course${this.courses.length !== 1 ? 's' : ''}</div>
        <div class="sc-sep"></div>
        <div class="sc-clbl">Enrolled Courses</div>
        <div class="sc-tags">${tags}</div>
      </div>`;
  }
}

// Using let and const properly
const students = [];
let idCounter  = 1001;

// 3 default students
function initDefaults() {
  const list = [
    new Student(idCounter++, 'Ali Hassan',   4, ['Data Structures', 'OOP', 'Calculus II']),
    new Student(idCounter++, 'Sara Khan',    6, ['Machine Learning', 'Databases', 'Web Dev', 'AI Ethics']),
    new Student(idCounter++, 'Umar Farooq', 2, ['Programming Fundamentals', 'Digital Logic', 'Calculus I']),
  ];
  list.forEach(s => students.push(s));
  renderStudents();
}

// Add student from form
function addStudent() {
  const nameEl  = document.getElementById('s-name');
  const semEl   = document.getElementById('s-sem');
  const crsEl   = document.getElementById('s-courses');

  const name    = nameEl.value.trim();
  const sem     = parseInt(semEl.value);
  const crsRaw  = crsEl.value.trim();

  if (!name)                           { showMsg('Please enter student name.', 'error'); return; }
  if (!sem || sem < 1 || sem > 8)      { showMsg('Enter a valid semester (1–8).', 'error'); return; }
  if (!crsRaw)                         { showMsg('Enter at least one course.', 'error'); return; }

  const courses = crsRaw.split(',').map(c => c.trim()).filter(Boolean);
  students.push(new Student(idCounter++, name, sem, courses));

  nameEl.value = ''; semEl.value = ''; crsEl.value = '';
  showMsg(`"${name}" enrolled successfully!`, 'success');
  renderStudents();
}

// Render using innerHTML + template literals
function renderStudents() {
  document.getElementById('student-count').textContent = students.length;
  document.getElementById('students-grid').innerHTML =
    students.map((s, i) =>
      s.getCardHTML().replace('class="student-card"',
        `class="student-card" style="animation-delay:${i * 0.06}s"`)
    ).join('');
}

function showMsg(text, type) {
  const el = document.getElementById('msg');
  el.textContent = text;
  el.className   = `msg ${type}`;
  setTimeout(() => { el.textContent = ''; el.className = 'msg'; }, 3000);
}

document.addEventListener('keydown', e => { if (e.key === 'Enter') addStudent(); });

initDefaults();