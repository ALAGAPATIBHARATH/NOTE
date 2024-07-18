let btnEl=document.getElementById("btn")
let appEl=document.getElementById("app")

getNotes().forEach((note)=>{
    let noteEl= createNoteEl(note.id,note.content)
    appEl.insertBefore(noteEl,btnEl)
})

function createNoteEl(id,content){
    let element=document.createElement("textarea")
    element.classList.add("note")
    element.placeholder="Empty Notes"
    element.value=content

    element.addEventListener("dblclick",()=>{
        let warning=confirm("Do you want to delete this note?")
        if(warning){
            deleteNote(id,element)
        }
    })

    element.addEventListener("input",()=>{
        updateNote(id,element.value)
    })

    return element
}

function updateNote(id,content){
    let notes=getNotes()
    let target=notes.filter((note)=>note.id==id)[0]
    target.content=content
    saveNote(notes)
}

function deleteNote(id,element){
    let notes=getNotes().filter((note)=>note.id!=id)
    saveNote(notes)
    appEl.removeChild(element)
}

function addNote(){
    let notes=getNotes()
    let noteObj={
        id:Math.floor(Math.random()*100000),
        content:"",
    }
    let noteEl=createNoteEl(noteObj.id,noteObj.content)
    appEl.insertBefore(noteEl,btnEl)
    notes.push(noteObj)
    saveNote(notes)
}

function saveNote(notes){
    localStorage.setItem("note-app",JSON.stringify(notes))
}

function getNotes(){
    return JSON.parse(localStorage.getItem("note-app")||"[]")
}

btnEl.addEventListener("click",addNote)