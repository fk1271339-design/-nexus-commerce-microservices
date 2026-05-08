# Nexus Commerce Microservices

A production-grade, enterprise-level e-commerce system built with modern microservices architecture.

## 🚀 Tech Stack
- **Backend**: Spring Boot 3, Spring Security, Spring Cloud Gateway, OpenFeign
- **Frontend**: React (TypeScript), Tailwind CSS, Vite
- **Data**: MySQL, Redis (Caching)
- **Messaging**: Apache Kafka (Event-driven inventory updates)
- **Monitoring**: Spring Actuator, Prometheus, Grafana
- **DevOps**: Docker, Docker Compose, GitHub Actions (CI)

## 🏗️ Architecture
- **API Gateway**: Port 8085 (Single entry point)
- **User Service**: Port 8080 (Auth, JWT, User Mgmt)
- **Product Service**: Port 8081 (Catalog, Search, Redis Cache)
- **Order Service**: Port 8082 (Order Processing, Feign, Kafka Producer)

## 🛠️ Getting Started
### Prerequisites
- Docker & Docker Compose
- Node.js & npm
- Java 21

### Running with Docker
```bash
docker-compose up --build
```

### Running Locally
1. Start Infrastructure (MySQL, Kafka, Redis)
2. Run each Spring Boot service
3. Start frontend: `cd frontend && npm install && npm run dev`

## 📊 Monitoring
- **Prometheus**: `http://localhost:9090`
- **Grafana**: `http://localhost:3001`
