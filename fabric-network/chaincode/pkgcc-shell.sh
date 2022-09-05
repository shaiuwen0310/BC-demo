#!/bin/bash


# 
# 打包peer連結外部鏈碼所需的config檔
# 
# cli容器內路徑：
# CC_CONFIG_PATH='/opt/hyperledger/fabric/external-chaincode/'${CC_NAME}'/'${CC_NAME}'-external.tgz'
# 
# 以下指令僅建立scanfile
# 


cd connection-config/scanfile/

tar cfz code.tar.gz connection.json
tar cfz scanfile-external.tgz metadata.json code.tar.gz

cd ../

cp -rf scanfile/ ../../network/external-chaincode
