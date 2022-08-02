import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '25s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  const res = http.post("http://localhost:3000/qa/questions?body=Yothisissam'snewpost&name=sammy-sam&email=yo@mail.com&photos[1]=google.com&photos[2]=youtube.com&product_id=1234");
  check(res, { 'status was 200': (r) => r.status == 200 });
  // sleep(1);
}

