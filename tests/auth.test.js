// Power BI API Authentication Tests
const PowerBIAPI = require('../src/powerbi-api');

async function testAuthentication() {
  console.log('Testing Power BI Authentication...');
  
  try {
    const api = new PowerBIAPI();
    const token = await api.authenticate();
    
    if (token) {
      console.log('✓ Authentication successful');
      console.log('✓ Token obtained:', token.substring(0, 20) + '...');
      return true;
    }
  } catch (error) {
    console.error('✗ Authentication failed:', error.message);
    return false;
  }
}

async function testWorkspaceAccess() {
  console.log('\nTesting Workspace Access...');
  
  try {
    const api = new PowerBIAPI();
    const workspaces = await api.getWorkspaces();
    
    console.log('✓ Workspace access successful');
    console.log(`✓ Found ${workspaces.length} workspace(s)`);
    return true;
  } catch (error) {
    console.error('✗ Workspace access failed:', error.message);
    return false;
  }
}

async function runAuthTests() {
  try {
    const authSuccess = await testAuthentication();
    const workspaceSuccess = await testWorkspaceAccess();
    
    if (authSuccess && workspaceSuccess) {
      console.log('\n✓ All authentication tests passed!');
      process.exit(0);
    } else {
      console.log('\n✗ Some tests failed');
      process.exit(1);
    }
  } catch (error) {
    console.error('Test error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  runAuthTests();
}

module.exports = { testAuthentication, testWorkspaceAccess };
