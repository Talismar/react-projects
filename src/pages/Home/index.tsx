/* eslint-disable no-unused-vars */
import { HandPalm, Play } from 'phosphor-react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

// controlled / uncontrolled - INPUT
// controlled - STATES
// uncontrolled - Acessar os valores do input pelo document

/**
 * function register(name: string) {
 *
 *  return {
 *      onChange: () => void,
 *      onBlur: () => void,
 *      onFocus: () => void
 *    }
 *  }
 *
 *  O react-hook-form integra com qualquer biblioteca de
 *  validação de formulario, yup, zod, joi, etc...
 *  E para essta integração precisamos instalar uma outra
 *  biblioteca (@hookform/resolvers)
 *
 * */

// console.log(formState.errors)

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface Props {}
function Home(props: Props) {
  const [cycles, setCyles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, formState, reset } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 5,
      },
    })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch('task') // controlled
  const isSubmitDisabled = !task
  // console.log(activeCycle)

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDiff >= totalSeconds) {
          setCyles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )
          setAmountSecondsPassed(totalSeconds)
          setActiveCycleId(null)
        } else {
          setAmountSecondsPassed(secondsDiff)
        }
      }, 1000)
    }

    return () => {
      // Executa toda fez que uma nova execução ocorrer,
      // podemos limpar algo da execução anterior
      console.warn('Executor')
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCyles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset()
  }

  function handleInterruptCycle() {
    setCyles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }

  console.log(cycles)

  return (
    <StyledHomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
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

        <StyledCountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <StyledSeparator>:</StyledSeparator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </StyledCountdownContainer>

        {activeCycle ? (
          <StyledStopCountdownButton
            type="button"
            onClick={handleInterruptCycle}
          >
            <HandPalm size={24} />
            Começar
          </StyledStopCountdownButton>
        ) : (
          <StyledStartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StyledStartCountdownButton>
        )}
      </form>
    </StyledHomeContainer>
  )
}

export default Home

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

const StyledHomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
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

const StyledBaseButton = styled.button`
  color: ${({ theme }) => theme['gray-100']};
  font-weight: bold;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 8px;
  width: 100%;

  cursor: pointer;
  border: 0;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const StyledStartCountdownButton = styled(StyledBaseButton)`
  background-color: ${({ theme }) => theme['green-500']};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme['green-700']};
  }
`

const StyledStopCountdownButton = styled(StyledBaseButton)`
  background-color: ${({ theme }) => theme['red-500']};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme['red-700']};
  }
`
