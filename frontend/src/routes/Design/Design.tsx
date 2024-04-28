import { ReactNode } from "react";
import {
  Container,
  Header,
  Section,
  SectionHeader,
  Row,
} from "./Design.styled";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

type ComponentSectionProps = {
  title: string;
  children: ReactNode;
};

const ComponentSection = ({ title, children }: ComponentSectionProps) => {
  return (
    <Section>
      <SectionHeader>{title}</SectionHeader>
      <Row>{children}</Row>
    </Section>
  );
};

const Design = () => {
  return (
    <Container>
      <Header>Components page</Header>
      <ComponentSection title="Buttons">
        <Button>default</Button>
        <Button disabled>disabled</Button>
        <Button color="red">red</Button>
        <Button icon="plus">with icon</Button>
      </ComponentSection>
      <ComponentSection title="Inputs">
        <Input type="text" />
        <Input placeholder="placeholder" />
        <Input error value="wrong value" />
      </ComponentSection>
    </Container>
  );
};

export default Design;
