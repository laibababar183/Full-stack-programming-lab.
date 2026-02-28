// ============================================
// TASK 3 — ASYNC DATA LOADER
// Promise · setTimeout · .then() · .catch()
// ============================================

// Promise function with 3 second delay
function fetchUsers() {
  const shouldFail = document.getElementById('fail-toggle').checked;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        // Reject using boolean flag
        reject('Server Error 500: Database connection failed.');
      } else {
        // Resolve with array of user objects
        resolve([
          { name:'Zara Ahmed',      email:'zara@uni.edu',    role:'Student'  },
          { name:'Bilal Raza',      email:'bilal@uni.edu',   role:'Lecturer' },
          { name:'Nida Malik',      email:'nida@uni.edu',    role:'Student'  },
          { name:'Hamza Sheikh',    email:'hamza@uni.edu',   role:'Admin'    },
          { name:'Ayesha Siddiqui', email:'ayesha@uni.edu',  role:'Student'  },
          { name:'Farrukh Qazi',    email:'farrukh@uni.edu', role:'Lecturer' },
        ]);
      }
    }, 3000); // 3 seconds delay
  });
}

function loadUsers() {
  const statusBox = document.getElementById('status-box');
  const userGrid  = document.getElementById('user-grid');
  const btn       = document.getElementById('fetch-btn');

  btn.disabled    = true;
  userGrid.innerHTML = '';
  statusBox.className = 'status-box loading';
  statusBox.innerHTML = '⏳ Fetching users from server... (3s delay)';

  // .then() and .catch()
  fetchUsers()
    .then(users => {
      statusBox.className = 'status-box success';
      statusBox.innerHTML = `✓ Promise Status: RESOLVED — ${users.length} user objects returned via .then()`;

      // Display results in HTML using innerHTML
      userGrid.innerHTML = users.map((u, i) => `
        <div class="user-card" style="animation-delay:${i * 0.08}s">
          <div class="u-avatar">${u.name.charAt(0)}</div>
          <div class="u-name">${u.name}</div>
          <div class="u-email">${u.email}</div>
          <span class="u-role role-${u.role}">${u.role}</span>
        </div>`).join('');

      btn.disabled = false;
    })
    .catch(err => {
      statusBox.className = 'status-box error';
      statusBox.innerHTML = `✕ Promise Status: REJECTED — ${err}`;
      btn.disabled = false;
    });
}

function resetAll() {
  document.getElementById('status-box').className = 'status-box hidden';
  document.getElementById('user-grid').innerHTML  = '';
  document.getElementById('fail-toggle').checked  = false;
  document.getElementById('fetch-btn').disabled   = false;
}