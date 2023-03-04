import { styled } from './styles'
import { ComponentProps } from 'react'

export const Button = styled('button', {
  fontFamily: '$default',
  backgroundColor: '$gray500',
  borderRadius: '$md',
  padding: '$4',
  height: '$10',

  variants: {
    size: {
      small: {
        fontSize: 14,
        padding: '$2 $6',
      },
      big: {
        fontSize: 16,
        padding: '$3 $6',
      },
    },
  },

  defaultVariants: {
    size: 'small',
  },
})

export type ButtonProps = ComponentProps<typeof Button>

export function App() {
  return <Button>Teste</Button>
}
