#! /usr/bin/env groovy

library identifier: 'jenkins-shared-lib-node-js-apps@main', retriever: modernSCM([$class: 'GitSCMSource',
 remote: 'https://github.com/Nella1a/jenkins-shared-lib-node-js-apps.git',
 credentialsId: 'github-credentials'
])


pipeline {
  agent any
  stages {
        stage ('Run Tests') {
          steps {
            script {
              echo 'Running Playwright e2e-Tests....'
              sh 'npm install'
              def testResult = sh(script: 'npx playwright e2e-test', returnStatus: true )
              if (result != 0){
                  echo "Tests failed. Stopping pipeline."
              }
            }
          }
        }
        stage('Increment Version') {
          when {
            expression {
              BRANCH_NAME == "main"
            }
          }
          steps {
            script {

              sh "git checkout ${env.BRANCH_NAME}"
              sh "git pull -r"
              env.CURRENT_VERSION = getCurrentVersion()
              // Bump patch version
              sh "npm version patch --git-tag-version false"
              env.UPDATED_VERSION = updateVersion()
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
                      def imageName = "kanjamn/demo-app:hotdeals-${env.UPDATED_VERSION}"

                      buildImage(imageName)
                      dockerLogin()
                      dockerPush(imageName)
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
                      sh 'git config user.name "jenkins"'
                      sh 'git config user.email "jenkins@example.com"'
                      sh 'git remote set-url origin https://$USER:$PASS@github.com/Nella1a/next-js-hotdeals.git'
                      sh 'git add .'
                      sh "git commit -m \"Updated image version from ${env.CURRENT_VERSION} to ${env.UPDATED_VERSION}\""
                      sh 'git push origin HEAD:main'
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
