import styled from "styled-components";

export default function Mostrador({titulo,valor,borda,handleClick}) {
    return (
        <Content onClick={handleClick} borda={borda}>
          <h1>{titulo||'00:00'}</h1>
          <h2 style={{color:valor?'black':'gray'}} >{valor||'00:00'}</h2>
        </Content>
    )
}

const Content = styled.div`
    display:flex;flex-direction:column;
    background-color:${p=>p.borda?'#fff8ef;':'#7bf29d'};
    align-items:flex-start;padding:${p=>p.borda?10:20}px;
    width:100%;border-radius:10px;
    height:50%;border:${p=>p.borda?'10px solid #fff8ef':''};
    box-sizing:border-box;
    z-index:1;cursor:pointer;
h1{margin:0 0 10px 0;font-size:18px;font-weight:500;color:black}
h2{width:50px;border-radius:5px;padding:7px;background:#${p=>p.borda?'edcf9c':'61c67e'};margin:0 0 0 0;font-size:18px;font-weight:500;color:black}
`;
