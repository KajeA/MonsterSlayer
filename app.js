new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [],
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },

        light: function()  {
            // player damage
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'You hit the Monster with a light attack for ' + damage + ' damage'
            });
            if (this.checkVictory()) {
                return;
            }

            this.monsterAttack();
        },

        heavy: function() {
            // player damage
            damage = this.calculateDamage(7, 18);
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: 'You hit the Monster with a heavy attack for ' + damage + ' damage'
            });
            if (this.checkVictory()) {
                return;
            }
            this.monsterAttack();
        },

        heal: function() {
            if (this.playerHealth >= 50 && this.playerHealth <= 90) {
                var heal = 7;
                this.playerHealth += heal;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'You drink a lesser potion and heal ' + heal + ' HP'
                });
            } else if (this.playerHealth <= 50) {
                var heal = 10;
                this.playerHealth += heal;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'You drink a greater potion and heal ' + heal + ' HP'
                });
            } else {
                this.playerHealth = 100
                this.turns.unshift({
                    isPlayer: true,
                    text: 'The potion has no effect'
                });
            }
            this.monsterAttack();
        },

        quit: function() {
            this.gameIsRunning = false
        },

        monsterAttack: function() {
            var damage = this.calculateDamage(5, 16);
            this.playerHealth -= damage;
            this.checkVictory();
            this.turns.unshift({
                isPlayer: false,
                text: 'The monster attacks you for ' + damage + ' damage'
            });
        },

        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },

        checkVictory: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('You are victorious! New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return;
            } else if (this.playerHealth <= 0) {
                if (confirm('You have been slain! New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});