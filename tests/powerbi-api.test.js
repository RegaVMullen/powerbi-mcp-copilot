// Power BI API Tests
const PowerBIAPI = require('../src/powerbi-api');

async function testGetReports() {
  console.log('Testing Power BI Reports API...');
  
  try {
    const api = new PowerBIAPI();
    const workspaceId = process.env.POWERBI_WORKSPACE_ID;
    
    if (!workspaceId) {
      console.warn('⚠ POWERBI_WORKSPACE_ID not set, skipping reports test');
      return true;
    }
    
    const reports = await api.getReports(workspaceId);
    console.log(`✓ Reports API test passed - Found ${reports.length} report(s)`);
    return true;
  } catch (error) {
    console.error('✗ Reports API test failed:', error.message);
    return false;
  }
}

async function testGetDatasets() {
  console.log('Testing Power BI Datasets API...');
  
  try {
    const api = new PowerBIAPI();
    const workspaceId = process.env.POWERBI_WORKSPACE_ID;
    
    if (!workspaceId) {
      console.warn('⚠ POWERBI_WORKSPACE_ID not set, skipping datasets test');
      return true;
    }
    
    const datasets = await api.getDatasets(workspaceId);
    console.log(`✓ Datasets API test passed - Found ${datasets.length} dataset(s)`);
    return true;
  } catch (error) {
    console.error('✗ Datasets API test failed:', error.message);
    return false;
  }
}

async function runAPITests() {
  try {
    const reportsSuccess = await testGetReports();
    const datasetsSuccess = await testGetDatasets();
    
    if (reportsSuccess && datasetsSuccess) {
      console.log('\n✓ All API tests passed!');
      process.exit(0);
    } else {
      console.log('\n✗ Some API tests failed');
      process.exit(1);
    }
  } catch (error) {
    console.error('Test error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  runAPITests();
}

module.exports = { testGetReports, testGetDatasets };
