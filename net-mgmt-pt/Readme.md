# Network Management Project

This project provides a complete network management solution including:

- Network topology design (Packet Tracer)
- Network monitoring dashboard (React + FastAPI)
- Device configuration management
- Performance metrics collection

## Directory Structure

- `pkt/` - Packet Tracer files and topology
- `docs/` - Documentation and network planning
- `backend/` - FastAPI microservice
- `frontend/` - React dashboard
- `scripts/` - Network device configurations
- `metrics/` - Monitoring and metrics collection

## Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Documentation

See the `docs/` directory for:
- IP and VLAN planning
- Build plan
- Network topology
