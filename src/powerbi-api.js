// Power BI REST API Integration
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class PowerBIAPI {
  constructor() {
    this.clientId = process.env.POWERBI_CLIENT_ID;
    this.clientSecret = process.env.POWERBI_CLIENT_SECRET;
    this.tenantId = process.env.POWERBI_TENANT_ID;
    this.apiVersion = process.env.POWERBI_API_VERSION || 'v1.0';
    this.baseUrl = `https://api.powerbi.com/${this.apiVersion}`;
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async authenticate() {
    if (this.accessToken && this.tokenExpiry > Date.now()) {
      return this.accessToken;
    }

    try {
      const tokenUrl = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`;
      const response = await axios.post(tokenUrl, {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        scope: 'https://analysis.windows.net/powerbi/api/.default',
        grant_type: 'client_credentials'
      });

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);
      return this.accessToken;
    } catch (error) {
      console.error('Authentication failed:', error.message);
      throw new Error('Failed to authenticate with Power BI');
    }
  }

  async getWorkspaces() {
    const token = await this.authenticate();
    try {
      const response = await axios.get(`${this.baseUrl}/myorg/groups`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.value;
    } catch (error) {
      console.error('Failed to fetch workspaces:', error.message);
      throw error;
    }
  }

  async getReports(workspaceId) {
    const token = await this.authenticate();
    try {
      const response = await axios.get(`${this.baseUrl}/myorg/groups/${workspaceId}/reports`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.value;
    } catch (error) {
      console.error('Failed to fetch reports:', error.message);
      throw error;
    }
  }

  async getDatasets(workspaceId) {
    const token = await this.authenticate();
    try {
      const response = await axios.get(`${this.baseUrl}/myorg/groups/${workspaceId}/datasets`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.value;
    } catch (error) {
      console.error('Failed to fetch datasets:', error.message);
      throw error;
    }
  }

  async refreshDataset(workspaceId, datasetId) {
    const token = await this.authenticate();
    try {
      const response = await axios.post(
        `${this.baseUrl}/myorg/groups/${workspaceId}/datasets/${datasetId}/refreshes`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to refresh dataset:', error.message);
      throw error;
    }
  }
}

module.exports = PowerBIAPI;
