/* eslint-disable no-unused-vars */
import { HandPalm, Play } from 'phosphor-react'
import styled from 'styled-components'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext, useState } from 'react'
import { CyclesContext } from '../../context/CyclesContext'
import NewCycleForm from '../../components/NewCycleForm'
import Countdown from '../../components/Countdown'

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

function Home() {
  const { activeCycle, markCurrentCycleAsInterrupt, createNewCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })

  const { watch, handleSubmit, reset } = newCycleForm
  const task = watch('task') // controlled
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    createNewCycle(newCycle, reset)
  }

  function handleInterruptCycle() {
    markCurrentCycleAsInterrupt()
  }

  return (
    <StyledHomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

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
