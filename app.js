const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      monsterMaxHealth: 100,
      monsterHealth: null,
      playerMaxHealth: 100,
      playerHealth: null,
      battleLog: [],
      round: 1,
      specialAttackRoundCount: 0,
      isSpecialAttackLoading: true
    }
  },
  methods: {
    basicAttack() {
      const damageDealt = getRandomValue(5, 12);
      this.monsterHealth -= damageDealt;
      this.nextTurn('basic attack', damageDealt);
    },
    specialAttack() {
      const damageDealt = getRandomValue(10, 25);
      this.monsterHealth -= damageDealt;
      this.isSpecialAttackLoading = true;
      this.specialAttackRoundCount = -1;
      this.nextTurn('special attack', damageDealt);
    },
    heal() {
      const healedValue = getRandomValue(5, 20);
      this.playerHealth = (this.playerHealth >= (this.playerMaxHealth - healedValue))
        ? 100
        : this.playerHealth + healedValue;
      this.nextTurn('heal', healedValue);
    },
    surrender() {
      this.playerHealth = 0;
    },
    monsterAttack() {
      const damageDealt = getRandomValue(8, 15);
      this.playerHealth -= damageDealt;
      return damageDealt;
    },
    startNewGame() {
      this.monsterHealth = this.monsterMaxHealth;
      this.playerHealth = this.playerMaxHealth;
      this.round = 1;
      this.battleLog = [];
    },
    nextTurn(action, amount) {
      this.battleLog.unshift({
        who: 'Player',
        action: action,
        text: (action === 'heal') ? 'heals himself for': 'attacks and deals',
        amount: amount
      });

      if (!this.isGameOver) {
        this.battleLog.unshift({
          who: 'Monster',
          action: 'basic attack',
          text: 'attacks and deals',
          amount: this.monsterAttack()
        });
      };

      this.round++;
    }
  },
  computed: {
    monsterHealthBar() {
      return (this.monsterHealth > 0) ? `${this.monsterHealth}%` : 0;
    },
    playerHealthBar() {
      return (this.playerHealth > 0) ? `${this.playerHealth}%` : 0;
    },
    gameStatus() {
      return (this.monsterHealth > 0) ? 'You lost!' : 'You won!';
    },
    isGameOver() {
      return (this.playerHealth <= 0 || this.monsterHealth <= 0);
    }
  },
  watch: {
    round(newRound) {
      if (newRound > 0) {
        this.specialAttackRoundCount++;

        if (this.specialAttackRoundCount >= 2) this.isSpecialAttackLoading = false;
      };
    }
  },
  mounted() {
    this.monsterHealth = this.monsterMaxHealth;
    this.playerHealth = this.playerMaxHealth;
  }
});

app.mount('#game');