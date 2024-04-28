import { ReactNode } from "react";
import {
  Container,
  Header,
  Section,
  SectionHeader,
  Row,
} from "./Design.styled";
import Button from "../../components/Button/Button";

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
        <Button disabled>disabled</Button>
        <Button>default</Button>
        <Button color="red">red</Button>
        <Button icon="plus">with icon</Button>
      </ComponentSection>
    </Container>
  );
};

export default Design;
