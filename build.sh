npx tsc
cp ./src/client/index.html ./dist/client/index.html
cp ./src/client/index.css ./dist/client/index.css
rm userbase.json
touch userbase.json
echo "[]" >> userbase.json
echo "done"