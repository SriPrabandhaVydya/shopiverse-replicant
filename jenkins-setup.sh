
#!/bin/bash

# This script automates the initial setup of Jenkins

# Wait for Jenkins to start up
echo "Waiting for Jenkins to start..."
until curl -s http://localhost:8082 > /dev/null; do
  sleep 5
done

echo "Jenkins has started. Setting up admin user..."

# Get the initial admin password
JENKINS_SECRET=$(docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword)

# Install suggested plugins and create admin user
curl -X POST -d "script=
import jenkins.model.*
import hudson.security.*
import jenkins.install.*

def instance = Jenkins.getInstance()
def hudsonRealm = new HudsonPrivateSecurityRealm(false)
def adminUsername = 'admin'
def adminPassword = 'password'

hudsonRealm.createAccount(adminUsername, adminPassword)
instance.setSecurityRealm(hudsonRealm)

def strategy = new FullControlOnceLoggedInAuthorizationStrategy()
strategy.setAllowAnonymousRead(false)
instance.setAuthorizationStrategy(strategy)

instance.setInstallState(InstallState.INITIAL_SETUP_COMPLETED)
instance.save()
" http://localhost:8082/scriptText --user admin:${JENKINS_SECRET}

echo "Jenkins setup completed with admin user."
