import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import Context from './utils/Context';
import Modal from './Modal';
import { changeHabit, graphicMark, habitInfo } from './utils/timeUtils';
import dayjs from 'dayjs';
import Tecladinho from './Tecladinho';
    
export default function CreateHabit({d,num,create,details}){
    const {setPopUp,findHabits}=useContext(Context)
    const [aviso,setAviso]=useState(false)
    function wrong(begin,end){
        if(!begin || !end)return true
        const beginy=begin.split(':')
        const endy=end.split(':')
        const inicio={h:parseInt(beginy[0]),m:parseInt(beginy[1])}
        const fim={h:parseInt(endy[0]),m:parseInt(endy[1])}
        if(inicio.h>fim.h)return true
        if(inicio.h==fim.h && inicio.m>fim.m)return true
    }
    const [title,setTitle]=useState(create?'':details.title)
    const [begin,setBegin]=useState(create?'':details.begin)
    const [end,setEnd]=useState(create?'':details.end)
    const [day,setDay]=useState(create?null:details.day)
    const [intDay,setIntDay]=useState(create?'':details.end)
    const [intMonth,setIntMonth]=useState(create?null:details.day)
    const [comeco,setComeco]=useState(true)
    const [error,setError]=useState('')
    const [type,setType]=useState(create?'every':details.type||'every')
    function defineFade(b,e){
        const beginy=b.length==5?b:'0'+b
        const endy=e.length==5?e:'0'+e
        const now=dayjs().format('HH:mm d');
        let daysDiff=day-now[6]
        if(daysDiff>0){
            return dayjs().add(`${daysDiff}`, 'days').format('YYYY-MM-DD')+` ${endy}`;
        }else if(daysDiff<0){
            return dayjs().add(`${daysDiff+7}`, 'days').format('YYYY-MM-DD')+` ${endy}`;
        }else{
            if(beginy<now[0]+now[1]+now[2]+now[3]+now[4]){
                return dayjs().add(`${daysDiff+7}`, 'days').format('YYYY-MM-DD')+` ${endy}`;
            }else{
                return `${dayjs().format('YYYY-MM-DD')} ${endy}`
            }
        }
    }
    function defineFadeSpecificDate(e){
        const endy=e.length==2?e:'0'+e
        const num1=intDay.length==2?intDay:'0'+intDay
        const num2=intMonth.length==2?intMonth:'0'+intMonth
        const year=dayjs().format('YYYY')
        const theDate=dayjs(year+'-'+num2+'-'+num1)
        const weekDay=parseInt(dayjs(theDate).format('d'))
        return {unic:theDate.format('YYYY-MM-DD')+' '+endy,weekDay}
    }
    function saveHabit(event){
        event.preventDefault()
        console.log('inicio')
        if(wrong(begin,end)||day===null){
            setAviso(true)
            setTimeout(() => {
                setAviso(false)
            }, 2*1000);
            return
        }
        console.log('fim')
        const nomeOficial=title||'Sem Nome'
        const {habits,count} = habitInfo()
        const habitData={type,title:nomeOficial,begin,end,day,color:details?.color||'yellow'}
        let data=graphicMark(habitData)
        if(type==='date'){
            const {weekDay,unic}=defineFadeSpecificDate(data.end)
            data={...data,unic,day:weekDay}
        }else{
            const unic=type==='every'?false:defineFade(data.begin,data.end)
            data={...data,unic}
        }
        if(create){
            const newHabits=[...habits,{...data,id:count}]
            localStorage.setItem("count", JSON.stringify(count+1))
            localStorage.setItem("habits", JSON.stringify(newHabits))
        }else{
            changeHabit(count,habits,details.id,data)
        }
      
        setPopUp('')
        findHabits()
    }
    useEffect(()=>{
        if(d&&num){
            setDay(d)
            setBegin(num)
        }
    },[])
    const formers={comeco,setComeco,begin,setBegin,end,setEnd}
    const daysNames=['DOM','SEG','TER','QUA','QUI','SEX','SAB']
    return(
        <>
        <Overlay onClick={()=>setPopUp('')}></Overlay>
        
        <Content>
            {/*<Button color='black' closeNewNote={true} onClick={()=>setPopUp('')}><ion-icon name="close"></ion-icon></Button>*/}
            {!create?<CloseButton onClick={()=>setPopUp('detailing')}><ion-icon name="close"></ion-icon></CloseButton>:<></>}
            {error?<Modal buttons={false} text={error} functionYes={()=>setError('')} />:<></>}
            
            <DaysType>
                <Toggle>
                    <TypeChoice selected={type==='every'} onClick={()=>setType('every')}><p>Toda semana</p></TypeChoice>
                    <TypeChoice selected={type==='next'} onClick={()=>setType('next')}><p>Evento único</p></TypeChoice>
                    {/*<TypeChoice selected={type==='date'} onClick={()=>setType('date')}><p>Data</p></TypeChoice>*/}
                </Toggle>
                <input onChange={(e)=>setTitle(e.target.value)} placeholder='título' value={title}></input>
                <ul>
                    {daysNames.map((name,index)=>(
                        <DayButton onClick={()=>setDay(index)} selected={day===index}><p>{name}</p></DayButton>
                    ))}
                </ul>
                <Tecladinho formers={formers} />     
            </DaysType>
            
            {aviso?<h6>Preencha todos os campos !</h6>:<
                Butao onClick={saveHabit}>Salvar</Butao>}
        </Content>
        </>
    )
}
const Form=styled.div`
display:flex;justify-content:space-between;
`
const Butao=styled.div`cursor:pointer;
display:flex;justify-content:center;align-items:center;
max-width:100px;width:150px;border-radius:10px;font-size:15px;
height:45px;margin:10px 0 0px 0;
    background-color:green;color:white;border:0;margin-right:5px
`
const Button=styled.button`
height:40px;position:${props=>props.closeNewNote?'absolute;top:10px;right:10px;z-index:7':'block'}
    ;width:40px;border-radius:10px;
    ;background-color:#fff8ef;
font-size:23px;border:0;
display:flex;align-items:center;justify-content:center;
color:${props=>props.color};
`
const Overlay=styled.div`z-index:15;
background-color: rgba(0, 0, 0, 0.4);;position:fixed;height:100vh;width:100vw
`
const DaysType=styled.div`
width:100%;max-width:370px;height:calc(100% - 80px);
    input{height:28px;width:182px;border-radius:5px;
        background-color:#F7DEBB;color:#6B491A;
        font-size:17px;border:1.4px solid #6B491A;
        margin:0px 0 15px 0;padding-left:6px}
`

const CloseButton=styled.button`
height:40px;position:absolute;top:10px;right:10px;z-index:7;
    ;width:40px;border-radius:10px;
    ;background-color:#fff8ef;
font-size:23px;border:0;
display:flex;align-items:center;justify-content:center;
color:black;
`
const DayButton=styled.button`border-radius:10px;
p{font-size:12px;};
height:40px;color:${props=>props.selected?'white':'#6B491A'};width:40px;border:0;
background-color:${props=>props.selected?'#6B491A':'#cec5b7'};display:flex;
justify-content:center;align-items:center;
`

const Content=styled.div`min-height:320px;height:80vh;max-height:480px;
position:fixed;z-index:17;width:90vw;top:10vh;left:center;;
max-width:400px;align-items:center;
display:flex;padding:5px;box-sizing:border-box;flex-direction:column;
    background-color: #fff8ef;
    border-radius: 1.5vh;
    ul{
        display:flex;justify-content:space-between;align-items:center;
    }.sabdom{width:38%}
    @media(max-width:900px){
        position:fixed;z-index:17;width:90vw;
    }
    button{cursor:pointer}

@media(min-width:1050px){
        border:0
    }   
h6{margin-bottom:10px;color:red;font-weight:600;}
`
const Toggle=styled.div`
height:15%;margin-bottom:0px;width:calc(100% - 40px);
border:0;background-color:#fff8ef;color:#6B491A;
display:flex;align-items:center;

`

    
   
/*
            <Toggle>
                <TypeChoice selected={type==='every'} onClick={()=>setType('every')}><p>toda semana</p></TypeChoice>
                <TypeChoice selected={type==='next'} onClick={()=>setType('next')}><p>próxima vez</p></TypeChoice>
                <TypeChoice selected={type==='date'} onClick={()=>setType('date')}><p>data</p></TypeChoice>
            </Toggle>
            
            {type==='date'?
            <DaysType>
                <section>
                <InputDate type='number' onChange={(e)=>setIntDay(e.target.value)} placeholder='dia' value={intDay}></InputDate>
                <InputDate type='number' onChange={(e)=>setIntMonth(e.target.value)} placeholder='mês' value={intMonth}></InputDate>            
            </section>  
            <Form>
                
            <div>
                <input type='number' onChange={(e)=>setBegin(e.target.value)} placeholder='horário início' value={begin}></input>
                <input type='number' onChange={(e)=>setEnd(e.target.value)} placeholder='horário fim' value={end}></input>            
            </div>  
            <div>
                <input onChange={(e)=>setTitle(e.target.value)} placeholder='título' value={title}></input>
                <span>
                    <button onClick={saveHabit}>Save</button>
                </span>
            </div>
        </Form>
        </DaysType>
            : */
            const InputDate=styled.input`height:28px;width:70px;
            background-color:#F7DEBB;color:#6B491A;
            font-size:17px;border:1.2px solid #6B491A;border-radius:5px;
            margin:0px 3% 0px 0px;padding-left:6px
            `
        const TypeChoice=styled.button`
        height:33px;top:10px;right:10px;z-index:7;
            ;border-radius:7px;
        font-size:16px;border:0;margin:0 3% 0 0px;
        p{text-align:center;}
        display:flex;align-items:center;justify-content:center;
        color:${props=>props.selected?'white':'#6B491A'};
        background-color:${props=>props.selected?'#6B491A':'#cec5b7'}
        `
        