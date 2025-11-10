import { ConvosoClient } from "../src/index.js";

// Initialize the client
const client = new ConvosoClient({
  apiKey: process.env.CONVOSO_API_KEY ?? "elr6cg26b1slprooozh2o8bhi86ptcqy",
});

// Example: Agent Monitor - Search for logged in agents
async function agentMonitorExample() {
  try {
    // Search all logged in agents
    const allAgents = await client.agentMonitor.search();
    console.log("All Active Agents:", allAgents);

    // Search agents in specific campaigns (array syntax - automatically converted to comma-separated)
    const campaignAgents = await client.agentMonitor.search({
      campaign_id: [3471, 104], // Cleaner than "102,104"
      filter_by_skill_options: ["CA", "TX", "NY"],
    });
    console.log("Campaign Agents:", campaignAgents);

    // Search by specific user
    const userAgent = await client.agentMonitor.search({
      user_id: 1277611,
    });
    console.log("Specific Agent:", userAgent);

    // Logout multiple agents at once (demonstrates discriminated union type narrowing)
    const logoutResult = await client.agentMonitor.logout({
      user_id: [1002034, 1030483], // Array support!
      force: true,
    });

    if (logoutResult.success) {
      // TypeScript infers this as AgentMonitorLogoutResponseSuccess
      console.log("Logged out agents:", logoutResult.logged_out_users);
      console.log("Count:", logoutResult.count);
      // logoutResult.code // ❌ TypeScript error - doesn't exist on success type
    } else {
      // TypeScript infers this as AgentMonitorLogoutResponseError
      // You can narrow further by checking the specific error code
      if (logoutResult.code === 6006) {
        // TypeScript knows: text is exactly "No such User"
        console.log("Error:", logoutResult.text); // ✅ Type is "No such User"
      } else if (logoutResult.code === 6012) {
        // TypeScript knows: text is exactly "Required fields are missing"
        console.log("Error:", logoutResult.text); // ✅ Type is "Required fields are missing"
      }
      // logoutResult.count // ❌ TypeScript error - doesn't exist on error type
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example: Call Logs - Search call logs
async function callLogsExample() {
  try {
    const calls = await client.callLogs.search();
    console.log("Call Logs:", calls);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example: Campaigns - List all campaigns
async function campaignsExample() {
  try {
    const campaigns = await client.campaigns.list();
    console.log("Campaigns:", campaigns);

    // Get specific campaign
    const campaign = await client.campaigns.get(123);
    console.log("Campaign Details:", campaign);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example: Leads - Search and manage leads
async function leadsExample() {
  try {
    // Search leads
    const leads = await client.leads.search({
      campaign_id: 123,
      status: "active",
    });
    console.log("Leads:", leads);

    // Get specific lead
    const lead = await client.leads.search({
      lead_id: 789,
    });
    console.log("Lead Details:", lead);

    // Update lead
    await client.leads.update({
      lead_id: 789,
      status: "contacted",
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example: Lead Post - Create new leads
async function leadPostExample() {
  try {
    const result = await client.leadPost.insert({
      criteria_key: "123123",
      phone_number: "234567890",
      phone_code: "1",
      first_name: "John",
      last_name: "Doe",
    });
    console.log("Lead Created:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example: Users - Manage users
async function usersExample() {
  try {
    const users = await client.users.search({ limit: 1000 });
    console.log("Users:", users);

    // Get specific user
    // const user = await client.users.search({
    //   user_id: 456,
    // });
    // console.log("User Details:", user);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example: DNC - Manage Do Not Call list
async function dncExample() {
  try {
    // Add number to DNC list
    await client.dnc.add({
      phone: "1234567890",
      campaign_id: 123,
    });

    // Search DNC list
    const dncList = await client.dnc.search({
      phone_code: "1",
      phone_number: "234567890",
    });
    console.log("DNC List:", dncList);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example: Agent Performance - Get performance metrics
async function agentPerformanceExample() {
  try {
    // Get all performance data for today (default)
    const todayPerformance = await client.agentPerformance.search();
    console.log("Today's Performance:", todayPerformance);

    // Get performance for specific date range
    const monthlyPerformance = await client.agentPerformance.search({
      date_start: "2025-01-01 00:00:00",
      date_end: "2025-01-31 23:59:59",
    });
    console.log("Monthly Performance:", monthlyPerformance);

    // Filter by campaigns and users with array syntax
    const filteredPerformance = await client.agentPerformance.search({
      date_start: "2025-01-01",
      date_end: "2025-01-31",
      campaign_ids: [102, 104], // Multiple campaigns
      user_ids: [1002034, 1030483], // Multiple users
      status_ids: ["active", "completed"], // Multiple statuses
    });
    console.log("Filtered Performance:", filteredPerformance);

    // Get performance for specific queues and lists
    const queuePerformance = await client.agentPerformance.search({
      queue_ids: [301, 302],
      list_ids: [201, 202, 203],
      date_start: "2025-01-01",
    });
    console.log("Queue Performance:", queuePerformance);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example: Agent Productivity - Get productivity metrics
async function agentProductivityExample() {
  try {
    // Get all productivity data for today (default)
    const todayProductivity = await client.agentProductivity.search();
    console.log("Today's Productivity:", todayProductivity);

    // Get productivity for specific date range
    const monthlyProductivity = await client.agentProductivity.search({
      date_start: "2025-01-01 00:00:00",
      date_end: "2025-01-31 23:59:59",
    });
    console.log("Monthly Productivity:", monthlyProductivity);

    // Filter by specific agent emails with array syntax
    const agentData = await client.agentProductivity.search({
      agent_emails: ["agent1@example.com", "agent2@example.com"],
      date_start: "2025-01-01",
      date_end: "2025-01-31",
    });
    console.log("Agent Productivity:", agentData);

    // Filter by campaign with pagination
    const campaignData = await client.agentProductivity.search({
      campaign_id: 102,
      offset: 0,
      limit: 100,
      date_start: "2025-01-01",
    });
    console.log("Campaign Productivity:", campaignData);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example: Revenue - Get revenue reports
async function revenueExample() {
  try {
    const revenue = await client.revenue.update({
      call_log_id: "123",
      revenue: 123.12,
    });
    console.log("Revenue Report:", revenue);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run examples (uncomment the ones you want to test)
// agentMonitorExample();
// callLogsExample();
// campaignsExample();
// leadsExample();
// leadPostExample();
usersExample();
// dncExample();
// agentPerformanceExample();
// agentProductivityExample();
// revenueExample();
