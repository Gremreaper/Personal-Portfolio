import { Counter } from "counterapi";

const counter = new Counter({
    workspace: process.env.COUNTER_WORKSPACE,
    accessToken: process.env.COUNTER_API_TOKEN
});

export default async function handler(req, res) {
    try {
        let result;

        if (req.method === "POST") {
            // Count a new visitor
            result = await counter.up("portfolio-visits");
        } else {
            // Just retrieve the current count
            result = await counter.get("portfolio-visits");
        }

        res.status(200).json({
            count: result.value
        });

    } catch (error) {
        console.error("CounterAPI error:", error);

        res.status(500).json({
            error: "Unable to retrieve visitor count"
        });
    }
}