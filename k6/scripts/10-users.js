import http from 'k6/http';

export let options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  http.get('https://moodle.inf.ufrgs.br/');
}
