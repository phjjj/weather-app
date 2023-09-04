<img src="https://velog.velcdn.com/images/phjjj/post/7567c77c-7d01-446c-8e41-76e6c42b0eb4/image.png" width="30%" height="30%">


> ### 프로젝트 소개
Github
[https://github.com/phjjj/weather-app](https://github.com/phjjj/weather-app)

**** 현재는 서버의 과금으로인해 사이트를 닫은 상태입니다.**



사실상 처음으로 누군가가 시켜서 한게 아닌 자력으로 해본 프로젝트는 없으며, 배포 경험도 없기에 실력이 부족한 내가 조금 더 성장해보자 생각해서 진행하였습니다.

웹사이트를 도메인을 이용해 배포 경험을 쌓고자 진행하였고, 날씨 api를 이용해 현재 기온을 알려주는 간단한 웹을 만들어보자 생각했습니다. 그리고 추가적으로 **크롤링** 이라는 기술을 사용해서 핀터레스트 크롤링 후 서버에 이미지들을 저장하여 api 요청에 응답할 수 있게 프로젝트를 진행해보았습니다.

- #### 소요기간
2주

>### 📚 사용기술

Front
reactjs (style-components, axios, typescript, react-hook-geolocation)

Back
nodejs (cheerio, cors, dotenv, express, puppeteer)

배포
aws ec2
 #### - 주요기술 및 사용목적

- #### puppeteer 
puppeteer은 구글에서 만든 노드 라이브러리로 Headless Chrome 또는 Chrominum을 제어할 수 있습니다.

  **headless란?**
  백그라운드에서 작동하는 브라우저이다.
  때문에 일반 사용자가 브라우저를 사용할 때처럼 화면에 창이 시각적으로 보이지 않는다.
  보이는 화면은 없지만, 실제로 띄워진 화면에서 화면 테스트를 하듯이 테스트를 할 수 있다.
  puppeteer에서는 옵션 설정을 통해 headless모드와 non-headless모드 둘 다 사용할 수 있다.

  사용자가 사이트에 접속 할 경우 백그라운드 환경에서 설정해놓은 브라우저를 실행해 크롤링을 합니다.

- #### react-hook-geolocation
Geolocation API는 사용자의 위치 정보(위도, 경도)를 제공해준다. HTML에서 자체적으로 제공하는 API입니다.

- #### cheerio
웹 페이지에 있는 데이터를 쉽게 가공할 수 있도록 도와주는 패키지

  HTML 사이트를 파싱하여 DOM태그를 찾은 후 jquery문법을 이용하여 크롤링 하기 위해 사용하였습니다.



> ### 시퀀스 다이어그램

![](https://velog.velcdn.com/images/phjjj/post/f6822ecf-010d-4cd9-b803-c65664e426e1/image.png)
다이어그램 작성경험이 없지만 간단하게 시각적으로 이해할 수 있게 그려보았습니다.

> ### 주요 기능 구현 방법 및 문제 해결

### 1. 크롤링을 사용하여 이미지부분을 담기

<img src="https://velog.velcdn.com/images/phjjj/post/6cdc8e1e-4844-4642-8e1e-130b33a6e8f4/image.png" width="30%" height="30%">

<img src="https://velog.velcdn.com/images/phjjj/post/75035ea6-6e08-4df5-be5a-2db3f6b706e4/image.png" width="60%" height="30%">


먼저 사이트가 실행될때 서버에서 요청을합니다. puppeteer 라이브러리를 이용해, 사용자의 백그라운드에서 헤드리스로 핀터레스트의 검색 사이트에 접속 후 waitForSelector()을 이용해 지정된 선택자를 찾을때까지 사이트가 종료되지 않고 기다립니다. 이때 "img[loading]"인 부분을 찾아 attr("src") 이미지의 url을 배열에 담아서 클라이언트에 정보를 제공하게 하였습니다.

---
### 2. 계절별로 다르게 검색하기, 새로고침 시에도 이미지 다르게 보이게하기
![](https://velog.velcdn.com/images/phjjj/post/53104364-470a-46bd-8044-90890214c8e4/image.png)

크롤링할때 주소에 검색어가 바로 들어가기 때문에, 월 별로 검색어들을 다르게 처리했습니다. 또한 새로고침시 다시 요청이 들어오는데 이때도 같은 계절이어도 다른 이미지를 보여주고자 검색어를 각 4개씩 배열에 넣은 후 랜덤함수를 이용해서 검색어를 다르게 하였습니다.

---
### 3. http와 https, **Mixed content(혼합 콘텐츠)**
![](https://velog.velcdn.com/images/phjjj/post/b1089f5b-0d82-489b-828d-b2266cfc3c25/image.png)
첫번째 문제로, 배포를 하였을때 위와 같이 http와 https간 의 통신 문제가 발생하였습니다. 이는 클라이언트와 서버를 배포했을때 https클라이언트 사이트에서 http의 api서버에 요청시 **Mixed content(혼합 콘텐츠)** 로 인한 오류인데 보안되지 않은 HTTP 프로토콜을 사용하여 하위 리소스를 요청하는 경우 해당 요청은 공격자가 네트워크 연결을 도청하고 양자 간 통신을 보거나 수정하는 수단인 중간자(man-in-the-middle) 공격에 취약하므로 전체 페이지의 보안이 약화됩니다. 

결론은 클라이언트와 서버의 양쪽으로 통신할때 https 프로토콜을 이용해야합니다. 이는 보안상 중요한 역할이기에 도메인을 사용해야 https를 이용할 수 있었고 aws ec2로 배포를 진행하여 여러 설정을 거친 후에야 안전하게 서버를 열수있었습니다.


---
### 4. 위치정보를 이용해서 현재 위치의 날씨 정보 받기
```jsx
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
```
useGeolocation라는 커스텀 훅을 만들어 현재 위치의 정보를 받아옵니다. 커스텀 훅이란, 위의 useState와 useEffect들과 같이, 특정 상태관리나 라이프사이클 로직들을 추상화하여 묶어서 재사용이 가능하도록 제작이 가능한 함수를 뜻합니다. 사실 커스텀훅을 한번도 써보지도 않고 흔히들 사용하는 코드를 붙여넣었습니다. 추후에 리액트를 다시 공부하며 커스텀훅에 대해 알아 볼 예정입니다. 저는 여기서 사용자의 위치를 성공적으로 불러왔을때의 정보와, 실패했을때의 값을 location state에 업데이트하여 만약 정상적으로 업데이트 되었을경우 날씨api에 위치 정보를 이용해 정보를 제공 받는 함수를 사용했습니다. **추가로 현재 위치를 얻는것은 https에서만 작동이 된다는것도 알게되었습니다.**

---
>### 프로젝트를 진행하면서 알게된 점

- CORS
CORS는 앞서 내용에는 설명하지 않았지만 CORS문제에 대해 이야기한 블로그를 집중해서 잘 보아서 원인을 잘 파악하면 문제없이 수정할 수 있었습니다. 보통 응답헤더인 Access-Control-Allow-Origin 설정을 유효하게 하지 않아서 많이 발생하는 문제라 생각되었습니다. [참고블로그](https://inpa.tistory.com/entry/WEB-%F0%9F%93%9A-CORS-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-%F0%9F%91%8F)

- 크롤링
사실 프로젝트의 주된 목적 중 하나는 간단한 크롤링사용이였습니다. puppeteer를 사용해 사용자의 백그라운드에서 사이트를 접속을 하여 크롤링 후 데이터를 제공 받을 수 있다는것을 직접해보면서 나중에 유용하게 쓰일 곳이 있다고 생각했습니다.

- http,https
aws ec2 배포과정에서 http와 https의 차이를 알게되었습니다. 보안상의 이유로 Mixed Contents 오류를 처리하는 방법에 대해 알게 되었고, HTTPS는 인증서를 발급하고 유지가 필요해  도메인 구입 후 AWS Certificate Manager 등록 등 배포에 대해 새로운 경험을 하였습니다.

>### 개선사항

만약 나 말고 다른 이가 사용했었다면 만족했을까? 라는 생각이 들었습니다. 지인들에게는 사이트를 알려주었을때 솔직히 날씨,코디사진들 정도의 평범한 사이트라 크게 반응은 없었습니다.


### - 저작권
개발이랑은 조금 떨어진 이야기지만 그래도 크롤링이라는 관련이 있어 짚어야 한다고 생각했습니다. 저작권, 초상권 이야기를 한 친구가 있어서 크롤링에서의 저작권에 대해 찾아보았는데 현재로서는 **크롤링 행위에 대한 어떠한 법률 근거가 없고, 크롤링의 법적리스크는 행위 자체의 문제가 아닌 크롤링의 방식과 이용에 초점을 맞춰야한다고 되어있습니다.** 그래서 아마 제가 핀터레스트 사이트를 크롤링을 하였는데 이는 다른 사람의 데이터를 그대로 가져온거라 아마 살짝 걸리는게 있다고 생각이들었습니다.

  >다만, 문제가 되는 크롤링은? [참고 블로그](https://jinooh.tistory.com/3)

-   수집한 데이터의 상업적 이용
  - 크롤링 과정에서 해당 서버의 문제 야기
 -  수집한 데이터가 사용자의 민감한 정보인지
  - 사이트의 이용방침, 의사(ex. robots.txt, 이용목적)을 위반하지 않는지
  
  위 4개라도 조심스럽게 잘 지키면서 사용하면 좋을거라 생각이 되었습니다

### - 디자인
현재의 디자인은 매우 보편적입니다 본래 날씨,온도에 따른 코디 추천을 주제로 잡고 진행하여서, 딱 거기에만 맞춰 적당히 디자인했는데, 뒤에 비가오면 비가내리는 애니메이션이나, 해가 떠있는 애니메이션 추가되었으면 하는 아쉬움이 들었습니다

### - 리액트 훅
아직 리액트 프로젝트 경험이 별로 없고, 여러가지 라이브러리 및 프레임워크를 사용한 경험이 없어서 많이 미숙해 다음 프로젝트에는 코드를 짤 때 좀 더 모듈화를 시켜서 사용하면 유지보수도 상승하고 추후 더 많은 컴포넌트를 확장 할 수 있을거라 생각이 들었습니다.

---
2주간의 간단한 프로젝트라 누군가에게 그저 그런 프로젝트일지라도, 배포과정에서 많이 배웠고 생각지도 못한 오류를 접합으로써 다음 프로젝트에 많은 도움이 될 거라 생각이 들었다.


