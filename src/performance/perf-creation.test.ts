import { check} from "k6";
import http from "k6/http";
import *  as type from "k6/index";
import { getConfigOrThrow } from "../utils/config";
import { createRequestBodyForAca } from "../utils/utils";
import { AmountEuroCents } from "../generated/aca/AmountEuroCents";

const config = getConfigOrThrow();

export let options = {
    scenarios: {
        contacts: {
            executor: "constant-arrival-rate",
            rate: config.rate, // e.g. 20000 for 20K iterations
            duration: config.duration, // e.g. '1m'
            preAllocatedVUs: config.preAllocatedVUs, // e.g. 500
            maxVUs: config.maxVUs, // e.g. 1000
        },
    },
    thresholds: {
        http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.5s
        checks: ['rate>0.9'], // 90% of the request must be completed
        "http_req_duration{api:post-create-position-test-creation-flow}": ["p(95)<1000"]
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
    let response = http.post(urlBasePath, JSON.stringify(createRequestBodyForAca(100 as AmountEuroCents)), {
      ...headersParams,
      tags: { name: "post-create-position-test-creation-flow" },
    });
    check(
        response,
        { "Response status from POST newDebtPosition was 200": (r) => r.status == 201 },
        { name: "post-create-position-test-creation-flow" }
    );
}