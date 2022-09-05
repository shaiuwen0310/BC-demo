# order-mgmtnode API服務
### 概況
降低node版本，提升fabric sdk版本，調整URL及上下文欄位名稱。目前只有訂單功能，因當前所述之iot用途與之前所述不同，故等了解iot用途再重新撰寫iot的合約與API服務。
### 版本
* node v12.22.8 / npm 6.14.15
* fabric-node-sdk 2.2.4
### HTTP狀態碼.
* 僅405表示URL錯誤，其餘都回200
### 問題
* 當前針對交易返回catch中的rtnc就重起 (若fabric網路回應有錯誤或異常，node api沒有結束，則後續造成node api的log顯示peer timeout，且peer確實無相關log)
### 訂單上下文
#### enrollAdminIdentity
* /caclient/enrolladmin/v1
```json
{
    "registrar": {
        "enrollId": "eZchainAdmin",
        "enrollSecret": "eZchainEZAdmin"
    },
    "identity": "jojoAdmin"
}
```
```json
{
    "identity": "jojoAdmin",
    "rtnc": 0,
    "message": "success"
}
```
#### enrollUserIdentity
* /caclient/enrolluser/v1
```json
{
    "adminId": "janeAdmin",
    "user": {
        "identity": "user1",
        "affiliation": "org1.department1"
    }
}
```
```json
{
    "identity": "user1",
    "rtnc": 0,
    "message": "success"
}
```
#### insertOneOrderform
* /orderform/insertOneOrderform/v1
```json
{
    "identity": "user1",
    "values": {
        "uniqueKey": "key2",
        "userId": "a",
        "fromHash": "a",
        "hash": "a",
        "groupId": "a",
        "companyId": "a",
        "formSeqNo": "a",
        "type": 0,
        "deptId": "a"
    }
}
```
```json
{
    "uniqueKey": "key2",
    "time": "1644807166",
    "txid": "0519978fb04bf4fdec1664a45a6e891078e8648e3e20f47d4ce88dde1c871e5b",
    "rtnc": 0,
    "message": "success"
}
```
#### modifyOneOrderform
* /orderform/modifyOneOrderform/v1
```json
{
    "identity": "user1",
    "values": {
        "uniqueKey": "key2",
        "userId": "a_modify",
        "fromHash": "a_modify",
        "hash": "a_modify",
        "groupId": "a",
        "companyId": "a",
        "formSeqNo": "a",
        "type": 0,
        "deptId": "a_modify"
    }
}
```
```json
{
    "uniqueKey": "key2",
    "time": "1644807166",
    "txid": "0519978fb04bf4fdec1664a45a6e891078e8648e3e20f47d4ce88dde1c871e5b",
    "rtnc": 0,
    "message": "success"
}
```
#### findOrderform
* /orderform/findOrderform/v1
```json
{
    "identity": "user1",
    "uniqueKey": [
        "key418791",
        "key1",
        "key226635"
    ]
}
```
```json
{
    "uniquevalue": [
        "key100",
        "key1",
        "key8"
    ],
    "rtnc": 0,
    "message": "success",
    "info": [
        {
            "message": "This key value has not been stored in the blockchain.",
            "rtnc": 14,
            "uniquevalue": "key100"
        },
        {
            "companyid": "Lockheed",
            "deptid": "dep01",
            "forseqno": "seq0001",
            "fromhash": "fromhash",
            "groupid": "group01",
            "hash": "hash",
            "message": "ok.",
            "rtnc": 0,
            "time": "1638932021",
            "txid": "6ec5537652bd3d17513eed1377f34db18dc7461afc1210e9102a91b5659ef266",
            "type": 1,
            "uniquevalue": "key1",
            "userid": "mike"
        },
        {
            "companyid": "companyid1",
            "deptid": "deptid1",
            "forseqno": "forseqno1",
            "fromhash": "fromhash1",
            "groupid": "groupid1",
            "hash": "hash1",
            "message": "ok.",
            "rtnc": 0,
            "time": "1638932858",
            "txid": "991a606a3a874e1184274dcc6daff9b65dcd5edbe7b31720b0b5f4d632553eaa",
            "type": 0,
            "uniquevalue": "key8",
            "userid": "userid1"
        }
    ]
}
```
#### findHistOrderform
* /orderform/findHistOrderform/v1
```json
{
    "identity": "user1",
    "uniqueKey": "key333"
}
```
```json
{
    "uniquevalue": "key333",
    "rtnc": "0",
    "message": "success",
    "info": [
        {
            "TxId": "f3a3c7be4b9872b7ce202084deb6fbc03ea9c250cf3a59c8a8ecc7eb58450e64",
            "Value": {
                "txid": "f3a3c7be4b9872b7ce202084deb6fbc03ea9c250cf3a59c8a8ecc7eb58450e64",
                "hash": "hash1",
                "walletid": "chocho",
                "groupid": "",
                "companyid": "",
                "userid": "userid1",
                "forseqno": "forseqno1",
                "fromhash": "",
                "time": "1644910627",
                "type": 0,
                "deptid": "deptid111111"
            },
            "Timestamp": "2022-02-15 07:37:07.812 +0000 UTC",
            "IsDelete": "false"
        },
        {
            "TxId": "0395c38bf2b66fbbea71244628764746c469c2f25814a127c5c1230030802011",
            "Value": {
                "txid": "0395c38bf2b66fbbea71244628764746c469c2f25814a127c5c1230030802011",
                "hash": "hash1",
                "walletid": "chocho",
                "groupid": "",
                "companyid": "",
                "userid": "userid1",
                "forseqno": "forseqno1",
                "fromhash": "",
                "time": "1644910617",
                "type": 0,
                "deptid": "deptid111"
            },
            "Timestamp": "2022-02-15 07:36:57.975 +0000 UTC",
            "IsDelete": "false"
        },
        {
            "TxId": "ed47ddfe4485fa073b0fc393327e98a49ff4d360e8d3108c3df59e3d0df9006d",
            "Value": {
                "txid": "ed47ddfe4485fa073b0fc393327e98a49ff4d360e8d3108c3df59e3d0df9006d",
                "hash": "hash1",
                "walletid": "chocho",
                "groupid": "",
                "companyid": "",
                "userid": "userid1",
                "forseqno": "forseqno1",
                "fromhash": "",
                "time": "1644910573",
                "type": 0,
                "deptid": "deptid1"
            },
            "Timestamp": "2022-02-15 07:36:13.525 +0000 UTC",
            "IsDelete": "false"
        }
    ]
}
```



