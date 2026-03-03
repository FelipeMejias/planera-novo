import styled from 'styled-components'
import { useContext } from 'react';
import {  AiOutlineClose } from 'react-icons/ai';
//import { jsPDF } from 'jspdf';
import Context from './utils/Context';
export default function Preferences({myHabits,findHabits,setPopUp}){
    const {preferences,setPreferences}=useContext(Context)
    const {scale,with_sab_dom,axis}=preferences
    function changeScale(value){
        savePreference({...preferences,scale:value})
        findHabits(null,value)
    }
    function change_sab_dom(value){
        savePreference({...preferences,with_sab_dom:value})
    }
    function change_axis(value){
        savePreference({...preferences,axis:value})
    }
    function savePreference(pref){
        setPreferences(pref)
        localStorage.setItem("pref", JSON.stringify(pref))
    }
    function gerarPDF() {
       /* const doc = new jsPDF();
       
        // Definições iniciais
        let margemX = 10;
        let margemY = 10;
        let larguraCaixa = 40;
        let alturaLinha = 10;
        let raioBorda = 5; // Raio para borda arredondada
    
        // Lista de eventos com posição e cor
        let eventos = [
            { title: "Segunda", x: 5, y: 10, w: 36, h: 10, color: [186, 186, 186] },  // Cinza
            { title: "Terça", x: 42, y: 10, w: 36, h: 10, color: [186, 186, 186] },  // Cinza
            { title: "Quarta", x: 85, y: 10, w: 36, h: 10, color: [186, 186, 186] },  // Cinza
            { title: "Quinta", x: 128, y: 10, w: 36, h: 10, color: [186, 186, 186] },  // Cinza
            { title: "Sexta", x: 166, y: 10, w: 36, h: 10, color: [186, 186, 186] },  // Cinza

            { title: "Festa", x: 5, y: 30, w: 36, h: 10, color: [255, 221, 51] },  // Amarelo
            { title: "Aula", x: 42, y: 70, w: 36, h: 20, color: [100, 149, 237] }, // Azul
            { title: "Treino", x: 85, y: 50, w: 36, h: 50, color: [255, 140, 102] }, // Laranja
            { title: "Aula", x: 128, y: 130, w: 36, h: 30, color: [100, 149, 237] } ,// Azul
            { title: "Novo", x: 166, y: 130, w: 36, h: 30, color: [100, 149, 237] } // Azul
        ];
    
        // Criando cada evento como uma caixa colorida
        eventos.forEach(evento => {
            doc.setFillColor(...evento.color);
            doc.roundedRect(evento.x, evento.y, evento.w, evento.h, raioBorda, raioBorda, "F"); // Criar a caixa com bordas arredondadas
            doc.setTextColor(0, 0, 0); // Texto preto
            doc.setFont("helvetica");
            doc.setFontSize(18);
            // Centralizar o texto na caixa
            let textoWidth = doc.getTextWidth(evento.title);
            let textoX = evento.x + (evento.w - textoWidth) / 2;
            let textoY = evento.y + evento.h / 2 + 3; // Ajuste para centralizar verticalmente
            doc.text(evento.title, textoX, textoY);
        });
    
        doc.save("meus-eventos.pdf");
        */
    }
    

    return(
        <>
        <Overlay onClick={()=>setPopUp('')}></Overlay>
        <Content>
        <Button color='black' closeNewNote={true} onClick={()=>setPopUp('')}><ion-icon name="close"></ion-icon></Button>
            <Labels>
            <h1>Sab/Dom:</h1>
            <h1>Zoom:</h1>
            {/*<h1>Gerar PDF:</h1>*/}
            {/*<h3>Estilo:</h3>*/}
               
            </Labels>
            <div>
                <ul>
                    <Choice onClick={()=>change_sab_dom(false)} selected={!with_sab_dom}>Off</Choice>
                    <Choice onClick={()=>change_sab_dom(true)} selected={with_sab_dom}>On</Choice>
                </ul>
                <ul>
                    <Choice width='43px' onClick={()=>changeScale(700)} selected={scale===700}>P</Choice>
                    <Choice width='43px' onClick={()=>changeScale(1000)} selected={scale===1000}>M</Choice>
                    <Choice width='43px' onClick={()=>changeScale(1400)} selected={scale===1400}>G</Choice>
                </ul>
                {/*<ul>
                    <But onClick={gerarPDF}>Exportar</But>
                </ul>*/}
            
                {/*<ul>
                    <Choice onClick={()=>change_axis(true)} selected={axis}>Quadro</Choice>
                    <Choice onClick={()=>change_axis(false)} selected={!axis}>Lista</Choice>
                </ul>*/}
            </div>
            
        </Content>   </>          
    )
}
const But=styled.button`
width:120px;border-radius:10px;font-size:15px;height:40px;
    color:white;
border-radius:10px;font-size:15px;height:35px;border:0;
display:flex;justify-content:center;align-items:center;margin:5px;
background-color:green

`
const Overlay=styled.div`z-index:15;
background-color: rgba(0, 0, 0, 0.4);;position:fixed;height:100vh;width:100vw
`
const Labels=styled.section`
width:20%;display:flex;flex-direction:column;
height:100%;
align-items:flex-end;margin-right:10px;
h1{height:50px;margin:22px 0 0 0;display:flex;justify-content:center;align-items:center;}
`

const Button=styled.button`
height:40px;position:${props=>props.closeNewNote?'absolute;top:10px;right:10px;z-index:7':'block'}
    ;width:40px;border-radius:10px;
    ;background-color:#fff8ef;
font-size:23px;border:0;
display:flex;align-items:center;justify-content:center;
color:${props=>props.color};
`
const Choice=styled.button`
width:${props=>props.width||'70px'};
font-size:15px;height:40px;
border-radius:100px;font-size:15px;height:35px;border:0;
display:flex;justify-content:center;align-items:center;margin:5px;
background-color:${props=>props.selected?'#6B491A':'#c1c1c1'};
color:${props=>props.selected?'white':'#6B491A'};
@media(min-width:1050px){
    width:70px
}
`

const Content=styled.div`padding:10px 0 10px 15px;
span{display:flex;align-items:center;}
div{display:flex;flex-direction:column;height:100%;justify-content:space-evenly}
ul{display:flex;align-items:center;}
position:fixed;
position:fixed;z-index:16;width:90vw;top:18vh;
height:30vh;
max-width:500px;

;min-height:190px;
display:flex;box-sizing:border-box;
    background-color: #fff8ef;
    border-radius: 1.5vh;
    height:20vh;
    ul{
        display:flex;justify-content:center;align-items:center;
        
    }
    input{width:80%}
    button{cursor:pointer}

    @media(min-width:1050px){
        ;border:0;
    } 
`