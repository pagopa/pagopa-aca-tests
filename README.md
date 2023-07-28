# Tests for pagopa-ACA-service project
This is a set of [k6](https://k6.io) load tests related to the pagopa-aca services.

All tests require a set of parameters: **rate**, **duration**, **preAllocatedVUs** and **maxVUs**. These parameters are necessary to set the test target to a given number of iteration per second (**rate**) in a given time (**duration**), using a certain number of VUs (**preAllocatedVUs** and **maxVUs**).

To invoke k6 load test passing parameter use -e (or --env) flag:

```
-e MY_VARIABLE=MY_VALUE
```

Let's keep in mind that before perform a load test you have to:

- run `yarn install`
- run `yarn webpack`

## 01. Soak tests paCreatePosition creation flow

This test execute the ACA create position api.

```
$ docker run -i --rm -v $(pwd)/dist:/dist  -e API_SUBSCRIPTION_KEY=${API_SUBSCRIPTION_KEY} -e URL_BASE_PATH=${URL_BASE_PATH} -e rate=${rate} -e duration=${duration} -e preAllocatedVUs=${preAllocatedVUs} -e maxVUs=${maxVUs} loadimpact/k6 run /dist/perf-creation.test.js
```
To run test and load env vars from `.env` file:

```
$ yarn webpack && docker run -i --rm -v $(pwd)/dist:/dist  --env-file .env loadimpact/k6 run /dist/perf-creation.test.js
```

## 01. Soak tests paCreatePosition update flow

This test execute the ACA create position api.

```
$ docker run -i --rm -v $(pwd)/dist:/dist  -e API_SUBSCRIPTION_KEY=${API_SUBSCRIPTION_KEY} -e URL_BASE_PATH=${URL_BASE_PATH} -e rate=${rate} -e duration=${duration} -e preAllocatedVUs=${preAllocatedVUs} -e maxVUs=${maxVUs} loadimpact/k6 run /dist/perf-update.test.js
```
To run test and load env vars from `.env` file:

```
$ yarn webpack && docker run -i --rm -v $(pwd)/dist:/dist  --env-file .env loadimpact/k6 run /dist/perf-update.test.js
```

## 01. Soak tests paCreatePosition invalidate flow

This test execute the ACA create position api.

```
$ docker run -i --rm -v $(pwd)/dist:/dist  -e API_SUBSCRIPTION_KEY=${API_SUBSCRIPTION_KEY} -e URL_BASE_PATH=${URL_BASE_PATH} -e rate=${rate} -e duration=${duration} -e preAllocatedVUs=${preAllocatedVUs} -e maxVUs=${maxVUs} loadimpact/k6 run /dist/perf-closure.test.js
```
To run test and load env vars from `.env` file:

```
$ yarn webpack && docker run -i --rm -v $(pwd)/dist:/dist  --env-file .env loadimpact/k6 run /dist/perf-closure.test.js