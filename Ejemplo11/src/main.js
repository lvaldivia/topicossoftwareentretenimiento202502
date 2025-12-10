import Phaser from "phaser";

class SceneMain extends Phaser.Scene {
    constructor(){
        super({ key: 'SceneMain' });
    }
    preload(){
        
    }
    create(){
       this.startCam();
       this.text = this.add.text(10, 10, 'Emocion: NONE', { font: '16px Arial', fill: '#ffffff' });
       this.player = this.add.rectangle(400, 300, 50, 50, 0x00ff00);
       this.last_emotion = "NONE";
    }
    async startCam(){
        const stream = await navigator.mediaDevices.getUserMedia({video:true});
        document.getElementById('cam').srcObject = stream;
    }
    update(){
        if(Date.now() % 3000 < 20){
            this.sendFrame();
        }
        switch(this.last_emotion){
            case 'HAPPY':
                this.player.fillColor = 0x00ff00;  
                break;
            case 'SAD':
                this.player.fillColor = 0x0000ff;   
                break;
            case 'ANGRY':
                this.player.fillColor = 0xff0000;   
                break;
            case 'SURPRISED':
                this.player.fillColor = 0xffff00;   
                break;
            default:
                this.player.fillColor = 0x888888;  
        }
    }
    async sendFrame(){  
        console.log('enviar frame');
        const video = document.getElementById('cam');
        let canvas = document.getElementById('previewCanvas');
        if(!canvas){
            canvas = document.createElement('canvas');
            canvas.id = 'previewCanvas';
            document.body.appendChild(canvas);
        }
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const base64 = canvas.toDataURL('image/jpeg').split(',')[1];
        const response = await fetch('https://qs90onrfj0.execute-api.us-east-1.amazonaws.com/rekognition', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: base64 })
        });
        const data = await response.json();
        if(data.emotion){
            this.text.setText('Emocion: ' + data.emotion);
            this.last_emotion = data.emotion
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