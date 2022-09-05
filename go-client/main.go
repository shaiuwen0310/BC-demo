package main

import (
	"bytes"
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

type InvokeRequest struct {
	Identity string `json:"identity"`
	Values   Value  `json:"values"`
}

type Value struct {
	Hash     string `json:"hash"`
	Filename string `json:"filename"`
}

type InvokeResponse struct {
	Hash    string `json:"hash"`
	Txid    string `json:"txid"`
	Rtnc    int    `json:"rtnc"`
	Message string `json:"message"`
}

// history and delete
type HashRequest struct {
	Identity string `json:"identity"`
	Hash     string `json:"hash"`
}

type DeleteResponse struct {
	Hash    string `json:"hash"`
	Rtnc    int    `json:"rtnc"`
	Message string `json:"message"`
}

type HistoryInfo struct {
	Hash    string `json:"hash"`
	Rtnc    int    `json:"rtnc"`
	Message string `json:"message"`
	Info    []Info `json:"info"`
}

type Info struct {
	Txid      string `json:"txid"`
	Hash      string `json:"hash"`
	Userid    string `json:"userid"`
	Filename  string `json:"filename"`
	Last6txid string `json:"last6txid"`
}

func main() {

	router := gin.Default()
	//32Mib
	// router.MaxMultipartMemory = 8

	router.Static("/", "./public")

	router.LoadHTMLGlob("public/*")

	router.POST("/upload", func(c *gin.Context) {
		walletid := c.PostForm("walletid")
		funcFlag := c.PostForm("function")

		file, err := c.FormFile("file")
		if err != nil {
			c.String(http.StatusBadRequest, fmt.Sprintf("上传错误: %s", err.Error()))
			return
		}

		filename := filepath.Base(file.Filename)

		if err := c.SaveUploadedFile(file, "images/"+filename); err != nil {
			c.String(http.StatusBadRequest, fmt.Sprintf("保存错误: %s", err.Error()))
			return
		}

		// --- 檔案壓雜湊值
		f, err := os.Open("images/" + filename)
		if err != nil {
			log.Fatal(err)
		}
		defer f.Close()

		h := sha256.New()
		if _, err := io.Copy(h, f); err != nil {
			log.Fatal(err)
		}
		var sx16 string = fmt.Sprintf("%x", h.Sum(nil)) // a-f的16進制
		fmt.Printf("file hash: %v %T\n", sx16, sx16)
		// ---

		// --- 第三方api ---
		if funcFlag == "cert" {
			setVal := Value{
				Filename: filename,
				Hash:     sx16,
			}
			setReq := InvokeRequest{
				Identity: walletid,
				Values:   setVal,
			}

			body, _ := json.Marshal(setReq)
			response, err := http.Post("http://scanfile-node-api-org1:5008/v1/scanfile/invoke", "application/json; charset=utf-8", bytes.NewBuffer(body))
			if err != nil || response.StatusCode != http.StatusOK {
				c.Status(http.StatusServiceUnavailable)
				return
			}
			body, err = ioutil.ReadAll(response.Body)
			if err != nil {
				panic(err)
			}
			jsonStr := string(body)
			fmt.Println("Response: ", jsonStr)
			info := InvokeResponse{}
			_ = json.Unmarshal(body, &info)

			res := ""
			if info.Rtnc == 0 {
				res = "認證完成"
			} else {
				res = "認證失敗"
			}

			c.HTML(http.StatusOK, "set.tmpl", gin.H{
				"Hash":    info.Hash,
				"Message": info.Message,
				"Rtnc":    info.Rtnc,
				"Txid":    info.Txid,
				"Result":  res,
			})

		} else if funcFlag == "delete" {
			hashReq := HashRequest{
				Identity: walletid,
				Hash:     sx16,
			}
			body, _ := json.Marshal(hashReq)
			response, err := http.Post("http://scanfile-node-api-org1:5008/v1/scanfile/delete", "application/json; charset=utf-8", bytes.NewBuffer(body))
			if err != nil || response.StatusCode != http.StatusOK {
				c.Status(http.StatusServiceUnavailable)
				return
			}
			body, err = ioutil.ReadAll(response.Body)
			if err != nil {
				panic(err)
			}
			jsonStr := string(body)
			fmt.Println("Response: ", jsonStr)
			info := DeleteResponse{}
			_ = json.Unmarshal(body, &info)

			res := ""
			if info.Rtnc == 0 {
				res = "刪除完成"
			} else {
				res = "刪除失敗"
			}

			c.HTML(http.StatusOK, "del.tmpl", gin.H{
				"Hash":    info.Hash,
				"Message": info.Message,
				"Rtnc":    info.Rtnc,
				"Result":  res,
			})

		} else if funcFlag == "verify" {
			hashReq := HashRequest{
				Identity: walletid, //"org1user1",
				Hash:     sx16,     //"e8f0380cb674b4e0420eb413b6c67208f05c0a28fb3640f3725d931ec1230b6d",
			}

			body, _ := json.Marshal(hashReq)
			response, err := http.Post("http://scanfile-node-api-org1:5008/v1/scanfile/history", "application/json; charset=utf-8", bytes.NewBuffer(body))
			if err != nil || response.StatusCode != http.StatusOK {
				c.Status(http.StatusServiceUnavailable)
				return
			}
			body, err = ioutil.ReadAll(response.Body)
			if err != nil {
				panic(err)
			}
			jsonStr := string(body)
			fmt.Println("Response: ", jsonStr)
			info := HistoryInfo{}
			_ = json.Unmarshal(body, &info)

			res := ""
			if info.Rtnc == 0 {
				res = "驗證成功"
			} else {
				res = "驗證失敗"
			}

			// 查詢失敗則沒有info欄位
			var content interface{}
			if info.Rtnc == 0 {
				content = info.Info
			} else {
				content = ""
			}

			c.HTML(http.StatusOK, "history.tmpl", gin.H{
				"Hash":    info.Hash,
				"Message": info.Message,
				"Rtnc":    info.Rtnc,
				"Info":    content,
				"Result":  res,
			})
		}

	})

	router.Run(":8080")

}
