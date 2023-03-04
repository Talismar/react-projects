import { Cycle } from './reducer'

/* eslint-disable no-unused-vars */
export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
  RESET_ACTIVE_CYCLE_ID = 'RESET_ACTIVE_CYCLE_ID',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: 'ADD_NEW_CYCLE',
    payload: {
      newCycle,
    },
  }
}

export function markCurrentCycleAsInterruptAction() {
  return {
    type: 'INTERRUPT_CURRENT_CYCLE',
  }
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
  }
}

export function resetActiveCycleIdAction() {
  return {
    type: 'RESET_ACTIVE_CYCLE_ID',
  }
}
