import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { CyclesContext } from '../../context/CyclesContext'

function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <StyledFormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <StyledTaskInput
        type="text"
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Project 1" />
        <option value="Project 2" />
        <option value="Project 3" />
      </datalist>

      <label htmlFor="minutesAmount">durange</label>
      <StyledMinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        // step={5}
        // min={5}
        // max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', {
          valueAsNumber: true,
        })}
      />

      <span>minutos.</span>
    </StyledFormContainer>
  )
}

export default NewCycleForm

const BaseInput = styled.input`
  background-color: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme['gray-500']};
  font-weight: bold;
  font-size: inherit;
  padding: 0 0.5rem;

  color: ${({ theme }) => theme['gray-100']};

  &:focus {
    box-shadow: none;
    border-color: ${({ theme }) => theme['green-500']};
  }

  &::placeholder {
    color: ${({ theme }) => theme['gray-500']};
  }

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

const StyledTaskInput = styled(BaseInput)`
  /* 
    flex: 1;

    É um shorthand para

    flex-grow: 1; - Pode esticar
    flex-shrink: 1; - Pode Espremer
    flex-basis: 1; - Qual tamanho ideal do elemento senao estiver no flex-grow and flex-shrink
  */

  flex: 1;
`

const StyledMinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`

const StyledFormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`
