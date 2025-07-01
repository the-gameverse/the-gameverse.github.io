const annualYear = new Date().getFullYear();

const schedule = [
  {date: new Date(2026, 3, 1), execute: teapot},
]

function teapot() {
  const currentPath = window.location.pathname;

  if (currentPath !== '/errors/418.html' && !sessionStorage.getItem('teapotRedirectDone')) {
    sessionStorage.setItem('teapotRedirectDone', 'true');
    localStorage.setItem('actualURL', window.location.href);
    window.location.replace('/errors/418.html');
  }
}

const today = new Date();
const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

for (const event of schedule) {
  const eventDateOnly = new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDate());

  if (eventDateOnly.getTime() === todayDateOnly.getTime()) {
    event.execute();
  }
}
