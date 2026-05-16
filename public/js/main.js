const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
const currentTheme = savedTheme || 'light';
document.documentElement.dataset.theme = currentTheme;
if (themeToggle) themeToggle.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
  if (themeToggle) themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
});
