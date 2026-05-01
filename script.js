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

// Расширенные словари для генерации названий (никаких чисел)
const firstParts = [
  'Cyber', 'Shadow', 'Storm', 'Frost', 'Thunder', 'Neon', 'Void', 'Quantum',
  'Apex', 'Omega', 'Titan', 'Phantom', 'Inferno', 'Eclipse', 'Horizon', 'Nova',
  'Blitz', 'Rage', 'Chaos', 'Zenith', 'Crystal', 'Blaze', 'Venom', 'Fusion',
  'Pulse', 'Drift', 'Hive', 'Prism', 'Oblivion', 'Hyper', 'Ultra', 'Zero',
  'Nitro', 'Solar', 'Lunar', 'Astral', 'Dark', 'Light', 'Iron', 'Steel',
  'Crimson', 'Azure', 'Onyx', 'Jade', 'Cobalt', 'Amber', 'Violet', 'Silver',
  'Atomic', 'Turbo', 'Rapid', 'Silent', 'Deadly', 'Mystic', 'Arcane', 'Divine',
  'Rising', 'Fallen', 'Wicked', 'Savage', 'Royal', 'Imperial', 'Rebel', 'Elite',
  'Vector', 'Matrix', 'Binary', 'Digital', 'Core', 'Flux', 'Particle', 'Wave'
];

const secondParts = [
  'Esports', 'Gaming', 'Squad', 'Elite', 'Legion', 'Empire', 'Union', 'Crew',
  'Army', 'Force', 'Clan', 'Alliance', 'Team', 'Kings', 'Warriors', 'Gladiators',
  'Dragons', 'Wolves', 'Titans', 'Panthers', 'Eagles', 'Sharks', 'Hawks', 'Vipers',
  'Hunters', 'Raiders', 'Guardians', 'Sentinels', 'Reapers', 'Ghosts', 'Ninjas',
  'Samurai', 'Knights', 'Berserkers', 'Mercenaries', 'Snipers', 'Strikers',
  'Assassins', 'Defenders', 'Invaders', 'Conquerors', 'Legends', 'Mythics',
  'Eternals', 'Immortals', 'Phoenix', 'Thunderbirds', 'Cyclones', 'Tornadoes',
  'Avalanches', 'Tsunamis', 'Infernos', 'Blizzards', 'Earthquakes', 'Maelstroms',
  'Overlords', 'Dominators', 'Annihilators', 'Exterminators', 'Punishers',
  'Executioners', 'Vanquishers', 'Wardens', 'Keepers', 'Watchers', 'Oracles',
  'Prophets', 'Mystics', 'Sorcerers', 'Warlocks', 'Alchemists', 'Artificers',
  'Engineers', 'Pilots', 'Astronauts', 'Cosmonauts', 'Explorers', 'Pioneers',
  'Trailblazers', 'Pathfinders', 'Wayfarers', 'Vagabonds', 'Nomads', 'Outlaws'
];

// Дополнительные одиночные слова для совсем уникальных имён (одно слово)
const singleWords = [
  'Oblivion', 'Zenith', 'Elysium', 'Nirvana', 'Odyssey', 'Nebula', 'Quasar',
  'Pulsar', 'Vertex', 'Axiom', 'Paradox', 'Enigma', 'Cipher', 'Mirage', 'Phantom',
  'Spectre', 'Wraith', 'Banshee', 'Revenant', 'Leviathan', 'Behemoth', 'Colossus',
  'Juggernaut', 'Goliath', 'Hydra', 'Chimera', 'Kraken', 'Basilisk', 'Manticore',
  'Cerberus', 'Minotaur', 'Cyclops', 'Titan', 'Atlas', 'Hercules', 'Achilles',
  'Spartan', 'Trojan', 'Viking', 'Ronin', 'Shogun', 'Emperor', 'Pharaoh', 'Sultan',
  'Czar', 'Kaiser', 'Majesty', 'Monarch', 'Sovereign', 'Regent', 'Overlord',
  'Warlord', 'Archon', 'Patriarch', 'Hierarch', 'Magnate', 'Tycoon', 'Baron',
  'Duke', 'Count', 'Viscount', 'Marquis', 'Earl', 'Knight', 'Paladin', 'Templar',
  'Inquisitor', 'Crusader', 'Exorcist', 'Prophet', 'Oracle', 'Sage', 'Mystic',
  'Wizard', 'Sorcerer', 'Warlock', 'Necromancer', 'Pyromancer', 'Cryomancer',
  'Electromancer', 'Geomancer', 'Aeromancer', 'Hydromancer', 'Chronomancer',
  'Illusionist', 'Conjurer', 'Summoner', 'Invoker', 'Evoker', 'Enchanter',
  'Spellbinder', 'Runesmith', 'Glyphmaster', 'Sigilweaver'
];

/**
 * Генерирует случайное уникальное название команды.
 * Использует различные паттерны: двойные слова, одиночные концептуальные названия.
 * Без чисел.
 * @param {string} region - регион (не используется, но оставлен для совместимости)
 * @param {Set} existingNames - множество уже занятых имён
 * @returns {string} уникальное название
 */
function generateRandomTeamName(region, existingNames) {
  // Паттерны распределены так, чтобы получить разнообразие:
  // 40% - "ПерваяЧасть ВтораяЧасть" (Cyber Wolves, Shadow Hunters и т.п.)
  // 30% - одиночное слово из singleWords
  // 30% - комбинация из двух singleWords через пробел (Nebula Paradox, Zenith Mirage)
  
  let name;
  let attempts = 0;
  const maxAttempts = 1000; // защита от бесконечного цикла
  
  do {
    const pattern = Math.random();
    
    if (pattern < 0.4) {
      // Первая часть + Вторая часть
      const p = firstParts[Math.floor(Math.random() * firstParts.length)];
      const s = secondParts[Math.floor(Math.random() * secondParts.length)];
      name = `${p} ${s}`;
    } else if (pattern < 0.7) {
      // Одиночное слово
      name = singleWords[Math.floor(Math.random() * singleWords.length)];
    } else {
      // Два одиночных слова
      const w1 = singleWords[Math.floor(Math.random() * singleWords.length)];
      let w2;
      do {
        w2 = singleWords[Math.floor(Math.random() * singleWords.length)];
      } while (w2 === w1);
      name = `${w1} ${w2}`;
    }
    
    attempts++;
    if (attempts >= maxAttempts) {
      // Если не нашли уникальное имя за допустимое число попыток, добавляем счётчик
      name += ' #' + Math.floor(Math.random() * 9999);
      break;
    }
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
      tier = 'S';
      power = 10000 - index * 100;
    } else {
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

  // 2. Генерируем случайные команды (всего 1040 минус предопределённые минус команда игрока)
  const randomCount = playerTeam && playerTeam.region === region ? 1023 : 1024;
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

  // 3. Команда игрока (если есть и подходит по региону)
  if (playerTeam && playerTeam.region === region) {
    const playerTeamEntry = {
      id: 'player',
      name: playerTeam.name + ' [' + playerTeam.tag + ']',
      region: playerTeam.region,
      tier: '?',
      power: playerTeam.power || 0,
      isPlayer: true,
      isPredefined: false
    };
    teams.push(playerTeamEntry);
  }

  // Сортируем по убыванию силы
  teams.sort((a, b) => b.power - a.power);
  return teams;
}

// Безопасное сохранение в localStorage
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn('Не удалось сохранить данные в localStorage:', e);
  }
}

// Пересоздание всех команд с учётом команды игрока (если передана)
function regenerateAllTeams(playerTeam) {
  allTeams = [];
  REGIONS.forEach(region => {
    const teams = generateRegionTeams(region, playerTeam);
    allTeams.push(...teams);
  });
  safeSetItem(TEAMS_STORAGE_KEY, JSON.stringify(allTeams));
}

// Получение команды игрока из localStorage
function getPlayerTeam() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
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

  // Обновим силу игрока (пока 0)
  team.power = 0;
  safeSetItem(STORAGE_KEY, JSON.stringify(team));

  // Перегенерируем весь список с учётом игрока
  regenerateAllTeams(team);
  switchView('team');
}

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

function populateRegionSelect() {
  const select = document.getElementById('region-select');
  const playerTeam = getPlayerTeam();
  select.value = playerTeam ? playerTeam.region : 'EMEA';
}

function refreshRatingTable() {
  const region = document.getElementById('region-select').value;
  const tbody = document.getElementById('rating-body');
  tbody.innerHTML = '';

  // Защита от пустого массива
  if (!allTeams || allTeams.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px;">Нет данных о командах. Пожалуйста, пересоздайте команду.</td></tr>';
    return;
  }

  const regionTeams = allTeams.filter(t => t.region === region);
  if (regionTeams.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px;">В этом регионе пока нет команд.</td></tr>';
    return;
  }

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

  if (playerTeam) {
    // Игрок уже существует: генерируем всё с нуля, чтобы точно были данные
    regenerateAllTeams(playerTeam);
    showScreen('screen-dashboard');
    renderDashboard(playerTeam);
  } else {
    // Если игрока нет, allTeams оставляем пустым (рейтинг недоступен)
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

    safeSetItem(STORAGE_KEY, JSON.stringify(team));
    regenerateAllTeams(team);

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
