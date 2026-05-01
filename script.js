// Ключ для хранения данных в localStorage
const STORAGE_KEY = 'bsTeam';

// Соответствие уровня сложности стартовому балансу
const DIFFICULTY_BALANCE = {
  easy: 5000,
  medium: 3000,
  hard: 1000,
};

// Функция переключения видимости экранов
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(screenId).classList.remove('hidden');
}

// Функция отображения dashboard с актуальными данными
function renderDashboard(team) {
  // Заполняем шапку
  document.getElementById('header-name').textContent = team.name;
  document.getElementById('header-tag').textContent = team.tag;
  document.getElementById('header-region').textContent = team.region;
  document.getElementById('header-balance').textContent = team.balance;
  document.getElementById('header-date').textContent = team.startDate || '01.01.2026';

  // Аватар
  const avatarImg = document.getElementById('header-avatar');
  const placeholder = document.getElementById('header-avatar-placeholder');
  if (team.avatarDataUrl) {
    avatarImg.src = team.avatarDataUrl;
    avatarImg.style.display = 'block';
    placeholder.style.display = 'none';
  } else {
    avatarImg.style.display = 'none';
    placeholder.style.display = 'flex';
  }

  // Активируем вкладку "Команда" по умолчанию
  switchView('team');
}

// Переключение вкладок в dashboard
function switchView(viewName) {
  // Обновляем активную кнопку
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewName);
  });

  // Показываем нужную view
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));
  document.getElementById(`view-${viewName}`).classList.add('active-view');
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  const createScreen = document.getElementById('screen-create');
  const dashboardScreen = document.getElementById('screen-dashboard');
  const createForm = document.getElementById('create-form');
  const avatarInput = document.getElementById('team-avatar');
  const avatarPreview = document.getElementById('avatar-preview');
  const avatarImg = document.getElementById('avatar-img');

  // Проверяем, есть ли сохранённая команда
  const savedTeam = localStorage.getItem(STORAGE_KEY);
  if (savedTeam) {
    const team = JSON.parse(savedTeam);
    showScreen('screen-dashboard');
    renderDashboard(team);
  } else {
    showScreen('screen-create');
  }

  // Обработка загрузки аватарки: превью
  avatarInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      avatarImg.src = event.target.result;
      avatarPreview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  });

  // Обработка отправки формы создания команды
  createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('team-name').value.trim();
    const tag = document.getElementById('team-tag').value.trim();
    const region = document.getElementById('region').value;
    const difficultyEl = document.querySelector('input[name="difficulty"]:checked');
    
    // Валидация
    if (!name || !tag || !region) {
      alert('Пожалуйста, заполните все обязательные поля.');
      return;
    }
    if (tag.length < 2 || tag.length > 5) {
      alert('Тег должен содержать от 2 до 5 символов.');
      return;
    }

    const difficulty = difficultyEl ? difficultyEl.value : 'easy';
    const balance = DIFFICULTY_BALANCE[difficulty] || 5000;

    // Получаем аватар (если есть)
    let avatarDataUrl = null;
    if (avatarInput.files.length > 0 && avatarImg.src) {
      avatarDataUrl = avatarImg.src;
    }

    // Собираем объект команды
    const team = {
      name,
      tag,
      region,
      difficulty,
      balance,
      avatarDataUrl,
      startDate: '01.01.2026',
      // Заготовка для будущих игроков
      players: [],
    };

    // Сохраняем в localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(team));

    // Переключаемся на dashboard
    showScreen('screen-dashboard');
    renderDashboard(team);
  });

  // Навигация в dashboard
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchView(btn.dataset.view);
    });
  });

  // Кнопка "Добавить игрока" – пока заглушка
  document.getElementById('btn-add-player').addEventListener('click', () => {
    alert('Функционал трансферов появится в следующей версии.');
  });

  // Кнопка сброса (сброс команды)
  document.getElementById('btn-reset').addEventListener('click', () => {
    if (confirm('Вы уверены, что хотите сбросить прогресс? Это удалит текущую команду.')) {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  });
});
