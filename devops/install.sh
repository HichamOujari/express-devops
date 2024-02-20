namespace="--namespace=$1"

echo "--------------------------- Build docker image ------------------------------"
docker build -t hichamouja99/ec:4.0 ../

echo "\n---------------------------- Push docker image ------------------------------"
docker push hichamouja99/ec:4.0

echo "\n-------------------------- Set the configation ------------------------------"
kubectl apply -f config.yaml $namespace

echo "\n---------------------------- Deploy DataBase --------------------------------"
kubectl apply -f db.yaml $namespace

echo "\n------------------------ Waiting DataBase start ------------------------------"
sleep 10

echo "\n--------------------------- Deploy Application ------------------------------"
kubectl apply -f app.yaml $namespace