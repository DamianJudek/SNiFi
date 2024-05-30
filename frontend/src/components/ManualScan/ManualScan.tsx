import { useState, useEffect } from "react";
import useAlert from "../../hooks/useAlert";
import { sendPcapFile, getPredictStatus, getPredictResult } from "../../api";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import { CircularLoader } from "../Loader/Loader";
import ManualScanResult from "../ManualScanResult/ManualScanResult";
import { ManualScanResulResponse } from "../ManualScanResult/ManualScanResult.interface";
import { Container, LoadingContainer, Header } from "./ManualScan.styled";

const ManualScan = () => {
  const [file, setFile] = useState<File | null>(null);
  const [currentScanId, setCurrentScanId] = useState<string>("");
  const [scanning, setScanning] = useState<boolean>(false);
  const [result, setResult] = useState<ManualScanResulResponse | null>();
  const [showAlert, Alert] = useAlert({});

  const scanFile = () => {
    sendPcapFile(file!)
      .then((res) => {
        if (res.status === 202) {
          return res.json();
        }
        throw res.json();
      })
      .then((res) => {
        setCurrentScanId(res.scanId);
        setScanning(true);
        showAlert("File uploaded succesfully", "success");
      })
      .catch((err) => {
        console.error("Error fetching notifications", err);
        showAlert("Error fetching notifications", "error");
        reset();
      });
  };

  const getStatus = () => {
    getPredictStatus(currentScanId)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw res.json();
      })
      .then((res) => {
        setCurrentScanId(res.scanId);
        setScanning(true);

        if (!res.inProgress && res.status === "processed") {
          getResult();
          setScanning(false);
        } else if (res.inProgress) {
          setTimeout(getStatus, 500);
        }
      })
      .catch((err) => {
        console.error("Error fetching notifications", err);
        showAlert("Error fetching notifications", "error");
        reset();
      });
  };

  const getResult = () => {
    getPredictResult(currentScanId)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw res.json();
      })
      .then((res) => {
        setResult(res);
      })
      .catch((err) => {
        console.error("Failed to fetch predict result", err);
        showAlert("Failed to fetch predict result", "error");
        reset();
      });
  };

  const reset = () => {
    setFile(null);
    setCurrentScanId("");
    setScanning(false);
    setResult(null);
  };

  useEffect(() => {
    if (currentScanId && scanning) {
      getStatus();
    }
  }, [currentScanId, scanning]);

  if (result) {
    return (
      <Container>
        <ManualScanResult {...result} reset={reset} />
      </Container>
    );
  }

  if (scanning) {
    return (
      <Container>
        <LoadingContainer>
          <Header>Processing...</Header>
          <CircularLoader />
          {Alert}
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <DragAndDrop file={file} setFile={setFile} scanFile={scanFile} />
      {Alert}
    </Container>
  );
};

export default ManualScan;
