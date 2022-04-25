new Vue({
    el: '#app',

    data:{
       running:false,
       playerHp: 100,
       monsterHp:100,
       logs: []
    },
    computed:{
        hasResult(){
            return this.playerHp == 0 || this.monsterHp == 0
        }
    },
    methods: {
        startGame(){
            this.running = true,
            this.playerHp = 100,
            this.monsterHp = 100,
            this.logs = []
        },

        attack(ultimate){
          this.damage('playerHp',7,12,ultimate,'Jogador','Monstro', 'player')
          if(this.monsterHp >0){
            this.damage('monsterHp',5,10,ultimate,'Monstro','Jogador','monster')
            }
        },

        damage(atr,min,max,ultimate,source,target,classe){
        const plus = ultimate ? 5 : 0
        const damage = this.getRandom(min + plus, max + plus)
        this[atr] = Math.max(this[atr] - damage, 0)
        this.registerLog(`${source} atingiu o ${target} com ${damage}.`, classe)
        },

        getRandom(min,max){
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },

        healAndGetHurt(){
            this.heal(10,15)
            this.damage('playerHp', 7, 12, false,'monstro','jogador','monster')
        },

        heal(max,min){
            const heal = this.getRandom(min,max)
            this.playerHp = Math.min(this.playerHp + heal, 100)
            this.registerLog(`Jogador recebeu cura de ${heal}.`,'player')
        },

        registerLog(text,classe){
            this.logs.unshift({text,classe})
        }

    },

    watch: {
        hasResult(value){
            if(value == true){
                this.running = false
            }
        }
    },

})