import {useState,useEffect,useContext} from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { FaCirclePlus } from "react-icons/fa6";
import Board from './Board'
import { IoSettings } from "react-icons/io5";
import CreateHabit from './CreateHabit';
import Preferences from './Preferences';
import Modal from './Modal';
import { cleanOldEvents } from './utils/timeUtils';
import HabitDetailsDefault from './HabitDetailsX';
import Context from './utils/Context';
	
export default function App(){
    const [preferences,setPreferences]=useState(JSON.parse(localStorage.getItem("pref"))||{with_sab_dom:false,scale:1000,axis:true})
    const [myHabits,setMyHabits]=useState([])
    const [details,setDetails]=useState({})
    const [popUp,setPopUp]=useState('')
    const [error,setError]=useState('')
    const [loadingEvents,setLoadingEvents]=useState(false)

    function defineNow(){
        cleanEvents()
        const now=dayjs().format('HH:mm-d');
        const day=parseInt(now[6])
        const level=parseInt(now[0]+now[1])+parseInt(now[3]+now[4])/60
        setNow({level,day})
        return {level,day}
    }
    const [now,setNow]=useState({day:null,scrollIndex:null})

    function cleanEvents(){
        const now=dayjs().format('YYYY-MM-DD HH:mm')
        cleanOldEvents(now)
        findHabits()
    }

    function findHabits(scroll,size=preferences.scale){
        setLoadingEvents(true)
        const habits=JSON.parse(localStorage.getItem("habits"))||[]
            const resp=[]
            const used=[]
            let count
            let min={}
            for(let k=0;k<habits.length;k++){
                min={floor:Infinity,size:Infinity}
                for(let j=0;j<habits.length;j++){
                    if(used.includes(j))continue
                    if(habits[j].floor<min.floor ||(habits[j].floor==min.floor  && habits[j].size<min.size)){
                        min=habits[j];count=j
                    }else{}
                    
                }
                used.push(count)
                resp.push(min)
            }
        setLoadingEvents(false)
        setMyHabits(resp)
    }
    useEffect(()=>{
        findHabits()
        defineNow()
        setInterval(defineNow,60000)
    },[])


    //useEffect(()=>{if(!token)navigate('/signin')},[])
    const [dayNames,setDayNames]=useState([])
    useEffect(()=>{
        setDayNames(preferences.with_sab_dom?['DOM','SEG','TER','QUA','QUI','SEX','SAB']:['SEG','TER','QUA','QUI','SEX'])
    },[preferences.with_sab_dom])

    const valorContexto={
      preferences,setPreferences,popUp, setPopUp,findHabits 
    }
    return(<Context.Provider value={valorContexto}>
        <LoadingText shown={loadingEvents}>
            <p>loading events ...</p>
        </LoadingText>
        <Content>
            
            {error?<Modal buttons={false} text={error} functionYes={()=>setError('')} />:<></>}
            {popUp==='creating'?<CreateHabit create={true}/>
            :popUp==='detailing'||popUp==='deleting'?<HabitDetailsDefault setDetails={setDetails} details={details}/>
            :popUp==='prefering'?<Preferences myHabits={myHabits} findHabits={findHabits} setPopUp={setPopUp}/>
            :popUp==='editing'?<CreateHabit create={false} details={details} />
            :!popUp?<></>:<CreateHabit create={true} d={parseInt(popUp[0])} num={popUp.length==2?popUp[1]:`${popUp[1]}${popUp[2]}`}/>}
            <Header>
                <Button onClick={()=>setPopUp('creating')}><FaCirclePlus /></Button>
                <h5><span>PlanerA</span></h5>
                <Button onClick={()=>setPopUp('prefering')}><IoSettings /></Button>
            </Header>
            <HeaderBigScreen>
                    <h5><span>PlanerA</span></h5>
                <Button onClick={()=>setPopUp('creating')}><FaCirclePlus /></Button>
                
                <Button onClick={()=>setPopUp('prefering')}><IoSettings /></Button>
            </HeaderBigScreen>
            <BoardContainer>
                <NamesBoard>
                    {dayNames.map(word=>(
                        <div><p>{word}</p></div>
                    ))}
                </NamesBoard>
                <Board inGroup={false} now={now} habits={myHabits} setDetails={setDetails} setPopUp={setPopUp} />
            </BoardContainer>
        </Content>
   </Context.Provider> )
}
const NamesBoard=styled.div`
p{
    font-size:13px;
    color:#CC9139;
}
div{display:flex;justify-content:center;width:100%;margin:1.15px 0 0 0}
display:flex;
width:calc(100% - 25.4px);height:14.5px;position:absolute;z-index:12;left:12px;
`
const LoadingText=styled.div`
position:fixed;

font-size:27px;
top:40vh;
color:#6B491A;

z-index:4;width:100vw;
display:${props=>props.shown?'flex':'none'};justify-content:center;
`

/*const MediaDetector=styled.div`
display:none;
@media(min-width:1050px){
    display:block;
  }
`*/
const MediaDetector=styled.div`
display:none;
`
//background-color:#ba7f2e;
const Button=styled.button`display:flex;justify-content:space-evenly;align-items:center;
width:100px;
height:68px;
border-radius:20px;position:relative;flex-direction:column;
background-color: transparent;
color:#6b491a;
font-size:20px;border:0vh solid black;
h6{font-size:15px;font-weight:700}
ion-icon{font-size:40px}
@media(min-width:900px){
    margin-bottom:10px
}
`
const Header=styled.section`height:70px;
;width:95vw;display:flex;margin:0 0 0px 0;
justify-content:space-between;align-items:center;


@media(min-width:900px){
    display:none
}
`
const HeaderBigScreen=styled.section`
width:140px;height:94vh;display:flex;margin:0 0 10px 0;flex-direction:column;
justify-content:flex-start;align-items:center;


@media(max-width:900px){
    display:none
}
`
const BoardContainer=styled.section`
width:98%;height:calc(100% - 80px)
`
const Content=styled.div`
width: 100%;height:100dvh;
background-color: #cc9139;
display: flex;flex-direction:column;

button{cursor:pointer}
    align-items: center;
@media(min-width:900px){
    flex-direction:row;justify-content:space-evenly;
}
h5{color:#6b491a;
font-family: 'Amatic SC', cursive;
font-size:42px;font-weight:700;
}
`