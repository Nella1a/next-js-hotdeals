#! /usr/bin/env groovy

pipeline {
  agent any
  stages {
        stage('Increment Version') {
          when {
            expression {
              BRANCH_NAME == "main"
            }
          }
          steps {
            script {

              // Capture current version from package.json
              env.CURRENT_VERSION = sh(
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
                          sh "echo $PASS | docker login -u $USER --password-stdin'
                          sh "docker push kanjamn/demo-app:hotdeals-${env.UPDATED_VERSION}"
                        }
                    }
            }
        }
        stage ("Commit Version Update") {
            when {
                expression {
                    BRANCH_NAME == "main"
                }
            }
            steps {
              script {
                    echo "Commit changes to github"
                    withCredentials([usernamePassword(credentialsId: 'github-credentials', passwordVariable: 'PASS', usernameVariable: 'USER')]){
                      sh 'git config user.name "jenkins'
                      sh 'git config user.email "jenkins@example.com"'

                      sh 'git fetch'
                      sh  "git checkout {env.BRANCH_NAME}"
                      sh 'git status'
                      sh 'git branch'
                      sh 'git config --list'

                      sh 'git remote set-url origin https://$USER:$PASS@github.com/Nella1a/next-js-hotdeals.git'
                      sh 'git add .'
                      sh "git commit -m \"Updated image version from ${env.CURRENT_VERSION} to ${env.UPDATED_VERSION}\""
                      sh 'git push'
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
