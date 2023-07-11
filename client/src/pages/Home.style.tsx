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
  justify-content: center;
  background-color: skyblue;
  flex-direction: column;
`;
export const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding-top: 15px;
`;
export const ImgBox = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: auto;
`;

export const Img = styled.img`
  display: flex;
  background-color: white;
  width: 110px;
  height: auto;
  background-size: cover;
  border-radius: 20px;
`;

export const Title = styled.div`
  font-size: 25px;
`;
export const Temperature = styled.div`
  font-size: 50px;
  margin-left: 10px;
`;
export const Sky = styled.div``;
export const MinMax = styled.div`
  display: flex;
  gap: 30px;
`;
export const MinTemp = styled.div``;
export const MaxTemp = styled.div``;
