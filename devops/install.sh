echo "--------------------------- Build docker image ------------------------------"
docker build -t hichamouja99/ec:4.0 ../

echo "\n---------------------------- Push docker image ------------------------------"
docker push hichamouja99/ec:4.0

echo "\n-------------------------- Set the configation ------------------------------"
kubectl apply -f config.yaml

echo "\n---------------------------- Deploy DataBase --------------------------------"
kubectl apply -f db.yaml

echo "\n------------------------ Waiting DataBase start ------------------------------"
sleep 60

echo "\n--------------------------- Deploy Application ------------------------------"
kubectl apply -f app.yaml