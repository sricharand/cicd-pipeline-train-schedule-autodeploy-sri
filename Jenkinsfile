pipeline {
    agent any
//     environment 
//     {
//         //be sure to replace "bhavukm" with your own Docker Hub username
//         DOCKER_IMAGE_NAME = "sagjayar/train-schedule"
//     }
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
                    app = docker.build("sagjayar/train-schedule:latest")
                    app.inside {
                        sh 'echo Hello, World!'
                    }
                }
            }    
        }
//             steps {
//                 sh 'sudo docker build -t sagjayar/train-schedule:latest .'
//                 sh 'echo Hello, World!'
//                 script {
//                     app = docker.build(DOCKER_IMAGE_NAME)
//                     app.inside {
//                         sh 'echo Hello, World!'
//                    }
//                 }
//             }
         stage('Push Docker Image') {
             steps {
                  script {
                      docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                          app.push("${env.BUILD_NUMBER}")
                          app.push("latest")
                     }
                 }
             }
       }                 
    }  
  }
 
