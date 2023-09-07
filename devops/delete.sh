echo "-------------------------- Delete the configation ------------------------------"
kubectl delete -f config.yaml

echo "---------------------------- Delete DataBase --------------------------------"
kubectl delete -f db.yaml

echo "--------------------------- Delete Application ------------------------------"
kubectl delete -f app.yaml