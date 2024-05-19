import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Button from "../Button/Button";
import {
  Container,
  Header,
  FileUploaderWrapper,
  StyledAlert,
  Icon,
  Info,
  InfoButton,
  FileAnnounce,
  FileName,
} from "./ManualScan.styled";
import fileIcon from "../../assets/icons/fileSearch.svg";

const fileTypes = ["PCAP", "JPG", "PNG", "GIF"];

const ManualScan = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extensionError, setExtensionError] = useState<boolean>(false);
  const [sizeError, setSizeError] = useState<boolean>(false);

  const handleChange = (file: File) => {
    setFile(file);
    setExtensionError(false);
    setSizeError(false);
  };

  const handleTypeError = () => setExtensionError(true);

  const handleSizeError = () => setSizeError(true);

  const DragAndDropContent = (
    <>
      {extensionError && (
        <StyledAlert severity="error" variant="outlined">
          Wrong file extension. Allowed: {fileTypes.join(", ")}
        </StyledAlert>
      )}
      {sizeError && (
        <StyledAlert severity="error" variant="outlined">
          The file should be less than 10MB
        </StyledAlert>
      )}
      <Icon src={fileIcon} />
      <Info>
        <InfoButton>Choose a file</InfoButton> or drag it here
      </Info>
    </>
  );

  const fallbackFileName = "<not selected>";

  const buttonDisabled = extensionError || sizeError || !file;

  return (
    <Container>
      <Header>
        <FileAnnounce>
          File name: <FileName>{file?.name ?? fallbackFileName}</FileName>
        </FileAnnounce>
        <Button disabled={buttonDisabled}>Scan</Button>
      </Header>
      <FileUploaderWrapper>
        <FileUploader
          handleChange={handleChange}
          name="pcap file form"
          label="send pcap file to scan"
          hoverTitle="Drop here"
          types={fileTypes}
          maxSize={10}
          minSize={0}
          onTypeError={handleTypeError}
          onSizeError={handleSizeError}
          children={DragAndDropContent}
          dropMessageStyle={{
            backgroundColor: "#51878a",
            color: "#fff",
            fontFamily: "Roboto",
            opacity: 0.8,
            fontWeight: 400,
          }}
        />
      </FileUploaderWrapper>
    </Container>
  );
};

export default ManualScan;
