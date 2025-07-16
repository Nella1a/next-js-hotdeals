#! /usr/bin/env groovy

pipeline {
  agent any
  stages {
        stage('increment version') {
          when {
            expression {
              BRANCH_NAME == "main"
            }
          }
          steps {
            script {

              sh  'git fetch'
              sh  "git checkout $BRANCH_NAME"

              // Capture current version from package.json
              def currentVersion = sh(
                script: "node -p \"require('./package.json').version\"",
                returnStdout: true
              ).trim()

              // Bump patch version
              sh "npm version patch --git-tag-version false"

              // Capture updated version
              env.UPDATED_VERSION = sh(
                script: "node -p \"require('./package.json').version\"",
                returnStdout: true
              ).trim()
            }
          }

        }
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
                          sh "docker build -t kanjamn/demo-app:hotdeals-${env.UPDATED_VERSION} ."
                          sh 'echo $PASS | docker login -u $USER --password-stdin'
                          sh "docker push kanjamn/demo-app:hotdeals-${env.UPDATED_VERSION}"
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
