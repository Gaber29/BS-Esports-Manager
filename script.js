// ============== КОНСТАНТЫ И ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ==============
const STORAGE_KEY = 'bsTeam';
const TEAMS_STORAGE_KEY = 'bsAllTeams';

const REGIONS = ['EMEA', 'East Asia', 'SA', 'NA'];
const DIFFICULTY_BALANCE = { easy: 5000, medium: 3000, hard: 1000 };

// Глобальный массив всех команд (включает AI и игрока)
let allTeams = [];

// Предопределённые команды по регионам (16 сильнейших)
const PREDEFINED_TEAMS = {
  EMEA: [
    'FUT Esports','HMBLE','Team Heretics','NAVI','SK Gaming','Reply Totem',
    'Big Talents','NOVO Esports','Real Madrid','BIG','Metizport',
    'FUT Esports Academy','Kebap','DontFinxSo','Forza Esports','WW'
  ],
  'East Asia': [
    'Crazy Raccoon','ZETA DIVISION','SKCalalas EA','FENNEL','REJECT',
    'Rival Esports','Feasible Gaming','INSOMNIA','Frenzy Esports',
    'Galaxy Collapse','Ragebait Only','KCN','Team Falcons','Feral',
    'DF','Be Humble'
  ],
  SA: [
    'Bounty Hunters Esports','Eternal Esports','LOUD','SKCalalas',
    'Elevate','Olimpo Squad','Topa Tudo Por Dinheiro','Oddyssey',
    'Zurita Gang','Acre Lovers','Dropeados 2026','BLD F/A','Goats',
    'Ge4r','Japão FC E-Sports','Six Seven'
  ],
  NA: [
    'Team Elektros','Tribe Gaming','Only Realm','Vatic Esports','STMN',
    'F/A Homeless','Vic Day','Legacy Esports','Only Realm Academy',
    'Enosis Esports','F/A Ouioui','Nameless','NLS eSports NA','Lime',
    'Fear Esports','Sad Raccons'
  ]
};

// Генерация случайного названия команды
const prefixes = ['Cyber','Shadow','Storm','Frost','Thunder','Neon','Void','Quantum',
  'Apex','Omega','Titan','Phantom','Inferno','Eclipse','Horizon','Nova',
  'Blitz','Rage','Chaos','Zenith','Crystal','Blaze','Venom','Fusion',
  'Pulse','Drift','Hive','Prism','Oblivion'];

const suffixes = ['Esports','Gaming','Squad','Elite','Legion','Empire','Union','Crew',
  'Army','Force','Clan','Brotherhood','Alliance','Team','Kings',
  'Warriors','Gladiators','Dragons','Wolves','Titans'];

function generateRandomTeamName(region, existingNames) {
  let name;
  do {
    const p = prefixes[Math.floor(Math.random() * prefixes.length)];
    const s = suffixes[Math.floor(Math.random() * suffixes.length)];
    const num = Math.random() < 0.3 ? ' ' + Math.floor(Math.random() * 100) : '';
    name = `${p} ${s}${num}`;
  } while (existingNames.has(name));
  return name;
}

// Создание AI-команд для одного региона
function generateRegionTeams(region, playerTeam = null) {
  const teams = [];
  const nameSet = new Set();

  // 1. Добавляем предопределённые команды
  const predefinedNames = PREDEFINED_TEAMS[region] || [];
  predefinedNames.forEach((name, index) => {
    let tier, power;
    if (index < 8) {
      // Топ-8 получают S тир, мощность от 10000 до 9300
      tier = 'S';
      power = 10000 - index * 100; // 10000, 9900, 9800...
    } else {
      // Остальные 8 - A тир, мощность от 9200 до 8500
      tier = 'A';
      power = 9200 - (index - 8) * 100;
    }
    teams.push({
      id: `${region}_pre_${index}`,
      name,
      region,
      tier,
      power,
      isPlayer: false,
      isPredefined: true
    });
    nameSet.add(name);
  });

  // 2. Генерируем случайные команды (1024, либо 1023 если будет игрок)
  const randomCount = playerTeam ? 1023 : 1024;
  for (let i = 0; i < randomCount; i++) {
    const name = generateRandomTeamName(region, nameSet);
    nameSet.add(name);
    const power = Math.floor(Math.random() * 8001); // 0..8000
    let tier;
    if (power >= 7500) tier = 'A';
    else if (power >= 5000) tier = 'B';
    else if (power >= 2500) tier = 'C';
    else tier = 'D';

    teams.push({
      id: `${region}_rnd_${i}`,
      name,
      region,
      tier,
      power,
      isPlayer: false,
      isPredefined: false
    });
  }

  // 3. Если есть команда игрока, добавляем её (сортировка позже)
  if (playerTeam && playerTeam.region === region) {
    // Убедимся, что команда игрока в нужном формате
    const playerTeamEntry = {
      id: 'player',
      name: playerTeam.name + ' [' + playerTeam.tag + ']', // Отображаем с тегом
      region: playerTeam.region,
      tier: '?', // пока неизвестно
      power: 0,   // базовая сила 0
      isPlayer: true,
      isPredefined: false
    };
    teams.push(playerTeamEntry);
  }

  // Сортируем по убыванию силы
  teams.sort((a, b) => b.power - a.power);
  return teams;
}

// Инициализация или загрузка всех команд
function initializeAllTeams(playerTeam) {
  // Пытаемся загрузить из localStorage
  const saved = localStorage.getItem(TEAMS_STORAGE_KEY);
  if (saved) {
    try {
      allTeams = JSON.parse(saved);
      // Проверяем, есть ли команда игрока (если игрок существует)
      if (playerTeam && !allTeams.some(t => t.isPlayer)) {
        // Если игрок есть, но его нет в сохранённом списке (например, обновление данных)
        // Перегенерируем полностью
      } else {
        return; // используем сохранённые
      }
    } catch (e) {}
  }

  // Генерация с нуля
  allTeams = [];
  REGIONS.forEach(region => {
    const teams = generateRegionTeams(region, playerTeam && playerTeam.region === region ? playerTeam : null);
    allTeams.push(...teams);
  });
  saveAllTeams();
}

// Сохранение списка команд в localStorage
function saveAllTeams() {
  localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(allTeams));
}

// Получение команд игрока из localStorage
function getPlayerTeam() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

// ============== ИНТЕРФЕЙС ==============
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(screenId).classList.remove('hidden');
}

function renderDashboard(team) {
  document.getElementById('header-name').textContent = team.name;
  document.getElementById('header-tag').textContent = team.tag;
  document.getElementById('header-region').textContent = team.region;
  document.getElementById('header-balance').textContent = team.balance;
  document.getElementById('header-power').textContent = team.power || 0;
  document.getElementById('header-date').textContent = team.startDate || '01.01.2026';

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

  // Находим команду игрока в глобальном списке и обновляем power (если надо)
  updatePlayerPower(team);
  switchView('team');
}

function updatePlayerPower(playerTeam) {
  // В будущем power будет рассчитываться на основе игроков, сейчас просто 0
  playerTeam.power = 0;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(playerTeam));
  // Обновим в allTeams
  const playerEntry = allTeams.find(t => t.isPlayer);
  if (playerEntry) {
    playerEntry.power = playerTeam.power;
    // пересортируем и сохраним
    sortAndSave();
  }
}

function sortAndSave() {
  allTeams.sort((a, b) => b.power - a.power);
  saveAllTeams();
}

// Переключение вкладок
function switchView(viewName) {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewName);
  });
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));
  document.getElementById(`view-${viewName}`).classList.add('active-view');

  if (viewName === 'ratings') {
    populateRegionSelect();
    refreshRatingTable();
  }
}

// Заполнение выпадающего списка регионов для рейтинга
function populateRegionSelect() {
  const select = document.getElementById('region-select');
  const playerTeam = getPlayerTeam();
  select.value = playerTeam ? playerTeam.region : 'EMEA';
}

// Отображение таблицы рейтинга
function refreshRatingTable() {
  const region = document.getElementById('region-select').value;
  const tbody = document.getElementById('rating-body');
  tbody.innerHTML = '';

  const regionTeams = allTeams.filter(t => t.region === region);
  // Уже отсортированы по power
  regionTeams.forEach((team, index) => {
    const row = document.createElement('tr');
    if (team.isPlayer) row.classList.add('player-team-row');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${team.name}</td>
      <td>${team.power}</td>
      <td>${team.tier}</td>
    `;
    tbody.appendChild(row);
  });
}

// ============== ОБРАБОТЧИКИ СОБЫТИЙ ==============
document.addEventListener('DOMContentLoaded', () => {
  const createScreen = document.getElementById('screen-create');
  const dashboardScreen = document.getElementById('screen-dashboard');
  const createForm = document.getElementById('create-form');
  const avatarInput = document.getElementById('team-avatar');
  const avatarPreview = document.getElementById('avatar-preview');
  const avatarImg = document.getElementById('avatar-img');

  let playerTeam = getPlayerTeam();

  // Инициализация глобального списка команд
  initializeAllTeams(playerTeam);

  if (playerTeam) {
    showScreen('screen-dashboard');
    renderDashboard(playerTeam);
  } else {
    showScreen('screen-create');
  }

  // Превью аватарки
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

  // Создание команды
  createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('team-name').value.trim();
    const tag = document.getElementById('team-tag').value.trim();
    const region = document.getElementById('region').value;
    const difficultyEl = document.querySelector('input[name="difficulty"]:checked');

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

    let avatarDataUrl = null;
    if (avatarInput.files.length > 0 && avatarImg.src) {
      avatarDataUrl = avatarImg.src;
    }

    const team = {
      name,
      tag,
      region,
      difficulty,
      balance,
      avatarDataUrl,
      startDate: '01.01.2026',
      power: 0,
      players: []
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(team));

    // Перегенерируем allTeams с учётом новой команды игрока
    initializeAllTeams(team);
    
    showScreen('screen-dashboard');
    renderDashboard(team);
  });

  // Навигация
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchView(btn.dataset.view);
    });
  });

  // Заглушка "Добавить игрока"
  document.getElementById('btn-add-player').addEventListener('click', () => {
    alert('Функционал трансферов появится в следующей версии.');
  });

  // Сброс команды
  document.getElementById('btn-reset').addEventListener('click', () => {
    if (confirm('Вы уверены, что хотите сбросить прогресс? Это удалит текущую команду.')) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(TEAMS_STORAGE_KEY);
      location.reload();
    }
  });

  // Обновление таблицы рейтинга при смене региона
  document.getElementById('region-select').addEventListener('change', refreshRatingTable);
});
