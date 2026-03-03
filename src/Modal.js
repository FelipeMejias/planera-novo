import styled from "styled-components";

export default function Modal({ buttons, functionNo, functionYes, text }) {
    return (
        <Overlay>
            {buttons?
            <Content>
                <h3>Deletar<strong>{` ${text} `}</strong> ?</h3>
                
                <ButtonsContainer>
                    <ButtonNo onClick={()=>functionNo()}><p>Não</p></ButtonNo>
                    <ButtonYes onClick={()=>functionYes()}><p>Sim</p></ButtonYes>
                </ButtonsContainer>
            </Content>:
            <Content>
                <h3>{text}</h3>
                <ButtonYes onClick={()=>functionYes()}><p>OK</p></ButtonYes>
            </Content>
            }
        </Overlay>
    )
}
const ButtonsContainer=styled.div`
width:250px;display:flex;flex-direction:row;justify-content:center;
`

const Overlay = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    position:fixed;z-index:14;
    top:0;left:0;
    width:100vw;
    height:100vh;
    background-color: rgba(255, 255, 255, 0.6);
`;

const Content = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-evenly;
    width:90vw;
    max-width: 400px;
    height: 200px;
    background-color: #333333;
    border-radius: 50px;
    padding:0 20px 0 20px;
    box-sizing:border-box;
    h3{color:white;
        font-style: normal;
        
        font-size: 23px;
        text-align: center;
        position:block;
        strong{font-weight: 700;}
    }
    p{
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
    }
    button{cursor:pointer}
`;

const ButtonNo = styled.button`
    color:#1877F2;
    background-color: #FFFFFF;
    width: 100px;
    height: 37px;
    border-radius: 5px;
    border:0;
    margin-right:20px;
`;

const ButtonYes = styled.button`
    color:#FFFFFF;
    background-color:#1877F2;
    width: 100px;
    height: 37px;
    border-radius: 5px;
    border:0;
`;