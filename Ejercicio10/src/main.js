import Phaser from "phaser";

class SceneMain extends Phaser.Scene {
    constructor(){
        super({ key: 'SceneMain' });
    }
    preload(){
        this.load.spritesheet("npc","assets/kai_mori.png",{ frameWidth: 512, frameHeight: 512 });
    }
    create(){
        this.isAsking = false;
        this.thinkingAnimationTween = null;
        this.npc = this.add.sprite(300,250,'npc');
        this.dialog = this.add.text(50, 430, 'Habla con Iam', 
            { font: '20px', fill: '#00eaff', 
                backgroundColor: "#000000aa",
                padding:{x:12,y:8},
                wordWrap: { width: 700 } });
          this.inputField = this.add.dom(300, 500).createFromHTML(`
      <input
        id="npcInput"
        type="text"
        placeholder="Dile algo a Kai..."
        style="
          width: 500px;
          height: 40px;
          font-size: 20px;
          color: #ffffff;
          background: #000000aa;
          border: 1px solid #00eaff;
          padding: 8px;
          outline: none;
          border-radius: 4px;
        "
      />
    `);
      this.add.text(570,500,'Hablar',{
        fontSize: '22px',
        backgroundColor: '#00eaff',
        color: '#000',
        padding: { x: 12, y: 6 },
      }).setInteractive().on('pointerdown', () => this.ask());
    }
    async ask(){
        if(this.isAsking) return;
        this.isAsking = true;
        const inputElement = document.getElementById('npcInput');
        this.startThinkingAnimation();
        /*const res = fetch("https://flgh7fkxjk.execute-api.us-east-2.amazonaws.com/default/bot_luisavldivia",{
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ "text": inputElement.value })
        }).then(response =>response.json())
        .then(data => {
            console.log(data);
            
        });*/
        const rest = await fetch("https://flgh7fkxjk.execute-api.us-east-2.amazonaws.com/default/bot_luisavldivia",{
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ "text": inputElement.value })
        });
        const data = await rest.json();
        this.dialog.setText(data.text);
        const audio = new Audio(data.audio_url)
        audio.play();
        this.stopThinkingAnimation();
        this.startMouthAnimation();
        audio.onended = () => {
            this.endMouthAnimation();
            this.isAsking = false;
        };
        document.getElementById('npcInput').value="";
    }
    startThinkingAnimation(){
        if(this.thinkingAnimationTween)return;
        this.thinkingAnimationTween = this.tweens.add({
            targets:this.npc,
            alpha:0.6,
            duration:400,
           
            yoyo:true,
            repeat:-1
        })
    }
    stopThinkingAnimation(){
        if(this.thinkingAnimationTween){
            this.thinkingAnimationTween.stop();
            this.thinkingAnimationTween = null;
            this.npc.alpha = 1;
        }
    }
    startMouthAnimation(){
        if(this.mouthTween)return;
        this.mouthTween = this.tweens.add({
            targets:this.npc,
            scaleY: 1.40,
            duration: 120,
             ease:'Quad.easeInOut',
            yoyo:true,
            repeat:-1
        });
    }
    endMouthAnimation(){
        if(this.mouthTween){
            this.mouthTween.stop();
            this.mouthTween = null;
            this.npc.scaleY = 1;
        }
    }
}

new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [SceneMain],
    parent: 'game',
    dom: { createContainer: true }
});