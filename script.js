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

// Страны по регионам
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

// Флаги
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

// Словари для названий команд
const firstParts = [
  'Cyber','Shadow','Storm','Frost','Thunder','Neon','Void','Quantum',
  'Apex','Omega','Titan','Phantom','Inferno','Eclipse','Horizon','Nova',
  'Blitz','Rage','Chaos','Zenith','Crystal','Blaze','Venom','Fusion',
  'Pulse','Drift','Hive','Prism','Oblivion','Hyper','Ultra','Zero',
  'Nitro','Solar','Lunar','Astral','Dark','Light','Iron','Steel',
  'Crimson','Azure','Onyx','Jade','Cobalt','Amber','Violet','Silver',
  'Atomic','Turbo','Rapid','Silent','Deadly','Mystic','Arcane','Divine',
  'Rising','Fallen','Wicked','Savage','Royal','Imperial','Rebel','Elite',
  'Vector','Matrix','Binary','Digital','Core','Flux','Particle','Wave'
];

const secondParts = [
  'Esports','Gaming','Squad','Elite','Legion','Empire','Union','Crew',
  'Army','Force','Clan','Alliance','Team','Kings','Warriors','Gladiators',
  'Dragons','Wolves','Titans','Panthers','Eagles','Sharks','Hawks','Vipers',
  'Hunters','Raiders','Guardians','Sentinels','Reapers','Ghosts','Ninjas',
  'Samurai','Knights','Berserkers','Mercenaries','Snipers','Strikers',
  'Assassins','Defenders','Invaders','Conquerors','Legends','Mythics',
  'Eternals','Immortals','Phoenix','Thunderbirds','Cyclones','Tornadoes',
  'Avalanches','Tsunamis','Infernos','Blizzards','Earthquakes','Maelstroms',
  'Overlords','Dominators','Annihilators','Exterminators','Punishers',
  'Executioners','Vanquishers','Wardens','Keepers','Watchers','Oracles',
  'Prophets','Mystics','Sorcerers','Warlocks','Alchemists','Artificers',
  'Engineers','Pilots','Astronauts','Cosmonauts','Explorers','Pioneers',
  'Trailblazers','Pathfinders','Wayfarers','Vagabonds','Nomads','Outlaws'
];

const singleWords = [
  'Oblivion','Zenith','Elysium','Nirvana','Odyssey','Nebula','Quasar',
  'Pulsar','Vertex','Axiom','Paradox','Enigma','Cipher','Mirage','Phantom',
  'Spectre','Wraith','Banshee','Revenant','Leviathan','Behemoth','Colossus',
  'Juggernaut','Goliath','Hydra','Chimera','Kraken','Basilisk','Manticore',
  'Cerberus','Minotaur','Cyclops','Titan','Atlas','Hercules','Achilles',
  'Spartan','Trojan','Viking','Ronin','Shogun','Emperor','Pharaoh','Sultan',
  'Czar','Kaiser','Majesty','Monarch','Sovereign','Regent','Overlord',
  'Warlord','Archon','Patriarch','Hierarch','Magnate','Tycoon','Baron',
  'Duke','Count','Viscount','Marquis','Earl','Knight','Paladin','Templar',
  'Inquisitor','Crusader','Exorcist','Prophet','Oracle','Sage','Mystic',
  'Wizard','Sorcerer','Warlock','Necromancer','Pyromancer','Cryomancer',
  'Electromancer','Geomancer','Aeromancer','Hydromancer','Chronomancer',
  'Illusionist','Conjurer','Summoner','Invoker','Evoker','Enchanter',
  'Spellbinder','Runesmith','Glyphmaster','Sigilweaver'
];

/**
 * Генерация уникального названия команды
 * @param {string} region - регион (не используется, для совместимости)
 * @param {Set} existingNames - множество уже занятых имён
 * @returns {string}
 */
function generateRandomTeamName(region, existingNames) {
  let name;
  let attempts = 0;
  const maxAttempts = 1000;

  do {
    const pattern = Math.random();
    if (pattern < 0.4) {
      const p = pickRandom(firstParts);
      const s = pickRandom(secondParts);
      name = `${p} ${s}`;
    } else if (pattern < 0.7) {
      name = pickRandom(singleWords);
    } else {
      const w1 = pickRandom(singleWords);
      let w2;
      do { w2 = pickRandom(singleWords); } while (w2 === w1);
      name = `${w1} ${w2}`;
    }
    attempts++;
    if (attempts >= maxAttempts) {
      name += ' #' + randomInt(1000, 9999);
      break;
    }
  } while (existingNames.has(name));

  existingNames.add(name);
  return name;
}

// Генерация навыка с учётом роли
function generateSkillForRole(role, skillName) {
  const coeff = ROLE_COEFFS[role][skillName];
  let base = Math.random() * 1000;
  base = base * (coeff / 5);
  return Math.min(1000, Math.max(0, Math.round(base)));
}

// Расчёт силы игрока
function calculatePlayerPower(skills, role) {
  const coeffs = ROLE_COEFFS[role];
  let sum = 0;
  for (let skill in coeffs) {
    sum += (skills[skill] || 0) * coeffs[skill];
  }
  return Math.round(sum * 5);
}

// Тир игрока
function getPlayerTier(power) {
  if (power >= 85000) return 'S';
  if (power >= 70000) return 'A';
  if (power >= 50000) return 'B';
  if (power >= 25000) return 'C';
  return 'D';
}

// Создание игрока с заданной целью силы (для топов)
function createTargetPlayer(nick, country, role, targetPower, nameOverride) {
  const skills = {};
  for (let skill in ROLE_COEFFS[role]) skills[skill] = 0;

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
  return {
    id: `player_${Date.now()}_${Math.random().toString(36)}`,
    nick,
    name: nameOverride || nick,
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

// Создание случайного игрока для массовых команд
function createRandomPlayer(region, role, maxPower) {
  const country = pickRandom(COUNTRIES[region]);
  const nick = generateRandomNick();
  const skills = {};
  for (let skill in ROLE_COEFFS[role]) {
    skills[skill] = generateSkillForRole(role, skill);
  }
  let power = calculatePlayerPower(skills, role);
  if (power > maxPower) power = maxPower - randomInt(0, 1000);
  return {
    id: `player_${Date.now()}_${Math.random().toString(36)}`,
    nick,
    name: nick,
    country,
    age: randomInt(16, 30),
    role,
    skills: { ...skills },
    power,
    tier: getPlayerTier(power),
    teamId: null,
    isFreeAgent: false
  };
}

// Случайный ник
function generateRandomNick() {
  return pickRandom(['Pro','Ace','King','Shadow','Storm','Frost','Blitz','Neo','Cyber','Nitro']) +
         pickRandom(['Xs','io','er','max','z','x','Q']) + randomInt(0, 99);
}

// ============== ПРЕДОПРЕДЕЛЁННЫЕ СОСТАВЫ ТОП-24 ==============
function createPredefinedTeams() {
  const predefined = [];
  function addTeam(name, region, playersData) {
    const teamId = `team_${name.replace(/\s/g, '_')}`;
    const team = {
      id: teamId,
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
      player.teamId = teamId;
      allPlayers.push(player);
      team.players.push(player.id);
      totalPower += player.power;
    });
    team.power = totalPower;
    predefined.push(team);
  }

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

// ============== ГЕНЕРАЦИЯ ВСЕХ ДАННЫХ ==============
function generateAllData(playerTeamObj) {
  allPlayers = [];
  allTeams = [];

  // 1. Предопределённые команды
  allTeams.push(...createPredefinedTeams());

  // 2. Генерация случайных команд (до 1040 на регион)
  REGIONS.forEach(region => {
    const existingNames = new Set(allTeams.filter(t => t.region === region).map(t => t.name));
    const predefinedCount = allTeams.filter(t => t.region === region).length;
    // Сколько ещё надо команд (1040 всего, включая предопределённые и команду игрока)
    let totalNeeded = 1040;
    if (playerTeamObj && playerTeamObj.region === region) totalNeeded -= 1; // учтём игрока
    const randomCount = totalNeeded - predefinedCount;

    for (let i = 0; i < randomCount; i++) {
      const teamName = generateRandomTeamName(region, existingNames);
      let targetTeamPower;
      if (i < 10) {
        targetTeamPower = randomInt(210000, 269999); // A
      } else if (i < 100) {
        targetTeamPower = randomInt(150000, 209999); // B
      } else {
        targetTeamPower = randomInt(75000, 149999); // C и D
      }

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
        let maxPlayerPower = remainingPower - (2 - j) * 1000;
        if (maxPlayerPower > 95000) maxPlayerPower = 95000;
        const player = createRandomPlayer(region, role, maxPlayerPower);
        player.teamId = teamId;
        allPlayers.push(player);
        team.players.push(player.id);
        remainingPower -= player.power;
      }
      team.power = allPlayers.filter(p => p.teamId === teamId).reduce((sum, p) => sum + p.power, 0);
      allTeams.push(team);
    }
  });

  // 3. Свободные агенты (по 30 на регион)
  REGIONS.forEach(region => {
    for (let i = 0; i < 30; i++) {
      const role = pickRandom(['Aggressor','Controller','Flex']);
      const country = pickRandom(COUNTRIES[region]);
      const nick = generateRandomNick();
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

  // 4. Команда игрока (заглушка, если нет игроков)
  if (playerTeamObj) {
    const playerTeamEntry = {
      id: 'player',
      name: playerTeamObj.name + ' [' + playerTeamObj.tag + ']',
      region: playerTeamObj.region,
      tier: '?',
      power: 0,
      isPlayer: true,
      isPredefined: false,
      players: playerTeamObj.players || []
    };
    const existingIdx = allTeams.findIndex(t => t.isPlayer);
    if (existingIdx >= 0) allTeams[existingIdx] = playerTeamEntry;
    else allTeams.push(playerTeamEntry);
    recalcPlayerTeamPower();
  }

  allTeams.sort((a, b) => b.power - a.power);
  saveData();
}

function recalcPlayerTeamPower() {
  const playerInAll = allTeams.find(t => t.isPlayer);
  if (playerInAll && playerTeam) {
    const powers = playerInAll.players.map(pid => {
      const p = allPlayers.find(pl => pl.id === pid);
      return p ? p.power : 0;
    });
    playerInAll.power = powers.reduce((a, b) => a + b, 0);
    playerTeam.power = playerInAll.power;
    safeSetItem(STORAGE_KEY, JSON.stringify(playerTeam));
  }
}

// ============== РЫНОК ==============
function hireFreeAgent(playerId) {
  if (!playerTeam) return;
  const agent = allPlayers.find(p => p.id === playerId && p.isFreeAgent);
  if (!agent) return;
  const currentCount = playerTeam.players ? playerTeam.players.length : 0;
  if (currentCount >= 4) {
    alert('Нет свободных слотов!');
    return;
  }
  const cost = 500 + Math.floor(agent.power / 20);
  if (playerTeam.balance < cost) {
    alert(`Недостаточно средств! Нужно ${cost} монет.`);
    return;
  }
  playerTeam.balance -= cost;
  agent.isFreeAgent = false;
  agent.teamId = 'player';
  if (!playerTeam.players) playerTeam.players = [];
  playerTeam.players.push(agent.id);

  const playerInAll = allTeams.find(t => t.isPlayer);
  if (playerInAll) playerInAll.players = playerTeam.players;
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
  const activeView = document.querySelector('.view.active-view');
  if (activeView) {
    if (activeView.id === 'view-market') refreshMarket();
    else if (activeView.id === 'view-ratings') refreshRatingTable();
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
  for (let i = 0; i < 3; i++) {
    const playerId = team.players?.[i];
    if (playerId) {
      const player = allPlayers.find(p => p.id === playerId);
      if (player) {
        container.appendChild(createPlayerCard(player));
        continue;
      }
    }
    const emptyCard = document.createElement('div');
    emptyCard.className = 'player-card empty';
    emptyCard.innerHTML = '<div class="player-avatar-placeholder">+</div><div class="player-name-placeholder">Пустой слот</div>';
    container.appendChild(emptyCard);
  }
  const reserveSlot = document.getElementById('reserve-slot');
  const reservePlayerId = team.players?.[3];
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
  const teamName = player.teamId ? (allTeams.find(t => t.id === player.teamId)?.name || 'Неизвестно') : (player.isFreeAgent ? 'Свободный агент' : 'Нет команды');
  document.getElementById('modal-team').textContent = teamName;
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

function refreshMarket() {
  const region = document.getElementById('market-region-select').value;
  const container = document.getElementById('free-agents-list');
  container.innerHTML = '';
  const agents = allPlayers.filter(p => p.isFreeAgent && COUNTRIES[region].includes(p.country));
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
    btn.addEventListener('click', (e) => hireFreeAgent(e.target.dataset.id));
  });
}

function refreshRatingTable() {
  const region = document.getElementById('region-select').value;
  const tbody = document.getElementById('rating-body');
  tbody.innerHTML = '';
  const teamsToShow = region === 'all' ? allTeams : allTeams.filter(t => t.region === region);
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

  setupEventListeners();
});

function getPlayerTeamFromStorage() {
  const data = safeGetItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

function setupEventListeners() {
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

  document.getElementById('create-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('team-name').value.trim();
    const tag = document.getElementById('team-tag').value.trim();
    const region = document.getElementById('region').value;
    const diff = document.querySelector('input[name="difficulty"]:checked')?.value || 'easy';
    const balance = { easy: 5000, medium: 3000, hard: 1000 }[diff];
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

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });

  document.getElementById('btn-add-player').addEventListener('click', () => switchView('market'));

  document.getElementById('btn-reset').addEventListener('click', () => {
    if (confirm('Сбросить всё?')) {
      localStorage.clear();
      location.reload();
    }
  });

  document.getElementById('market-region-select').addEventListener('change', refreshMarket);
  document.getElementById('region-select').addEventListener('change', refreshRatingTable);

  document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('player-modal').classList.add('hidden');
  });
}

function switchView(viewName) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === viewName));
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));
  const target = document.getElementById(`view-${viewName}`);
  if (target) target.classList.add('active-view');
  if (viewName === 'market') refreshMarket();
  if (viewName === 'ratings') refreshRatingTable();
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(screenId).classList.remove('hidden');
        }
