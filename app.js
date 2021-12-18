new Vue({
    el : "#app",
    data : {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsOn: false,
        attacks:[],
        attackMultiple : 10,
        speacialAttackMultiple : 25,
        healUpMultiple : 25,
        logText : {
            playerAttack : "oyuncu atağı : ",
            monsterAttack: "canavar atağı : ",
            speacialPlayerAttack : "özel oyuncu atağı : ",
            speacialMonsterAttack : "özel canavar atağı : ",
            healUp : "ilk yardım : ",
            giveUp : "oyuncu pes etti"
        }
    },
    methods : {
        startGame : function(){
            this.playerHealth = 100
            this.monsterHealth = 100
            this.attacks = []
            this.gameIsOn = !this.gameIsOn

        },
        attack : function (){
            pAttack = Math.ceil(Math.random() * this.attackMultiple)
            mAttack = Math.ceil(Math.random() * this.attackMultiple)
            this.playerHealth -= mAttack
            this.monsterHealth -= pAttack
            this.addToLog({ turn : "p", text : this.logText.playerAttack + pAttack})
            this.addToLog({ turn : "m", text : this.logText.monsterAttack + mAttack})
        },
        specialAttack : function (){
            pAttack = Math.ceil(Math.random() * this.speacialAttackMultiple)
            mAttack = Math.ceil(Math.random() * this.speacialAttackMultiple)
            this.playerHealth -= mAttack
            this.monsterHealth -= pAttack
            this.addToLog({ turn : "p", text : this.logText.speacialPlayerAttack + pAttack})
            this.addToLog({ turn : "m", text : this.logText.speacialMonsterAttack + mAttack})
        },
        healUp : function(){
            mAttack = Math.ceil(Math.random() * this.attackMultiple)

            // if (this.playerHealth > 50){
                this.playerHealth += this.healUpMultiple
                this.addToLog({ turn : "p", text : this.logText.healUp + this.healUpMultiple})
                this.addToLog({ turn : "m", text : this.logText.monsterAttack + mAttack})
            // }
            // else{
            //     this.playerHealth += this.healUpMultiple -5
            //     this.addToLog({ turn : "p", text : this.logText.healUp + this.healUpMultiple - 5})
            //     this.addToLog({ turn : "m", text : this.logText.monsterAttack + mAttack})
            // }
            document.getElementById("heal").disabled = true
        },
        giveUp : function(){
            this.playerHealth = 0
            this.addToLog({ turn : "p", text : this.logText.giveUp})
        },
        addToLog : function (log){
            this.attacks.push(log)
        }

    },
    watch : {
        playerHealth : function(value){
            if (value <= 0) {
                this.playerHealth = 0
                if (confirm("kaybettin yeniden oynamak ister misin?")) {
                    this.startGame();
                    this.gameIsOn = true
                    document.getElementById("heal").disabled = false
                }else{
                    
                    this.gameIsOn = false
                }
            }else if(value >= 100){
                this.playerHealth = 100
            }
        },
        monsterHealth : function(value){
            if (value <= 0) {
                this.monsterHealth = 0
                if (confirm("kazandın yeniden oynamak ister misin?")) {
                    this.startGame();
                    this.gameIsOn = true
                    document.getElementById("heal").disabled = false
                }else{
                    
                    this.gameIsOn = false
                }
            }
        }
    },
    computed : {
        playerProgress : function(){
            return {
                width : this.playerHealth + "%"
            }
        },
        monsterProgress : function(){
            return {
                width : this.monsterHealth + "%"
            }
        }
    }
})