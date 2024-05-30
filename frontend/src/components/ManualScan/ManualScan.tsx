import { useState, useEffect } from "react";
import useAlert from "../../hooks/useAlert";
import { sendPcapFile, getPredictStatus, getPredictResult } from "../../api";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import { CircularLoader } from "../Loader/Loader";
import { Container } from "./ManualScan.styled";

const mockedResult = {
  attackRatio: 0.9781151689235399,
  averageConfidenceAttack: 0.8972898895259405,
  averageConfidenceBenign: 0.5987500000000001,
  finalDecision: "Attack",
  scanId: "1cd5fe5a-3159-49d5-b699-274b11487a88",
  totalPredictions: 7311,
};

const ManualScan = () => {
  const [file, setFile] = useState<File | null>(null);
  const [currentScanId, setCurrentScanId] = useState<string>("");
  const [scanning, setScanning] = useState<boolean>(false);
  const [result, setResult] = useState(mockedResult);
  const [showAlert, Alert] = useAlert({});

  const scanFile = () => {
    console.log("scanFile");
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
      });
  };

  const getStatus = () => {
    console.log("getStatus");

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
          showAlert("File processed succesfully", "success");
        } else if (res.inProgress) {
          setTimeout(getStatus, 500);
        }
      })
      .catch((err) => {
        console.error("Error fetching notifications", err);
        showAlert("Error fetching notifications", "error");
      });
  };

  const getResult = () => {
    console.log("getResult");
    getPredictResult(currentScanId)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw res.json();
      })
      .then((res) => {
        console.log("Predict result fetched", res);
        setResult(res);
      })
      .catch((err) => {
        console.error("Failed to fetch predict result", err);
        showAlert("Failed to fetch predict result", "error");
      });
  };

  useEffect(() => {
    if (currentScanId && scanning) {
      getStatus();
    }
  }, [currentScanId, scanning]);

  return (
    <Container>
      {scanning && <CircularLoader />}
      <DragAndDrop file={file} setFile={setFile} scanFile={scanFile} />
      {Alert}
    </Container>
  );
};

export default ManualScan;
