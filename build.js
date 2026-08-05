const fs = require('fs');
const path = require('path');

/* ═══════════════════════════════════════════════
   DATA PROJECT — EDIT DI SINI AJA
   Tambah project baru? Tinggal tambah objek.
   ═══════════════════════════════════════════════ */
const projects = [
  {
    slug: 'smkconnect',
    title: 'SMKConnect',
    subtitle: 'Student Job Portal',
    img: 'asset/img/project/SMK_Connect.png',
    role: 'Full-Stack Developer',
    year: '2024',
    type: 'Web Application',
    duration: '3 months',
    desc: '<strong>SMKConnect</strong> is a scalable job portal designed specifically for vocational school (SMK) graduates. It bridges the gap between talented young job seekers and employers looking for skilled, ready-to-work candidates. The platform handles user registration, job postings, application tracking, and an admin dashboard for managing listings.',
    features: [
      { icon: 'fa-solid fa-users', title: 'Multi-role Auth', desc: 'Separate dashboards for students, employers, and admins with role-based access control.' },
      { icon: 'fa-solid fa-magnifying-glass', title: 'Smart Search & Filter', desc: 'Filter jobs by category, location, and skill requirements for precise matching.' },
      { icon: 'fa-solid fa-chart-line', title: 'Application Tracking', desc: 'Real-time status updates from applied, reviewed, interviewed, to accepted.' },
      { icon: 'fa-solid fa-shield-halved', title: 'Admin Management', desc: 'Full CRUD control over job listings, user accounts, and platform analytics.' }
    ],
    tech: ['PHP', 'Laravel', 'MySQL', 'Blade Templates', 'Tailwind CSS', 'JavaScript'],
    github: '#',
    live: '#',
    outcome: 'Successfully connected 200+ students with potential employers during the pilot phase. The admin dashboard reduced manual job posting management time by 60%.'
  },
  {
    slug: 'machine-info',
    title: 'Machine Information System',
    subtitle: 'Equipment Lifecycle Management',
    img: 'asset/img/project/Machine_Information_System.png',
    role: 'Full-Stack Developer',
    year: '2024',
    type: 'Enterprise System',
    duration: '2 months',
    desc: '<strong>Machine Request & Maintenance System</strong> digitizes the entire equipment lifecycle — from purchase requests and approval workflows to scheduled maintenance and repair logging. It replaces spreadsheet-based tracking with a centralized, reliable system that improves operational visibility.',
    features: [
      { icon: 'fa-solid fa-file-circle-plus', title: 'Request Workflow', desc: 'Multi-level approval chain for machine procurement requests with status tracking.' },
      { icon: 'fa-solid fa-wrench', title: 'Maintenance Scheduler', desc: 'Automated reminders for preventive maintenance based on machine usage cycles.' },
      { icon: 'fa-solid fa-database', title: 'Asset Database', desc: 'Comprehensive machine records including specs, purchase date, warranty, and history.' },
      { icon: 'fa-solid fa-bell', title: 'Notification System', desc: 'Alerts for upcoming maintenance, expired warranties, and pending approvals.' }
    ],
    tech: ['PHP', 'JavaScript', 'MySQL', 'CSS3', 'RESTful API', 'jQuery'],
    github: '#',
    live: '#',
    outcome: 'Eliminated paper-based request forms entirely. Maintenance scheduling errors dropped by 80%, and average request-to-approval time decreased from 5 days to under 24 hours.'
  },
  {
    slug: 'bubure',
    title: 'BUBURE',
    subtitle: 'Indonesian Culinary Heritage Platform',
    img: 'asset/img/project/Bubure.png',
    role: 'Frontend Developer',
    year: '2024',
    type: 'Web Experience',
    duration: '1 month',
    desc: '<strong>BUBURE</strong> is a curated digital platform dedicated to preserving and celebrating Indonesia\'s rich porridge (bubur) culinary heritage. It showcases regional recipes, their cultural significance, and the stories behind each dish through an immersive, visually-driven experience.',
    features: [
      { icon: 'fa-solid fa-book-open', title: 'Recipe Collection', desc: 'Detailed recipes with ingredients, steps, and regional variations for each bubur type.' },
      { icon: 'fa-solid fa-map-location-dot', title: 'Regional Map', desc: 'Interactive map showing the geographic origin of each porridge variety across Indonesia.' },
      { icon: 'fa-solid fa-images', title: 'Visual Gallery', desc: 'High-quality photography showcasing the texture, color, and presentation of each dish.' },
      { icon: 'fa-solid fa-mobile-screen', title: 'Fully Responsive', desc: 'Optimized for every device — from desktop browsers to mobile phones and tablets.' }
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Google Fonts', 'Font Awesome'],
    github: '#',
    live: '#',
    outcome: 'Received recognition as a creative approach to cultural preservation through technology. The project demonstrated the power of frontend-only development to deliver compelling, content-rich experiences.'
  },
  {
    slug: 'sotobathok',
    title: 'Soto Bathok Kak Roes',
    subtitle: 'Restaurant Website & Online Ordering',
    img: 'asset/img/project/Soto_Bathok_Kak_Roes.png',
    role: 'Frontend Developer & Designer',
    year: '2024',
    type: 'Restaurant Website',
    duration: '1 month',
    desc: '<strong>Soto Bathok Kak Roes</strong> is a responsive restaurant website that brings an authentic Indonesian dining experience online. It features the restaurant\'s signature soto bathok dish, online ordering capabilities, menu showcases, and a modern design that respects the brand\'s traditional roots.',
    features: [
      { icon: 'fa-solid fa-utensils', title: 'Digital Menu', desc: 'Beautifully organized menu with categories, descriptions, and pricing for all offerings.' },
      { icon: 'fa-solid fa-cart-shopping', title: 'Online Ordering', desc: 'Streamlined ordering flow allowing customers to browse, customize, and place orders.' },
      { icon: 'fa-solid fa-location-dot', title: 'Location & Hours', desc: 'Integrated map, operating hours, and contact information for easy visit planning.' },
      { icon: 'fa-solid fa-star', title: 'Testimonials', desc: 'Customer review section showcasing dining experiences and popular dishes.' }
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Web Design', 'Responsive Design', 'Figma'],
    github: '#',
    live: '#',
    outcome: 'The website increased customer inquiries by 40% within the first month of launch. The online ordering feature reduced phone-based order errors and improved customer satisfaction scores.'
  }
];

/* ═══════════════════════════════════════════════
   TEMPLATE — JANGAN DIUBAH
   ═══════════════════════════════════════════════ */
function buildHTML(p) {
  const featuresHTML = p.features.map(f => `
      <div class="d-feat">
        <div class="d-feat__icon"><i class="${f.icon}"></i></div>
        <h4>${f.title}</h4>
        <p>${f.desc}</p>
      </div>`).join('\n    ');

  const techHTML = p.tech.map(t => `<li>${t}</li>`).join('');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${p.title} — Case Study | Azizah</title>
  <meta name="description" content="${p.title}: ${p.subtitle}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <style>
    :root{--dark:#0a0a0a;--dark-2:#121212;--dark-line:rgba(255,255,255,.12);--dark-soft:rgba(255,255,255,.55);--r-lg:28px;--r-md:14px;--r-sm:8px;--pad:clamp(20px,4vw,64px);--font:"Archivo","Helvetica Neue",Arial,sans-serif;--mono:"Space Grotesk",ui-monospace,monospace;--ease:cubic-bezier(.22,1,.36,1)}
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:var(--dark-2);color:#fff;font-family:var(--font);font-size:16px;line-height:1.45;-webkit-font-smoothing:antialiased}
    img{display:block;width:100%;height:100%;object-fit:cover}
    a{color:inherit;text-decoration:none}
    ul{list-style:none}
    ::selection{background:#fff;color:#000}
    .mono{font-family:var(--mono);font-size:12px;letter-spacing:.02em;color:var(--dark-soft)}

    .d-bar{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:18px var(--pad);border-bottom:1px solid var(--dark-line);background:var(--dark-2)}
    .d-bar__back{display:inline-flex;align-items:center;gap:10px;font-size:14px;font-weight:600;color:#fff;padding:8px 0;transition:transform .4s var(--ease),opacity .4s var(--ease)}
    .d-bar__back:hover{transform:translateX(-6px);opacity:.7}
    .d-bar__back i{font-size:13px;transition:transform .3s var(--ease)}
    .d-bar__back:hover i{transform:translateX(-4px)}

    .d-hero{position:relative;width:100%;height:clamp(280px,50vw,560px);overflow:hidden}
    .d-hero img{width:100%;height:100%;object-fit:cover;filter:grayscale(.15);transition:transform 1s var(--ease)}
    .d-hero:hover img{transform:scale(1.03)}
    .d-hero__veil{position:absolute;inset:0;background:linear-gradient(0deg,var(--dark-2) 0%,rgba(18,18,18,.2) 40%,rgba(18,18,18,.3) 100%)}

    .d-content{padding:clamp(32px,5vw,64px) var(--pad) clamp(64px,10vw,120px)}
    .d-top{display:grid;grid-template-columns:1.6fr 1fr;gap:clamp(32px,5vw,80px);margin-bottom:clamp(40px,6vw,72px);padding-bottom:clamp(32px,5vw,56px);border-bottom:1px solid var(--dark-line)}
    .d-title{font-size:clamp(28px,4vw,52px);line-height:1.05;letter-spacing:-.035em;font-weight:700}
    .d-title small{display:block;font-size:.4em;font-weight:500;opacity:.45;letter-spacing:0;margin-top:8px}
    .d-meta{display:grid;gap:0;align-content:start}
    .d-meta .mr{display:flex;justify-content:space-between;padding:14px 0;border-bottom:1px solid var(--dark-line);font-size:14px}
    .d-meta .mr span:first-child{font-family:var(--mono);color:var(--dark-soft);font-size:11px;text-transform:uppercase;letter-spacing:.06em}
    .d-meta .mr span:last-child{font-weight:600}

    .d-desc{font-size:clamp(16px,1.3vw,19px);line-height:1.65;color:var(--dark-soft);max-width:76ch;margin-bottom:clamp(40px,6vw,72px)}
    .d-desc strong{color:#fff;font-weight:600}

    .d-sh{display:flex;align-items:center;gap:14px;margin-bottom:24px}
    .d-sh span{font-family:var(--mono);font-size:11px;color:var(--dark-soft);text-transform:uppercase;letter-spacing:.07em}
    .d-sh i{width:32px;height:1px;background:var(--dark-line);display:block}

    .d-features{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-bottom:clamp(40px,6vw,72px)}
    .d-feat{padding:24px;border:1px solid var(--dark-line);border-radius:var(--r-md);transition:background .4s var(--ease),transform .4s var(--ease),border-color .4s var(--ease)}
    .d-feat:hover{background:rgba(255,255,255,.04);transform:translateY(-4px);border-color:rgba(255,255,255,.2)}
    .d-feat__icon{width:42px;height:42px;border-radius:var(--r-sm);background:rgba(255,255,255,.06);display:grid;place-items:center;margin-bottom:16px;font-size:15px;color:var(--dark-soft)}
    .d-feat h4{font-size:15px;font-weight:600;margin-bottom:8px;letter-spacing:-.01em}
    .d-feat p{font-size:13px;color:var(--dark-soft);line-height:1.5}

    .d-tech{margin-bottom:clamp(40px,6vw,72px)}
    .d-tech .tags{display:flex;flex-wrap:wrap;gap:10px}
    .d-tech .tags li{font-size:13px;font-family:var(--mono);padding:8px 16px;border-radius:var(--r-sm);border:1px solid var(--dark-line);background:transparent;transition:background .3s var(--ease),border-color .3s var(--ease)}
    .d-tech .tags li:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.25)}

    .d-links{display:flex;align-items:center;gap:16px;margin-bottom:clamp(40px,6vw,72px);flex-wrap:wrap}
    .d-links a{display:inline-flex;align-items:center;gap:10px;padding:14px 28px;border:1px solid var(--dark-line);border-radius:999px;font-size:14px;font-weight:600;color:#fff;transition:background .35s var(--ease),border-color .35s var(--ease),transform .35s var(--ease)}
    .d-links a i{font-size:16px;transition:transform .35s var(--ease)}
    .d-links a:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.3);transform:translateY(-3px)}
    .d-links a:hover i{transform:scale(1.15)}

    .d-outcome{padding:clamp(24px,3.5vw,40px);background:rgba(255,255,255,.03);border:1px solid var(--dark-line);border-radius:var(--r-md);margin-bottom:clamp(32px,5vw,56px)}
    .d-outcome h4{font-size:13px;font-family:var(--mono);color:var(--dark-soft);text-transform:uppercase;letter-spacing:.06em;margin-bottom:14px}
    .d-outcome p{font-size:clamp(15px,1.2vw,17px);line-height:1.55;max-width:68ch}

    .d-footer{display:flex;align-items:center;justify-content:space-between;padding:20px var(--pad);border-top:1px solid var(--dark-line);gap:20px;flex-wrap:wrap}
    .d-footer p{font-size:14px;color:var(--dark-soft)}
    .btn{border-radius:999px;padding:13px 26px;font-size:14px;font-weight:600;transition:transform .4s var(--ease);display:inline-block}
    .btn--solid{background:#fff;color:#000}
    .btn--solid:hover{transform:translateY(-3px) scale(1.03)}

    @media(max-width:1024px){.d-top{grid-template-columns:1fr;gap:24px}.d-features{grid-template-columns:1fr 1fr}}
    @media(max-width:720px){.d-hero{height:220px}.d-content{padding:24px var(--pad) 36px}.d-title{font-size:clamp(22px,6vw,32px)}.d-features{grid-template-columns:1fr}.d-links{flex-direction:column;align-items:stretch}.d-links a{justify-content:center}.d-footer{flex-direction:column;align-items:stretch;text-align:center}.d-footer .btn--solid{text-align:center}}
  </style>
</head>
<body>
  <div class="d-bar">
    <a class="d-bar__back" href="index.html#work">
      <i class="fa-solid fa-arrow-left"></i>
      <span>Back to projects</span>
    </a>
    <span class="mono">CASE STUDY</span>
  </div>

  <div class="d-hero">
    <img src="${p.img}" alt="${p.title}" />
    <span class="d-hero__veil"></span>
  </div>

  <div class="d-content">
    <div class="d-top">
      <h1 class="d-title">${p.title}<small>${p.subtitle}</small></h1>
      <div class="d-meta">
        <div class="mr"><span>Role</span><span>${p.role}</span></div>
        <div class="mr"><span>Year</span><span>${p.year}</span></div>
        <div class="mr"><span>Type</span><span>${p.type}</span></div>
        <div class="mr"><span>Duration</span><span>${p.duration}</span></div>
      </div>
    </div>

    <p class="d-desc">${p.desc}</p>

    <div class="d-sh"><span>Key Features</span><i></i></div>
    <div class="d-features">
    ${featuresHTML}
    </div>

    <div class="d-sh"><span>Technology Stack</span><i></i></div>
    <div class="d-tech">
      <ul class="tags">${techHTML}</ul>
    </div>

    <div class="d-links">
      <a href="${p.github}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> View on GitHub</a>
      <a href="${p.live}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>
    </div>

    <div class="d-outcome">
      <h4>Outcome</h4>
      <p>${p.outcome}</p>
    </div>
  </div>

  <div class="d-footer">
    <p>Interested in something similar? Let's talk.</p>
    <a class="btn btn--solid" href="index.html#contact">Start a conversation</a>
  </div>
</body>
</html>`;
}

/* ═══════════════════════════════════════════════
   JALANKAN — jangan diubah
   ═══════════════════════════════════════════════ */
const outDir = __dirname;
let count = 0;

projects.forEach(function (p) {
  const filename = 'detail_' + p.slug + '.html';
  const filepath = path.join(outDir, filename);
  fs.writeFileSync(filepath, buildHTML(p), 'utf-8');
  console.log('  \u2713  ' + filename);
  count++;
});

console.log('\n' + count + ' file berhasil dibuat.\n');