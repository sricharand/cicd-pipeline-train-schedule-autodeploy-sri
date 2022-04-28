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
         stage ('kubernetes deployment') {
            steps {
                kubeconfig(caCertificate: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUN5RENDQWJDZ0F3SUJBZ0lCQURBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwcmRXSmwKY201bGRHVnpNQjRYRFRJeU1EUXlOekV4TURJMU0xb1hEVE15TURReU5ERXhNREkxTTFvd0ZURVRNQkVHQTFVRQpBeE1LYTNWaVpYSnVaWFJsY3pDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBTU1UCnRQakdscFpIVG9FOVhkM2JHRUY2VWh1bGtqekd1K1ZhTEpXME5BVkdzWGFFeDdWYjQ4d2pPNUlBLzFMdEVjTnAKRUFPSkdpUzZ6Y1lOQ3B4Umphc3RDblk3UlU5b21KT2N5VG9IeHYzaUVkSCtzemxlK2hQK3lKNFlVbmZrdk5QWQpydjFsSlVSTFV0WlJ3YVQwWWhZcmFsZVVlc2htQm5SU0ZyZnZhYnJRTFJncDROYUtXUFhPd0ZyQmxJZzVQQlF4CnQyWlEzWXM5S1QweXVsaVJmU3d6NDQ2R2xtRkRoNW5Ka1U0MDVDck9GWTkwdWdiZFZnZEFNSXJhWGw0aHBxd2kKVHorbFpJd09uMVBTdHdGQXlzbW5TdWNWWFlGUXdxUkkvVTYyZklhTkFURlNHUUdza3BqTUh4V0Q3QzVFT0U4eApJdk9tekRZS2p0SnJRcHRGY2dFQ0F3RUFBYU1qTUNFd0RnWURWUjBQQVFIL0JBUURBZ0trTUE4R0ExVWRFd0VCCi93UUZNQU1CQWY4d0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dFQkFKcTNPaEdwWjNYKzlYRlgwdWQxNFlJZUNxRUUKcmQ2aTlkSWNKOER2dUtydlQxWnBPNTlDV2JvN3prWS9hdW1vVmQ5LzlzdUNubC94cUpqaFBmK0ZZKzJFY0EwYwpaL1lUTGhlbVFPc3dINWFTWmpORG14U0N3RjZ2RVRDTE96ZWZ4NVQrSlppQjA1WjhSMkZxZ2V2ZWQzV0pNMk5CCmUwaWkzbGh3L0lMMDBrTlNSMWhFUnN5R1BLVVBreWFyTStVVDlwTkRrNVVHS1hveXliOStvLzM1V0tSdm9hTEsKL3FHem16elhZS2hWWkxLdU1jTnUzRzRINFRyd04zYWJRZVY0WllUOXp2QnhQaXU0UzAzYWRWOCtZUnNWUVIwUQpvYWxaZG5SeDdRUU9ybVRwS1gxNXJCMGdKTUZ4TWk4QUxoMUZmL3NnUWFMSGg2TWJSRjhCMmtLYURwND0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=', credentialsId: 'Kubeconfig', serverUrl: 'https://172.31.26.245:6443') {
    // some block
                 sh 'kubectl apply -f deployment.yaml'
}
                
            }
        }
            
    }  
  }
 
