// Performance Testing for Power BI MCP Server
const PowerBIAPI = require('../src/powerbi-api');

class PerformanceTest {
  constructor() {
    this.metrics = {
      authTime: 0,
      requestTimes: [],
      totalRequests: 0,
      failedRequests: 0,
      totalTime: 0
    };
  }

  async testAuthenticationPerformance(iterations = 5) {
    console.log(`Testing authentication performance (${iterations} iterations)...`);
    
    const times = [];
    for (let i = 0; i < iterations; i++) {
      const api = new PowerBIAPI();
      const start = Date.now();
      
      try {
        await api.authenticate();
        const duration = Date.now() - start;
        times.push(duration);
      } catch (error) {
        console.error(`✗ Authentication iteration ${i + 1} failed:`, error.message);
      }
    }
    
    if (times.length > 0) {
      const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
      const maxTime = Math.max(...times);
      const minTime = Math.min(...times);
      
      console.log(`✓ Auth Performance: Avg: ${avgTime.toFixed(2)}ms, Min: ${minTime}ms, Max: ${maxTime}ms`);
      return { avgTime, maxTime, minTime };
    }
    
    return null;
  }

  async testWorkspaceAPIPerformance() {
    console.log('Testing workspace API performance...');
    
    try {
      const api = new PowerBIAPI();
      const start = Date.now();
      
      await api.getWorkspaces();
      const duration = Date.now() - start;
      
      console.log(`✓ Workspace API: ${duration}ms`);
      return duration;
    } catch (error) {
      console.error('✗ Workspace API test failed:', error.message);
      return null;
    }
  }

  async runPerformanceTests() {
    console.log('Starting Power BI MCP Server Performance Tests\n');
    
    const authPerf = await this.testAuthenticationPerformance(3);
    const workspacePerf = await this.testWorkspaceAPIPerformance();
    
    console.log('\n=== Performance Summary ===');
    if (authPerf) {
      console.log(`Authentication: ${authPerf.avgTime.toFixed(2)}ms average`);
    }
    if (workspacePerf) {
      console.log(`Workspace API: ${workspacePerf}ms`);
    }
    console.log('===========================\n');
  }
}

if (require.main === module) {
  const tester = new PerformanceTest();
  tester.runPerformanceTests().catch(error => {
    console.error('Performance test error:', error);
    process.exit(1);
  });
}

module.exports = PerformanceTest;
