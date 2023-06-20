pipeline {
    agent any
    environment {
        DOCKER_IMAGE_NAME = "sandygaddam/train-schedule"
    }
    stages {
        stage('Build') {
            steps {
                echo 'Running build automation'
                sh './gradlew build --no-daemon'
                archiveArtifacts artifacts: 'dist/trainSchedule.zip'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    app = docker.build(DOCKER_IMAGE_NAME)
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'Docker-CRED') {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }

        }        
        stage('DeployToK8s') {
            steps {
                withKubeConfig([credentialsId: 'Kubectl-CRED', serverUrl: 'https://172.31.2.89:6443']) {
                 sh 'kubectl apply -f train-schedule-service.yml'
                 sh 'kubectl apply -f train-schedule-deployment.yml'
                }
            }
        }
    }
}
