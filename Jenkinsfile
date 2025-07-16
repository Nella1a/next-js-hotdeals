#! /usr/bin/env groovy

pipeline {
  agent any
  stages {
        stage('Build Docker Image') {
            when {
                expression {
                    BRANCH_NAME == "main"
                }
            }
            steps {
                    script {
                        echo 'Building the docker image'
                        withCredentials([usernamePassword(credentialsId: 'cred-docker', passwordVariable: 'PASS', usernameVariable: 'USER')]){
                          sh "docker build -t kanjamn/demo-app:${IMAGE_TAG} ."
                          sh 'echo $PASS | docker login -u $USER --password-stdin'
                          sh "docker push kanjamn/demo-app:${IMAGE_TAG}"
                        }
                    }
            }
        }
        stage ("Deploy") {
            when {
                expression {
                    BRANCH_NAME == "main"
                }
            }
            steps {
              script {
                    echo "Deploying ... "
              }
            }
        }
  }
}
