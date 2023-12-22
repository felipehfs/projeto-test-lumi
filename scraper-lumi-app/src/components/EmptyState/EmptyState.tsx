import { Container, Image, Title, Text} from './EmptyState.styles'
import imgSrc from '../../assets/img/emptyState.png'

function EmptyState() {
  return (
    <Container>
      <Image src={imgSrc} alt="Not found image" />
      <Title>Nada Encontrado</Title>
      <Text>Ops! Algo deu errado, Tente novamente com um novo valor.</Text>
    </Container>
  )
}

export default EmptyState
