import http from 'k6/http';

export let options = {
  vus: 1,
  duration: '30s',
};

export default function () {
  http.get('https://moodle.inf.ufrgs.br/');
}
