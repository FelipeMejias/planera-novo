import styled from "styled-components";
import Mostrador from "./Mostrador";

export default function Tecladinho({formers}) {
    const {comeco,setComeco,begin,setBegin,end,setEnd}=formers
    function isClickable(car){
        const atual= comeco?begin:end
        const tamAtual=atual.length
        if(tamAtual>0 && car=='')return true
        if(tamAtual==0 && ['',':'].includes(car))return false

        if(atual.includes(':')){
            if(car==':')return false
            const min=atual.split(':')[1]
            if(min.length==0){
                if(['0','1','2','3','4','5'].includes(car))return true
            }else if(min.length==1){
                return true
            }else{
                if(car==':')return true
            }
        }else{
            if(tamAtual==0){
                return true
            }else if(tamAtual==1){
                if(atual=='1'){
                    return true
                }else if(atual=='2'){
                    if(['0','1','2','3','4',':'].includes(car))return true
                }else{
                    if(car==':')return true
                }
            }else{
                if(car==':')return true
            }
        }
        return false
    }
    function change(carac){
        let str=comeco?begin:end
        if(carac){
            str+=carac
        }else{
            str=str.slice(0,str.length-1)
        }
        comeco?setBegin(str):setEnd(str)
    }
    return (
        <Content>
            <Fundo topo={comeco}/>
            <Placar>
                <Mostrador valor={begin} titulo={'Início:'} borda={!comeco} handleClick={()=>setComeco(true)}/>
                <Mostrador valor={end} titulo={'Fim:'} borda={comeco} handleClick={()=>setComeco(false)}/>
            </Placar>
            <Numeros>
                <B disabled={!isClickable('1')} onClick={()=>change('1')} c={'gray'} >1</B>
                <B disabled={!isClickable('2')} onClick={()=>change('2')} c={'gray'} >2</B>
                <B disabled={!isClickable('3')} onClick={()=>change('3')} c={'gray'} >3</B>
                <B disabled={!isClickable('4')} onClick={()=>change('4')} c={'gray'} >4</B>
                <B disabled={!isClickable('5')} onClick={()=>change('5')} c={'gray'} >5</B>
                <B disabled={!isClickable('6')} onClick={()=>change('6')} c={'gray'} >6</B>
                <B disabled={!isClickable('7')} onClick={()=>change('7')} c={'gray'} >7</B>
                <B disabled={!isClickable('8')} onClick={()=>change('8')} c={'gray'} >8</B>
                <B disabled={!isClickable('9')} onClick={()=>change('9')} c={'gray'} >9</B>
                <B disabled={!isClickable('')} onClick={()=>change('')} c={'brown'} >{'<'}</B>
                <B disabled={!isClickable('0')} onClick={()=>change('0')} c={'gray'} >0</B>
                <B disabled={!isClickable(':')} onClick={()=>change(':')} c={'blue'} >:</B>
            </Numeros>
            
        </Content>
    )
}
const Fundo=styled.div`
position:absolute;
z-index:0;
top:${p=>p.topo?'0':''};
bottom:${p=>p.topo?'':'0'};
right:100px;
background:#7bf29d;width:100px;height:150px;
`
const Placar = styled.div`
flex-direction:column;
    display:flex;background-color:;
    justify-content:space-between;
    width:calc(100% - 150px);
    height:200px;
`;
const Numeros = styled.div`
    display:flex;background-color:#7bf29d;
    align-items:space-between;
    justify-content:space-between;
    width:150px;border-radius:10px;
    height:200px;padding:7px;box-sizing:border-box;
    flex-wrap:wrap;z-index:0;
`;
const Content = styled.div`position:relative;
    display:flex;background-color:;
    align-items:center;
    justify-content:space-between;
    width:100%;
    height:200px;margin-top:10px;
`;
const B=styled.button`
font-size:20px;font-weight:200;
cursor:${props=>props.disabled?'not-allowed !important':'pointer'};
border:0;
   display:flex;color:white;
    align-items:center;
    justify-content:center;
height:calc(25% - 2px);width:calc(33.3333% - 1.7px);
background-color:${props=>props.disabled?'#BF9240':props=>props.c};border-radius:10px;
opacity:${props=>props.disabled?'50%':''}
`