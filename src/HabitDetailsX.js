import styled from 'styled-components'
import {  useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import {  AiFillDelete, AiFillEdit, AiFillEye, AiFillEyeInvisible, AiFillFileText, AiOutlineArrowLeft, AiOutlineClose,  AiOutlineContacts,  AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Context from './utils/Context';
import Modal from './Modal';
import { changeHabit, eraseNote, getNotes, habitInfo, saveNewNote } from './utils/timeUtils';
import dayjs from 'dayjs';
    
export default function HabitDetailsDefault({details,setDetails}){
    const {groupId,id,title,begin,end,day,color,name,unic}=details

    const {setPopUp,findHabits,popUp} = useContext(Context)
    const [coloring,setColoring]=useState(false)
    const colorCodes=['#f7a471','#e8d361','#67e57e','#719ef7','#d3a1e0']
    const colorNames=['red','yellow','green','blue','purple']
    const dayNames=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado']
    const monthNames=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
    const colorCodes2=['#fca50f','#f45ace','#53ceed']
    const colorNames2=['orange','pink','aqua']

    function this_next(day){
        if(!unic)return day
        const dayOfMonth=unic[8]+unic[9]
        const month=parseInt(unic[5]+unic[6])
        return `${dayOfMonth} ${monthNames[month-1]}, ${day}`
    }
    function changeColor(color){
        const {habits,count} = habitInfo()
        changeHabit(count,habits,details.id,{color})
        setDetails({...details,color})
        findHabits()
        setColoring(false)
    }
    function eraseHabit(){
        const {habits,count} = habitInfo()
        changeHabit(count,habits,details.id,{color},true)
        setDetails({})
        setPopUp('')
        findHabits()
    }

    const inputRef = useRef(null);
    const [nota,setNota]=useState('')
    const [novaNota,setNovaNota]=useState('')
    const [anotando,setAnotando]=useState('')
    const [inside,setInside]=useState(false)
    const [inat,setInat]=useState(false)
    function saveNote(id){
        //localStorage.setItem("habits", JSON.stringify(newHabits))
    }
    function salvarNota(){
        const notas=JSON.parse(localStorage.getItem("anotacoes"))||[]
        const novaLista=[]
        for(let n of notas){
            if(n.habitId!=id)novaLista.push(n)
        }
        const newNote={habitId:id,texto:novaNota}
        novaLista.push(newNote)
        console.log(novaLista)
        localStorage.setItem("anotacoes", JSON.stringify(novaLista))
        setAnotando(false)
        buscarNota()
    }
    function buscarNota(){
        const notas=JSON.parse(localStorage.getItem("anotacoes"))||[]
        
        const listinha=notas.filter(n=>n.habitId==id)
        console.log(listinha)
        const note=listinha?listinha[0]:false
        if(note)setNota(note.texto)
    }
    function tornarInativo(){
        const {habits,count} = habitInfo()
        const data={inativo:inat?false:true}
        changeHabit(count,habits,id,data)
        buscarAtivo()
        findHabits()
    }
    function buscarAtivo(){
        const habits=JSON.parse(localStorage.getItem("habits"))
        const habitInativo=habits.filter(h=>h.id==id)[0].inativo
        setInat(habitInativo)
    }
    useEffect(buscarAtivo,[])
    useEffect(buscarNota,[anotando])
    const colorList=<ul>{colorCodes.filter(color=>(color!='#dbb47f')).map((color,i)=>(
        <ChoseColor onClick={()=>changeColor(colorNames[i])} color={color} position={i*3}/>
    ))}</ul>
    return(
        <>
        <Overlay onClick={()=>setPopUp('')}></Overlay>
        <Content>
        <Button color='black' closeNewNote={true} onClick={()=>setPopUp('')}><ion-icon name="close"></ion-icon></Button>
        {popUp==='deleting'?<Modal buttons={true} text={title} functionYes={()=>eraseHabit()} functionNo={()=>setPopUp('detailing')} />:<></>}
        
            <Container>
            <span>
                <ul>
                    <div className='corpessoa'>
                        {!coloring?<ColorBall onClick={()=>{if(!groupId)setColoring(true)}} color={colorCodes[colorNames.indexOf(color)]||colorCodes2[colorNames2.indexOf(color)]} />:colorList}
                        <h1>{title}</h1>
                    </div>
                </ul>
                <div>
                    <p>{begin} ~ {end}</p>
                    <p>{this_next(dayNames[day])}</p>
                </div>
            </span>
            <Anotacao>
                {anotando?<input
                    id="anotacao"
                    onChange={(e)=>setNovaNota(e.target.value)}
                    value={novaNota}
                    style={{fontSize:'14px'}}
                    ref={inputRef}
                    placeholder=""
                />:<p>{nota}</p>}
                <button onClick={()=>{
                    if(anotando){
                        salvarNota()
                    }else{
                        setAnotando(true)
                        setNovaNota(nota)
                        setTimeout(() => {
                            inputRef.current?.focus();
                          }, 0)
                    }
                }}>{anotando?'Salvar':'Anotar'}</button>
            </Anotacao>
            <span >
             
                <ul >
                    {/*<ButtonDif color='green' onClick={()=>{setInside('create')}}>
                        <span>
                            <article>
                            <AiFillFileText/>
                            </article>
                        
                        <h4>Anotação</h4>
                        </span>
                        
                        </ButtonDif>*/}
                    <div>
                    <ButtonDif  onClick={()=>setPopUp('editing')}>
                    <span>
                        <AiFillEdit/>
                        <h4>Editar</h4>
                        </span>
                    </ButtonDif>
                    <ButtonDif onClick={()=>setPopUp('deleting')}>
                    <span>
                        <AiFillDelete/>
                        <h4>Deletar</h4>
                        </span>
                    </ButtonDif>
                    {!unic?<ButtonDif  onClick={tornarInativo}>
                    <span>
                        {!inat?<AiFillEye/>:<AiFillEyeInvisible/>}
                        <h4>{!inat?'Ativo':'Inativo'}</h4>
                        </span>
                    </ButtonDif>:<></>}
                    </div>
                </ul>
            </span>
            </Container>
        </Content></>
    )
}

const Overlay=styled.div`z-index:15;
background-color: rgba(0, 0, 0, 0.4);;position:fixed;height:100vh;width:100vw
`
const NoteBox=styled.div`
display:flex;height:80%;flex-wrap:wrap;
button{margin:5px;}
`
const Anotacao=styled.div`
padding:10px;box-sizing:border-box;
height:100px;position:relative;
width:100%;border-radius:10px;
background:#d7dded;h3{color:black}
h4{font-size:15px};border:0;font-size:17px;
align-items:center;
flex-direction:column;
button{background:#a2abc4;position:absolute;
bottom:10px;right:10px;cursor:pointer;color:#394872;
border:0;padding:10px 15px 10px 15px;border-radius:10px;
}
input{margin:0;border-radius:5px;

background:#d7dded;margin:0;border:0;
}
input:focus {
  outline: none;
}
p{
width:100%;
}
`
const Container=styled.div`height:100%;
display:flex;flex-direction:column;justify-content:space-between;

aside{
    height:100%;
    display:flex;flex-direction:column;position:relative;
    input{width:79.5%}
    textarea{font-size:17px;width:80%;height:80%}

}
`
const ButtonNote=styled.button`
background-color:${props=>props.color};color:white;width:65px;height:35px;
        border-radius:15px;position:absolute;bottom:${props=>props.height}px;right:5px;border:0
`

const Content=styled.div`.corpessoa{display:flex}
display:flex;padding:10px;box-sizing:border-box;
width:90vw;position:fixed;max-width:500px;
height:280px;z-index:16;top:18vh;
    background-color: #fff8ef;
    flex-direction:column;justify-content:space-between;
    border-radius: 1.5vh;
h1{font-size:22px;font-weight:900;margin-bottom:6px;}
h2{font-size:25px}
span{width:100%;display:flex;flex-direction:column;justify-content:space-between}
p{font-size:19px;margin:5px 0  0;
strong{font-weight:700;font-size:20px;}}
input{height:28px;width:97%;font-size:20px;margin-top:1vh;margin-bottom:1vh;}
.orgDetalhesEvento{display:flex}
ul{display:flex;align-items:center;justify-content:space-between;div{display:flex}}
@media(min-width:1050px){
    border:0
} 
`
const Button=styled.button`
height:40px;position:${props=>props.closeNewNote?'absolute;top:10px;right:10px;z-index:7':'block'}
    ;width:40px;border-radius:10px;
    ;background-color:#fff8ef;
font-size:23px;border:0;
display:flex;align-items:center;justify-content:center;
color:${props=>props.color};
`
const ButtonDif=styled.button`box-sizing:border-box;
height:50px;${props=>props.color?'':'margin-right:10px;'};
    width:70px;border-radius:10px;
    ;background-color:${props=>props.color||'#e0cbaf'};
h4{font-size:14px};border:0;font-size:17px;
display:flex;align-items:center;justify-content:space-evenly;flex-direction:column;
color:#6B491A;
span{display:flex;flex-direction:column;align-items:center;height:100%;justify-content:space-evenly;
article{display:flex;width:45px;justify-content:space-evenly;}
}
`
const ColorBall=styled.button`width:22px;height:22px;border-radius:50%;
border:1.7px solid black;margin-right:1vh;
background-color:${props=>props.color}
`
const ChoseColor=styled.button`width:22px;height:22px;border-radius:50%;
border:1.7px solid black;margin-right:1vh;
background-color:${props=>props.color}
`
{/* <Container>
            <div className='corpessoa'>
                <Button color='black' onClick={()=>setShowing(false)}><AiOutlineArrowLeft/></Button>
                <p>event integrants:</p>
            </div>
            <p>{participants}</p>
        </Container> */}