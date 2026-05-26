<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Dashboard | Ruthy's Eatery</title>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body id="adminRoot" class="dashboard-body">
  <header class="navbar">
    <a class="brand" href="/admin.html">
      <span class="logo">RE</span>
      <span>Ruthy's Eatery Admin</span>
    </a>
    <div class="nav-actions">
      <button id="logoutBtn" class="secondary" type="button">logout</button>
    </div>
  </header>

  <main class="container dashboard-layout">
    <aside class="sidebar dashboard-card">
      <div class="brand">
        <span class="logo">A</span>
        <span id="adminName">admin</span>
      </div>
      <nav>
        <a class="active" href="#dashboard">dashboard</a>
        <a href="#bookings">bookings</a>
      </nav>
    </aside>

    <section class="main-panel">
      <div id="dashboard" class="dashboard-card">
        <h1 style="font-size:2.3rem;">admin dashboard</h1>
        <p class="lead">monitor customer reservations and update each booking status.</p>
        <div id="adminMessage" class="message"></div>
        <div class="stats-grid">
          <div class="stat">total bookings<strong id="statTotal">0</strong></div>
          <div class="stat">pending<strong id="statPending">0</strong></div>
          <div class="stat">confirmed<strong id="statConfirmed">0</strong></div>
          <div class="stat">customers<strong id="statCustomers">0</strong></div>
        </div>
      </div>

      <div class="dashboard-card">
        <h2>upcoming bookings</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>date</th>
                <th>time</th>
                <th>customer</th>
                <th>guests</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody id="upcomingBookings">
              <tr><td colspan="5">loading...</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="bookings" class="dashboard-card">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;">
          <h2 style="margin:0;">all bookings</h2>
          <label style="min-width:200px;">
            filter status
            <select id="statusFilter">
              <option value="">all</option>
              <option value="pending">pending</option>
              <option value="confirmed">confirmed</option>
              <option value="completed">completed</option>
              <option value="cancelled">cancelled</option>
            </select>
          </label>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>customer</th>
                <th>date</th>
                <th>time</th>
                <th>guests</th>
                <th>phone</th>
                <th>status / notes</th>
                <th>change status</th>
              </tr>
            </thead>
            <tbody id="adminBookings">
              <tr><td colspan="8">loading...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>

  <script src="/app.js"></script>
</body>
</html>
