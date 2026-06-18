import autocannon from 'autocannon';

const url = 'http://localhost:4173';

const instance = autocannon({
  url: url,
  connections: 100, // Number of concurrent connections
  duration: 10,     // Duration of the test in seconds
  pipelining: 10,   // Number of pipelined requests per connection
}, console.log);

autocannon.track(instance, { renderProgressBar: true });

instance.on('done', (result) => {
  console.log('Load test completed.');
  console.log(`Total Requests: ${result.requests.total}`);
  console.log(`Latency Avg: ${result.latency.average}ms`);
  console.log(`Throughput Avg: ${(result.throughput.average / 1024 / 1024).toFixed(2)} MB/s`);
  console.log(`Errors: ${result.errors}`);
  console.log(`Timeouts: ${result.timeouts}`);
  if (result.errors > 0 || result.timeouts > 0) {
    console.log('WARNING: The server experienced errors or timeouts under load.');
  } else {
    console.log('SUCCESS: The server handled the load perfectly.');
  }
});
