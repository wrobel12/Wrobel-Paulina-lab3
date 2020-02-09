class launchpad {

   
    
    constructor (recButtonId) {
        this.recButton = document.getElementById(recButtonId)
        this.recButton.addEventListener('click',(e) => this.startRecord(e))

        this.records = []
        this.record = []

        this.channelButton = {}
        this.channelButtons = []
        this.channelButtonsCounter = -1

        this.countRecords = 0
        this.channelStarts = []
  
    }


    playSound(sound) {

        if (this.countRecords == 0) {
            this.channelStart = this.channelStarts[0]

        } else if (this.countRecords == 1) {
            this.channelStart = this.channelStarts[1]

        } else if (this.countRecords == 2) {
            this.channelStart = this.channelStarts[2]

        } else if (this.countRecords == 3) {
            this.channelStart = this.channelStarts[3]
            
        }
        // if (this.countRecords) {
        //     this.channelStart = this.channelStarts[this.countRecords]
        // }

        

        let time = Date.now() - this.channelStart;

        sound.play();

        const s = {
            sound: sound,
            time: time
        }

        if(this.recButton.className === "Rec") {

           this.record.push(s)

         

        }
       
        
    }




    addSound(soundPath, soundButtonsClass) {
        let sound = new Audio(soundPath);
        let soundButtons = document.getElementsByClassName(soundButtonsClass)
        for (let i = 0; i < soundButtons.length; i++) {
            soundButtons[i].addEventListener('click', (e) => this.playSound(sound))
                } 



    }

    

    startRecord() {
        if(this.recButton.className === "notRec"){
            this.recButton.classList.remove("notRec");
            this.recButton.classList.add("Rec");

            this.channelStart = Date.now();
            let start = this.channelStart;
            this.channelStarts.push(start)
            this.channelStart = null;

        } else {
            this.recButton.classList.remove("Rec");
            this.recButton.classList.add("notRec");

            this.countRecords++;

            if (this.countRecords == 1) {
                this.channelButton = this.channelButtons[0].id;
                this.channelButton.classList.add("highlightButton");

            } else if (this.countRecords == 2) {
                this.channelButton = this.channelButtons[1].id;
                this.channelButton.classList.add("highlightButton");

            } else if (this.countRecords == 3) {
                this.channelButton = this.channelButtons[2].id;
                this.channelButton.classList.add("highlightButton");

            } else if (this.countRecords == 4) {
                this.channelButton = this.channelButtons[3].id;
                this.channelButton.classList.add("highlightButton");

            } 


            this.records.push(this.record.slice());
           
            this.record.splice(0,this.record.length)

       
    }
}

    playChannel(channelButton) {
        this.channel = this.records[channelButton.number];
        if(this.channel.length !== 0){

         

            channelButton.id.classList.remove("highlightButton") 
            channelButton.id.classList.add("redColor")

            


            for (let i = 0; i <= this.channel.length; i++)

            
            {
                this.channel.forEach((el) => {
                setTimeout(() => {
        
                    el.sound.play();
                    
                  

                  setTimeout(() => {
                    channelButton.id.classList.remove("redColor")
                    channelButton.id.classList.add("highlightButton")
                    }, this.channel[this.channel.length-1].time);
                  }, el.time);

                })

            }

            }
        }

    addRecordChannel(channelButtonId) {
        this.channelButtonsCounter++
        let channelButton = {
            id: document.getElementById(channelButtonId),
            number: this.channelButtonsCounter
        }

        this.channelButtons.push(channelButton);
        channelButton.id.addEventListener('click',(e) => this.playChannel(channelButton));
    }


    }