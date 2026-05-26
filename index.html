const API = '';

function qs(selector) {
  return document.querySelector(selector);
}

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatTime(value) {
  if (!value) return '';
  return String(value).slice(0, 5);
}

function money(value) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(Number(value || 0));
}

function setMessage(target, message, type = 'success') {
  const element = typeof target === 'string' ? qs(target) : target;
  if (!element) return;
  element.textContent = message;
  element.className = `message show ${type}`;
}

function clearMessage(target) {
  const element = typeof target === 'string' ? qs(target) : target;
  if (!element) return;
  element.textContent = '';
  element.className = 'message';
}

function saveAuth(data) {
  localStorage.setItem('ruthysToken', data.token);
  localStorage.setItem('ruthysUser', JSON.stringify(data.user));
}

function getToken() {
  return localStorage.getItem('ruthysToken');
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem('ruthysUser') || 'null');
  } catch {
    return null;
  }
}

function logout() {
  localStorage.removeItem('ruthysToken');
  localStorage.removeItem('ruthysUser');
  location.href = '/login.html';
}

async function apiFetch(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API}${url}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong.');
  }

  return data;
}

async function loadMenu() {
  const holder = qs('#menuList');
  if (!holder) return;

  try {
    const { rows } = await apiFetch('/api/menu');
    holder.innerHTML = rows.map(item => `
      <div class="food-card">
        <h3>${item.name}</h3>
        <p>${item.description || ''}</p>
        <div class="price">${money(item.price)}</div>
      </div>
    `).join('');
  } catch (error) {
    holder.innerHTML = '<p class="footer-note">menu will appear once the database is connected.</p>';
  }
}

function setupLoginPage() {
  const loginForm = qs('#loginForm');
  const registerForm = qs('#registerForm');
  const customerTab = qs('#customerTab');
  const adminTab = qs('#adminTab');
  const roleInput = qs('#role');

  if (!loginForm) return;

  function setRole(role) {
    roleInput.value = role;
    customerTab.classList.toggle('active', role === 'customer');
    adminTab.classList.toggle('active', role === 'admin');
    qs('#loginTitle').textContent = role === 'admin' ? 'admin login' : 'customer login';
    qs('#loginSub').textContent = role === 'admin'
      ? 'manage bookings, confirm reservations, and monitor customers.'
      : 'book a table, check status, and manage your reservations.';
  }

  customerTab.addEventListener('click', () => setRole('customer'));
  adminTab.addEventListener('click', () => setRole('admin'));

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearMessage('#loginMessage');
    const form = new FormData(loginForm);

    try {
      const data = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: form.get('email'),
          password: form.get('password'),
          role: form.get('role')
        })
      });
      saveAuth(data);
      location.href = data.user.role === 'admin' ? '/admin.html' : '/customer.html';
    } catch (error) {
      setMessage('#loginMessage', error.message, 'error');
    }
  });

  if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      clearMessage('#registerMessage');
      const form = new FormData(registerForm);

      try {
        const data = await apiFetch('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            fullName: form.get('fullName'),
            email: form.get('email'),
            phone: form.get('phone'),
            password: form.get('password')
          })
        });
        setMessage('#registerMessage', data.message, 'success');
        registerForm.reset();
      } catch (error) {
        setMessage('#registerMessage', error.message, 'error');
      }
    });
  }
}

function requireRole(role) {
  const user = getUser();
  if (!getToken() || !user || user.role !== role) {
    location.href = '/login.html';
    return null;
  }
  return user;
}

async function setupCustomerPage() {
  const bookingForm = qs('#bookingForm');
  if (!bookingForm) return;

  const user = requireRole('customer');
  if (!user) return;

  qs('#customerName').textContent = user.fullName;
  qs('#logoutBtn').addEventListener('click', logout);

  const today = new Date().toISOString().slice(0, 10);
  qs('#reservationDate').setAttribute('min', today);

  await loadCustomerBookings();

  bookingForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearMessage('#bookingMessage');
    const form = new FormData(bookingForm);

    try {
      const data = await apiFetch('/api/customer/bookings', {
        method: 'POST',
        body: JSON.stringify({
          reservationDate: form.get('reservationDate'),
          reservationTime: form.get('reservationTime'),
          guestCount: Number(form.get('guestCount')),
          phone: form.get('phone'),
          specialRequest: form.get('specialRequest')
        })
      });
      setMessage('#bookingMessage', data.message, 'success');
      bookingForm.reset();
      qs('#reservationDate').setAttribute('min', today);
      await loadCustomerBookings();
    } catch (error) {
      setMessage('#bookingMessage', error.message, 'error');
    }
  });
}

async function loadCustomerBookings() {
  const table = qs('#customerBookings');
  if (!table) return;

  try {
    const { rows } = await apiFetch('/api/customer/bookings');
    if (rows.length === 0) {
      table.innerHTML = '<tr><td colspan="6">no bookings yet.</td></tr>';
      return;
    }

    table.innerHTML = rows.map(row => `
      <tr>
        <td>${formatDate(row.reservation_date)}</td>
        <td>${formatTime(row.reservation_time)}</td>
        <td>${row.guest_count}</td>
        <td><span class="status ${row.status}">${row.status}</span></td>
        <td>${row.special_request || '-'}</td>
        <td>
          ${['pending', 'confirmed'].includes(row.status)
            ? `<button class="small danger" onclick="cancelBooking(${row.id})">cancel</button>`
            : '-'}
        </td>
      </tr>
    `).join('');
  } catch (error) {
    table.innerHTML = `<tr><td colspan="6">${error.message}</td></tr>`;
  }
}

async function cancelBooking(id) {
  if (!confirm('Cancel this booking?')) return;
  try {
    await apiFetch(`/api/customer/bookings/${id}/cancel`, { method: 'PATCH' });
    await loadCustomerBookings();
  } catch (error) {
    alert(error.message);
  }
}

async function setupAdminPage() {
  const adminRoot = qs('#adminRoot');
  if (!adminRoot) return;

  const user = requireRole('admin');
  if (!user) return;

  qs('#adminName').textContent = user.fullName;
  qs('#logoutBtn').addEventListener('click', logout);
  qs('#statusFilter').addEventListener('change', loadAdminBookings);

  await loadDashboard();
  await loadAdminBookings();
}

async function loadDashboard() {
  try {
    const { stats, upcoming } = await apiFetch('/api/admin/dashboard');
    qs('#statTotal').textContent = stats.total;
    qs('#statPending').textContent = stats.pending;
    qs('#statConfirmed').textContent = stats.confirmed;
    qs('#statCustomers').textContent = stats.customers;

    qs('#upcomingBookings').innerHTML = upcoming.length === 0
      ? '<tr><td colspan="5">no upcoming bookings.</td></tr>'
      : upcoming.map(row => `
          <tr>
            <td>${formatDate(row.reservation_date)}</td>
            <td>${formatTime(row.reservation_time)}</td>
            <td>${row.full_name}<br><small>${row.email}</small></td>
            <td>${row.guest_count}</td>
            <td><span class="status ${row.status}">${row.status}</span></td>
          </tr>
        `).join('');
  } catch (error) {
    setMessage('#adminMessage', error.message, 'error');
  }
}

async function loadAdminBookings() {
  const table = qs('#adminBookings');
  if (!table) return;

  const status = qs('#statusFilter').value;
  const url = status ? `/api/admin/bookings?status=${encodeURIComponent(status)}` : '/api/admin/bookings';

  try {
    const { rows } = await apiFetch(url);
    if (rows.length === 0) {
      table.innerHTML = '<tr><td colspan="8">no bookings found.</td></tr>';
      return;
    }

    table.innerHTML = rows.map(row => `
      <tr>
        <td>#${row.id}</td>
        <td>${row.full_name}<br><small>${row.email}</small></td>
        <td>${formatDate(row.reservation_date)}</td>
        <td>${formatTime(row.reservation_time)}</td>
        <td>${row.guest_count}</td>
        <td>${row.phone}</td>
        <td><span class="status ${row.status}">${row.status}</span><br><small>${row.special_request || ''}</small></td>
        <td>
          <select onchange="updateBookingStatus(${row.id}, this.value)">
            ${['pending', 'confirmed', 'completed', 'cancelled'].map(statusOption => `
              <option value="${statusOption}" ${row.status === statusOption ? 'selected' : ''}>${statusOption}</option>
            `).join('')}
          </select>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    table.innerHTML = `<tr><td colspan="8">${error.message}</td></tr>`;
  }
}

async function updateBookingStatus(id, status) {
  try {
    await apiFetch(`/api/admin/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
    await loadDashboard();
    await loadAdminBookings();
  } catch (error) {
    alert(error.message);
  }
}

window.cancelBooking = cancelBooking;
window.updateBookingStatus = updateBookingStatus;

document.addEventListener('DOMContentLoaded', () => {
  loadMenu();
  setupLoginPage();
  setupCustomerPage();
  setupAdminPage();
});
