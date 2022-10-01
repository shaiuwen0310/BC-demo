# scanfile

## 在本地端建立區塊鏈應用
1. 進到network資料夾中
2. 啟動ca節點
3. 產生憑證材料
4. 產生初始區塊、channel.tx檔案
5. 啟動peer節點
6. 啟動orderer節點
7. 啟動cli節點
8. 建立通道區塊、peer節點加入通道、添加anchor節點
```sh
$ cd ~/Documents/fabric-project/fabric-network/network
./ca-start-server.sh
./ca-shell.sh
./genfile-shell.sh
./peer-start-server.sh
./orderer-start-server.sh
./cli-start-server.sh
./createchannel-shell.sh
```
9. 進到chaincode資料夾中
10. 打包peer連結外部鏈碼所需的config檔到network資料夾中
```sh
$ cd ~/Documents/fabric-project/fabric-network/chaincode
./pkgcc-shell.sh
```
11. 回到network資料夾中
12. 安裝合約config檔、查詢peer節點有哪些鏈碼
13. 複製package_id
```sh
$ cd ~/Documents/fabric-project/fabric-network/network
./deploycc-1nd-shell.sh

# 複製的package_id格式應如下一行
scanfile_1.0.0:w56ba1g8uf4h9i83e73c5f06d4437bery546a5ce78ca6129405c00982df77b
```
14. 重新進到chaincode資料夾中
15. 開啟其中的docker-compose.yaml，並將其中的CHAINCODE_ID改成第13步的package_id
16. 啟動所有外部鏈碼服務
17. 複製docker-compose.yaml中的環境變數CHAINCODE_SERVER_ADDRESS
```sh
$ cd ~/Documents/fabric-project/fabric-network/chaincode

# docker-compose.yaml中要調整的環境變數
CHAINCODE_ID=scanfile_1.0.0:w56ba1g8uf4h9i83e73c5f06d4437bery546a5ce78ca6129405c00982df77b

docker-compose up -d

# CHAINCODE_SERVER_ADDRESS應如下，分別有四個
chaincode-scanfile-peer0-org1:7052
chaincode-scanfile-peer1-org1:8052
chaincode-scanfile-peer0-org2:9052
chaincode-scanfile-peer1-org2:10052
```
18. 回到network資料夾中
19. 進到peer的storage資料夾調整connection.json檔，根據chaincode資料夾中的docker-compose的環境變數CHAINCODE_SERVER_ADDRESS調整
```sh
$ cd ~/Documents/fabric-project/fabric-network/network

cd ~/Documents/fabric-project/fabric-network/network/storage/org1/peer0-org1
# 每次執行路徑會不同
sudo vim externalbuilder/builds/scanfile_1.0.0-w56ba1g8uf4h9i83e73c5f06d4437bery546a5ce78ca6129405c00982df77b/release/chaincode/server/connection.json
調整成chaincode-scanfile-peer0-org1:7052

cd ~/Documents/fabric-project/fabric-network/network/storage/org1/peer1-org1
# 每次執行路徑會不同
sudo vim externalbuilder/builds/scanfile_1.0.0-w56ba1g8uf4h9i83e73c5f06d4437bery546a5ce78ca6129405c00982df77b/release/chaincode/server/connection.json
調整成chaincode-scanfile-peer1-org1:8052

cd ~/Documents/fabric-project/fabric-network/network/storage/org2/peer0-org2
# 每次執行路徑會不同
sudo vim externalbuilder/builds/scanfile_1.0.0-w56ba1g8uf4h9i83e73c5f06d4437bery546a5ce78ca6129405c00982df77b/release/chaincode/server/connection.json
調整成chaincode-scanfile-peer0-org2:9052

cd ~/Documents/fabric-project/fabric-network/network/storage/org2/peer1-org2
# 每次執行路徑會不同
sudo vim externalbuilder/builds/scanfile_1.0.0-w56ba1g8uf4h9i83e73c5f06d4437bery546a5ce78ca6129405c00982df77b/release/chaincode/server/connection.json
調整成chaincode-scanfile-peer1-org2:10052
```
20. 回到network資料夾中
21. **<一定要改> 更改deploycc-2nd-shell.sh的PACKAGE_ID值**
22. 各組織同意鏈碼運行
23. 任意組織將鏈碼commit到通道上
```sh
$ cd ~/Documents/fabric-project/fabric-network/network
vim deploycc-2nd-shell.sh
調整成第13步的package_id

./deploycc-2nd-shell.sh
./deploycc-3nd-shell.sh
```
24. 用cli測試，確認網路層建立完成
```sh
$ cd ~/Documents/fabric-project/fabric-network/network
./test-shell.sh
```
25. 查找所有節點的IP
26. 查看Admin帳號的私鑰
27. 調整其中的gateway設定檔：修改peer orderer ca節點ip、Admin0帳號的私鑰
28. 啟動所有api服務
29. 可開始進行測試
```sh
# 查找IP
docker network inspect scanfile_bcnet 
# 根據gateway設定檔內的路徑, 查找Admin0帳號的私鑰
$ cd ~/Documents/fabric-project/fabric-network/network/organizations

# 把上面查詢資訊寫進去
vim ~/Documents/fabric-project/node-api/gateway/org1-Network.yaml
vim ~/Documents/fabric-project/node-api/gateway/org2-Network.yaml

# 重返digital-assets-node-api專案
$ cd ~/Documents/fabric-project/node-api
docker-compose up -d

# 可開始進行測試
```
30. 啟動web page
```sh
$ cd ~/Desktop/fabric-project/go-client
docker-compose up -d
```

## 需要再調整的狀況
* policy設定成`"OR('Org1MSP.member','Org2MSP.member')"`，在deploycc-2nd-shell.sh、deploycc-3nd-shell.sh帶入參數
* peer lifecycle chaincode commit時，`--peerAddresses`依舊要設定兩個組織的peer才可以，否則會有ENDORSEMENT_POLICY_FAILURE，目前寫死--peerAddresses＝peer0-org2在deploycc-3nd-cmd.sh中
* node api無token、https

## 使用的port號
* orderer0-org0：7050, 17050
* orderer1-org0：8050, 18050 
* orderer2-org0：9050, 19050
* peer0-org1：7051, 7052, 17051
* peer1-org1：8051, 8052, 18051
* peer0-org2：9051, 9052, 19051
* peer1-org2：10051, 10052, 20051
* ca-org0：7054, 17054
* ca-org1：8054, 18054
* ca-org2：9054, 19054
* scanfile-node-api-org1：5008
* scanfile-node-api-org2：5009
* web: 8080
