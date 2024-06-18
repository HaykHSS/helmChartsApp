Steps to replicate the environment on your machine

1. Install docker, minikube and kubectl on your machine 

2. Start minikube (minikube start)  and enable ingress addon (minikube addons enable ingress)

3. Create frontend, backend and management namespaces in cluster (kubectl create namespace "namespace-name")

4. Install helm

5. Run these commands to create jenkins instance in your cluster and forward its master and agent ports to host (also you need to have installed java on your local machine)
   - helm repo add jenkins https://charts.jenkins.io
   - helm repo update
   - helm install jenkins jenkins/jenkins --namespace management
   - kubectl --namespace management port-forward svc/jenkins 8080:8080
   - kubectl --namespace management port-forward svc/jenkins-agent 50000:50000

6. Do these steps to run application on your local machine with jenkins
   - open jenkins dashboard in browser and add new node with type:permanent-agent, tag:jenkins-test-agent and configure this agent on local machine using commands which you can get in node status page after creating the node
   - optionally on linux machine you can add your agent to your system as a service  creating  this file /etc/systemd/system/jenkins-agent.service and adding this code in it:
   
            [Unit]
            Description=Jenkins Agent
            After=network.target

            [Service]
            User=username
            WorkingDirectory=/home/username/jenkins-agent
            ExecStart=java -jar agent.jar -url http://localhost:8080/ -secret "your-secret" -name "name-of-your-node" -workDir "/home/username/jenkins-agent"
            restart=always

            [Install]
            WantedBy=multi-user.target

    and run it with "systemctl start jenkins-agent.service" command

   - Go to manage jenkins/security and set "TCP port for inbound agents" to "fixed" and use port 50000

   - Go to manage jenkins/credentials and create global credentials with id:minikube-kubeconfig, kind:secret-file, scope:global, and choose file from your local machine path:/home/username/.kube/config

   - Create new item, name:frontend, type:pipeline, optionally set build trigger:poll scm with value H/5 * * * * to poll scm for changes every 5 minutes,  for Pipeline definition select pipeline script from scm , as scm select Git and set url to https://github.com/HaykHSS/helmChartsApp, you don't need to specify credentials for public repo, change branch specifier to */main, and set script path:hello-world-frontend/Jenkinsfile

   - Create another item with name:backend and set all options the same as above only for script path set:hello-world-backend/Jenkinsfile

   - Install necessary plugins in jenkins for which you'll get an error

Now you're able to build the project, do builds for both jobs to have configured application on your local machine and also add in your /etc/hosts file mapping from your minikube ip (run this command to get it - "minikube ip" ) to "frontend.local" after which you can open application in your browser with url: http://frontend.local