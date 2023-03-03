import styled, { css } from 'styled-components'

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger' | 'success'
}

function Button(props: ButtonProps) {
  const { variant } = props

  return <StyledContainer variant={variant}>Enviar</StyledContainer>
}

export default Button

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
}

const StyledContainer = styled.button<Pick<ButtonProps, 'variant'>>`
  width: 100px;
  height: 40px;

  ${({ variant }) =>
    css`
      background-color: ${buttonVariants[variant]};
    `}
`
