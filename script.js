const dayButtons = document.querySelectorAll('.day-pill');
const dayCards = document.querySelectorAll('[data-day-card]');

function setDayFilter(day) {
  dayButtons.forEach((button) => button.classList.toggle('active', button.dataset.day === day));
  dayCards.forEach((card) => {
    card.hidden = day !== 'all' && card.dataset.dayCard !== day;
  });
}

dayButtons.forEach((button) => {
  button.addEventListener('click', () => setDayFilter(button.dataset.day));
});

document.querySelectorAll('.day-summary').forEach((summary) => {
  summary.addEventListener('click', () => {
    const detail = document.getElementById(summary.getAttribute('aria-controls'));
    const isOpen = summary.getAttribute('aria-expanded') === 'true';
    summary.setAttribute('aria-expanded', String(!isOpen));
    detail.hidden = isOpen;
  });
});

document.querySelectorAll('[data-modal-target]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const modal = document.getElementById(trigger.dataset.modalTarget);
    if (modal) modal.showModal();
  });
});

document.querySelectorAll('.info-modal').forEach((modal) => {
  modal.querySelector('[data-modal-close]').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });
});

const departure = new Date('2026-08-19T07:00:00+09:00');
const end = new Date('2026-08-25T00:00:00+09:00');
const now = new Date();
const countdown = document.getElementById('countdown-value');

if (now < departure) {
  const days = Math.ceil((departure - now) / 86400000);
  countdown.textContent = `距離出發 ${days} 天`;
} else if (now < end) {
  countdown.textContent = '旅程進行中';
} else {
  countdown.textContent = '旅程已收藏';
}
