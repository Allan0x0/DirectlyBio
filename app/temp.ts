async function run() {
  const response = fetch('http://localhost:5001/init', {
    method: 'post',
    body: JSON.stringify({
      email: 'admin@gmail.com',
      username: 'Admin',
      password: 'Admin',
    }),
  }).then((response) => response.json());
  console.log('response', response);
}
run();
