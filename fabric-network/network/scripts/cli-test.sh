#!/bin/bash

# 進到cli進行測試

A="orderer0-org0:7050"
B="orderer0-org0"
C=/opt/hyperledger/fabric/crypto/ordererOrganizations/org0.company.com/orderers/orderer0-org0/msp/tlscacerts/tlsca.company.com-cert.pem
D=ngmtsyschannel
E=scanfile
F=peer0-org1:7051
G=/opt/hyperledger/fabric/crypto/peerOrganizations/org1.company.com/peers/peer0-org1/tls/ca.crt

# set
peer chaincode invoke -o $A --ordererTLSHostnameOverride $B --tls --cafile $C -C $D -n $E --peerAddresses $F --tlsRootCertFiles $G -c '{"function":"set","Args":["filename2","hash2","userid2"]}'

sleep 3

# get
peer chaincode invoke -o $A --ordererTLSHostnameOverride $B --tls --cafile $C -C $D -n $E --peerAddresses $F --tlsRootCertFiles $G -c '{"function":"get","Args":["hash2"]}'

# delete
peer chaincode invoke -o $A --ordererTLSHostnameOverride $B --tls --cafile $C -C $D -n $E --peerAddresses $F --tlsRootCertFiles $G -c '{"function":"del","Args":["hash2"]}'

sleep 3

# get history
peer chaincode invoke -o $A --ordererTLSHostnameOverride $B --tls --cafile $C -C $D -n $E --peerAddresses $F --tlsRootCertFiles $G -c '{"function":"gethist","Args":["hash2"]}'
