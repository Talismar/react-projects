import React, { useContext } from 'react'
import styled from 'styled-components'
import { CyclesContext } from '../../context/CyclesContext'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <StyledHistoryContainer>
      <h1>History</h1>

      {/* <pre>{JSON.stringify(cycles, null, 2)}</pre> */}
      <StyledHistoryList>
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
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <StyledStatus statusColor="green">Concluído</StyledStatus>
                    )}

                    {cycle.interruptedDate && (
                      <StyledStatus statusColor="red">
                        Interrompído
                      </StyledStatus>
                    )}

                    {!cycle.interruptedDate && !cycle.finishedDate && (
                      <StyledStatus statusColor="yellow">
                        Em andamento
                      </StyledStatus>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </StyledHistoryList>
    </StyledHistoryContainer>
  )
}

export default History

const StyledHistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme['gray-100']};
  }
`

const StyledHistoryList = styled.div`
  flex: 1;
  overflow: auto; // Generator scrollable
  margin-top: 2rem;

  table {
    width: 100%;

    border-collapse: collapse;
    min-width: 600px; // Force generated scrrolling when the table is size 600

    th {
      background-color: ${({ theme }) => theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${({ theme }) => theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${({ theme }) => theme['gray-700']};
      border-color: ${({ theme }) => theme['gray-800']};

      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`
const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS
}

export const StyledStatus = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${({ theme, statusColor }) =>
      theme[STATUS_COLORS[statusColor]]};
  }
`
