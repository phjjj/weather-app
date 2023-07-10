import styled from "styled-components";

export const Wrraper = styled.main`
  overflow: hidden;
`;
export const Container = styled.div`
  height: 100vh;
  max-width: 400px;
  background-size: 70%;
  display: flex;
  margin: 0 auto;
`;
export const ImgBox = styled.div`
  background-color: blue;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 400px;
  height: 100vh;
  position: absolute;
  justify-content: center;
  align-items: center;
`;

export const Img = styled.div`
  background-color: red;
  width: 100px;
  height: 170px;
  border-radius: 20px;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  gap: 10px;
  position: relative;
`;
export const Title = styled.div`
  font-size: 25px;
`;
export const Temperature = styled.div`
  font-size: 50px;
`;
export const Sky = styled.div``;
export const MinMax = styled.div``;
export const MinTemp = styled.div``;
export const MaxTemp = styled.div``;
