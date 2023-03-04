/* eslint-disable no-unused-vars */
import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  addNewCycleAction,
  markCurrentCycleAsFinishedAction,
  markCurrentCycleAsInterruptAction,
  resetActiveCycleIdAction,
} from '../reducers/cycles/actions'
import { reducer, Cycle } from '../reducers/cycles/reducer'

interface CyclesContextTypes {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished(): void
  markCurrentCycleAsInterrupt(): void
  createNewCycle(
    newCycle: Cycle,
    resetForm?: (values?: any | undefined) => void,
  ): void
  setSecondsPassed(seconds: number): void
  amountSecondsPassed: number
  resetActiveCycleId(): void
}

const CyclesContext = createContext({} as CyclesContextTypes)

interface CyclesProviderProps {
  children: ReactNode
}

function CyclesProvider({ children }: CyclesProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    reducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cyclesState.cycles.find(
    (cycle) => cycle.id === activeCycleId,
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function markCurrentCycleAsInterrupt() {
    dispatch(markCurrentCycleAsInterruptAction())
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function resetActiveCycleId() {
    dispatch(resetActiveCycleIdAction())
  }

  function createNewCycle(
    newCycle: Cycle,
    resetForm: (values?: any | undefined) => void,
  ) {
    // setCyles((state) => [...state, newCycle])

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)

    resetForm()
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        markCurrentCycleAsInterrupt,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        resetActiveCycleId,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

export { CyclesContext, CyclesProvider }
