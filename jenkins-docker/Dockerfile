FROM jenkins/jenkins

# Switch to root user
USER root

# Install required packages
RUN apt-get update && apt-get install -y apt-transport-https ca-certificates curl software-properties-common

# Install Docker from the official Docker repository for Debian
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
RUN apt-get update && apt-get install -y docker-ce

# Create Docker group (if not exists) and add Jenkins user to it
RUN groupadd -f docker
RUN usermod -aG docker jenkins

# Switch back to the Jenkins user
USER jenkins

