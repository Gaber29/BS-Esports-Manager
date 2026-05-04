// ============== КОНСТАНТЫ И ДАННЫЕ ==============
const STORAGE_KEY = 'bsTeam';
const TEAMS_STORAGE_KEY = 'bsAllTeams';
const PLAYERS_STORAGE_KEY = 'bsAllPlayers';
const REGIONS = ['EMEA', 'East Asia', 'SA', 'NA'];

// Коэффициенты ролей
const ROLE_COEFFS = {
  Aggressor: { aim: 4.5, aggression: 4.5, reaction: 4.0, positioning: 2.5, gameSense: 2.0, teamwork: 1.5, clutch: 1.0 },
  Controller: { gameSense: 4.5, teamwork: 4.5, positioning: 4.0, aim: 2.5, clutch: 2.0, aggression: 1.5, reaction: 1.0 },
  Flex: { clutch: 3.2, gameSense: 3.0, teamwork: 3.0, aim: 2.8, positioning: 2.8, reaction: 2.6, aggression: 2.6 }
};

// Страны по регионам (упрощённый набор ключевых стран)
const COUNTRIES = {
  EMEA: [
    'Украина','Германия','Испания','Франция','Италия','Польша','Великобритания','Нидерланды','Швеция',
    'Норвегия','Финляндия','Дания','Бельгия','Австрия','Швейцария','Чехия','Румыния','Португалия',
    'Греция','Венгрия','Ирландия','Хорватия','Сербия','Болгария','Словакия','Литва','Латвия','Эстония',
    'Словения','Люксембург','Мальта','Исландия','Кипр','Турция','Израиль','ОАЭ','Саудовская Аравия',
    'Катар','Кувейт','Бахрейн','Оман','Иордания','Ливан','Египет','Марокко','Алжир','Тунис','Нигерия',
    'Гана','Кения','ЮАР','Кот-д\'Ивуар','Камерун','Сенегал','Уганда','Танзания','Эфиопия'
  ],
  'East Asia': ['Япония','Южная Корея'],
  SA: ['Бразилия','Аргентина','Чили','Колумбия','Перу','Уругвай','Парагвай','Эквадор','Боливия','Венесуэла','Гайана','Суринам'],
  NA: ['США','Канада','Мексика','Пуэрто-Рико','Доминиканская Республика','Куба','Ямайка','Гватемала','Гондурас','Сальвадор',
       'Коста-Рика','Панама','Багамы','Тринидад и Тобаго','Барбадос','Никарагуа','Белиз','Гренада','Гаити','Бермуды']
};

// Флаги (эмодзи)
const FLAGS = {
  'Украина':'🇺🇦','Германия':'🇩🇪','Испания':'🇪🇸','Франция':'🇫🇷','Италия':'🇮🇹','Польша':'🇵🇱',
  'Великобритания':'🇬🇧','Нидерланды':'🇳🇱','Швеция':'🇸🇪','Норвегия':'🇳🇴','Финляндия':'🇫🇮',
  'Дания':'🇩🇰','Бельгия':'🇧🇪','Австрия':'🇦🇹','Швейцария':'🇨🇭','Чехия':'🇨🇿','Румыния':'🇷🇴',
  'Португалия':'🇵🇹','Греция':'🇬🇷','Венгрия':'🇭🇺','Ирландия':'🇮🇪','Хорватия':'🇭🇷','Сербия':'🇷🇸',
  'Болгария':'🇧🇬','Словакия':'🇸🇰','Литва':'🇱🇹','Латвия':'🇱🇻','Эстония':'🇪🇪','Словения':'🇸🇮',
  'Люксембург':'🇱🇺','Мальта':'🇲🇹','Исландия':'🇮🇸','Кипр':'🇨🇾','Турция':'🇹🇷','Израиль':'🇮🇱',
  'ОАЭ':'🇦🇪','Саудовская Аравия':'🇸🇦','Катар':'🇶🇦','Кувейт':'🇰🇼','Бахрейн':'🇧🇭','Оман':'🇴🇲',
  'Иордания':'🇯🇴','Ливан':'🇱🇧','Египет':'🇪🇬','Марокко':'🇲🇦','Алжир':'🇩🇿','Тунис':'🇹🇳',
  'Нигерия':'🇳🇬','Гана':'🇬🇭','Кения':'🇰🇪','ЮАР':'🇿🇦','Кот-д\'Ивуар':'🇨🇮','Камерун':'🇨🇲',
  'Сенегал':'🇸🇳','Уганда':'🇺🇬','Танзания':'🇹🇿','Эфиопия':'🇪🇹',
  'Япония':'🇯🇵','Южная Корея':'🇰🇷',
  'Бразилия':'🇧🇷','Аргентина':'🇦🇷','Чили':'🇨🇱','Колумбия':'🇨🇴','Перу':'🇵🇪','Уругвай':'🇺🇾',
  'Парагвай':'🇵🇾','Эквадор':'🇪🇨','Боливия':'🇧🇴','Венесуэла':'🇻🇪','Гайана':'🇬🇾','Суринам':'🇸🇷',
  'США':'🇺🇸','Канада':'🇨🇦','Мексика':'🇲🇽','Пуэрто-Рико':'🇵🇷','Доминиканская Республика':'🇩🇴',
  'Куба':'🇨🇺','Ямайка':'🇯🇲','Гватемала':'🇬🇹','Гондурас':'🇭🇳','Сальвадор':'🇸🇻','Коста-Рика':'🇨🇷',
  'Панама':'🇵🇦','Багамы':'🇧🇸','Тринидад и Тобаго':'🇹🇹','Барбадос':'🇧🇧','Никарагуа':'🇳🇮','Белиз':'🇧🇿',
  'Гренада':'🇬🇩','Гаити':'🇭🇹','Бермуды':'🇧🇲'
};

// Глобальные массивы
let allTeams = [];
let allPlayers = [];
let playerTeam = null;

// Сохранение / загрузка
function safeSetItem(key, value) { try { localStorage.setItem(key, value); } catch(e) {} }
function safeGetItem(key) { try { return localStorage.getItem(key); } catch(e) { return null; } }

// ============== ГЕНЕРАТОРЫ ==============
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Генерация веса для навыка с учётом роли (чем выше коэф, тем выше вероятность высокого значения)
function generateSkillForRole(role, skillName, targetPowerRange) {
  const coeff = ROLE_COEFFS[role][skillName];
  // Базовое распределение: случайно от 0 до 1000, но с повышением вероятности высоких значений
  let base = Math.random() * 1000;
  // Домножаем на коэффициент/5 (чтобы коэф 4.5 давал примерно в 4.5 раза больше шансов на высокое значение)
  base = base * (coeff / 5);
  // Ограничиваем 0-1000
  return Math.min(1000, Math.max(0, Math.round(base)));
}

// Рассчитать общую силу игрока по навыкам
function calculatePlayerPower(skills, role) {
  const coeffs = ROLE_COEFFS[role];
  let sum = 0;
  for (let skill in coeffs) {
    sum += (skills[skill] || 0) * coeffs[skill];
  }
  return Math.round(sum * 5); // максимум около 100000
}

// Определить тир игрока по силе
function getPlayerTier(power) {
  if (power >= 85000) return 'S';
  if (power >= 70000) return 'A';
  if (power >= 50000) return 'B';
  if (power >= 25000) return 'C';
  return 'D';
}

// Создание игрока с заданной целью силы (для топ-команд)
function createTargetPlayer(nick, country, role, targetPower, nameOverride) {
  const skills = {};
  for (let skill in ROLE_COEFFS[role]) {
    skills[skill] = 0;
  }
  // Грубая настройка: итеративно подгоняем навыки
  let currentPower = 0;
  let attempts = 0;
  while (Math.abs(currentPower - targetPower) > 100 && attempts < 200) {
    for (let skill in ROLE_COEFFS[role]) {
      skills[skill] = generateSkillForRole(role, skill);
    }
    currentPower = calculatePlayerPower(skills, role);
    attempts++;
  }
  const power = currentPower;
  const tier = getPlayerTier(power);
  const name = nameOverride || nick; // если имя не указано, используем ник
  return {
    id: `player_${Date.now()}_${Math.random().toString(36)}`,
    nick,
    name,
    country,
    age: randomInt(16, 30),
    role,
    skills: { ...skills },
    power,
    tier,
    teamId: null, // будет назначен позже
    isFreeAgent: false
  };
}

// Создание случайного игрока для генерации массовых команд
function createRandomPlayer(region, role, maxPower) {
  const country = pickRandom(COUNTRIES[region]);
  const nick = generateRandomNick(country);
  const skills = {};
  for (let skill in ROLE_COEFFS[role]) {
    skills[skill] = generateSkillForRole(role, skill);
  }
  let power = calculatePlayerPower(skills, role);
  if (power > maxPower) power = maxPower - randomInt(0, 1000);
  const tier = getPlayerTier(power);
  return {
    id: `player_${Date.now()}_${Math.random().toString(36)}`,
    nick,
    name: nick,
    country,
    age: randomInt(16, 30),
    role,
    skills: { ...skills },
    power,
    tier,
    teamId: null,
    isFreeAgent: false
  };
}

// Генератор случайного ника (упрощённый)
const nickPrefixes = ['Pro', 'Ace', 'King', 'Shadow', 'Storm', 'Frost', 'Blitz', 'Neo', 'Cyber', 'Nitro'];
const nickSuffixes = ['Xs', 'io', 'er', 'max', '99', 'z', 'x', '007', 'Q', 'Z'];
function generateRandomNick() {
  return pickRandom(nickPrefixes) + pickRandom(nickSuffixes) + randomInt(0,99);
}

// ============== ПРЕДОПРЕДЕЛЁННЫЕ СОСТАВЫ ТОП-24 ==============
function createPredefinedTeams() {
  const predefined = [];
  // Вспомогательная функция для добавления команды
  function addTeam(name, region, playersData) {
    const team = {
      id: `team_${name.replace(/\s/g,'_')}`,
      name,
      region,
      tier: 'S',
      power: 0,
      isPlayer: false,
      isPredefined: true,
      players: []
    };
    let totalPower = 0;
    playersData.forEach(pd => {
      const player = createTargetPlayer(pd.nick, pd.country, pd.role, pd.targetPower, pd.name);
      player.teamId = team.id;
      allPlayers.push(player);
      team.players.push(player.id);
      totalPower += player.power;
    });
    team.power = totalPower;
    predefined.push(team);
  }

  // Заполняем топ-24 (сила примерно 270000-300000)
  addTeam('FUT Esports','EMEA',[
    {nick:'Guesti',country:'Украина',role:'Aggressor',targetPower:98000,name:'Mykhaylo Chernov'},
    {nick:'Angelboy',country:'Украина',role:'Flex',targetPower:96000,name:'Yaroslav Labunets'},
    {nick:'Nob?',country:'Армения',role:'Controller',targetPower:95000,name:'Tigran Harutyunyan'}
  ]);
  addTeam('HMBLE','EMEA',[
    {nick:'Symantec',country:'Германия',role:'Aggressor',targetPower:97000,name:'Bekri Tahiri'},
    {nick:'Lukii',country:'Германия',role:'Flex',targetPower:95500},
    {nick:'BosS',country:'Испания',role:'Controller',targetPower:94000}
  ]);
  addTeam('Crazy Raccoon','East Asia',[
    {nick:'Tensai',country:'Япония',role:'Aggressor',targetPower:99000},
    {nick:'Milkreo',country:'Япония',role:'Flex',targetPower:97000},
    {nick:'Moya',country:'Япония',role:'Controller',targetPower:96000}
  ]);
  addTeam('ZETA DIVISION','East Asia',[
    {nick:'Sitetampo',country:'Япония',role:'Aggressor',targetPower:98500},
    {nick:'Battoman',country:'Япония',role:'Flex',targetPower:96500},
    {nick:'Sizuku',country:'Япония',role:'Controller',targetPower:95500}
  ]);
  addTeam('Tribe Gaming','NA',[
    {nick:'Diegogamer',country:'Мексика',role:'Aggressor',targetPower:97500},
    {nick:'Lxffy',country:'Пуэрто-Рико',role:'Flex',targetPower:96000},
    {nick:'RBM',country:'Мексика',role:'Controller',targetPower:95000}
  ]);
  addTeam('Team Elektros','NA',[
    {nick:'Snoiy',country:'Канада',role:'Aggressor',targetPower:97000},
    {nick:'Memen',country:'Мексика',role:'Flex',targetPower:95500},
    {nick:'Doin',country:'Южная Корея',role:'Controller',targetPower:94000}
  ]);
  addTeam('Only Realm','NA',[
    {nick:'bobby',country:'Канада',role:'Aggressor',targetPower:96500},
    {nick:'Patchy',country:'США',role:'Flex',targetPower:95000},
    {nick:'Sans',country:'США',role:'Controller',targetPower:93500}
  ]);
  addTeam('Bounty Hunters Esports','SA',[
    {nick:'Portox',country:'Аргентина',role:'Aggressor',targetPower:97000},
    {nick:'Prozy',country:'Перу',role:'Flex',targetPower:95500},
    {nick:'Wesley',country:'Бразилия',role:'Controller',targetPower:94000}
  ]);
  addTeam('Eternal Esports','SA',[
    {nick:'CaueBR',country:'Бразилия',role:'Aggressor',targetPower:96500},
    {nick:'Jubileu',country:'Бразилия',role:'Flex',targetPower:95000},
    {nick:'Mohtep',country:'Бразилия',role:'Controller',targetPower:93500}
  ]);
  addTeam('Team Heretics','EMEA',[
    {nick:'iKaoss',country:'Испания',role:'Aggressor',targetPower:96000},
    {nick:'Marco',country:'Италия',role:'Flex',targetPower:94500},
    {nick:'Subeme',country:'Италия',role:'Controller',targetPower:93000}
  ]);
  addTeam('NAVI','EMEA',[
    {nick:'Drage',country:'Великобритания',role:'Aggressor',targetPower:95500},
    {nick:'Enraged',country:'Великобритания',role:'Flex',targetPower:94000},
    {nick:'GeRo',country:'Польша',role:'Controller',targetPower:92500}
  ]);
  addTeam('SKCALALAS EA','East Asia',[
    {nick:'Ghost T',country:'Япония',role:'Aggressor',targetPower:95000},
    {nick:'Kuru',country:'Япония',role:'Flex',targetPower:93500},
    {nick:'Naipishu',country:'Япония',role:'Controller',targetPower:92000}
  ]);
  addTeam('LOUD','SA',[
    {nick:'Edinho',country:'Бразилия',role:'Aggressor',targetPower:95000},
    {nick:'FireCrow',country:'Бразилия',role:'Flex',targetPower:93500},
    {nick:'KaioDog',country:'Бразилия',role:'Controller',targetPower:92000}
  ]);
  addTeam('Vatic','NA',[
    {nick:'Belal',country:'США',role:'Aggressor',targetPower:94500},
    {nick:'Duckie',country:'США',role:'Flex',targetPower:93000},
    {nick:'Ezlivi',country:'США',role:'Controller',targetPower:91500}
  ]);
  addTeam('SK Gaming','EMEA',[
    {nick:'Nowy297',country:'Польша',role:'Aggressor',targetPower:94000},
    {nick:'Ope',country:'Франция',role:'Flex',targetPower:92500},
    {nick:'Yoshi',country:'Испания',role:'Controller',targetPower:91000}
  ]);
  addTeam('Reply Totem','EMEA',[
    {nick:'Joker',country:'Германия',role:'Aggressor',targetPower:93500},
    {nick:'Maru',country:'Италия',role:'Flex',targetPower:92000},
    {nick:'Maury',country:'Италия',role:'Controller',targetPower:90500}
  ]);
  addTeam('FENNEL','East Asia',[
    {nick:'Achapi',country:'Япония',role:'Aggressor',targetPower:93000},
    {nick:'I see',country:'Япония',role:'Flex',targetPower:91500},
    {nick:'Ken-G',country:'Япония',role:'Controller',targetPower:90000}
  ]);
  addTeam('SKCALALAS','SA',[
    {nick:'Kristian',country:'Чили',role:'Aggressor',targetPower:92500},
    {nick:'Pekka',country:'Бразилия',role:'Flex',targetPower:91000},
    {nick:'Rhz',country:'Чили',role:'Controller',targetPower:89500}
  ]);
  addTeam('REJECT','East Asia',[
    {nick:'Levi',country:'Япония',role:'Aggressor',targetPower:92000},
    {nick:'Melty',country:'Япония',role:'Flex',targetPower:90500},
    {nick:'Shu',country:'Япония',role:'Controller',targetPower:89000}
  ]);
  addTeam('Big Talents','EMEA',[
    {nick:'Dompe',country:'Испания',role:'Aggressor',targetPower:91500},
    {nick:'Mine',country:'Польша',role:'Flex',targetPower:90000},
    {nick:'Nes',country:'Франция',role:'Controller',targetPower:88500}
  ]);
  addTeam('NOVO Esports','EMEA',[
    {nick:'Filippo',country:'Италия',role:'Aggressor',targetPower:91000},
    {nick:'MeOw',country:'Польша',role:'Flex',targetPower:89500},
    {nick:'Terry',country:'Южная Корея',role:'Controller',targetPower:88000}
  ]);
  addTeam('STMN','NA',[
    {nick:'Juan Carlos',country:'Мексика',role:'Aggressor',targetPower:90500},
    {nick:'PaiN',country:'Мексика',role:'Flex',targetPower:89000},
    {nick:'Tacos',country:'Мексика',role:'Controller',targetPower:87500}
  ]);
  addTeam('Vic Day','NA',[
    {nick:'Chino',country:'США',role:'Aggressor',targetPower:90000},
    {nick:'Vegeta',country:'Канада',role:'Flex',targetPower:88500},
    {nick:'OG',country:'Канада',role:'Controller',targetPower:87000}
  ]);
  addTeam('Real Madrid','EMEA',[
    {nick:'Rup',country:'Испания',role:'Aggressor',targetPower:89500},
    {nick:'Yoko',country:'Франция',role:'Flex',targetPower:88000},
    {nick:'Jusorange',country:'Франция',role:'Controller',targetPower:86500}
  ]);
  return predefined;
}

// ============== ГЕНЕРАЦИЯ ОСТАЛЬНЫХ КОМАНД И ИГРОКОВ ==============
function generateAllData(playerTeamObj) {
  allPlayers = [];
  allTeams = [];

  // 1. Предопределённые команды
  allTeams.push(...createPredefinedTeams());

  // 2. Генерация остальных команд (до 1040 на регион)
  REGIONS.forEach(region => {
    const predefinedCount = allTeams.filter(t => t.region === region).length;
    const totalNeeded = playerTeamObj && playerTeamObj.region === region ? 1040 : 1040; // ровно 1040 команд в регионе
    const randomCount = totalNeeded - predefinedCount - (playerTeamObj && playerTeamObj.region === region ? 1 : 0);
    
    for (let i = 0; i < randomCount; i++) {
      const teamName = generateRandomTeamName(region);
      // определим тир команды в зависимости от её порядкового номера (примерно)
      let targetTeamPower;
      if (i < 10) { // 10 команд уровня A
        targetTeamPower = randomInt(210000, 269999);
      } else if (i < 100) { // 90 команд B
        targetTeamPower = randomInt(150000, 209999);
      } else {
        targetTeamPower = randomInt(75000, 149999); // C и D
      }
      // Создаём трёх игроков (roles: Aggr, Flex, Contr)
      const roles = ['Aggressor','Flex','Controller'];
      const teamId = `team_rnd_${region}_${i}`;
      const team = {
        id: teamId,
        name: teamName,
        region,
        tier: targetTeamPower >= 210000 ? 'A' : (targetTeamPower >= 150000 ? 'B' : (targetTeamPower >= 75000 ? 'C' : 'D')),
        power: 0,
        isPlayer: false,
        isPredefined: false,
        players: []
      };
      let remainingPower = targetTeamPower;
      for (let j = 0; j < 3; j++) {
        const role = roles[j];
        let maxPlayerPower = remainingPower - (2-j)*1000; // чтобы суммарно вышла targetTeamPower
        if (maxPlayerPower > 95000) maxPlayerPower = 95000;
        const player = createRandomPlayer(region, role, maxPlayerPower);
        player.teamId = teamId;
        allPlayers.push(player);
        team.players.push(player.id);
        remainingPower -= player.power;
      }
      team.power = allPlayers.filter(p => p.teamId === teamId).reduce((sum,p)=>sum+p.power,0);
      allTeams.push(team);
    }
  });

  // 3. Свободные агенты (F/A) по регионам
  const freeAgentCount = 30; // по 30 на регион
  REGIONS.forEach(region => {
    for (let i = 0; i < freeAgentCount; i++) {
      const role = pickRandom(['Aggressor','Controller','Flex']);
      const country = pickRandom(COUNTRIES[region]);
      const nick = generateRandomNick(country);
      const skills = {};
      for (let skill in ROLE_COEFFS[role]) skills[skill] = generateSkillForRole(role, skill);
      const power = calculatePlayerPower(skills, role);
      allPlayers.push({
        id: `fa_${region}_${i}`,
        nick,
        name: nick,
        country,
        age: randomInt(16, 30),
        role,
        skills,
        power,
        tier: getPlayerTier(power),
        teamId: null,
        isFreeAgent: true
      });
    }
  });

  // 4. Если есть команда игрока, добавляем её в allTeams (пока без игроков)
  if (playerTeamObj) {
    const playerTeamEntry = {
      id: 'player',
      name: playerTeamObj.name + ' [' + playerTeamObj.tag + ']',
      region: playerTeamObj.region,
      tier: '?',
      power: 0,
      isPlayer: true,
      isPredefined: false,
      players: playerTeamObj.players || [] // ссылки на id игроков
    };
    // Добавим в allTeams (может уже быть, проверим)
    const existingIdx = allTeams.findIndex(t => t.isPlayer);
    if (existingIdx >= 0) allTeams[existingIdx] = playerTeamEntry;
    else allTeams.push(playerTeamEntry);
    // Обновим силу
    recalcPlayerTeamPower();
  }

  // Сортируем allTeams по убыванию силы
  allTeams.sort((a,b) => b.power - a.power);
  saveData();
}

function recalcPlayerTeamPower() {
  const playerTeamInAll = allTeams.find(t => t.isPlayer);
  if (playerTeamInAll) {
    const powers = playerTeamInAll.players.map(pid => {
      const p = allPlayers.find(pl => pl.id === pid);
      return p ? p.power : 0;
    });
    playerTeamInAll.power = powers.reduce((a,b)=>a+b,0);
    // Обновим также playerTeam глобальный объект
    if (playerTeam) {
      playerTeam.power = playerTeamInAll.power;
      safeSetItem(STORAGE_KEY, JSON.stringify(playerTeam));
    }
  }
}

// ============== ЛОГИКА РЫНКА ==============
function hireFreeAgent(playerId) {
  if (!playerTeam) return;
  const agent = allPlayers.find(p => p.id === playerId && p.isFreeAgent);
  if (!agent) return;
  // Проверяем, есть ли свободный слот (основа 3, запас 1)
  const currentCount = playerTeam.players ? playerTeam.players.length : 0;
  if (currentCount >= 4) {
    alert('Нет свободных слотов! Освободите место.');
    return;
  }
  // Цена: базовая 500 + сила/20 монет
  const cost = 500 + Math.floor(agent.power / 20);
  if (playerTeam.balance < cost) {
    alert(`Недостаточно средств! Нужно ${cost} монет.`);
    return;
  }
  playerTeam.balance -= cost;
  // Добавляем игрока в команду
  agent.isFreeAgent = false;
  agent.teamId = 'player';
  if (!playerTeam.players) playerTeam.players = [];
  playerTeam.players.push(agent.id);
  // Обновляем allTeams
  const playerTeamInAll = allTeams.find(t => t.isPlayer);
  if (playerTeamInAll) playerTeamInAll.players = playerTeam.players;
  recalcPlayerTeamPower();
  safeSetItem(STORAGE_KEY, JSON.stringify(playerTeam));
  saveData();
  refreshUI();
}

// ============== СОХРАНЕНИЕ / ЗАГРУЗКА ==============
function saveData() {
  safeSetItem(TEAMS_STORAGE_KEY, JSON.stringify(allTeams));
  safeSetItem(PLAYERS_STORAGE_KEY, JSON.stringify(allPlayers));
}

function loadData() {
  const teamsData = safeGetItem(TEAMS_STORAGE_KEY);
  const playersData = safeGetItem(PLAYERS_STORAGE_KEY);
  if (teamsData && playersData) {
    allTeams = JSON.parse(teamsData);
    allPlayers = JSON.parse(playersData);
    return true;
  }
  return false;
}

// ============== UI ==============
function refreshUI() {
  if (!playerTeam) return;
  renderDashboard(playerTeam);
  // Если активен рынок или рейтинг, обновить их
  const activeView = document.querySelector('.view.active-view');
  if (activeView) {
    const viewId = activeView.id;
    if (viewId === 'view-market') refreshMarket();
    else if (viewId === 'view-ratings') refreshRatingTable();
  }
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

  renderRoster(team);
}

function renderRoster(team) {
  const container = document.getElementById('roster-main');
  container.innerHTML = '';
  // Показываем три слота основы
  for (let i = 0; i < 3; i++) {
    const playerId = team.players ? team.players[i] : null;
    if (playerId) {
      const player = allPlayers.find(p => p.id === playerId);
      if (player) {
        container.appendChild(createPlayerCard(player));
        continue;
      }
    }
    // Пустой слот
    const emptyCard = document.createElement('div');
    emptyCard.className = 'player-card empty';
    emptyCard.innerHTML = '<div class="player-avatar-placeholder">+</div><div class="player-name-placeholder">Пустой слот</div>';
    container.appendChild(emptyCard);
  }
  // Запасной слот
  const reserveSlot = document.getElementById('reserve-slot');
  const reservePlayerId = team.players ? team.players[3] : null;
  if (reservePlayerId) {
    const player = allPlayers.find(p => p.id === reservePlayerId);
    if (player) {
      reserveSlot.innerHTML = '';
      reserveSlot.appendChild(createPlayerCard(player));
    }
  } else {
    reserveSlot.innerHTML = '<div class="player-avatar-placeholder">+</div><div class="player-name-placeholder">Запасной слот</div>';
  }
}

function createPlayerCard(player) {
  const card = document.createElement('div');
  card.className = 'player-card';
  const flag = FLAGS[player.country] || '🏳️';
  card.innerHTML = `
    <div class="player-flag">${flag}</div>
    <div class="player-nick">${player.nick}</div>
    <div class="player-role">${player.role}</div>
  `;
  card.addEventListener('click', (e) => {
    e.stopPropagation();
    showPlayerModal(player);
  });
  return card;
}

function showPlayerModal(player) {
  document.getElementById('modal-nick').textContent = player.nick;
  document.getElementById('modal-name').textContent = player.name;
  document.getElementById('modal-country').textContent = `${FLAGS[player.country]||''} ${player.country}`;
  document.getElementById('modal-age').textContent = player.age;
  document.getElementById('modal-role').textContent = player.role;
  document.getElementById('modal-tier').textContent = player.tier;
  const team = player.teamId ? (allTeams.find(t => t.id === player.teamId)?.name || 'Неизвестно') : (player.isFreeAgent ? 'Свободный агент' : 'Нет команды');
  document.getElementById('modal-team').textContent = team;
  document.getElementById('skill-aim').textContent = player.skills.aim;
  document.getElementById('skill-reaction').textContent = player.skills.reaction;
  document.getElementById('skill-gameSense').textContent = player.skills.gameSense;
  document.getElementById('skill-teamwork').textContent = player.skills.teamwork;
  document.getElementById('skill-positioning').textContent = player.skills.positioning;
  document.getElementById('skill-clutch').textContent = player.skills.clutch;
  document.getElementById('skill-aggression').textContent = player.skills.aggression;
  document.getElementById('modal-power').textContent = player.power;
  document.getElementById('player-modal').classList.remove('hidden');
}

// Рынок
function refreshMarket() {
  const region = document.getElementById('market-region-select').value;
  const container = document.getElementById('free-agents-list');
  container.innerHTML = '';
  const agents = allPlayers.filter(p => p.isFreeAgent && (region === 'all' || COUNTRIES[region].includes(p.country)));
  agents.forEach(agent => {
    const card = document.createElement('div');
    card.className = 'agent-card';
    card.innerHTML = `
      <div><strong>${FLAGS[agent.country]||''} ${agent.nick}</strong> (${agent.role})</div>
      <div>Сила: ${agent.power}</div>
      <div>Возраст: ${agent.age}</div>
      <button class="btn btn-small btn-primary hire-btn" data-id="${agent.id}">Нанять (${500+Math.floor(agent.power/20)} м.)</button>
    `;
    container.appendChild(card);
  });
  document.querySelectorAll('.hire-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      hireFreeAgent(id);
    });
  });
}

// Рейтинг
function refreshRatingTable() {
  const region = document.getElementById('region-select').value;
  const tbody = document.getElementById('rating-body');
  tbody.innerHTML = '';
  let teamsToShow = allTeams;
  if (region !== 'all') teamsToShow = allTeams.filter(t => t.region === region);
  teamsToShow.forEach((team, index) => {
    const row = document.createElement('tr');
    if (team.isPlayer) row.classList.add('player-team-row');
    row.innerHTML = `<td>${index+1}</td><td>${team.name}</td><td>${team.power}</td><td>${team.tier}</td>`;
    tbody.appendChild(row);
  });
}

// ============== ИНИЦИАЛИЗАЦИЯ ==============
document.addEventListener('DOMContentLoaded', () => {
  playerTeam = getPlayerTeamFromStorage();

  if (!loadData()) {
    generateAllData(playerTeam);
  } else if (playerTeam) {
    // Обновляем команду игрока в allTeams
    const playerInAll = allTeams.find(t => t.isPlayer);
    if (playerInAll) {
      playerInAll.players = playerTeam.players;
      recalcPlayerTeamPower();
    }
  }

  if (playerTeam) {
    showScreen('screen-dashboard');
    renderDashboard(playerTeam);
  } else {
    showScreen('screen-create');
  }

  // Обработчики...
  setupEventListeners();
});

function getPlayerTeamFromStorage() {
  const data = safeGetItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

function setupEventListeners() {
  // Превью аватарки
  document.getElementById('team-avatar').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      document.getElementById('avatar-img').src = event.target.result;
      document.getElementById('avatar-preview').classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  });

  // Создание команды
  document.getElementById('create-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('team-name').value.trim();
    const tag = document.getElementById('team-tag').value.trim();
    const region = document.getElementById('region').value;
    const diff = document.querySelector('input[name="difficulty"]:checked')?.value || 'easy';
    const balance = { easy:5000, medium:3000, hard:1000 }[diff];
    const avatar = document.getElementById('avatar-img').src || null;

    if (!name || !tag || !region) return alert('Заполните все поля');
    if (tag.length < 2 || tag.length > 5) return alert('Тег от 2 до 5 символов');

    playerTeam = {
      name, tag, region, difficulty: diff, balance,
      avatarDataUrl: avatar,
      startDate: '01.01.2026',
      power: 0,
      players: []
    };
    safeSetItem(STORAGE_KEY, JSON.stringify(playerTeam));
    generateAllData(playerTeam);
    showScreen('screen-dashboard');
    renderDashboard(playerTeam);
  });

  // Навигация
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchView(btn.dataset.view);
    });
  });

  document.getElementById('btn-add-player').addEventListener('click', () => {
    switchView('market');
  });

  // Сброс
  document.getElementById('btn-reset').addEventListener('click', () => {
    if (confirm('Сбросить всё?')) {
      localStorage.clear();
      location.reload();
    }
  });

  // Рынок переключение региона
  document.getElementById('market-region-select').addEventListener('change', refreshMarket);

  // Рейтинг переключение региона
  document.getElementById('region-select').addEventListener('change', refreshRatingTable);

  // Закрытие модалки
  document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('player-modal').classList.add('hidden');
  });
}

function switchView(viewName) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === viewName));
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));
  document.getElementById(`view-${viewName}`).classList.add('active-view');
  if (viewName === 'market') refreshMarket();
  if (viewName === 'ratings') refreshRatingTable();
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(screenId).classList.remove('hidden');
    }
