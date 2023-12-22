import { css } from '@emotion/react'
import styled from '@emotion/styled'


export type ButtonVariant = 'default' | 'primary'

type ContainerProps = {
  variant?: ButtonVariant  
} 



export const Container = styled.button<ContainerProps>`
    border: none;
    padding: .8rem 1.6rem;
    border-radius: 8px;
    font-weight: bold;
    
    &:active {
        background-color: ${({theme}) => theme.color.cyan};   
    }
    
    ${({ theme, variant}) => variant === 'default' && css`
        background-color: ${theme.color.white};
    `}

    ${({ theme, variant}) => variant === 'primary' && css`
        background-color: ${theme.color.primary};
        color: ${theme.color.white};
    `}

    &:has(svg) {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .8rem;
    }
`