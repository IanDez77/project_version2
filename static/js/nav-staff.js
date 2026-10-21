/* =========================================================
   ODPC internal staff portal — sidebar
   ========================================================= */
const STAFF_NAV = [
  { section: "Overview", items: [
    { key:"dashboard", label:"Dashboard", icon:"bi-grid-1x2", href:"dashboard.html" },
    { key:"reports", label:"Reports & Analytics", icon:"bi-bar-chart-line", href:"reports.html" },
  ]},
  { section: "Regulatory Modules", items: [
    { key:"registrations", label:"Registration", icon:"bi-file-earmark-text", href:"registrations.html", badge:"14" },
    { key:"self-assessment", label:"Self-Assessment", icon:"bi-clipboard2-check", href:"self_assessment.html" },
    { key:"breaches", label:"Data Breach", icon:"bi-shield-exclamation", href:"breaches.html", badge:"5" },
    { key:"compliance", label:"Compliance (DPIA/Transfer/Advisory)", icon:"bi-journal-check", href:"compliance.html", badge:"9" },
    { key:"audits", label:"Data Audits", icon:"bi-search", href:"audits.html" },
    { key:"certification", label:"QA Certification", icon:"bi-patch-check", href:"certification.html" },
    { key:"complaints", label:"Complaints & Enforcement", icon:"bi-megaphone", href:"complaints.html", badge:"7" },
    { key:"advocacy", label:"Advocacy & Training", icon:"bi-mortarboard", href:"advocacy.html" },
  ]},
  { section: "Operations", items: [
    { key:"helpdesk", label:"Help Desk & Tickets", icon:"bi-headset", href:"helpdesk.html", badge:"11" },
    { key:"sysadmin", label:"System Administration", icon:"bi-gear", href:"sysadmin.html" },
  ]},
];

function renderStaffSidebar(activeKey){
  const mount = document.getElementById('sidebarMount');
  if(!mount) return;
  let html = `
  <div class="app-sidebar" id="appSidebar">
    <div class="brand">
      <div class="odpc-wordmark">
        <div class="odpc-crest">DP</div>
        <div>
          <div class="name">IDMIS</div>
          <div class="tag" style="font-size:.68rem;">ODPC Portal</div>
        </div>
      </div>
      <span class="portal-pill">Staff Workspace</span>
    </div>
    <nav class="py-2">`;
  STAFF_NAV.forEach(group=>{
    html += `<div class="nav-section-title">${group.section}</div>`;
    group.items.forEach(it=>{
      html += `<a href="${it.href}" class="nav-link ${activeKey===it.key?'active':''}">
        <i class="bi ${it.icon}"></i><span>${it.label}</span>
        ${it.badge ? `<span class="nav-badge">${it.badge}</span>`:''}
      </a>`;
    });
  });
  html += `
    </nav>
    <div class="px-3 py-3 mt-2" style="border-top:1px solid rgba(255,255,255,.1);">
      <a href="../login.html" class="nav-link px-0"><i class="bi bi-box-arrow-left"></i><span>Switch portal</span></a>
    </div>
  </div>`;
  mount.innerHTML = html;
}

function renderStaffTopbar(title, crumb){
  const mount = document.getElementById('topbarMount');
  if(!mount) return;
  mount.innerHTML = `
  <div class="app-topbar">
    <button class="btn btn-sm btn-light d-lg-none border" data-sidebar-toggle><i class="bi bi-list"></i></button>
    <div class="flex-grow-1">
      <div class="breadcrumb-odpc">Staff Workspace / ${crumb||''}</div>
      <div class="page-title h5 mb-0">${title}</div>
    </div>
    <button class="btn btn-light border position-relative">
      <i class="bi bi-bell"></i>
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size:.55rem;">6</span>
    </button>
    <div class="dropdown">
      <button class="btn btn-light border d-flex align-items-center gap-2" data-bs-toggle="dropdown">
        <span class="avatar-circle">AN</span>
        <span class="d-none d-md-inline small fw-semibold">Achieng Nyongesa</span>
        <i class="bi bi-chevron-down small"></i>
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><span class="dropdown-item-text small text-muted">Compliance &amp; Enforcement Officer</span></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="sysadmin.html"><i class="bi bi-person me-2"></i>My profile</a></li>
        <li><a class="dropdown-item" href="../login.html"><i class="bi bi-box-arrow-right me-2"></i>Sign out</a></li>
      </ul>
    </div>
  </div>`;
}
