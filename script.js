// ========== КОНСТАНТЫ ==========
const STORAGE_KEY = 'bsTeam';
const TEAMS_STORAGE_KEY = 'bsAllTeams';
const PLAYERS_STORAGE_KEY = 'bsAllPlayers';
const REGIONS = ['EMEA', 'East Asia', 'SA', 'NA'];
const ROLES = ['Aggressor', 'Controller', 'Flex'];

// Коэффициенты ролей
const ROLE_COEFFS = {
  Aggressor: { aim: 4.5, aggression: 4.5, reaction: 4.0, positioning: 2.5, gameSense: 2.0, teamwork: 1.5, clutch: 1.0 },
  Controller: { gameSense: 4.5, teamwork: 4.5, positioning: 4.0, aim: 2.5, clutch: 2.0, aggression: 1.5, reaction: 1.0 },
  Flex: { clutch: 3.2, gameSense: 3.0, teamwork: 3.0, aim: 2.8, positioning: 2.8, reaction: 2.6, aggression: 2.6 }
};

// Страны с весами (полный список из ваших требований)
const COUNTRIES_WEIGHTS = {
  EMEA: [
    { name: 'Украина', flag: '🇺🇦', weight: 40 },
    { name: 'Германия', flag: '🇩🇪', weight: 80 },
    { name: 'Испания', flag: '🇪🇸', weight: 55 },
    { name: 'Франция', flag: '🇫🇷', weight: 65 },
    { name: 'Италия', flag: '🇮🇹', weight: 60 },
    { name: 'Польша', flag: '🇵🇱', weight: 45 },
    { name: 'Великобритания', flag: '🇬🇧', weight: 65 },
    { name: 'Нидерланды', flag: '🇳🇱', weight: 20 },
    { name: 'Швеция', flag: '🇸🇪', weight: 15 },
    { name: 'Норвегия', flag: '🇳🇴', weight: 10 },
    { name: 'Финляндия', flag: '🇫🇮', weight: 10 },
    { name: 'Дания', flag: '🇩🇰', weight: 10 },
    { name: 'Бельгия', flag: '🇧🇪', weight: 15 },
    { name: 'Австрия', flag: '🇦🇹', weight: 12 },
    { name: 'Швейцария', flag: '🇨🇭', weight: 12 },
    { name: 'Чехия', flag: '🇨🇿', weight: 12 },
    { name: 'Румыния', flag: '🇷🇴', weight: 20 },
    { name: 'Португалия', flag: '🇵🇹', weight: 15 },
    { name: 'Греция', flag: '🇬🇷', weight: 12 },
    { name: 'Венгрия', flag: '🇭🇺', weight: 10 },
    { name: 'Ирландия', flag: '🇮🇪', weight: 8 },
    { name: 'Словакия', flag: '🇸🇰', weight: 7 },
    { name: 'Болгария', flag: '🇧🇬', weight: 7 },
    { name: 'Литва', flag: '🇱🇹', weight: 5 },
    { name: 'Латвия', flag: '🇱🇻', weight: 5 },
    { name: 'Эстония', flag: '🇪🇪', weight: 4 },
    { name: 'Словения', flag: '🇸🇮', weight: 3 },
    { name: 'Люксембург', flag: '🇱🇺', weight: 2 },
    { name: 'Мальта', flag: '🇲🇹', weight: 1 },
    { name: 'Исландия', flag: '🇮🇸', weight: 1 },
    { name: 'Кипр', flag: '🇨🇾', weight: 2 },
    { name: 'Турция', flag: '🇹🇷', weight: 50 },
    { name: 'Израиль', flag: '🇮🇱', weight: 15 },
    { name: 'ОАЭ', flag: '🇦🇪', weight: 10 },
    { name: 'Саудовская Аравия', flag: '🇸🇦', weight: 25 },
    { name: 'Катар', flag: '🇶🇦', weight: 5 },
    { name: 'Египет', flag: '🇪🇬', weight: 30 },
    { name: 'Марокко', flag: '🇲🇦', weight: 20 },
    { name: 'Алжир', flag: '🇩🇿', weight: 15 },
    { name: 'Тунис', flag: '🇹🇳', weight: 10 },
    { name: 'Нигерия', flag: '🇳🇬', weight: 40 },
    { name: 'Гана', flag: '🇬🇭', weight: 12 },
    { name: 'Кения', flag: '🇰🇪', weight: 15 },
    { name: 'ЮАР', flag: '🇿🇦', weight: 20 },
    { name: 'Кот-д\'Ивуар', flag: '🇨🇮', weight: 8 },
    { name: 'Камерун', flag: '🇨🇲', weight: 10 },
    { name: 'Сенегал', flag: '🇸🇳', weight: 8 },
    { name: 'Уганда', flag: '🇺🇬', weight: 10 },
    { name: 'Танзания', flag: '🇹🇿', weight: 10 },
    { name: 'Эфиопия', flag: '🇪🇹', weight: 15 },
    // Остальные страны EMEA (вес 1-3 для малонаселённых)
    { name: 'Афганистан', flag: '🇦🇫', weight: 3 },
    { name: 'Албания', flag: '🇦🇱', weight: 3 },
    { name: 'Андорра', flag: '🇦🇩', weight: 1 },
    { name: 'Армения', flag: '🇦🇲', weight: 3 },
    { name: 'Азербайджан', flag: '🇦🇿', weight: 5 },
    { name: 'Бахрейн', flag: '🇧🇭', weight: 2 },
    { name: 'Бенин', flag: '🇧🇯', weight: 3 },
    { name: 'Босния и Герцеговина', flag: '🇧🇦', weight: 3 },
    { name: 'Ботсвана', flag: '🇧🇼', weight: 1 },
    { name: 'Буркина-Фасо', flag: '🇧🇫', weight: 3 },
    { name: 'Бурунди', flag: '🇧🇮', weight: 2 },
    { name: 'Кабо-Верде', flag: '🇨🇻', weight: 1 },
    { name: 'ЦАР', flag: '🇨🇫', weight: 2 },
    { name: 'Чад', flag: '🇹🇩', weight: 2 },
    { name: 'Коморы', flag: '🇰🇲', weight: 1 },
    { name: 'Конго', flag: '🇨🇩', weight: 5 },
    { name: 'Хорватия', flag: '🇭🇷', weight: 5 },
    { name: 'Джибути', flag: '🇩🇯', weight: 1 },
    { name: 'Экваториальная Гвинея', flag: '🇬🇶', weight: 1 },
    { name: 'Эритрея', flag: '🇪🇷', weight: 2 },
    { name: 'Эсватини', flag: '🇸🇿', weight: 1 },
    { name: 'Фарерские Острова', flag: '🇫🇴', weight: 1 },
    { name: 'Габон', flag: '🇬🇦', weight: 1 },
    { name: 'Гамбия', flag: '🇬🇲', weight: 1 },
    { name: 'Грузия', flag: '🇬🇪', weight: 4 },
    { name: 'Гибралтар', flag: '🇬🇮', weight: 1 },
    { name: 'Гренландия', flag: '🇬🇱', weight: 1 },
    { name: 'Гвинея', flag: '🇬🇳', weight: 3 },
    { name: 'Гвинея-Бисау', flag: '🇬🇼', weight: 1 },
    { name: 'Ирак', flag: '🇮🇶', weight: 5 },
    { name: 'Остров Мэн', flag: '🇮🇲', weight: 1 },
    { name: 'Джерси', flag: '🇯🇪', weight: 1 },
    { name: 'Иордания', flag: '🇯🇴', weight: 4 },
    { name: 'Казахстан', flag: '🇰🇿', weight: 10 },
    { name: 'Косово', flag: '🇽🇰', weight: 2 },
    { name: 'Кувейт', flag: '🇰🇼', weight: 3 },
    { name: 'Киргизия', flag: '🇰🇬', weight: 3 },
    { name: 'Ливан', flag: '🇱🇧', weight: 5 },
    { name: 'Лесото', flag: '🇱🇸', weight: 1 },
    { name: 'Либерия', flag: '🇱🇷', weight: 2 },
    { name: 'Ливия', flag: '🇱🇾', weight: 3 },
    { name: 'Лихтенштейн', flag: '🇱🇮', weight: 1 },
    { name: 'Мадагаскар', flag: '🇲🇬', weight: 5 },
    { name: 'Малави', flag: '🇲🇼', weight: 3 },
    { name: 'Мали', flag: '🇲🇱', weight: 3 },
    { name: 'Мавритания', flag: '🇲🇷', weight: 2 },
    { name: 'Маврикий', flag: '🇲🇺', weight: 1 },
    { name: 'Молдова', flag: '🇲🇩', weight: 3 },
    { name: 'Монако', flag: '🇲🇨', weight: 1 },
    { name: 'Черногория', flag: '🇲🇪', weight: 1 },
    { name: 'Мозамбик', flag: '🇲🇿', weight: 3 },
    { name: 'Намибия', flag: '🇳🇦', weight: 2 },
    { name: 'Нигер', flag: '🇳🇪', weight: 2 },
    { name: 'Северная Македония', flag: '🇲🇰', weight: 2 },
    { name: 'Оман', flag: '🇴🇲', weight: 3 },
    { name: 'Палестина', flag: '🇵🇸', weight: 3 },
    { name: 'Реюньон', flag: '🇷🇪', weight: 1 },
    { name: 'Руанда', flag: '🇷🇼', weight: 2 },
    { name: 'Сент-Китс и Невис', flag: '🇰🇳', weight: 1 },
    { name: 'Сан-Марино', flag: '🇸🇲', weight: 1 },
    { name: 'Сан-Томе и Принсипи', flag: '🇸🇹', weight: 1 },
    { name: 'Сербия', flag: '🇷🇸', weight: 7 },
    { name: 'Сомали', flag: '🇸🇴', weight: 3 },
    { name: 'Судан', flag: '🇸🇩', weight: 5 },
    { name: 'Сирия', flag: '🇸🇾', weight: 4 },
    { name: 'Таджикистан', flag: '🇹🇯', weight: 4 },
    { name: 'Того', flag: '🇹🇬', weight: 2 },
    { name: 'Туркменистан', flag: '🇹🇲', weight: 3 },
    { name: 'Узбекистан', flag: '🇺🇿', weight: 8 },
    { name: 'Ватикан', flag: '🇻🇦', weight: 1 },
    { name: 'Западная Сахара', flag: '🇪🇭', weight: 1 },
    { name: 'Йемен', flag: '🇾🇪', weight: 3 },
    { name: 'Замбия', flag: '🇿🇲', weight: 3 },
    { name: 'Зимбабве', flag: '🇿🇼', weight: 3 }
  ],
  'East Asia': [
    { name: 'Япония', flag: '🇯🇵', weight: 70 },
    { name: 'Южная Корея', flag: '🇰🇷', weight: 50 }
  ],
  SA: [
    { name: 'Бразилия', flag: '🇧🇷', weight: 90 },
    { name: 'Аргентина', flag: '🇦🇷', weight: 40 },
    { name: 'Чили', flag: '🇨🇱', weight: 20 },
    { name: 'Колумбия', flag: '🇨🇴', weight: 25 },
    { name: 'Перу', flag: '🇵🇪', weight: 18 },
    { name: 'Уругвай', flag: '🇺🇾', weight: 10 },
    { name: 'Парагвай', flag: '🇵🇾', weight: 8 },
    { name: 'Эквадор', flag: '🇪🇨', weight: 12 },
    { name: 'Боливия', flag: '🇧🇴', weight: 8 },
    { name: 'Венесуэла', flag: '🇻🇪', weight: 15 },
    { name: 'Гайана', flag: '🇬🇾', weight: 2 },
    { name: 'Суринам', flag: '🇸🇷', weight: 2 },
    { name: 'Французская Гвиана', flag: '🇬🇫', weight: 1 },
    { name: 'Аруба', flag: '🇦🇼', weight: 1 }
  ],
  NA: [
    { name: 'США', flag: '🇺🇸', weight: 90 },
    { name: 'Канада', flag: '🇨🇦', weight: 40 },
    { name: 'Мексика', flag: '🇲🇽', weight: 60 },
    { name: 'Пуэрто-Рико', flag: '🇵🇷', weight: 10 },
    { name: 'Доминиканская Республика', flag: '🇩🇴', weight: 12 },
    { name: 'Куба', flag: '🇨🇺', weight: 8 },
    { name: 'Ямайка', flag: '🇯🇲', weight: 5 },
    { name: 'Гватемала', flag: '🇬🇹', weight: 8 },
    { name: 'Гондурас', flag: '🇭🇳', weight: 7 },
    { name: 'Сальвадор', flag: '🇸🇻', weight: 6 },
    { name: 'Коста-Рика', flag: '🇨🇷', weight: 5 },
    { name: 'Панама', flag: '🇵🇦', weight: 5 },
    { name: 'Багамы', flag: '🇧🇸', weight: 2 },
    { name: 'Тринидад и Тобаго', flag: '🇹🇹', weight: 3 },
    { name: 'Барбадос', flag: '🇧🇧', weight: 2 },
    { name: 'Никарагуа', flag: '🇳🇮', weight: 5 },
    { name: 'Белиз', flag: '🇧🇿', weight: 2 },
    { name: 'Гренада', flag: '🇬🇩', weight: 1 },
    { name: 'Гаити', flag: '🇭🇹', weight: 5 },
    { name: 'Бермуды', flag: '🇧🇲', weight: 1 },
    { name: 'Антигуа и Барбуда', flag: '🇦🇬', weight: 1 },
    { name: 'Острова Кайман', flag: '🇰🇾', weight: 1 },
    { name: 'Монтсеррат', flag: '🇲🇸', weight: 1 },
    { name: 'Сен-Мартен', flag: '🇲🇫', weight: 1 },
    { name: 'Сент-Люсия', flag: '🇱🇨', weight: 1 },
    { name: 'Сент-Винсент и Гренадины', flag: '🇻🇨', weight: 1 },
    { name: 'Синт-Мартен', flag: '🇸🇽', weight: 1 },
    { name: 'Британские Виргинские острова', flag: '🇻🇬', weight: 1 }
  ]
};

// Генерация названий команд
const TEAM_PREFIXES = ['Cyber','Shadow','Storm','Frost','Thunder','Neon','Void','Quantum','Apex','Omega','Titan','Phantom','Inferno','Eclipse','Horizon','Nova','Blitz','Rage','Chaos','Zenith','Crystal','Blaze','Venom','Fusion','Pulse','Drift','Hive','Prism','Oblivion','Hyper','Ultra','Zero','Nitro','Solar','Lunar','Astral','Dark','Light','Iron','Steel','Crimson','Azure','Onyx','Jade','Cobalt','Amber','Violet','Silver','Atomic','Turbo','Rapid','Silent','Deadly','Mystic','Arcane','Divine','Rising','Fallen','Wicked','Savage','Royal','Imperial','Rebel','Elite','Vector','Matrix','Binary','Digital','Core','Flux','Particle','Wave'];
const TEAM_SUFFIXES = ['Esports','Gaming','Squad','Elite','Legion','Empire','Union','Crew','Army','Force','Clan','Alliance','Team','Kings','Warriors','Gladiators','Dragons','Wolves','Titans','Panthers','Eagles','Sharks','Hawks','Vipers','Hunters','Raiders','Guardians','Sentinels','Reapers','Ghosts','Ninjas','Samurai','Knights','Berserkers','Mercenaries','Snipers','Strikers','Assassins','Defenders','Invaders','Conquerors','Legends','Mythics','Eternals','Immortals','Phoenix','Thunderbirds','Cyclones','Tornadoes','Avalanches','Tsunamis','Infernos','Blizzards','Earthquakes','Maelstroms','Overlords','Dominators','Annihilators','Exterminators','Punishers','Executioners','Vanquishers','Wardens','Keepers','Watchers','Oracles','Prophets','Mystics','Sorcerers','Warlocks','Alchemists','Artificers','Engineers','Pilots','Astronauts','Cosmonauts','Explorers','Pioneers','Trailblazers','Pathfinders','Wayfarers','Vagabonds','Nomads','Outlaws'];

function generateRandomTeamName() {
  const p = TEAM_PREFIXES[Math.floor(Math.random() * TEAM_PREFIXES.length)];
  const s = TEAM_SUFFIXES[Math.floor(Math.random() * TEAM_SUFFIXES.length)];
  return `${p} ${s}`;
}

// Ники игроков
const ADJECTIVES = ['Shadow','Neon','Cyber','Frost','Storm','Blitz','Apex','Omega','Turbo','Ultra',
  'Mystic','Arcane','Silent','Deadly','Savage','Royal','Imperial','Rebel','Elite','Vector',
  'Matrix','Digital','Core','Flux','Particle','Wave','Solar','Lunar','Astral','Dark',
  'Crimson','Azure','Onyx','Jade','Cobalt','Amber','Violet','Silver','Atomic','Rapid'];
const NOUNS = ['Wolf','Hawk','Tiger','Viper','Panther','Eagle','Shark','Dragon','Phoenix',
  'Cyclone','Tornado','Avalanche','Tsunami','Inferno','Blizzard','Earthquake','Maelstrom',
  'Overlord','Dominator','Reaper','Ghost','Ninja','Samurai','Knight','Berserker','Mercenary',
  'Sniper','Striker','Assassin','Defender','Invader','Conqueror','Legend','Mythic','Eternal',
  'Immortal','Oracle','Prophet','Mystic','Sorcerer','Warlock','Alchemist','Engineer','Pilot',
  'Astronaut','Explorer','Pioneer','Pathfinder','Outlaw','Vagabond','Nomad','Warden','Keeper',
  'Watcher','Sentinel','Guardian','Champion','Gladiator','Hero','Titan','Colossus','Juggernaut'];

function generateRandomNick() {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  if (Math.random() < 0.05) return `${adj}${noun}${Math.floor(Math.random()*90+10)}`;
  return `${adj}${noun}`;
}

// Вспомогательные функции
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pickWeighted(arr) {
  const total = arr.reduce((sum, item) => sum + item.weight, 0);
  let rand = Math.random() * total;
  for (let item of arr) {
    if (rand < item.weight) return item;
    rand -= item.weight;
  }
  return arr[0] || { name: 'Неизвестно', flag: '🏳️' };
}

// Расчет силы игрока
function calcPlayerPower(skills, role) {
  const coeffs = ROLE_COEFFS[role];
  let sum = 0;
  for (let skill in coeffs) sum += (skills[skill] || 0) * coeffs[skill];
  return Math.round(sum * 5);
}

function getBestRole(skills) {
  let bestRole = 'Flex';
  let bestPower = 0;
  for (let role of ROLES) {
    const power = calcPlayerPower(skills, role);
    if (power > bestPower) {
      bestPower = power;
      bestRole = role;
    }
  }
  return bestRole;
}

function getPlayerTier(power) {
  if (power >= 85000) return 'S';
  if (power >= 70000) return 'A';
  if (power >= 50000) return 'B';
  if (power >= 25000) return 'C';
  return 'D';
}
function getTeamTier(power) {
  if (power >= 270000) return 'S';
  if (power >= 210000) return 'A';
  if (power >= 150000) return 'B';
  if (power >= 75000) return 'C';
  return 'D';
}

// Создание игрока
function createPlayerForTeam(countryData, targetPower) {
  if (!countryData) countryData = { name: 'Неизвестно', flag: '🏳️' };
  const skills = {};
  let role = ROLES[Math.floor(Math.random() * 3)];
  for (let attempt = 0; attempt < 200; attempt++) {
    for (let skill in ROLE_COEFFS[role]) {
      skills[skill] = randomInt(100, 1000);
    }
    const power = calcPlayerPower(skills, role);
    if (Math.abs(power - targetPower) < 5000) break;
    role = ROLES[Math.floor(Math.random() * 3)];
  }
  const power = calcPlayerPower(skills, role);
  return {
    id: `p_${Date.now()}_${Math.random().toString(36)}`,
    nick: generateRandomNick(),
    name: generateRandomNick(),
    country: countryData.name,
    flag: countryData.flag,
    age: randomInt(16, 28),
    skills,
    bestRole: getBestRole(skills),
    power,
    tier: getPlayerTier(power),
    teamId: null,
    salary: Math.floor(power / 100) + 100,
    isFreeAgent: false,
    assignedRole: null
  };
}

// Глобальные данные
let allTeams = [];
let allPlayers = [];
let playerTeam = null;

// ========== ПРЕДОПРЕДЕЛЁННЫЕ ТОП-24 ==========
function createPredefinedTeams() {
  const teams = [];
  function addTeam(name, region, playersData) {
    const teamId = `team_pd_${name.replace(/\s/g,'')}`;
    const team = {
      id: teamId,
      name,
      region,
      power: 0,
      points: 0,
      players: [],
      isPlayer: false,
      isPredefined: true
    };
    let totalPower = 0;
    playersData.forEach(pd => {
      const countryData = COUNTRIES_WEIGHTS[region]?.find(c => c.name === pd.country) || { name: pd.country, flag: '🏳️' };
      const player = createPlayerForTeam(countryData, pd.targetPower);
      player.nick = pd.nick;
      player.name = pd.name || pd.nick;
      player.country = pd.country;
      player.flag = countryData.flag;
      player.teamId = teamId;
      player.power = Math.min(pd.targetPower, 100000);
      allPlayers.push(player);
      team.players.push(player.id);
      totalPower += player.power;
    });
    team.power = totalPower;
    team.tier = getTeamTier(team.power);
    teams.push(team);
  }

  // 24 S-тир команды
  addTeam('FUT Esports','EMEA', [
    {nick:'Guesti',country:'Украина',targetPower:98000,name:'Mykhaylo Chernov'},
    {nick:'Angelboy',country:'Украина',targetPower:96000,name:'Yaroslav Labunets'},
    {nick:'Nob?',country:'Армения',targetPower:95000,name:'Tigran Harutyunyan'}
  ]);
  addTeam('HMBLE','EMEA', [
    {nick:'Symantec',country:'Германия',targetPower:97000,name:'Bekri Tahiri'},
    {nick:'Lukii',country:'Германия',targetPower:95500},
    {nick:'BosS',country:'Испания',targetPower:94000}
  ]);
  addTeam('Crazy Raccoon','East Asia', [
    {nick:'Tensai',country:'Япония',targetPower:99000},
    {nick:'Milkreo',country:'Япония',targetPower:97000},
    {nick:'Moya',country:'Япония',targetPower:96000}
  ]);
  addTeam('ZETA DIVISION','East Asia', [
    {nick:'Sitetampo',country:'Япония',targetPower:98500},
    {nick:'Battoman',country:'Япония',targetPower:96500},
    {nick:'Sizuku',country:'Япония',targetPower:95500}
  ]);
  addTeam('Tribe Gaming','NA', [
    {nick:'Diegogamer',country:'Мексика',targetPower:97500},
    {nick:'Lxffy',country:'Пуэрто-Рико',targetPower:96000},
    {nick:'RBM',country:'Мексика',targetPower:95000}
  ]);
  addTeam('Team Elektros','NA', [
    {nick:'Snoiy',country:'Канада',targetPower:97000},
    {nick:'Memen',country:'Мексика',targetPower:95500},
    {nick:'Doin',country:'Южная Корея',targetPower:94000}
  ]);
  addTeam('Only Realm','NA', [
    {nick:'bobby',country:'Канада',targetPower:96500},
    {nick:'Patchy',country:'США',targetPower:95000},
    {nick:'Sans',country:'США',targetPower:93500}
  ]);
  addTeam('Bounty Hunters Esports','SA', [
    {nick:'Portox',country:'Аргентина',targetPower:97000},
    {nick:'Prozy',country:'Перу',targetPower:95500},
    {nick:'Wesley',country:'Бразилия',targetPower:94000}
  ]);
  addTeam('Eternal Esports','SA', [
    {nick:'CaueBR',country:'Бразилия',targetPower:96500},
    {nick:'Jubileu',country:'Бразилия',targetPower:95000},
    {nick:'Mohtep',country:'Бразилия',targetPower:93500}
  ]);
  addTeam('Team Heretics','EMEA', [
    {nick:'iKaoss',country:'Испания',targetPower:96000},
    {nick:'Marco',country:'Италия',targetPower:94500},
    {nick:'Subeme',country:'Италия',targetPower:93000}
  ]);
  addTeam('NAVI','EMEA', [
    {nick:'Drage',country:'Великобритания',targetPower:95500},
    {nick:'Enraged',country:'Великобритания',targetPower:94000},
    {nick:'GeRo',country:'Польша',targetPower:92500}
  ]);
  addTeam('SKCALALAS EA','East Asia', [
    {nick:'Ghost T',country:'Япония',targetPower:95000},
    {nick:'Kuru',country:'Япония',targetPower:93500},
    {nick:'Naipishu',country:'Япония',targetPower:92000}
  ]);
  addTeam('LOUD','SA', [
    {nick:'Edinho',country:'Бразилия',targetPower:95000},
    {nick:'FireCrow',country:'Бразилия',targetPower:93500},
    {nick:'KaioDog',country:'Бразилия',targetPower:92000}
  ]);
  addTeam('Vatic','NA', [
    {nick:'Belal',country:'США',targetPower:94500},
    {nick:'Duckie',country:'США',targetPower:93000},
    {nick:'Ezlivi',country:'США',targetPower:91500}
  ]);
  addTeam('SK Gaming','EMEA', [
    {nick:'Nowy297',country:'Польша',targetPower:94000},
    {nick:'Ope',country:'Франция',targetPower:92500},
    {nick:'Yoshi',country:'Испания',targetPower:91000}
  ]);
  addTeam('Reply Totem','EMEA', [
    {nick:'Joker',country:'Германия',targetPower:93500},
    {nick:'Maru',country:'Италия',targetPower:92000},
    {nick:'Maury',country:'Италия',targetPower:90500}
  ]);
  addTeam('FENNEL','East Asia', [
    {nick:'Achapi',country:'Япония',targetPower:93000},
    {nick:'I see',country:'Япония',targetPower:91500},
    {nick:'Ken-G',country:'Япония',targetPower:90000}
  ]);
  addTeam('SKCALALAS','SA', [
    {nick:'Kristian',country:'Чили',targetPower:92500},
    {nick:'Pekka',country:'Бразилия',targetPower:91000},
    {nick:'Rhz',country:'Чили',targetPower:89500}
  ]);
  addTeam('REJECT','East Asia', [
    {nick:'Levi',country:'Япония',targetPower:92000},
    {nick:'Melty',country:'Япония',targetPower:90500},
    {nick:'Shu',country:'Япония',targetPower:89000}
  ]);
  addTeam('Big Talents','EMEA', [
    {nick:'Dompe',country:'Испания',targetPower:91500},
    {nick:'Mine',country:'Польша',targetPower:90000},
    {nick:'Nes',country:'Франция',targetPower:88500}
  ]);
  addTeam('NOVO Esports','EMEA', [
    {nick:'Filippo',country:'Италия',targetPower:91000},
    {nick:'MeOw',country:'Польша',targetPower:89500},
    {nick:'Terry',country:'Южная Корея',targetPower:88000}
  ]);
  addTeam('STMN','NA', [
    {nick:'Juan Carlos',country:'Мексика',targetPower:90500},
    {nick:'PaiN',country:'Мексика',targetPower:89000},
    {nick:'Tacos',country:'Мексика',targetPower:87500}
  ]);
  addTeam('Vic Day','NA', [
    {nick:'Chino',country:'США',targetPower:90000},
    {nick:'Vegeta',country:'Канада',targetPower:88500},
    {nick:'OG',country:'Канада',targetPower:87000}
  ]);
  addTeam('Real Madrid','EMEA', [
    {nick:'Rup',country:'Испания',targetPower:89500},
    {nick:'Yoko',country:'Франция',targetPower:88000},
    {nick:'Jusorange',country:'Франция',targetPower:86500}
  ]);

  // Команды A-тира (25-64)
  const aTeamsCount = { EMEA: 12, 'East Asia': 10, SA: 8, NA: 10 };
  for (let region of REGIONS) {
    for (let i = 0; i < aTeamsCount[region]; i++) {
      const teamId = `team_a_${region}_${i}`;
      const teamPower = randomInt(210000, 269999);
      const team = {
        id: teamId,
        name: generateRandomTeamName(),
        region,
        power: 0,
        points: 0,
        players: [],
        isPlayer: false,
        isPredefined: false
      };
      let remaining = teamPower;
      for (let j = 0; j < 3; j++) {
        const maxP = Math.min(remaining - (2-j)*1000, 95000);
        const targetP = randomInt(Math.max(25000, maxP-10000), maxP);
        const country = pickWeighted(COUNTRIES_WEIGHTS[region]);
        const player = createPlayerForTeam(country, targetP);
        player.teamId = teamId;
        allPlayers.push(player);
        team.players.push(player.id);
        remaining -= player.power;
      }
      team.power = team.players.reduce((sum, pid) => sum + allPlayers.find(p => p.id === pid).power, 0);
      team.tier = getTeamTier(team.power);
      teams.push(team);
    }
  }
  return teams;
}

// ========== ГЕНЕРАЦИЯ ОСТАЛЬНЫХ КОМАНД ==========
function generateRemainingTeams() {
  const totalPerRegion = 1040;
  REGIONS.forEach(region => {
    const existingCount = allTeams.filter(t => t.region === region).length;
    const needed = totalPerRegion - existingCount - (playerTeam && playerTeam.region === region ? 1 : 0);
    for (let i = 0; i < needed; i++) {
      const teamId = `team_rnd_${region}_${i}`;
      let minPower, maxPower;
      if (i < 90) { minPower = 150000; maxPower = 209999; }
      else { minPower = 75000; maxPower = 149999; }
      const teamPower = randomInt(minPower, maxPower);
      const team = { id: teamId, name: generateRandomTeamName(), region, power: 0, points: 0, players: [], isPlayer: false };
      let remaining = teamPower;
      for (let j = 0; j < 3; j++) {
        const maxP = Math.min(remaining - (2-j)*1000, 90000);
        const targetP = randomInt(25000, maxP);
        const country = pickWeighted(COUNTRIES_WEIGHTS[region]);
        const player = createPlayerForTeam(country, targetP);
        player.teamId = teamId;
        allPlayers.push(player);
        team.players.push(player.id);
        remaining -= player.power;
      }
      team.power = team.players.reduce((s,pid)=>s+allPlayers.find(p=>p.id===pid).power,0);
      team.tier = getTeamTier(team.power);
      allTeams.push(team);
    }
  });
}

// Свободные агенты
function generateFreeAgents() {
  for (let region of REGIONS) {
    for (let i = 0; i < 30; i++) {
      const country = pickWeighted(COUNTRIES_WEIGHTS[region]);
      const role = ROLES[Math.floor(Math.random()*3)];
      const skills = {};
      for (let skill in ROLE_COEFFS[role]) skills[skill] = randomInt(100, 1000);
      const power = calcPlayerPower(skills, role);
      allPlayers.push({
        id: `fa_${region}_${i}`,
        nick: generateRandomNick(),
        name: generateRandomNick(),
        country: country.name,
        flag: country.flag,
        age: randomInt(16,30),
        skills,
        bestRole: getBestRole(skills),
        power,
        tier: getPlayerTier(power),
        teamId: null,
        salary: Math.floor(power/100)+100,
        isFreeAgent: true
      });
    }
  }
}

// ========== СОХРАНЕНИЕ / ЗАГРУЗКА ==========
function saveData() {
  localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(allTeams));
  localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(allPlayers));
}
function loadData() {
  const t = localStorage.getItem(TEAMS_STORAGE_KEY);
  const p = localStorage.getItem(PLAYERS_STORAGE_KEY);
  if (t && p) {
    allTeams = JSON.parse(t);
    allPlayers = JSON.parse(p);
    return true;
  }
  return false;
}

// ========== ГЕНЕРАЦИЯ ВСЕХ ДАННЫХ ==========
function generateAllData() {
  try {
    allTeams = [];
    allPlayers = [];
    allTeams.push(...createPredefinedTeams());
    generateRemainingTeams();
    generateFreeAgents();
    if (playerTeam) {
      const playerEntry = {
        id: 'player',
        name: `${playerTeam.name} [${playerTeam.tag}]`,
        region: playerTeam.region,
        power: 0,
        points: 0,
        players: playerTeam.players || [],
        isPlayer: true
      };
      allTeams.push(playerEntry);
    }
    allTeams.sort((a,b) => b.power - a.power);
    saveData();
    console.log('Данные успешно сгенерированы');
    return true;
  } catch (e) {
    console.error('Ошибка генерации данных:', e);
    alert('Произошла ошибка при создании мира игры. Обновите страницу.');
    return false;
  }
}

// ========== ОТОБРАЖЕНИЕ ==========
function renderDashboard() {
  if (!playerTeam) return;
  const pt = allTeams.find(t => t.isPlayer);
  document.getElementById('header-name').textContent = playerTeam.name;
  document.getElementById('header-tag').textContent = playerTeam.tag;
  document.getElementById('header-region').textContent = playerTeam.region;
  document.getElementById('header-balance').textContent = `$${playerTeam.balance.toLocaleString()}`;
  document.getElementById('header-power').textContent = pt ? pt.power : 0;
  document.getElementById('header-points').textContent = pt ? pt.points : 0;
  document.getElementById('header-date').textContent = playerTeam.date || 'Январь 2026';
  renderRoster();
}

function renderRoster() {
  const main = document.getElementById('roster-main');
  main.innerHTML = '';
  const pTeam = allTeams.find(t => t.isPlayer);
  if (!pTeam) return;
  for (let i = 0; i < 3; i++) {
    const pid = pTeam.players[i];
    if (pid) {
      const player = allPlayers.find(p => p.id === pid);
      if (player) {
        main.appendChild(createPlayerCard(player));
        continue;
      }
    }
    main.appendChild(createEmptyCard());
  }
  const reserve = document.getElementById('reserve-slot');
  reserve.innerHTML = '';
  const reserveId = pTeam.players[3];
  if (reserveId) {
    const player = allPlayers.find(p => p.id === reserveId);
    if (player) reserve.appendChild(createPlayerCard(player));
    else reserve.appendChild(createEmptyCard());
  } else {
    reserve.appendChild(createEmptyCard());
  }
}

function createPlayerCard(player) {
  const card = document.createElement('div');
  card.className = 'player-card';
  card.innerHTML = `<div class="player-flag">${player.flag||'🏳️'}</div>
    <div class="player-nick">${player.nick}</div>
    <div class="player-role">${player.assignedRole || player.bestRole}</div>`;
  card.addEventListener('click', () => showPlayerModal(player));
  return card;
}

function createEmptyCard() {
  const card = document.createElement('div');
  card.className = 'player-card empty';
  card.innerHTML = '<div class="player-avatar-placeholder">+</div><div class="player-name-placeholder">Пустой слот</div>';
  return card;
}

// Модальное окно игрока
function showPlayerModal(player) {
  const modal = document.getElementById('player-modal');
  const content = document.getElementById('modal-player-details');
  const teamName = player.teamId ? (allTeams.find(t=>t.id===player.teamId)?.name||'Неизвестно') : (player.isFreeAgent?'Свободный агент':'Без команды');
  content.innerHTML = `
    <h3>${player.flag} ${player.nick}</h3>
    <p><strong>Имя:</strong> ${player.name}</p>
    <p><strong>Страна:</strong> ${player.flag} ${player.country}</p>
    <p><strong>Возраст:</strong> ${player.age}</p>
    <p><strong>Лучшая роль:</strong> ${player.bestRole}</p>
    <p><strong>Тир:</strong> ${player.tier}</p>
    <p><strong>Команда:</strong> ${teamName}</p>
    <div class="skills-grid">
      <div>Прицел: ${player.skills.aim}</div><div>Реакция: ${player.skills.reaction}</div>
      <div>Понимание игры: ${player.skills.gameSense}</div><div>Командная работа: ${player.skills.teamwork}</div>
      <div>Позиционирование: ${player.skills.positioning}</div><div>Клатч: ${player.skills.clutch}</div>
      <div>Агрессия: ${player.skills.aggression}</div>
    </div>
    <p><strong>Сила:</strong> ${player.power}</p>
    <p><strong>Зарплата:</strong> $${player.salary}/мес</p>
  `;
  modal.classList.remove('hidden');
}

// Рынок
function refreshMarket() {
  const search = document.getElementById('market-search').value.toLowerCase();
  const region = document.getElementById('market-region-filter').value;
  const role = document.getElementById('market-role-filter').value;
  const tier = document.getElementById('market-tier-filter').value;
  const container = document.getElementById('free-agents-list');
  container.innerHTML = '';
  let list = [...allPlayers];
  if (region !== 'all') list = list.filter(p => COUNTRIES_WEIGHTS[region]?.some(c => c.name === p.country));
  if (role !== 'all') list = list.filter(p => (p.assignedRole||p.bestRole) === role);
  if (tier !== 'all') list = list.filter(p => p.tier === tier);
  if (search) list = list.filter(p => p.nick.toLowerCase().includes(search));
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'agent-card';
    const team = p.teamId ? allTeams.find(t=>t.id===p.teamId) : null;
    const isFree = p.isFreeAgent || !p.teamId;
    const actionBtn = isFree
      ? `<button class="btn btn-small btn-primary hire-btn" data-id="${p.id}">Нанять (беспл.)</button>`
      : `<button class="btn btn-small btn-primary buy-btn" data-id="${p.id}">Купить за $${Math.floor(p.power*2+5000)}</button>`;
    card.innerHTML = `
      <div><strong>${p.flag} ${p.nick}</strong> (${p.assignedRole||p.bestRole})</div>
      <div>Сила: ${p.power} | Тир: ${p.tier}</div>
      <div>Возраст: ${p.age} | Зарплата: $${p.salary}/мес</div>
      <div>Команда: ${team ? team.name : 'Свободный агент'}</div>
      ${actionBtn}
    `;
    container.appendChild(card);
  });
  document.querySelectorAll('.hire-btn').forEach(b => {
    b.addEventListener('click', () => hireFreeAgent(b.dataset.id));
  });
  document.querySelectorAll('.buy-btn').forEach(b => {
    b.addEventListener('click', () => buyPlayer(b.dataset.id));
  });
}

function hireFreeAgent(id) {
  const player = allPlayers.find(p => p.id === id);
  if (!player || !playerTeam) return;
  const pTeam = allTeams.find(t => t.isPlayer);
  if (pTeam.players.length >= 4) return alert('Нет мест');
  player.isFreeAgent = false;
  player.teamId = 'player';
  pTeam.players.push(player.id);
  playerTeam.players = pTeam.players;
  recalcTeamPower(pTeam);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(playerTeam));
  saveData();
  renderDashboard();
  refreshMarket();
}

function buyPlayer(id) {
  const player = allPlayers.find(p => p.id === id);
  if (!player || !playerTeam) return;
  const pTeam = allTeams.find(t => t.isPlayer);
  if (pTeam.players.length >= 4) return alert('Нет мест');
  const cost = Math.floor(player.power * 2 + 5000);
  if (playerTeam.balance < cost) return alert('Недостаточно средств');
  playerTeam.balance -= cost;
  player.teamId = 'player';
  pTeam.players.push(player.id);
  playerTeam.players = pTeam.players;
  recalcTeamPower(pTeam);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(playerTeam));
  saveData();
  renderDashboard();
  refreshMarket();
}

function recalcTeamPower(team) {
  team.power = team.players.reduce((sum, pid) => sum + (allPlayers.find(p=>p.id===pid)?.power||0), 0);
  team.tier = getTeamTier(team.power);
}

// Рейтинг с кликом на команду
function refreshRatingTable() {
  const region = document.getElementById('region-select').value;
  const tbody = document.getElementById('rating-body');
  tbody.innerHTML = '';
  let list = allTeams;
  if (region !== 'all') list = list.filter(t => t.region === region);
  list.forEach((team, idx) => {
    const row = document.createElement('tr');
    row.className = 'clickable';
    if (team.isPlayer) row.classList.add('player-team-row');
    row.innerHTML = `<td>${idx+1}</td><td>${team.name}</td><td>${team.power}</td><td>${team.points||0}</td><td>${team.tier}</td>`;
    row.addEventListener('click', () => showTeamRoster(team));
    tbody.appendChild(row);
  });
}

function showTeamRoster(team) {
  const modal = document.getElementById('roster-modal');
  const content = document.getElementById('modal-roster-content');
  let html = `<h3>${team.name}</h3><div style="display:flex; gap:10px; flex-wrap:wrap;">`;
  team.players.forEach(pid => {
    const p = allPlayers.find(x => x.id === pid);
    if (p) {
      html += `<div class="player-card" style="cursor:pointer;">
        <div class="player-flag">${p.flag||'🏳️'}</div>
        <div class="player-nick">${p.nick}</div>
        <div>${p.assignedRole||p.bestRole}</div>
      </div>`;
    }
  });
  html += '</div>';
  content.innerHTML = html;
  content.querySelectorAll('.player-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const nick = card.querySelector('.player-nick').textContent;
      const player = allPlayers.find(p => p.nick === nick);
      if (player) showPlayerModal(player);
    });
  });
  modal.classList.remove('hidden');
}

// Закрытие модалок
document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', () => btn.closest('.modal').classList.add('hidden'));
});

// ========== ИНИЦИАЛИЗАЦИЯ СТРАНИЦЫ ==========
document.addEventListener('DOMContentLoaded', () => {
  const savedPlayer = localStorage.getItem(STORAGE_KEY);
  if (savedPlayer) {
    try {
      playerTeam = JSON.parse(savedPlayer);
    } catch (e) {
      playerTeam = null;
      localStorage.removeItem(STORAGE_KEY);
    }
    if (!loadData()) {
      generateAllData();
    } else {
      const pt = allTeams.find(t => t.isPlayer);
      if (pt) {
        pt.players = playerTeam.players;
        recalcTeamPower(pt);
      }
    }
    showScreen('screen-dashboard');
    renderDashboard();
  } else {
    showScreen('screen-create');
  }

  // Форма создания команды
  document.getElementById('create-form').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Форма отправлена');
    const name = document.getElementById('team-name').value.trim();
    const tag = document.getElementById('team-tag').value.trim();
    const region = document.getElementById('region').value;
    const difficultyEl = document.querySelector('input[name="difficulty"]:checked');
    const diff = difficultyEl ? difficultyEl.value : 'easy';
    const balance = { easy: 15000, medium: 10000, hard: 5000 }[diff];
    const avatarInput = document.getElementById('team-avatar');
    const avatarImg = document.getElementById('avatar-img');
    let avatarDataUrl = null;
    if (avatarInput && avatarImg && avatarImg.src && avatarImg.src !== '' && !avatarImg.src.endsWith('#')) {
      avatarDataUrl = avatarImg.src;
    }

    if (!name || !tag || !region) {
      alert('Заполните все поля');
      return;
    }
    if (tag.length < 2 || tag.length > 5) {
      alert('Тег должен быть от 2 до 5 символов');
      return;
    }

    playerTeam = {
      name,
      tag,
      region,
      balance,
      avatarDataUrl,
      date: 'Январь 2026',
      players: []
    };

    const success = generateAllData();
    if (!success) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(playerTeam));
    showScreen('screen-dashboard');
    renderDashboard();
  });

  // Навигация
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });
  document.getElementById('btn-add-player').addEventListener('click', () => switchView('market'));

  // Рынок фильтры
  ['market-search','market-region-filter','market-role-filter','market-tier-filter'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', refreshMarket);
      el.addEventListener('change', refreshMarket);
    }
  });

  const regionSelect = document.getElementById('region-select');
  if (regionSelect) regionSelect.addEventListener('change', refreshRatingTable);

  document.getElementById('btn-reset').addEventListener('click', () => {
    if (confirm('Сбросить весь прогресс?')) {
      localStorage.clear();
      location.reload();
    }
  });

  // Превью аватарки
  const teamAvatarInput = document.getElementById('team-avatar');
  if (teamAvatarInput) {
    teamAvatarInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = ev => {
          const preview = document.getElementById('avatar-preview');
          const img = document.getElementById('avatar-img');
          img.src = ev.target.result;
          preview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
      }
    });
  }
});

function switchView(view) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));
  const viewEl = document.getElementById(`view-${view}`);
  if (viewEl) viewEl.classList.add('active-view');
  if (view === 'market') refreshMarket();
  if (view === 'ratings') refreshRatingTable();
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  const screenEl = document.getElementById(id);
  if (screenEl) screenEl.classList.remove('hidden');
    }
