import { HandPalm, Play } from 'phosphor-react'

import { NewCycleForm } from './NewCycleForm'

import { CyclesContext } from '../../contexts/CyclesContext'

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton
} from './styles'
import { Countdown } from './Countdown'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useContext } from 'react'

// Validation
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Name your task'),
  minutesAmount: zod
    .number()
    .min(5, 'The task has to be at least 5 minutes long')
    .max(60, 'The task has to be maximum 60 minutes long')
})
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { CreateNewCycle, activeCycle, InterruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: NewCycleFormData) {
    CreateNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action=''>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {/* Begin | End -> Button */}
        {activeCycle ? (
          <StopCountDownButton type='button' onClick={InterruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type='submit'>
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
