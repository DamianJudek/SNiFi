import { ReactNode, useState } from "react";
import {
  Container,
  Header,
  Section,
  SectionHeader,
  Row,
} from "./Design.styled";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Switch from "../../components/Switch/Switch";

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
  const [selectValue, setSelectValue] = useState<string>("");
  const [switchChecked, setSwitchChecked] = useState<boolean>(false);

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
      <ComponentSection title="Select">
        <Select
          value={selectValue}
          setValue={setSelectValue}
          label="protocol"
          options={[
            { name: "http", value: "http" },
            { name: "https", value: "https" },
          ]}
        />
        <Select
          value={selectValue}
          setValue={setSelectValue}
          label="protocol"
          options={[
            { name: "http", value: "http" },
            { name: "https", value: "https" },
          ]}
        />
      </ComponentSection>
      <ComponentSection title="Switch">
        <Switch
          checked={switchChecked}
          setChecked={setSwitchChecked}
          label="enable"
        />
      </ComponentSection>
    </Container>
  );
};

export default Design;
