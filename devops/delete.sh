namespace="--namespace=$1"

echo "-------------------------- Delete the configation ------------------------------"
kubectl delete -f config.yaml $namespace

echo "---------------------------- Delete DataBase --------------------------------"
kubectl delete -f db.yaml $namespace

echo "--------------------------- Delete Application ------------------------------"
kubectl delete -f app.yaml $namespace