import { InputHTMLAttributes } from "react";
import { Container, Input, Label } from "./TextInput.styles";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
};

export default function TextInput({ label, id, ...rest }: TextInputProps) {
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...rest} />
    </Container>
  );
}
