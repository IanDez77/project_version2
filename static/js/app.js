/* =========================================================
   IDMIS — shared application behaviour
   ========================================================= */

/* ---------- Reference number / demo helpers ---------- */
function odpcRef(prefix){
  const n = Math.floor(100000 + Math.random()*899999);
  const y = new Date().getFullYear();
  return `${prefix}/${y}/${n}`;
}

function odpcToast(message, variant='success'){
  let wrap = document.getElementById('odpcToastWrap');
  if(!wrap){
    wrap = document.createElement('div');
    wrap.id = 'odpcToastWrap';
    wrap.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    wrap.style.zIndex = 1100;
    document.body.appendChild(wrap);
  }
  const id = 't' + Date.now();
  const icon = variant === 'success' ? 'bi-check-circle-fill' : variant === 'danger' ? 'bi-exclamation-octagon-fill' : 'bi-info-circle-fill';
  const bg = variant === 'success' ? 'text-bg-success' : variant === 'danger' ? 'text-bg-danger' : 'text-bg-dark';
  wrap.insertAdjacentHTML('beforeend', `
    <div id="${id}" class="toast align-items-center ${bg} border-0" role="alert">
      <div class="d-flex">
        <div class="toast-body"><i class="bi ${icon} me-2"></i>${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>`);
  const el = document.getElementById(id);
  const t = new bootstrap.Toast(el, { delay: 3200 });
  t.show();
  el.addEventListener('hidden.bs.toast', () => el.remove());
}

/* Intercept any demo form with data-demo-submit so nothing actually posts */
document.addEventListener('submit', function(e){
  const form = e.target.closest('[data-demo-submit]');
  if(form){
    e.preventDefault();
    if(form.checkValidity && !form.checkValidity()){
      form.classList.add('was-validated');
      return;
    }
    const msg = form.getAttribute('data-demo-submit') || 'Submitted successfully.';
    odpcToast(msg, 'success');
    const redirect = form.getAttribute('data-demo-redirect');
    if(redirect){ setTimeout(()=>{ window.location.href = redirect; }, 900); }
    else { form.reset(); form.classList.remove('was-validated'); }
  }
});

/* ---------- Wizard stepper ---------- */
function odpcWizardInit(root){
  const wiz = document.querySelector(root);
  if(!wiz) return;
  const steps = [...wiz.querySelectorAll('.wizard-step')];
  const panes = [...wiz.querySelectorAll('.wizard-pane')];
  let current = 0;

  function render(){
    steps.forEach((s,i)=>{
      s.classList.toggle('active', i===current);
      s.classList.toggle('done', i<current);
    });
    panes.forEach((p,i)=> p.classList.toggle('show', i===current));
    wiz.querySelectorAll('[data-wiz-progress]').forEach(el=>{
      el.style.width = `${Math.round(((current)/ (steps.length-1))*100)}%`;
    });
  }
  wiz.querySelectorAll('[data-wiz-next]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const pane = panes[current];
      const inputs = pane.querySelectorAll('input[required], select[required], textarea[required]');
      let valid = true;
      inputs.forEach(inp=>{ if(!inp.checkValidity()){ inp.reportValidity(); valid=false; } });
      if(!valid) return;
      if(current < steps.length-1){ current++; render(); window.scrollTo({top: wiz.offsetTop-90, behavior:'smooth'}); }
    });
  });
  wiz.querySelectorAll('[data-wiz-prev]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(current>0){ current--; render(); window.scrollTo({top: wiz.offsetTop-90, behavior:'smooth'}); }
    });
  });
  wiz.querySelectorAll('[data-wiz-goto]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const target = parseInt(btn.getAttribute('data-wiz-goto'),10);
      if(target <= current || btn.closest('.wizard-step').classList.contains('done')){ current = target; render(); }
    });
  });
  render();
}

/* ---------- Sidebar mobile toggle ---------- */
document.addEventListener('DOMContentLoaded', function(){
  const toggleBtns = document.querySelectorAll('[data-sidebar-toggle]');
  const sidebar = document.querySelector('.app-sidebar');
  let backdrop = document.querySelector('.sidebar-backdrop');
  if(sidebar && !backdrop){
    backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);
  }
  toggleBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      sidebar.classList.toggle('open');
      backdrop.classList.toggle('show');
    });
  });
  if(backdrop){
    backdrop.addEventListener('click', ()=>{
      sidebar.classList.remove('open');
      backdrop.classList.remove('show');
    });
  }

  // Bootstrap tooltip/popover activation (if any)
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
});

/* ---------- Simple client-side table filter ---------- */
function odpcTableFilter(inputSel, tableSel){
  const input = document.querySelector(inputSel);
  const table = document.querySelector(tableSel);
  if(!input || !table) return;
  input.addEventListener('input', ()=>{
    const q = input.value.trim().toLowerCase();
    table.querySelectorAll('tbody tr').forEach(row=>{
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

/* ---------- Range output binding (score sliders etc.) ---------- */
document.addEventListener('input', function(e){
  if(e.target.matches('input[type=range][data-output]')){
    const out = document.querySelector(e.target.getAttribute('data-output'));
    if(out) out.textContent = e.target.value;
  }
});

/* =========================================================
   Enhanced Form Validation & Error Handling
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const loginButton = document.getElementById('loginButton');
    const togglePassword = document.getElementById('togglePassword');

    // --- Real-time validation ---

    // Username validation (on blur)
    if (usernameInput) {
        usernameInput.addEventListener('blur', function() {
            validateField(this, 'usernameError');
        });

        usernameInput.addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                document.getElementById('usernameError').style.display = 'none';
            }
        });
    }

    // Password validation (on blur)
    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            validateField(this, 'passwordError');
        });

        passwordInput.addEventListener('input', function() {
            if (this.value.length >= 8) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                document.getElementById('passwordError').style.display = 'none';
            }
        });
    }

    // --- Toggle password visibility ---
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.className = 'bi bi-eye-slash';
            } else {
                passwordInput.type = 'password';
                icon.className = 'bi bi-eye';
            }
        });
    }

    // --- Form submission with validation ---
    if (form) {
        form.addEventListener('submit', function(e) {
            // Prevent default if validation fails
            let isValid = true;

            // Validate username
            if (!validateField(usernameInput, 'usernameError')) {
                isValid = false;
            }

            // Validate password
            if (!validateField(passwordInput, 'passwordError')) {
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
                // Scroll to first error
                const firstError = form.querySelector('.is-invalid');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return false;
            }

            // Show loading state
            const loginText = document.getElementById('loginText');
            const loginIcon = document.getElementById('loginIcon');
            if (loginText) loginText.textContent = 'Signing in...';
            if (loginIcon) loginIcon.className = 'bi bi-arrow-repeat ms-1 spinner-border spinner-border-sm';
            loginButton.disabled = true;
        });
    }

    // --- Helper: Validate a single field ---
    function validateField(input, errorId) {
        const errorElement = document.getElementById(errorId);
        if (!input || !errorElement) return true;

        let isValid = true;
        let errorMessage = '';

        // Username validation
        if (input.name === 'username') {
            const value = input.value.trim();
            if (!value) {
                isValid = false;
                errorMessage = 'Please enter your registration number or email address.';
            } else if (value.length < 3) {
                isValid = false;
                errorMessage = 'Please enter a valid registration number or email (minimum 3 characters).';
            }
        }

        // Password validation
        if (input.name === 'password') {
            const value = input.value;
            if (!value) {
                isValid = false;
                errorMessage = 'Please enter your password.';
            } else if (value.length < 8) {
                isValid = false;
                errorMessage = 'Password must be at least 8 characters long.';
            }
        }

        // Update UI
        if (!isValid) {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            errorElement.style.display = 'none';
        }

        return isValid;
    }

    // --- Auto-dismiss alerts after 5 seconds ---
    document.querySelectorAll('.alert').forEach(function(alert) {
        setTimeout(function() {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });

    // --- Enter key support for login ---
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const activeElement = document.activeElement;
            if (activeElement && (activeElement.id === 'usernameInput' || activeElement.id === 'passwordInput')) {
                e.preventDefault();
                form.submit();
            }
        }
    });
});

/* --- Loading state on form submit (backup) --- */
document.addEventListener('submit', function(e) {
    const form = e.target;
    if (form.id === 'loginForm') {
        const button = form.querySelector('button[type="submit"]');
        if (button && !button.disabled) {
            // The main event listener handles this, but this is a backup
        }
    }
});
