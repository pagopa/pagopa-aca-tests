import { check} from "k6";
import http from "k6/http";
import { getConfigOrThrow } from "../utils/config";
import { createRequestBodyForAca } from "../utils/utils";

const config = getConfigOrThrow();

export let options = {
    scenarios: {
      contacts: {
        executor: 'ramping-arrival-rate',
        startRate: 0,
        timeUnit: '1s',
        preAllocatedVUs: config.preAllocatedVUs,
        maxVUs: config.maxVUs,
        stages: [
            { target: config.rate, duration: config.rampingDuration },
            { target: config.rate, duration: config.duration },
            { target: 0, duration: config.rampingDuration },
        ],
      },
    },
    thresholds: {
        http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.5s
        checks: ['rate>0.9'], // 90% of the request must be completed
        "http_req_duration{name:post-create-position-test-creation-flow}": ["p(95)<1000"]
    },
};


export default function () {
    const urlBasePath = config.URL_BASE_PATH;
    const headersParams = {
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": config.API_SUBSCRIPTION_KEY
      },
      redirects: 0,
    };

    
    // Create new debt Position
    let response = http.post(urlBasePath, JSON.stringify(createRequestBodyForAca(100)), {
      ...headersParams,
      tags: { name: "post-create-position-test-creation-flow" },
    });

    if(response.status != 200){
      console.log("error")
      console.log(response.status)
      console.log(response.body)
    }

    check(
        response,
        { "Response status from POST newDebtPosition was 200": (r) => r.status == 200 },
        { name: "post-create-position-test-creation-flow" }
    );
}