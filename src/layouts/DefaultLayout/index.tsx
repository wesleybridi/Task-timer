import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header/index.tsx'
import { LayoutContainer } from './styles.ts'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext.tsx'
import { differenceInSeconds } from 'date-fns'

export function DefaultLayout() {
  const {
    activeCycle,
    minutes,
    seconds,
    totalSeconds,
    markCurrentCycleAsFinished,
    setSecondsPassed
  } = useContext(CyclesContext)

  // Countdown on page title
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'Timer'
    }
  }, [activeCycle, minutes, seconds])

  // Timer tick
  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 500)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, markCurrentCycleAsFinished, setSecondsPassed])

  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  )
}
