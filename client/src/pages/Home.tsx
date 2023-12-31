import axios from "axios";
import { useEffect, useState } from "react";
import {
  WeatherInfo,
  Container,
  MaxTemp,
  MinMax,
  MinTemp,
  Sky,
  Temperature,
  Wrraper,
  Title,
  ImgBox,
  Img,
} from "./Home.style";

interface weatherInfoType {
  loaded: boolean;
  name?: string;
  main?: { temp: number; temp_max: number; temp_min: number };
  sky?: string;
}

interface locationType {
  loaded: boolean;
  coordinates?: { lat: number; lng: number };
  error?: { code: number; message: string };
}

interface imageType {
  loaded: boolean;
  img: [];
}

function Home() {
  const [weatherInfo, setWeatherInfo] = useState<weatherInfoType>({
    loaded: false,
    name: "",
    main: { temp: 0, temp_max: 0, temp_min: 0 },
    sky: "",
  });

  const [image, setImage] = useState<imageType>({
    loaded: false,
    img: [],
  });

  // 날씨
  const getWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.coordinates?.lat}&lon=${location.coordinates?.lng}&appid=f85a8dbb90c63ca9d8b81463c62525a4`
      )
      .then((res) =>
        setWeatherInfo({
          loaded: true,
          name: res.data.name,
          main: {
            temp: Math.floor(res.data.main.temp - 273.15),
            temp_max: Math.floor(res.data.main.temp_max - 273.15),
            temp_min: Math.floor(res.data.main.temp_min - 273.15),
          },
          sky: res.data.weather[0].main,
        })
      )
      .catch((err) => err);
  };

  // 이미지 받기
  const imgKey = process.env.REACT_APP_KEY;

  const getImage = () => {
    axios
      .get(
        `https://jweather.site/api/${imgKey}
`
      )
      .then((res) => setImage({ loaded: true, img: res.data }))
      .catch((err) => console.log(err));
  };

  // 위치받기
  const useGeolocation = () => {
    const [location, setLocation] = useState<locationType>({
      loaded: false,
      coordinates: { lat: 0, lng: 0 },
    });

    const onSuccess = (location: { coords: { latitude: number; longitude: number } }) => {
      setLocation({
        loaded: true,
        coordinates: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      });
    };

    // 에러에 대한 로직
    const onError = (error: { code: number; message: string }) => {
      setLocation({
        loaded: true,
        error,
      });
    };

    useEffect(() => {
      // navigator 객체 안에 geolocation이 없다면
      // 위치 정보가 없는 것.
      if (!("geolocation" in navigator)) {
        onError({
          code: 0,
          message: "Geolocation not supported",
        });
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
  };

  const location = useGeolocation();

  useEffect(() => {
    if (location.loaded) {
      getWeather();
    }
  }, [location]);

  useEffect(() => {
    if (!image.loaded) {
      getImage();
    }
  }, []);

  // 순서
  // 위도경도받기 -> 날씨 -> 이미지
  return (
    <Wrraper>
      <Container>
        <WeatherInfo>
          <Title>{weatherInfo.name}</Title>
          <Temperature>{weatherInfo.main?.temp}°</Temperature>
          <Sky>{weatherInfo.sky}</Sky>
          <MinMax>
            <MaxTemp>최고:{weatherInfo.main?.temp_max}°</MaxTemp>
            <MinTemp>최저:{weatherInfo.main?.temp_min}°</MinTemp>
          </MinMax>
        </WeatherInfo>
        <ImgBox>
          {image.loaded &&
            image.img.map((img, idx) => {
              return <Img key={idx} src={img} />;
            })}
        </ImgBox>
      </Container>
    </Wrraper>
  );
}

export default Home;
