import { useState,useEffect, useContext } from "react"
import styled from 'styled-components'
import Context from "./utils/Context"
import { buildHashList } from "./utils/boardUtils"
const diasX= [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
export default function Board({inGroup,now,habits,setDetails,setPopUp}){
    const [daysData,setDaysData]=useState([])
    const {preferences}=useContext(Context)
    const {with_sab_dom,scale}=preferences

    const colorCodes=['#f7a471','#e8d361','#67e57e','#719ef7','#d3a1e0','#fca50f','#f45ace','#53ceed']
    const colorCodesDentro=['#f2bfa2','#e2d9aa','#aee5b7','#9db8ea','#debbe8','#fca50f','#f45ace','#53ceed']
    const colorNames=['red','yellow','green','blue','purple','orange','pink','aqua']

    const daysNames=['SUN','MON','TUE','WED','THU','FRI','SAT']
    const hours=[];for(let i=1;i<24;i++){hours.push(i)}
    
    function separateHabits(){
        let days=daysNames.map((name,index)=>({
            name,content:habits.filter((habit)=>habit.day===index)
        }))
        days=days.filter((day)=>(!with_sab_dom?day.name!=='SUN'&&day.name!=='SAT':true))
        setDaysData(days)

    }
    const days=daysData.map((day,index)=>{
        const hashList=buildHashList(day.content)

        return(
            <Day scale={scale} inGroup={inGroup}>

                {index===(with_sab_dom?now.day:now.day-1)?<NowIndicator className="nowIndicator" level={now.level*4.16}><p>AGORA</p></NowIndicator>:<></>}
                {hours.map(i=>(<Marks level={i*4.16} ></Marks>))}
                {index===0?hours.map(i=>(<Hours level={i*4.16-0.8} side={false}><span>{i}</span></Hours>)):<></>}
                {index===(with_sab_dom?6:4)?hours.map(i=>(<Hours level={i*4.16-0.8} side={true}><span>{i}</span></Hours>)):<></>}

                {day.content.map((habit,i)=>{
                    const {floor,size,color,title,tag,unic}=habit
                    const {width,position}=hashList[i]
                    console.log(habit)
                    return(
                    <Habit opac={habit.inativo} unic={habit.unic?true:false} width={width} position={position} level={floor*0.0416} size={size*0.0416} color={colorCodes[colorNames.indexOf(color)]} colorInside={colorCodesDentro[colorNames.indexOf(color)]}
                        onClick={()=>{setPopUp('detailing');setDetails(habit)}} >
                        <h1>{inGroup?tag||title:title}</h1>
                    </Habit>
                )})}
                {diasX.map((num)=>{
                    const floor=num*100
                    const size=100
                    const d=daysNames.indexOf(day.name)
                    return(
                    <X 
                     level={floor*0.0416} size={size*0.0416} 
                        onClick={()=>{setPopUp(`${d}${num}`);}} >
                    </X>
                )})}
            </Day>)
    })
    useEffect(separateHabits,[habits,preferences])
    return (
        <Content className="board">
            <ul>
                {days}
            </ul>
        </Content>
    )
}
const NowIndicator=styled.div`
COLOR:RED;FONT-SIZE:12PX;p{margin:-12px 0 0 0;width:100%;text-align:center;}
height:3px;width:92%;background-color:red;
position:absolute;top:calc(${props=>props.level}% - 1.5px);z-index:5;
border-radius:1.5px
`

const Hours=styled.div`
height:0.1px;width:3%;background-color:#d3b28b;display:flex;justify-content:flex-${props=>props.side?'start':'end'};
position:absolute;top:${props=>props.level}%;z-index:1;
${props=>props.side?'right':'left'}:-3%;
@media(max-width:614px){
    ${props=>props.side?'right':'left'}:-2.6px;
}
span{color:#6b491a;position:absolute;top:3px;font-size:12px;font-family: 'PT Sans Narrow', sans-serif;}
`
const Marks=styled.div`height:0.9px;width:100%;background-color:#d3b28b;
position:absolute;top:${props=>props.level}%;z-index:1;left:0;
span{color:#6b491a;position:absolute;top:3px;font-size:8px}
`

const Habit=styled.button`
font-weight:500;
box-shadow: -1.5px 1.5px 1.5px rgba(0, 0, 0, 0.15);
border:${props=>props.unic?`6px`:'0'} solid ${props=>props.color};
background-color:${props=>props.unic?props=>props.colorInside:props=>props.color};
    width:${props=>props.width}%;height:${props=>props.size}%;
    border-radius:7px;
    opacity:${p=>p.opac?40:100}%;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    position:absolute;top:${props=>props.level}%;${props=>props.position};z-index:2;
    h1{ text-align: center;
    font-size:15px;font-weight:500;
    font-family: 'PT Sans Narrow', sans-serif;
    }
`
const X=styled.div`
    width:100%;height:${props=>props.size}%;
    position:absolute;top:${props=>props.level}%;z-index:1;
`

const Day =styled.div`
    width: 21.4%;
    height: ${props=>props.scale}px;
    margin-left: 0.9px;margin-right: 0.9px;

    background-color:#f7debb;
    display:flex;flex-direction:column;align-items:center;
    position:relative;
.divz{width:18px;display:flex;justify-content:center;
    height:18px;position:absolute;right:0.6vw;border-radius:50%;
    background-color:#d3b28b;position:absolute;top:-9px;
    left:calc(50% - 18px);
}

`
const Content=styled.div`
width:100%;height:100%;
overflow:hidden;overflow-y:scroll;box-sizing:border-box;
background-color: #d3b28b;
border:1.7px solid #6b491a;
border-top:14.5px solid #6b491a;
padding-left:11px;padding-right:11px;
border-radius: 1.5vh;
position:relative;

ul{display:flex;width:100%}
::-webkit-scrollbar {
    width: 0px;
  }
button{cursor:pointer}
`