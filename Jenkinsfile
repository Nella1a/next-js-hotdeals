#! /usr/bin/env groovy

library identifier: 'jenkins-shared-lib-node-js-apps@main', retriever: modernSCM([$class: 'GitSCMSource',
 remote: 'https://github.com/Nella1a/jenkins-shared-lib-node-js-apps.git',
 credentialsId: 'github-credentials'
])


pipeline {
  agent any
  stages {
        stage ('Build App and Run Tests') {
          steps {
            script {
              echo 'Running Playwright e2e-Tests....'
              sh 'npm install'
              sh 'npx playwright install'
              def testResult = sh(script: 'npm run e2e-test', returnStatus: true )
              if (testResult != 0){
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
              env.CURRENT_VERSION = getAppVersion()
              // Bump patch version
               updateAppVersion('patch')
               env.UPDATED_VERSION = getAppVersion()
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
                      env.IMAGENAME = "kanjamn/demo-app:hotdeals-${env.UPDATED_VERSION}"
                      buildImage(env.IMAGENAME)
                      dockerLogin()
                      dockerPush(env.IMAGENAME)
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
                deployToAWSEC2(env.IMAGENAME,'3000','3.74.149.147','ec2-user')
              }
            }
        }
  }
}
