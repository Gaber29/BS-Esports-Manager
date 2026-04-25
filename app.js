// Подключение UI к движку
const uiManager = {
    showScreen: function(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(`screen-${screenId}`).classList.add('active');
        this.updateData();
    },

    updateData: function() {
        // Обновление топ-бара
        document.getElementById('ui-date').innerText = `День ${gameEngine.day} / Месяц ${gameEngine.month} / ${gameEngine.year}`;
        document.getElementById('ui-budget').innerText = `Бюджет: $${gameEngine.playerTeam.budget}`;
        document.getElementById('ui-points').innerText = `BSC Points: ${gameEngine.playerTeam.bscPoints}`;

        this.renderMarket();
        this.renderRoster();
    },

    renderMarket: function() {
        const list = document.getElementById('market-list');
        list.innerHTML = '';
        gameEngine.market.forEach((p, idx) => {
            list.innerHTML += `
                <div class="card">
                    <h3>${p.name}</h3>
                    <p>Возраст: ${p.age} | Оценка: ${p.overall}</p>
                    <p>Зарплата: $${p.salary}</p>
                    <button onclick="gameEngine.signPlayer(${idx})">Подписать контракт</button>
                </div>
            `;
        });
    },

    renderRoster: function() {
        const list = document.getElementById('roster-list');
        list.innerHTML = '';
        if (gameEngine.playerTeam.roster.length === 0) {
            list.innerHTML = '<p class="text-muted">В команде пока нет игроков. Зайдите в Трансферы.</p>';
            return;
        }
        gameEngine.playerTeam.roster.forEach(p => {
            list.innerHTML += `
                <div class="card">
                    <h3>${p.name}</h3>
                    <p>Возраст: ${p.age} | OVR: ${p.overall}</p>
                    <p>Мораль: ${p.morale}%</p>
                </div>
            `;
        });
    },

    addNews: function(text) {
        const feed = document.getElementById('news-feed');
        const p = document.createElement('p');
        p.innerText = text;
        feed.prepend(p); // Новые сообщения сверху
    }
};

// Базовая заглушка движка для примера (сюда интегрируется код из прошлого ответа)
const gameEngine = {
    day: 1, month: 1, year: 2026,
    playerTeam: { name: "PARALLAX Gaming", budget: 50000, bscPoints: 0, roster: [] },
    market: [
        { name: "Sitetampo", age: 19, overall: 94, salary: 4500, morale: 100 },
        { name: "Tensai", age: 21, overall: 92, salary: 4200, morale: 100 },
        { name: "Symantec", age: 23, overall: 85, salary: 3100, morale: 100 }
    ],

    advanceDay: function() {
        this.day++;
        if (this.day > 30) {
            this.day = 1;
            this.month++;
            uiManager.addNews(`📅 Начался месяц ${this.month}! Списаны зарплаты.`);
        }
        
        // Рандомное событие для теста
        if(Math.random() > 0.8) {
            uiManager.addNews("🔥 ИИ провел трансферы на рынке!");
        }

        uiManager.updateData();
    },

    signPlayer: function(index) {
        const player = this.market[index];
        if (this.playerTeam.roster.length >= 5) {
            alert("Лимит игроков в команде (5)!");
            return;
        }
        if (this.playerTeam.budget >= player.salary) {
            this.playerTeam.budget -= player.salary;
            this.playerTeam.roster.push(player);
            this.market.splice(index, 1);
            uiManager.addNews(`✅ Подписан игрок: ${player.name}`);
            uiManager.updateData();
        } else {
            alert("Недостаточно бюджета!");
        }
    }
};

// Инициализация при загрузке
window.onload = () => {
    uiManager.updateData();
};

