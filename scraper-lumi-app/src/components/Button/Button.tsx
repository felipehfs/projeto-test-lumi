import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { ButtonVariant, Container,  } from './Button.styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: ButtonVariant
}

export default function Button({children, variant = 'default', ...rest}: PropsWithChildren<ButtonProps>) {
  return (
    <Container {...rest} variant={variant}>
      {children}
    </Container>
  )
}
