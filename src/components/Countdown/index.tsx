import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { CyclesContext } from '../../context/CyclesContext'
import { differenceInSeconds } from 'date-fns'

function Countdown() {
  const {
    activeCycle,
    markCurrentCycleAsFinished,
    resetActiveCycleId,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDiff >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          resetActiveCycleId()
        } else {
          setSecondsPassed(secondsDiff)
        }
      }, 1000)
    }

    return () => {
      // Executa toda fez que uma nova execução ocorrer,
      // podemos limpar algo da execução anterior
      // console.warn('Clear Interval')
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    markCurrentCycleAsFinished,
    resetActiveCycleId,
    setSecondsPassed,
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <StyledCountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <StyledSeparator>:</StyledSeparator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </StyledCountdownContainer>
  )
}

export default Countdown

const StyledCountdownContainer = styled.div`
  /* width: 100%; */
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${({ theme }) => theme['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background-color: ${({ theme }) => theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`
const StyledSeparator = styled.div`
  padding: 2rem 0;
  color: ${({ theme }) => theme['green-500']};

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`
