export function graphicMark(item){
    const {begin,end}=item
    
    const graphBegin=Math.round(convertTime(begin)*100)
    const graphEnd=Math.round(convertTime(end)*100)

    //if(graphBegin<0 || graphEnd>2400)throwTimePatternError()
    const distance=graphEnd-graphBegin

    return {...item,
        begin:formatTime(begin),
        end:formatTime(end),
        floor:graphBegin,
        size:(distance)
    }
}
function convertTime(str){
    const len = str.length
    if(len===5)return parseInt(str[0]+str[1])+parseInt(str[3]+str[4])/60
    if(len===4)return parseInt(str[0])+parseInt(str[2]+str[3])/60
    if(len===2)return parseInt(str[0]+str[1])
    if(len===1)return parseInt(str[0])
}

function formatTime(str){
    const len = str.length
    if(len===5)return str[0]+str[1]+':'+str[3]+str[4]
    if(len===4)return str[0]+':'+str[2]+str[3]
    if(len===2)return str[0]+str[1]+':00'
    if(len===1)return str[0]+':00'
}

export function habitInfo(){
    let count=JSON.parse(localStorage.getItem("count"))
    if(!count){localStorage.setItem("count", JSON.stringify(1));count=1;}
    const habits=JSON.parse(localStorage.getItem("habits"))
    return {habits,count}
}

export function noteInfo(){
    let count=JSON.parse(localStorage.getItem("countNotes"))
    if(!count){localStorage.setItem("countNotes", JSON.stringify(1));count=1;}
    const notes=JSON.parse(localStorage.getItem("notes"))
    return {notes,count}
}
export function changeHabit(count,habits,id,data,deletetion=false){
    let newHabits=[]
    for(let k=1;k<count;k++){
        if(k==id){
            if(deletetion)continue;
            newHabits.push({...habits.filter(h=>(h.id==k))[0],...data})
        }else{
            const habitsF=habits.filter(h=>(h.id==k))
            if(habitsF.length==1){
                newHabits.push(habitsF[0])
            }
            
        }
    }
    localStorage.setItem("habits", JSON.stringify(newHabits))
}
export function getNotes(id){
    const notes=JSON.parse(localStorage.getItem("notes"))
    const habitNotes=notes.filter(note=>(note.habitId==id))
    return habitNotes
}
export function saveNewNote(data,id){
    const {notes,count}=noteInfo()
    let newNotes=[]
    if(!id){
        newNotes=[...notes,{...data,id:count}]
        localStorage.setItem("countNotes", JSON.stringify(count+1))
    }else{
        for(let k=1;k<count;k++){
            if(k==id){
                newNotes.push({...notes.filter(h=>(h.id==k))[0],...data})
            }else{
                const notesF=notes.filter(h=>(h.id==k))
                if(notesF.length==1){
                    newNotes.push(notesF[0])
                }
            }
        }
    }
    localStorage.setItem("notes", JSON.stringify(newNotes))
}
export function cleanOldEvents(now){
    const {habits}=habitInfo()
    let newHabits=habits.filter(h=>{
        if(h.unic){
            if(h.unic<now)return false
        }return true
    })
    localStorage.setItem("habits", JSON.stringify(newHabits))
}

export function eraseNote(id){
    let newNotes=[]
    const {notes,count}=noteInfo()
    for(let k=1;k<count;k++){
        if(k!==id){
            const notesF=notes.filter(h=>(h.id==k))
            if(notesF.length==1){
                newNotes.push(notesF[0])
            }
            
        }
    }
    localStorage.setItem("notes", JSON.stringify(newNotes))
}