import { useEffect, useState } from "react";
import './App.css';


function PomodoroTimer(){
  const [minutos,setMinutos] = useState(25); //começa com 25 minutos
  const [segundos, setSegundos] =useState(0);
  const [isRunning, setIsRunning] =useState(false);// false começa parado 
  const [isBreak, setIsBreak] =useState(false);

  useEffect(() => {
    let intervalo;
    if(isRunning){
      intervalo =setInterval(()=> {
        if(segundos === 0 ) {
          if(minutos === 0){
            clearInterval(intervalo);
            if(!isBreak){
                /* !='negação' ou seja quando for tal coisa*/ 
              handleTimerEnd();
            } else{
              handleBreakEnd();
            }
          } else{
            setMinutos((contagemRegressivaMinutos) => contagemRegressivaMinutos -1); //degrementa os minutos
            setSegundos(59); //define os segundos para 59s
          }
        }

        else{
          setSegundos((contagemRegressivaSegundos) => contagemRegressivaSegundos -1); //degrementa os Segundos
        }
      }, 1000); //mil milisegundos= 1 segundo
    } else{
      clearInterval(intervalo);
    }
    return() => clearInterval(intervalo);
  }, [isRunning, minutos, segundos, isBreak]); //dependencias do useEffects 

  const handleStartTimer = () => {
    setIsRunning(true) //muda o estado da var. isrunning para true, oq faz o tempo correr
  }
  const handleStopTimer = () => {
    setIsRunning(false)
  }
  const handleResetTimer = () => {
    setIsRunning(false)
    setMinutos(25) //reinicia p 25min
    setSegundos(0)
    setIsBreak(false)
  }
  const handleTimerEnd = () => {
    alert('Tempo esgotado! Tire 5 minutos livres!')
    setMinutos(5)
    setSegundos(0)
    setIsBreak(true)
    setIsRunning(true)
  }
  const handleBreakEnd = () =>{
    alert('Hora de voltar ao trabalho!')
    setMinutos(25)
    setSegundos(0)
    setIsBreak(false)
    setIsRunning(true)
  }
  return(
    <div className="container">
      <h1>Pomodoro Timer 🤓</h1>
      <div className="timer">
        {minutos < 10 ? `0${minutos}`: minutos}:{segundos < 10 ? `0${segundos}`: segundos}
      </div>
      <div className="buttons">
        {/* quando for diferente de isRunning, ou seja,"false" o cronometro fica parado e o botão fica escrito reiniciar, 
        quando é clicado o isRunning vira true, o cronometro liga o botão se transforme em um escrito parar */}
        {!isRunning ? (
          <button onClick={handleStartTimer}>Iniciar</button>
        ):(
          <button onClick={handleStopTimer}>Parar</button>
        )} {/*isto é um if else, if inicia ou para */}
        <button onClick={handleResetTimer}>Reiniciar</button>
      </div>
    </div>
  );
}

export default PomodoroTimer;