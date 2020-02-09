
window.onload = function() {
    loadNotes();
  };

  class Note {
    constructor(title, description, color, date) {
      this.title = title
      this.description = description
      this.color = color
      this.created = date
      this.pinned = false
    }
  }

// Wyświetl notatki znajdujące się w tablicy

function loadNotes()  {

    let array = JSON.parse(localStorage.getItem('notes'))
    console.log(array)
   
    if (array != null) {
            
        let html = "";
        let htmlForPinned = "";
        
        array.forEach(function(element, index) {

            if (element.pinned == false) {
              html += `
              <div class="card border-primary mb-3" style="max-width: 18rem" id="newNote">
                    <div class="card-header" style="background-color: ${element.color}"><button type="button" id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-dark deleteButton">X</button><button type="button" id="${index}" onclick="pinNote(this.id)" class="pinBtn"><img src="588891ecbc2fc2ef3a1860a4.png" width="30" height="40"></button></div>
                    <div class="card-body text-primary">
                      <h5 class="card-title" id="noteTitle">${element.title}</h5>
                      <p class="card-text" id="noteDesc">${element.description}</p>
                    </div>
                    <div class="card-footer bg-transparent border-primary" id="noteCreationDate">${element.created}</div>
                  </div>`;
                  
  
              }  else {
                 htmlForPinned += `
                  <div class="card border-primary mb-3" style="max-width: 18rem;" id="newNote">
                  <div class="card-header" style="background-color: ${element.color}"><button type="button" id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-dark deleteButton" id="deleteNoteButton">X</button><button type="button" id="${index}" onclick="pinNote(this.id)" class="pinBtn"><img src="588891ecbc2fc2ef3a1860a4.png" width="30" height="40"></button></div>
                  <div class="card-body text-primary">
                  <h5 class="card-title" id="noteTitle">${element.title}</h5>
                  <p class="card-text" id="noteDesc">${element.description}</p>
                  </div>
                  <div class="card-footer bg-transparent border-primary" id="noteCreationDate">${element.created}</div>
                  </div>`;
    }


  });

  let notesConteiner = document.getElementById("notes");
  notesConteiner.innerHTML = html;
  
  let pinnedNotesConteiner = document.getElementById("pinnedNotes")
  pinnedNotesConteiner.innerHTML = htmlForPinned;
  
  }

  addNoteCard.style.backgroundColor = "rgba(0,0,0,.03)"

    };

    // Utworzenie notatki wraz z funkcjonalnościami

    function createNote(titleInputId, descInputId) {
   
      let notes = localStorage.getItem("notes");
      if (notes == null) {
        noteObj = [];
      } else {
        noteObj = JSON.parse(notes);
      }
    
        let title = document.getElementById(titleInputId).value;
        let desc = document.getElementById(descInputId).value;
        let date = new Date();
        date = date.toDateString();
        let color = noteColor
    
        let addNote = new Note(title, desc, color, date)
     
        noteObj.push(addNote)
        localStorage.setItem('notes', JSON.stringify(noteObj))
    
        loadNotes();
         
      };
   
    function deleteNote(index) {
      
        let notes = localStorage.getItem("notes");
   
        noteObj = JSON.parse(notes);
      
        noteObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(noteObj));
        loadNotes();
      }


      function pinNote(index) {
        
        let notes = localStorage.getItem("notes");
   
        noteObj = JSON.parse(notes);
    
        if (noteObj[index].pinned == false) {

          noteObj[index].pinned = true;
        } else {
          noteObj[index].pinned = false
        }
     
      localStorage.setItem("notes", JSON.stringify(noteObj));
          loadNotes();
      }


// Wyczyść wartości

function clearArea(titleValueId, descValueId) {
  document.getElementById(titleValueId).value = ""
  document.getElementById(descValueId).value = ""

}

// ustaw kolor notatki

function changeColor(color) {
  noteColor = color;
  let addNoteCard = document.getElementById("addNoteCard")
  addNoteCard.style.backgroundColor = color;

}






  