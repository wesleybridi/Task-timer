import { produce } from 'immer'
import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE: {
      return produce(state, draft => {
        draft.cycles.unshift(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        cycle => cycle.id === state.activeCycleId
      )

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, draft => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(
        cycle => cycle.id === state.activeCycleId
      )

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, draft => {
        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.activeCycleId = null
      })
    }
    case ActionTypes.DELETE_CYCLE_HISTORY: {
      console.log(state.cycles)
      console.log(
        state.cycles.filter(item => {
          return item.id !== action.payload.id
        })
      )
      return produce(state, draft => {
        draft.cycles = state.cycles.filter(item => {
          return item.id !== action.payload.id
        })
      })
    }
    default:
      return state
  }
}
