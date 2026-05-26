:root {
  --cream: #fff8ec;
  --paper: #fffdf7;
  --brown: #4b2e1f;
  --brown-soft: #7a4a2a;
  --orange: #d66b2d;
  --orange-dark: #a84b1d;
  --gold: #f4bb55;
  --green: #2f7a4c;
  --red: #b44432;
  --gray: #6f625b;
  --line: #eedcc2;
  --shadow: 0 18px 45px rgba(75, 46, 31, 0.14);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: linear-gradient(135deg, #fff8ec 0%, #ffe1bb 100%);
  color: var(--brown);
  min-height: 100vh;
}

body.dashboard-body {
  background: #fff8ec;
}

a {
  color: inherit;
  text-decoration: none;
}

.navbar {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 800;
  letter-spacing: -0.5px;
  font-size: 1.2rem;
}

.logo {
  width: 44px;
  height: 44px;
  border-radius: 16px;
  background: var(--orange);
  color: white;
  display: grid;
  place-items: center;
  font-weight: 900;
  box-shadow: var(--shadow);
}

.nav-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.container {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
}

.hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 28px;
  align-items: center;
  padding: 48px 0 32px;
}

.hero-card,
.card,
.auth-card,
.dashboard-card {
  background: rgba(255, 253, 247, 0.92);
  border: 1px solid var(--line);
  border-radius: 28px;
  box-shadow: var(--shadow);
}

.hero-card {
  padding: 44px;
}

.kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: #fff0d5;
  color: var(--orange-dark);
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 18px;
}

h1 {
  font-size: clamp(2.4rem, 5vw, 4.8rem);
  line-height: 0.95;
  margin: 0 0 18px;
  letter-spacing: -2px;
}

h2,
h3 {
  margin-top: 0;
}

.lead {
  color: var(--gray);
  line-height: 1.7;
  font-size: 1.05rem;
  margin-bottom: 26px;
}

.button,
button {
  border: 0;
  cursor: pointer;
  border-radius: 16px;
  padding: 12px 18px;
  font-weight: 800;
  background: var(--orange);
  color: white;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  box-shadow: 0 10px 22px rgba(214, 107, 45, 0.25);
}

.button:hover,
button:hover {
  transform: translateY(-1px);
  background: var(--orange-dark);
}

.button.secondary,
button.secondary {
  background: white;
  color: var(--brown);
  border: 1px solid var(--line);
  box-shadow: none;
}

.button.danger,
button.danger {
  background: var(--red);
}

.button.small,
button.small {
  padding: 8px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
}

.hero-visual {
  padding: 28px;
  position: relative;
  overflow: hidden;
}

.food-card {
  background: white;
  border-radius: 24px;
  padding: 20px;
  border: 1px solid var(--line);
  margin-bottom: 14px;
}

.food-card .price {
  color: var(--orange-dark);
  font-weight: 900;
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 26px 0 48px;
}

.card {
  padding: 24px;
}

.card p {
  color: var(--gray);
  line-height: 1.6;
}

.auth-wrap {
  min-height: calc(100vh - 88px);
  display: grid;
  place-items: center;
  padding: 24px 0 60px;
}

.auth-card {
  width: min(460px, 100%);
  padding: 30px;
}

.auth-tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background: #fff0d5;
  border-radius: 18px;
  padding: 6px;
  gap: 6px;
  margin-bottom: 20px;
}

.auth-tabs button {
  background: transparent;
  color: var(--brown);
  box-shadow: none;
}

.auth-tabs button.active {
  background: white;
  box-shadow: 0 8px 16px rgba(75, 46, 31, 0.12);
}

.form-grid {
  display: grid;
  gap: 14px;
}

label {
  font-size: 0.9rem;
  font-weight: 800;
  display: grid;
  gap: 7px;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 12px 14px;
  font: inherit;
  color: var(--brown);
  background: white;
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 96px;
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--orange);
  box-shadow: 0 0 0 4px rgba(214, 107, 45, 0.12);
}

.message {
  margin: 12px 0;
  padding: 12px 14px;
  border-radius: 14px;
  background: #fff0d5;
  color: var(--brown);
  display: none;
}

.message.show {
  display: block;
}

.message.error {
  background: #ffe1db;
  color: var(--red);
}

.message.success {
  background: #e4f5e9;
  color: var(--green);
}

.dashboard-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 22px;
  align-items: start;
  padding: 24px 0 60px;
}

.sidebar {
  position: sticky;
  top: 16px;
  padding: 20px;
}

.sidebar nav {
  display: grid;
  gap: 10px;
  margin-top: 24px;
}

.sidebar a,
.sidebar button {
  width: 100%;
  text-align: left;
  background: transparent;
  color: var(--brown);
  box-shadow: none;
  border: 1px solid transparent;
}

.sidebar a.active,
.sidebar a:hover,
.sidebar button:hover {
  background: #fff0d5;
  border-color: var(--line);
}

.main-panel {
  display: grid;
  gap: 18px;
}

.dashboard-card {
  padding: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.stat {
  background: #fff0d5;
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 18px;
}

.stat strong {
  display: block;
  font-size: 2rem;
  margin-top: 4px;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 760px;
}

th,
td {
  padding: 14px 12px;
  border-bottom: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
}

th {
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray);
}

.status {
  display: inline-flex;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.82rem;
  font-weight: 900;
  background: #fff0d5;
  color: var(--orange-dark);
}

.status.confirmed {
  background: #e4f5e9;
  color: var(--green);
}

.status.completed {
  background: #e8eefc;
  color: #34508f;
}

.status.cancelled {
  background: #ffe1db;
  color: var(--red);
}

.inline-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.two-col {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.footer-note {
  color: var(--gray);
  font-size: 0.92rem;
  line-height: 1.6;
}

@media (max-width: 840px) {
  .hero,
  .features,
  .dashboard-layout,
  .two-col,
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .hero-card {
    padding: 30px;
  }

  .sidebar {
    position: static;
  }
}
