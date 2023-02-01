const app = Vue.createApp({
  data() {
    return {
      isGameRunning: true,
      monsterHealth: 100,
      playerHealth: 100,
      battleLog: [],
      turn: 1
    }
  },
  methods: {
    basicAttack() {
      this.monsterHealth = this.monsterHealth - 10;
      this.turn++;
    },
    specialAttack() {
      this.monsterHealth = this.monsterHealth - 16;
      this.turn++;
    },
    heal() {
      (this.playerHealth >= 90)
        ? this.playerHealth = 100
        : this.playerHealth + 10;
      this.turn++;
    },
    surrender() {
      this.playerHealth = 0;
      this.isGameRunning = false;
    },
    monsterAttack() {
      const damageDealt = Math.floor(Math.random(1) * 20) + 1;
      this.playerHealth = this.playerHealth - damageDealt;
      return damageDealt;
    },
    startNewGame() {
      this.isGameRunning = true;
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.turn = 1;
      this.battleLog = [];
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
    reversedBattleLog() {
      return this.battleLog.reverse();
    }
  },
  watch: {
    turn() {
      if (this.turn !== 1) {
        this.battleLog.push('Player atacks and deals 10');
        if (this.monsterHealth > 0) {
          this.battleLog.push(`Monster atacks and deals ${this.monsterAttack()}`);
        }
      }
    }
  }
});

app.mount('body');