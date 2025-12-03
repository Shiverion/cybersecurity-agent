# Cybersecurity Analyzer Agent

A powerful web application that leverages AI agents and Semgrep to analyze Python code for security vulnerabilities. This tool combines the precision of static analysis with the reasoning capabilities of Large Language Models to provide actionable security insights.

![Project Banner](assets/cyber.png)

## 🚀 Features

- **AI-Powered Analysis**: Uses OpenAI's agents to interpret code context and security implications.
- **Static Analysis Integration**: Integrates with Semgrep via MCP (Model Context Protocol) for deep code scanning.
- **Interactive Interface**: User-friendly chat interface for discussing vulnerabilities and fixes.
- **Multi-Cloud Deployment**: Ready-to-deploy configurations for Azure Container Apps and Google Cloud Run.
- **Modern Stack**: Built with Next.js 14, TypeScript, Tailwind CSS, and FastAPI.

## 🛠️ Tech Stack

- **Frontend**: Next.js (React), TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.12
- **AI/ML**: OpenAI Agents SDK, Semgrep MCP Server
- **Infrastructure**: Docker, Terraform
- **Cloud**: Azure Container Apps, Google Cloud Run

## 📋 Prerequisites

- Node.js 18+ and npm
- Python 3.12+
- Docker (for containerized deployment)
- OpenAI API Key
- Semgrep App Token (optional, for enhanced rules)

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd cyber
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
SEMGREP_APP_TOKEN=your_semgrep_token_here
```

### 3. Run Locally

**Backend:**

```bash
cd backend
# Install dependencies and run
uv run server.py
# The server will start on http://localhost:8000
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
# The app will be available at http://localhost:3000
```

## 🐳 Docker Support

Build and run the entire application as a single container:

```bash
# Build the image
docker build -t cyber-analyzer .

# Run the container
docker run --rm -d --name cyber-analyzer -p 8000:8000 --env-file .env cyber-analyzer
```

Access the application at `http://localhost:8000`.

## ☁️ Deployment

The project includes Terraform configurations for deploying to major cloud providers.

### Azure
Navigate to `terraform/azure` to deploy to Azure Container Apps.

### Google Cloud Platform
Navigate to `terraform/gcp` to deploy to Google Cloud Run.

## 📂 Project Structure

- `backend/`: FastAPI server and AI agent logic.
- `frontend/`: Next.js web application.
- `terraform/`: Infrastructure as Code for Azure and GCP.
- `assets/`: Project images and resources.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.