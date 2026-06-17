FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Use a non-root user for improved security
RUN groupadd --gid 1000 appuser \
    && useradd --uid 1000 --gid appuser --shell /bin/bash --create-home appuser

WORKDIR /app

# Install system dependencies required for some Python packages
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       build-essential \
       libssl-dev \
       libffi-dev \
       python3-dev \
       gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt /app/requirements.txt
RUN python -m pip install --upgrade pip setuptools wheel && \
    pip install --no-cache-dir -r /app/requirements.txt

# Copy application files and give ownership to non-root user
COPY . /app
RUN chown -R appuser:appuser /app

USER appuser

# The application serves on port 8001 by default (see backend/README.md)
EXPOSE 8001

# Start uvicorn (production: no auto-reload)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]
