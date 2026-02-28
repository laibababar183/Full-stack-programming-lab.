// ============================================
// TASK 7 — STUDENT DATA USING JSON
// JSON.stringify · JSON.parse · Destructuring
// forEach · innerHTML
// ============================================

let studentData = [];

// Default 3 student objects
function loadDefaults() {
  studentData = [
    { name:'Mahnoor Arshad',  age:22, semester:3, courses:['Database', 'OOP'] },
    { name:'Ahmed Bilal',     age:21, semester:4, courses:['Web Dev', 'DSA', 'Linear Algebra'] },
    { name:'Fatima Sheikh',   age:23, semester:5, courses:['ML', 'AI Ethics', 'Statistics'] },
  ];
  showStringify();
}

// Add custom student
function addCustom() {
  const name     = document.getElementById('j-name').value.trim();
  const age      = parseInt(document.getElementById('j-age').value);
  const semester = parseInt(document.getElementById('j-semester').value);
  const crsRaw   = document.getElementById('j-courses').value.trim();

  if (!name || !age || !semester || !crsRaw) { alert('Fill all fields!'); return; }

  const courses = crsRaw.split(',').map(c => c.trim()).filter(Boolean);
  studentData.push({ name, age, semester, courses });

  document.getElementById('j-name').value='';
  document.getElementById('j-age').value='';
  document.getElementById('j-semester').value='';
  document.getElementById('j-courses').value='';

  showStringify();
}

// Step 1: JSON.stringify()
function showStringify() {
  const jsonString = JSON.stringify(studentData, null, 2); // Convert to JSON string
  document.getElementById('stringify-out').textContent = jsonString;
}

// Step 2+3: JSON.parse() + display
function parseAndDisplay() {
  if (studentData.length === 0) { alert('Load students first!'); return; }

  const jsonString = JSON.stringify(studentData); // stringify
  const parsed     = JSON.parse(jsonString);       // parse back to object

  // Show parse output
  document.getElementById('parse-out').textContent =
    parsed.map((s, i) => {
      const { name, age, semester, courses } = s; // Destructuring
      return `// Student [${i}] — destructured\nname: "${name}"  age: ${age}  semester: ${semester}\ncourses: [${courses.map(c=>`"${c}"`).join(', ')}]`;
    }).join('\n\n');

  // Display using forEach + innerHTML
  const cards = document.getElementById('display-cards');
  let html = '<div class="d-cards">';

  parsed.forEach((student, i) => {
    const { name, age, semester, courses } = student; // Destructuring
    const tags = courses.map(c => `<span class="d-tag">${c}</span>`).join('');
    html += `
      <div class="d-card" style="animation-delay:${i*0.07}s">
        <div class="d-name">${name}</div>
        <div class="d-meta">Age: ${age} &bull; Semester: ${semester} &bull; ${courses.length} courses</div>
        <div class="d-clbl">Enrolled Courses</div>
        <div class="d-tags">${tags}</div>
      </div>`;
  });

  html += '</div>';
  cards.innerHTML = html;
}

function clearAll() {
  studentData = [];
  document.getElementById('stringify-out').textContent = '—';
  document.getElementById('parse-out').textContent     = '—';
  document.getElementById('display-cards').innerHTML   = '';
}