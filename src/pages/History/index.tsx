import { useContext } from 'react'
import { HistoryContainer, HistoryList, Status } from './styles'
import { Trash } from 'phosphor-react'
import { CyclesContext } from '../../contexts/CyclesContext'

import { ptBR } from 'date-fns/locale/pt-BR'

import { formatDistanceToNow } from 'date-fns'

export function History() {
  const { cycles, DeleteCycleHistory } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>History</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(cycle => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, {
                      addSuffix: true,
                      locale: ptBR
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <Status statusColor='green'>
                        Concluído
                        <Trash
                          size={16}
                          onClick={() => DeleteCycleHistory(cycle.id)}
                        />
                      </Status>
                    )}
                    {cycle.interruptedDate && (
                      <Status statusColor='red'>
                        Interrompido
                        <Trash
                          size={16}
                          onClick={() => DeleteCycleHistory(cycle.id)}
                        />
                      </Status>
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <Status statusColor='yellow'>Em andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
