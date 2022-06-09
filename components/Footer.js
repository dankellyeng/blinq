import styled from "styled-components";

const Styles = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
  background-color: #a7c497;
  position: absolute;
`;

const Text = styled.p`
  color: "white";
  font-size: 14px;
`;

export default function Footer() {
  return (
    <Styles>
      <Text>© 2022 Brocolli & Co.</Text>
      <Text>All Rights Reserved.</Text>
    </Styles>
  );
}
