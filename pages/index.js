import React, { useCallback, useState } from "react";
import Head from "next/head";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import CustomModal from "../components/CustomModal";
import SuccessModal from "../components/SuccessModal";

import styles from "../styles/Home.module.css";
import { Container } from "@mui/system";
import styled from "styled-components";

const Text = styled.p`
  font-size: 60px;
  margin: 0;
`;

export default function Home() {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const callBack = useCallback(
    showSuccessModal => {
      setShowSuccessModal(showSuccessModal);
    },
    [showSuccessModal],
  );

  return (
    <div style={{ height: "100vh" }}>
      <Head>
        <title>Brocolli & Co.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderBar />
      <div className={styles.main} style={{ height: "100%", backgroundColor: "#D3E2CB" }}>
        <Container className="centre" style={{}}>
          <Text>A better way</Text>
          <Text>to enjoy everyday</Text>
          <p>Be the first to know when we launch</p>
          <CustomModal openModal={showFormModal} parentCallBack={callBack}></CustomModal>
          <SuccessModal openModal={showSuccessModal} parentCallBack={callBack}></SuccessModal>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
