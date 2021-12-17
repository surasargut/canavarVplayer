new Vue({
    el : "#app",
    data : {
        playerHeal: 100,
        monsterHeal: 100,
        gameIsOn: false,
        singleUse: true,
        attacks:[],
        color: "lightblue"
        
    },
    methods : {
        startGame : function(){
            this.playerHeal = 100
            this.monsterHeal = 100
            this.attacks = []
            this.gameIsOn = !this.gameIsOn

        },
        attack : function (){
            pAttack = Math.ceil(Math.random() * 10)
            mAttack = Math.ceil(Math.random() * 10)
            this.playerHeal -= mAttack
            this.monsterHeal -= pAttack
            this.attacks.push({player:pAttack, monster:mAttack})
            
        },
        specialAttack : function (){
            pAttack = Math.ceil(Math.random() * 10)
            mAttack = Math.ceil(Math.random() * 10)
            this.playerHeal -= mAttack
            this.monsterHeal -= pAttack
            this.attacks.push({player:pAttack,monster:mAttack})
        },
        healUp : function(){
            mAttack = Math.ceil(Math.random() * 10)

            if (this.playerHeal > 50){
                this.playerHeal += 20
                this.attacks.push({player:20,monster:mAttack})
            }
            else{
                this.playerHeal += 15
                this.attacks.push({player:15,monster:mAttack})
            }
            document.getElementById("heal").disabled = true
            document.getElementById("heal").style.backgroundColor = "gray";
        },
        giveUp : function(){
            if (confirm("kaybettin yeniden oynamak ister misin?")) {
                this.playerHeal = 100
                this.monsterHeal = 100
                this.attacks = []
            }
            else{
                this.show = false
            }
        },

    },
    watch : {
        playerHeal : function(value){
            if (value <= 0) {
                alert("canavar kazandı")
             
            this.playerHeal = 100
            this.monsterHeal = 100
            this.attacks = []
            this.show = !this.show
            }
        },
        monsterHeal : function(value){
            if (value <= 0) {
                alert("sen kazandın")
                
            this.playerHeal = 100
            this.monsterHeal = 100
            this.attacks = []
            this.show = !this.show
            }
        }


    }
})