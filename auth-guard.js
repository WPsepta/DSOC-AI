// ═════════════════════════════════════════════════════════════
// DSOC AI — Auth Guard (Firebase)
// Pakai: <script type="module" src="auth-guard.js"></script>
// ═════════════════════════════════════════════════════════════
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyBnBsf_7wTTWHKPuCqekJUQhg9TMrIraw4",
  authDomain: "dsoc-ai.firebaseapp.com",
  projectId: "dsoc-ai",
  storageBucket: "dsoc-ai.firebasestorage.app",
  messagingSenderId: "867797685440",
  appId: "1:867797685440:web:ae8a51a59300f9f9ca0925"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Halaman yang TIDAK butuh login
const PUBLIC_PAGES = ['login.html', 'register.html', 'landing.html', 'index.html', 'indexd41d.html', ''];
const currentPage = window.location.pathname.split('/').pop();

onAuthStateChanged(auth, (user) => {
  const isPublic = PUBLIC_PAGES.includes(currentPage);

  if (user) {
    localStorage.setItem('dsoc_session', JSON.stringify({
      loggedIn: true, userId: user.uid, email: user.email
    }));
    document.querySelectorAll('[data-auth-btn]').forEach(el => {
      el.style.display = el.dataset.authBtn === 'logout' ? '' : 'none';
    });
  } else {
    localStorage.removeItem('dsoc_session');
    document.querySelectorAll('[data-auth-btn]').forEach(el => {
      el.style.display = el.dataset.authBtn === 'login' ? '' : 'none';
    });
    if (!isPublic) window.location.replace('login.html');
  }
});

window.logoutDSOC = async () => {
  await signOut(auth);
  localStorage.removeItem('dsoc_session');
  window.location.href = 'login.html';
};

window.getCurrentUser = () => {
  try { return JSON.parse(localStorage.getItem('dsoc_session') || 'null'); }
  catch { return null; }
};