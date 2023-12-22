import { css } from '@emotion/react';
import styled from '@emotion/styled'

export const Container = styled.div`
    padding: 16px;
    border-radius: 8px;
    width: 100%;
    ${({ theme}) => css`
        background-color: ${theme.color.white};

    `}
`;