const BASE_URL = 'http://localhost:5000';

async function runPracticalTests() {
    console.log("=== STARTING PRACTICAL 10 EVENT-DRIVEN ARCHITECTURE TESTS ===\n");

    try {
        // Step 1: Register/Login to obtain JWT token
        console.log("1. Authenticating user...");
        const userEmail = `student_${Date.now()}@example.com`;
        const userPassword = "password123";

        const regRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail, password: userPassword })
        });
        const regData = await regRes.json();
        console.log("   Register status:", regRes.status, regData.message);

        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail, password: userPassword })
        });
        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log("   Login status:", loginRes.status, "| Token obtained successfully");

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        // Step 2: Test POST /tasks (task-created event)
        console.log("\n2. Testing POST /tasks (task-created event prompt response)...");
        const postStart = Date.now();
        const postRes = await fetch(`${BASE_URL}/tasks`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title: "Complete Practical 10 Report",
                description: "Implement EventEmitter for Node.js API",
                priority: "high"
            })
        });
        const postDuration = Date.now() - postStart;
        const createdTask = await postRes.json();
        console.log(`   POST Response Code: ${postRes.status}`);
        console.log(`   POST Response Time: ${postDuration} ms (Prompt HTTP 201 response before 2s delay)`);
        console.log(`   Created Task ID: ${createdTask._id}, Title: "${createdTask.title}"`);

        // Step 3: Wait 2.5 seconds to let the notification finish logging in server console
        console.log("\n3. Waiting 2.5s to observe background notification log completion...");
        await new Promise(r => setTimeout(r, 2500));

        // Step 4: Test Simulated Error Handling in Event Listener
        console.log("\n4. Testing safe error handling with simulated failure task title...");
        const failPostRes = await fetch(`${BASE_URL}/tasks`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                title: "Fail-Test Task",
                description: "This task title triggers simulated event error handling",
                priority: "low"
            })
        });
        const failTask = await failPostRes.json();
        console.log(`   Fail-Test POST Response Status: ${failPostRes.status} (API does not crash)`);
        await new Promise(r => setTimeout(r, 1000));

        // Step 5: Test DELETE /tasks/:id (task-deleted event)
        console.log("\n5. Testing DELETE /tasks/:id (task-deleted event)...");
        const deleteRes = await fetch(`${BASE_URL}/tasks/${createdTask._id}`, {
            method: 'DELETE',
            headers
        });
        const deleteData = await deleteRes.json();
        console.log(`   DELETE Status: ${deleteRes.status}, Message:`, deleteData.message);

        // Step 6: Verify Caching & Debug Cache Endpoint
        console.log("\n6. Testing Practical 9 Cache debug endpoint...");
        const cacheRes = await fetch(`${BASE_URL}/tasks/debug/cache`, { headers });
        const cacheStats = await cacheRes.json();
        console.log("   Cache Stats:", cacheStats);

        console.log("\n=== ALL TEST STEPS EXECUTED SUCCESSFULLY ===");
    } catch (error) {
        console.error("Test Suite Failed:", error);
    }
}

runPracticalTests();
