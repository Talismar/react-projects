import React from 'react'
import styled from 'styled-components'

interface Props {}

function History(props: Props) {
  // const {} = props

  return (
    <StyledHistoryContainer>
      <h1>History</h1>

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
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>11:50</td>
              <td>
                <StyledStatus statusColor="green">Conclído</StyledStatus>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>11:50</td>
              <td>
                <StyledStatus statusColor="yellow">Em andamento</StyledStatus>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>11:50</td>
              <td>
                <StyledStatus statusColor="red">Interropido</StyledStatus>
              </td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>11:50</td>
              <td>
                <StyledStatus statusColor="green">Conclído</StyledStatus>
              </td>
            </tr>
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
