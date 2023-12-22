import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div``
export const Label = styled.label`
    font-size: 1.4rem;
    font-weight: bold;
    color: ${({ theme }) => theme.color.white};
`
export const Input = styled.input`
    border: none;
    width: 100%;
    font-size: 1.8rem;
    background-color: transparent;
    outline: none;
    ${({ theme }) => css`
        border-bottom: 2px solid ${theme.color.white};
        color: ${theme.color.white};
    `}

`