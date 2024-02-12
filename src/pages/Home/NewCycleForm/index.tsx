import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../../../contexts/CyclesContext'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor='task'>Vou trabalhar em</label>
      <TaskInput
        id='task'
        list='task-suggestion'
        placeholder='Dê um nome para o seu projeto'
        {...register('task')}
        disabled={!!activeCycle}
      />

      <datalist id='task-suggestions'>
        <option value='Projeto 1' />
        <option value='Projeto 2' />
        <option value='Projeto 3' />
        <option value='Projeto 4' />
      </datalist>

      <label htmlFor='minutesAmount'>durante</label>
      <MinutesAmountInput
        id='minutesAmount'
        type='number'
        step={5}
        min={0}
        {...register('minutesAmount', { valueAsNumber: true })}
        disabled={!!activeCycle}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
