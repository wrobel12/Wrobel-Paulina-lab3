
class Paint {

    constructor() {

        this.setCanvas() 
        this.brushShape = 'pencil'
        this.ctx.strokeStyle = '#c81464'
        this.ctx.lineWidth = 3
        this.ctx2.strokeStyle = '#c81464'
        this.ctx2.lineWidth = 3
        this.drawingActive = false;
        
    }

  // Ustawienia

  setCanvas() {

    this.canvas = document.querySelector('#canvas')
    this.ctx = canvas.getContext('2d')
    this.canvas.addEventListener('mousedown',(e) => this.startDrawing(e))
    this.canvas.addEventListener('mousemove',(e) => this.drawing(e))
    this.canvas.addEventListener('mouseup',(e) => this.stopDrawing(e))


    this.canvas2 = document.createElement('canvas');
    this.canvas2.width = this.canvas.width;
    this.canvas2.height = this.canvas.height;
    this.ctx2 = this.canvas2.getContext('2d');
    this.canvas2.addEventListener('mousedown',(e) => this.startDrawing(e))
    this.canvas2.addEventListener('mousemove',(e) => this.drawing(e))
    this.canvas2.addEventListener('mouseup',(e) => this.stopDrawing(e))

    this.canvas3 = document.createElement('canvas');
    this.canvas3.width = this.canvas.width;
    this.canvas3.height = this.canvas.height;
    this.ctx3 = this.canvas3.getContext('2d');
    

}

setBrush(shape) {

  

    this.brushShape = shape
    this.ctx.lineJoin = "round";
    this.ctx.lineCap = "round";

    this.ctx2.lineJoin = "round";
    this.ctx2.lineCap = "round";
      
}

// Funkcje rysowania

startDrawing(e) {

    this.drawingActive = true;
    this.PosX = e.layerX;
    this.PosY = e.layerY;

    // tymczasowa wersje canvasu zanim rozpoczeliśmy rysowanie
    this.ctx3.drawImage(this.canvas, 0, 0);
    

}

drawing (e) {



	if (this.drawingActive == true) {
        
        // czyszczenie wyświetlanego canvasu i przywracanie wersji z przed rysowania 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.canvas3, 0, 0);

        if (this.brushShape == 'line') {
            
                this.ctx2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
                this.ctx2.beginPath();
                this.ctx2.moveTo(this.PosX, this.PosY);
                this.ctx2.lineTo(e.layerX, e.layerY);
                this.ctx2.closePath();
                this.ctx2.stroke();
                this.ctx.drawImage(this.canvas2, 0, 0);

            
        } else if (this.brushShape === 'rectangle') {
            this.ctx2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
            this.ctx2.beginPath();
            this.ctx2.moveTo(this.PosX, this.PosY);
            this.ctx2.rect(this.PosX, this.PosY, e.layerX-this.PosX, e.layerY-this.PosY);
            this.ctx2.closePath();
            this.ctx2.stroke();
            this.ctx.drawImage(this.canvas2, 0, 0);

            } else {
        this.ctx.lineTo(e.layerX, e.layerY);
        this.ctx.stroke();
        }
    
}
}

stopDrawing(e) {

    this.drawingActive = false;
   
}

    changeColor(e, paintColorPickerId) {
        
        this.brushColor = event.target.value;
        this.ctx.strokeStyle = this.brushColor
        this.ctx2.strokeStyle = this.brushColor

        this.paintColorPicker = document.querySelector(paintColorPickerId)
        this.paintColorPicker.style.backgroundColor = this.brushColor
    }

    changeBackgroundColor(e, bgColorPickerId) {
        this.bgColor = event.target.value;
        this.ctx2.fillStyle = this.bgColor;
        this.ctx2.fillRect(0, 0, this.canvas2.width, this.canvas2.height);

        this.bgColorPicker = document.querySelector(bgColorPickerId);
        this.bgColorPicker.style.backgroundColor = this.bgColor;
        
        this.ctx.drawImage(this.canvas2, 0, 0);
        this.ctx2.clearRect(0, 0, this.canvas.width, this.canvas.height);


    }

    

// Załadowanie zdjęcia i funkcje nim manipulujące



drawCanvasImage(e,jpgPath) {
    this.imagePresent = true;
    this.image = new Image()
this.image.src = jpgPath
this.image.addEventListener('load', ()=> {
    this.ctx.drawImage(this.image, 200, 0, 500, 700)
    this.imageManipulationInputs.style.visibility = "visible"
    
    
})

}

invertImageColors() {

    this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.invertColors(this.imageData.data);
        this.ctx.putImageData(this.imageData, 0, 0);

}

changeImage(e,sliderId,valueId,eventType) {

    if (eventType == 'brightness') {
    this.brightnessSlider = document.querySelector(sliderId)
    this.brightnessValue = document.querySelector(valueId)
    
    
            this.redrawImage();


    
    this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.applyBrightness(this.imageData.data,parseInt(this.brightnessSlider.value, 10));
        this.brightnessValue.innerText = e.currentTarget.value;
        this.ctx.putImageData(this.imageData, 0, 0);
    } else if (eventType == 'contrast') {
        this.contrastslider = document.querySelector(sliderId)
    this.contrastvalue = document.querySelector(valueId)

        this.redrawImage();

    this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.applyContrast(this.imageData.data,parseInt(this.contrastslider.value, 10));
        this.contrastvalue.innerText = e.currentTarget.value;
        this.ctx.putImageData(this.imageData, 0, 0);

    } else if (eventType == 'saturation') {
        this.saturationslider = document.querySelector(sliderId)
    this.saturationvalue = document.querySelector(valueId)
        this.redrawImage();
this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.applySaturation(parseInt(this.saturationslider.value, 10));
        this.saturationvalue.innerText = e.currentTarget.value;
        

    }
}

    setImageInputs(imageManipulationInputsId) {
        this.imageManipulationInputs = document.querySelector(imageManipulationInputsId)
    }


invertColors(data) {
    for (let i = 0; i < data.length; i+= 4) {
      data[i] = data[i] ^ 255; 
      data[i+1] = data[i+1] ^ 255;
      data[i+2] = data[i+2] ^ 255; 
    }
}


applyBrightness(data, brightness) {
    for (let i = 0; i < data.length; i+= 4) {
      data[i] += 255 * (brightness / 100);
      data[i+1] += 255 * (brightness / 100);
      data[i+2] += 255 * (brightness / 100);
    }

  }

  truncateColor(value) {
    if (value < 0) {
      value = 0;
    } else if (value > 255) {
      value = 255;
    }
  
    return value;
  }
    
  applyContrast(data, contrast) {
    let factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));
  
    for (let i = 0; i < data.length; i+= 4) {
      data[i] = this.truncateColor(factor * (data[i] - 128.0) + 128.0);
      data[i+1] = this.truncateColor(factor * (data[i+1] - 128.0) + 128.0);
      data[i+2] = this.truncateColor(factor * (data[i+2] - 128.0) + 128.0);
    }
  }

  applySaturation(value) {
    this.ctx.globalCompositeOperation = "saturation";
    this.ctx.fillStyle = "hsl(0," + value + "%,50%)";
    this.ctx.globalCompositeOperation = "source-over";
  }

  redrawImage() {
    this.ctx.drawImage(this.image,200, 0, 500, 700);
}

// reszta funkcji

    clearCanvas(e) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
        this.imagePresent = false;
        this.imageManipulationInputs.style.visibility = "hidden"
       
    }


 
}