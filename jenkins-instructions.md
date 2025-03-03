
# Jenkins Setup Instructions

This document provides instructions for setting up and using Jenkins in the project.

## Starting Jenkins

Jenkins is configured to run alongside the main application using Docker Compose. To start both services:

```bash
docker-compose up -d
```

## Accessing Jenkins

- Jenkins will be available at: http://localhost:81
- Username: admin
- Password: password

## First-time Setup

When starting Jenkins for the first time, it may take a minute to initialize. You can run the setup script to automate the initial configuration:

```bash
chmod +x jenkins-setup.sh
./jenkins-setup.sh
```

## Configuring a Pipeline for Your Application

1. Log in to Jenkins at http://localhost:81
2. Click "New Item" in the Jenkins dashboard
3. Enter a name for your pipeline (e.g., "MyAppPipeline")
4. Select "Pipeline" and click "OK"
5. In the configuration page, scroll down to the "Pipeline" section
6. You can define your pipeline script directly or from a Jenkinsfile in your repository

### Sample Pipeline Script

```groovy
pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'docker-compose up -d --build app'
            }
        }
    }
}
```

## Jenkins Volumes

Jenkins data is stored in a Docker volume named `jenkins_home`, ensuring your configuration persists between restarts.
