// ===== 1. Dark / Light mode (remembers your choice) =====
const root = document.documentElement;
root.setAttribute('data-theme', localStorage.getItem('theme') || 'light');

document.getElementById('themeBtn').addEventListener('click', function () {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ===== 2. Calculator (only runs on calculator.html) =====
const screen = document.getElementById('screen');
if (screen) {
  let current = '';
  document.querySelectorAll('.calc-keys button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const key = btn.textContent;
      if (key === 'C') {
        current = '';
      } else if (key === '=') {
        try { current = String(eval(current)); } catch (e) { current = 'Error'; }
      } else {
        if (current === 'Error') current = '';
        current += key;
      }
      screen.textContent = current || '0';
    });
  });
}

// ===== 3. To-Do list (only runs on todo.html) =====
const taskForm = document.getElementById('taskForm');
if (taskForm) {
  const input = document.getElementById('taskInput');
  const list = document.getElementById('taskList');

  taskForm.addEventListener('submit', function (e) {
    e.preventDefault();                       // stop page reload
    if (input.value.trim() === '') return;    // ignore empty task
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between';
    li.innerHTML = '<span></span><button class="btn btn-sm btn-outline-danger">Delete</button>';
    li.firstChild.textContent = input.value;
    // click the text = mark done
    li.firstChild.addEventListener('click', function () { li.firstChild.classList.toggle('done'); });
    // click Delete = remove task
    li.lastChild.addEventListener('click', function () { li.remove(); });
    list.appendChild(li);
    input.value = '';
  });
}

// ===== 4. Age calculator (only runs on age.html) =====
const ageBtn = document.getElementById('ageBtn');
if (ageBtn) {
  ageBtn.addEventListener('click', function () {
    const dob = new Date(document.getElementById('dob').value);
    const result = document.getElementById('ageResult');
    if (isNaN(dob)) { result.textContent = 'Please choose your date of birth.'; return; }
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const birthdayPassed = today.getMonth() > dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
    if (!birthdayPassed) age--;               // birthday has not come yet this year
    result.textContent = 'Your age is ' + age + ' years.';
  });
}
