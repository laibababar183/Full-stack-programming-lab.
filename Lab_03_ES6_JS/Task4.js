// ============================================
// TASK 4 — UNIQUE COURSE REGISTRATION SYSTEM
// Set · No Duplicates · .size · for...of
// ============================================

const registeredCourses = new Set(); // Set stores unique values only
let totalAttempts = 0;
let dupBlocked    = 0;

function addLog(msg, type='info') {
  const log = document.getElementById('reg-log');
  const d   = document.createElement('div');
  d.className   = `log-entry ${type}`;
  d.textContent = `\u2022 ${msg}`;
  log.prepend(d);
}

function registerCourse(name) {
  const input  = document.getElementById('course-input');
  const course = name || input.value.trim();
  if (!course) return;

  totalAttempts++;

  if (registeredCourses.has(course)) {
    // Set blocks duplicates automatically
    dupBlocked++;
    addLog(`DUPLICATE BLOCKED: "${course}" already exists in Set.`, 'error');
  } else {
    registeredCourses.add(course); // Add to Set
    addLog(`Registered: "${course}" — Set size: ${registeredCourses.size}`, 'success');
  }

  input.value = '';
  updateStats();
  renderCourses();
}

function tryDuplicate() {
  if (registeredCourses.size === 0) { addLog('Load samples first!', 'info'); return; }
  const first = [...registeredCourses][0];
  registerCourse(first);
}

function loadSamples() {
  ['Data Structures', 'OOP', 'Web Development', 'Database Systems', 'OOP'].forEach(c => registerCourse(c));
}

function clearAll() {
  registeredCourses.clear();
  totalAttempts = 0; dupBlocked = 0;
  document.getElementById('reg-log').innerHTML = '<div class="log-entry info">\u2022 Cleared.</div>';
  updateStats(); renderCourses();
}

function updateStats() {
  document.getElementById('uniqueCount').textContent   = registeredCourses.size;
  document.getElementById('totalAttempts').textContent = totalAttempts;
  document.getElementById('dupBlocked').textContent    = dupBlocked;
}

// Render using for...of loop
function renderCourses() {
  const el = document.getElementById('courses-list');
  if (registeredCourses.size === 0) {
    el.innerHTML = '<p class="empty">No courses registered yet.</p>';
    return;
  }

  const chips = [];
  for (const course of registeredCourses) { // for...of loop
    chips.push(`<span class="course-chip">${course}</span>`);
  }
  el.innerHTML = `<div class="courses-wrap">${chips.join('')}</div>`;
}