/* =========================================================
   Entity (Data Controller/Processor) portal — sidebar
   ========================================================= */
const ENTITY_NAV = [
  { section: "Overview", items: [
    { key:"dashboard", label:"Dashboard", icon:"bi-grid-1x2", href:"dashboard.html" },
  ]},
  { section: "Registration", items: [
    { key:"registration", label:"Registration", icon:"bi-file-earmark-text", href:"registration.html" },
  ]},
  { section: "Compliance", items: [
    { key:"self-assessment", label:"Self-Assessment", icon:"bi-clipboard2-check", href:"self_assessment.html" },
    { key:"breach", label:"Data Breach", icon:"bi-shield-exclamation", href:"breach.html" },
    { key:"compliance", label:"DPIA & Transfers", icon:"bi-journal-check", href:"compliance.html" },
    { key:"certification", label:"Certification (Seal)", icon:"bi-patch-check", href:"certification.html" },
  ]},
  { section: "Engagement", items: [
    { key:"complaints", label:"Complaints", icon:"bi-megaphone", href:"complaints.html" },
    { key:"advocacy", label:"Advocacy & Training", icon:"bi-mortarboard", href:"advocacy.html" },
    { key:"tickets", label:"Help Desk", icon:"bi-headset", href:"help_desk.html", badge:"2" },
  ]},
];

function renderEntitySidebar(activeKey){
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
      <span class="portal-pill">Entity Portal</span>
    </div>
    <nav class="py-2">`;
  ENTITY_NAV.forEach(group=>{
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
      <a href="../public-register.html" class="nav-link px-0"><i class="bi bi-box-arrow-left"></i><span>Exit to public site</span></a>
      <a href="../login.html" class="nav-link px-0"><i class="bi bi-people"></i><span>Switch portal</span></a>
    </div>
  </div>`;
  mount.innerHTML = html;
}

function renderEntityTopbar(title, crumb){
  const mount = document.getElementById('topbarMount');
  if(!mount) return;
  mount.innerHTML = `
  <div class="app-topbar">
    <button class="btn btn-sm btn-light d-lg-none border" data-sidebar-toggle><i class="bi bi-list"></i></button>
    <div class="flex-grow-1">
      <div class="breadcrumb-odpc">Entity Portal / ${crumb||''}</div>
      <div class="page-title h5 mb-0">${title}</div>
    </div>
    <button class="btn btn-light border position-relative">
      <i class="bi bi-bell"></i>
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size:.55rem;">3</span>
    </button>
    <div class="dropdown">
      <button class="btn btn-light border d-flex align-items-center gap-2" data-bs-toggle="dropdown">
        <span class="avatar-circle" style="background:var(--odpc-navy);">KB</span>
        <span class="d-none d-md-inline small fw-semibold">Kiboko Bites Ltd</span>
        <i class="bi bi-chevron-down small"></i>
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><span class="dropdown-item-text small text-muted">Reg. No. ODPC/REG/2026/004821</span></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="dashboard.html"><i class="bi bi-person me-2"></i>My profile</a></li>
        <li><a class="dropdown-item" href="{% url 'entity_dashboard' %}"><i class="bi bi-person me-2"></i>Dashboard</a></li>
        <li><a class="dropdown-item" href="../login.html"><i class="bi bi-box-arrow-right me-2"></i>Sign out</a></li>
      </ul>
    </div>
  </div>`;
}
