import axios from "axios";

export default async function GetUserData(accessToken) {
  const config = {
    headers: {
      Authorization: `Bearer ya29.A0ARrdaM-hWo-PG4gyi3MGu5V6XPhCy7IuMTA3gvUjmOM9EJaPY7JF_a1O1c3Lgb0wj22E8u8LocpDt46-Fsp-55ykCWdF1nKTrKZDQAmGoceQ00n8BJImH0PRSL50AQAmPFWXO64LsadK71RhrcYbKRwUfIYD`,
    },
  };
  const url = "https://www.googleapis.com/auth/userinfo/v2/me";

  console.log(config);

  const result = await axios(url, config)
    .then((res) => console.log(res))
    .catch((error) => {
      console.log(error);
    });

  return result;
}
