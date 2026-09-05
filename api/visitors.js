export default async function handler(req, res) {
    try {
        const workspace = process.env.COUNTER_WORKSPACE;
        const token = process.env.COUNTER_API_TOKEN;

        if (!workspace || !token) {
            return res.status(500).json({
                error: "CounterAPI environment variables are missing"
            });
        }

        let url;

        if (req.method === "POST") {
            // Increment visitor counter
            url = `https://api.counterapi.dev/v2/${workspace}/portfolio-visits/up`;
        } else {
            // Get current visitor count
            url = `https://api.counterapi.dev/v2/${workspace}/portfolio-visits`;
        }

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("CounterAPI error:", result);

            return res.status(response.status).json({
                error: "CounterAPI request failed"
            });
        }

        return res.status(200).json({
            count: result.data.up_count
        });

    } catch (error) {
        console.error("Visitor counter error:", error);

        return res.status(500).json({
            error: "Internal visitor counter error"
        });
    }
}