// ============================================
// TASK 6 — MINI UNIVERSITY PORTAL
// Class · Map · Set · Promise — Combined
// ============================================

// ES6 Class
class StudentRecord {
  constructor(id, name, courses) {
    this.id      = id;
    this.name    = name;
    this.courses = courses;
    this.time    = new Date().toLocaleTimeString();
  }
}

// Map to store students
const studentMap = new Map();
// Set to store unique courses
const courseSet  = new Set();

let stuCounter  = 1001;
let saveCounter = 0;

// ── Enroll Student ───────────────────────────
function enrollStudent() {
  const name    = document.getElementById('stu-name').value.trim();
  const crsRaw  = document.getElementById('stu-courses').value.trim();

  if (!name || !crsRaw) { alert('Enter name and courses!'); return; }

  const courses  = crsRaw.split(',').map(c => c.trim()).filter(Boolean);
  const id       = `STU-${stuCounter++}`;
  const record   = new StudentRecord(id, name, courses);

  studentMap.set(id, record); // Map.set()

  // Also add courses to Set (auto-deduplicates)
  courses.forEach(c => courseSet.add(c));

  document.getElementById('stu-name').value    = '';
  document.getElementById('stu-courses').value = '';

  updateStats(); renderStudents(); renderCourses();
}

// ── Register Course ──────────────────────────
function registerCourse() {
  const name = document.getElementById('crs-name').value.trim();
  if (!name) return;
  courseSet.add(name); // Set.add() — auto unique
  document.getElementById('crs-name').value = '';
  updateStats(); renderCourses();
}

// ── Save using Promise ───────────────────────
function saveData() {
  pLog('Saving data to database...', 'info');

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (studentMap.size === 0 && courseSet.size === 0) {
        reject('Nothing to save. Add students or courses first.');
      } else {
        resolve({ students: studentMap.size, courses: courseSet.size });
      }
    }, 1500);
  })
    .then(result => {
      saveCounter++;
      updateStats();
      pLog(`✓ Saved! ${result.students} students, ${result.courses} courses.`, 'ok');
    })
    .catch(err => {
      pLog(`✕ Save failed: ${err}`, 'err');
    });
}

function updateStats() {
  document.getElementById('stu-count').textContent  = studentMap.size;
  document.getElementById('crs-count').textContent  = courseSet.size;
  document.getElementById('save-count').textContent = saveCounter;
}

function renderStudents() {
  const el = document.getElementById('stu-list');
  if (studentMap.size === 0) { el.innerHTML='<p class="empty">No students enrolled yet.</p>'; return; }

  let html = '';
  studentMap.forEach(s => {
    const tags = s.courses.map(c=>`<span class="stu-tag">${c}</span>`).join('');
    html += `
      <div class="stu-item">
        <div class="stu-avatar">${s.name.charAt(0)}</div>
        <div class="stu-info">
          <div class="stu-name">${s.name}</div>
          <div class="stu-meta">ID: ${s.id} &bull; ${s.time}</div>
          <div class="stu-tags">${tags}</div>
        </div>
      </div>`;
  });
  el.innerHTML = html;
}

function renderCourses() {
  const el = document.getElementById('crs-list');
  if (courseSet.size === 0) { el.innerHTML='<p class="empty">No courses registered yet.</p>'; return; }

  let html = '', idx = 0;
  for (const c of courseSet) {
    html += `<div class="crs-item"><span class="crs-dot"></span><span class="crs-idx">[${idx++}]</span>${c}</div>`;
  }
  el.innerHTML = html;
}

function pLog(msg, type='info') {
  const el = document.getElementById('promise-log');
  const d  = document.createElement('div');
  d.className   = `plog-${type}`;
  d.textContent = `\u2022 ${msg}`;
  el.prepend(d);
}