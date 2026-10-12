/**
 * Advanced Dev-Server Proxy Configuration for Angular 22.
 * Fully isolated mock API server bypassing all connection refused failures.
 */
const PROXY_CONFIG = [
    {
        context: ["/api", "api"], // Catch both options with or without leading slashes
        target: "http://localhost:8080",
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
        bypass: function (req, res, proxyOptions) {
            // Clean and normalize URL to strictly match tokens without slash boundary bugs
            const url = req.url.toLowerCase();

            // 1. Mock Endpoint: Login (api/identity/token)
            if (req.method === "POST" && url.includes("identity/token")) {
                console.log("[MOCK API]: Intercepted Login token query. Streaming credential payload...");
                res.writeHead(200, { "Content-Type": "application/json" });

                /**
                 * Structure decomposed:
                 *   - Part 1 (Header):  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 ({"alg":"HS256","typ":"JWT"})
                 *   - Part 2 (Payload): eyJpZCI6Im1vY2stdXNlci11dWlkLTExMjIzMzQ0IiwiZW1haWwiOiJkZXZlbG9wZXJAbG9jYWxob3N0IiwidXNlcm5hbWUiOiJ0ZXN0LW1vZGVybi11c2VyIn0=
                 *                       ({"id":"mock-user-uuid-11223344","email":"developer@localhost","username":"test-modern-user"})
                 *   - Part 3 (Sign):    mock_signature_part_here
                 */
                const validMockJwtToken =
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im1vY2stdXNlci11dWlkLTExMjIzMzQ0IiwiZW1haWwiOiJkZXZlbG9wZXJAbG9jYWxob3N0IiwidXNlcm5hbWUiOiJ0ZXN0LW1vZGVybi11c2VyIn0=.mock_signature_part_here";

                res.end(
                    JSON.stringify({
                        id: "mock-user-uuid-11223344",
                        auth_token: validMockJwtToken,
                    }),
                );
                return true;
            }

            // 2. Mock Endpoint: Ping (api/identity)
            if (req.method === "GET" && url.includes("identity")) {
                console.log("[MOCK API]: Intercepted session Ping health check. Streaming identity state...");
                res.writeHead(200, { "Content-Type": "application/json" });

                res.end(
                    JSON.stringify({
                        identity: {
                            id: "mock-user-uuid-11223344",
                            email: "developer@localhost",
                        },
                    }),
                );
                return true;
            }

            // 3. Mock Endpoint: Register (api/identity/register)
            if (req.method === "POST" && url.includes("identity/register")) {
                console.log("[MOCK API]: Intercepted User Registration workflow query.");
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({
                        success: true,
                        message: "User account created successfully in mock database context",
                    }),
                );
                return true;
            }

            // 4. Mock Endpoint: Reset Password (api/identity/reset)
            if (req.method === "POST" && url.includes("identity/reset")) {
                console.log("[MOCK API]: Intercepted Account Password Reset workflow query.");
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({
                        success: true,
                        message: "Password reset instructions processed successfully",
                    }),
                );
                return true;
            }

            console.warn(`[MOCK API WARNING]: Fallback triggered for unhandled URL: ${req.url}`);
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Mock endpoint schema match not found" }));
            return true;
        },
    },
];

module.exports = PROXY_CONFIG;
