package api

import (
	"fmt"
	"io/ioutil"
	"mime/multipart"
)

func (api *API) uploadFile(proposalId int, file multipart.File, filePurpose string, fileLocation chan<- string) () {
	if file == nil {
		fileLocation <- ""
		return
	}
	
	fileDir := fmt.Sprintf("temp-%s", filePurpose)
	fileName := fmt.Sprintf("%s-%d-*.pdf", filePurpose, proposalId)

	tempFile, err := ioutil.TempFile(fileDir, fileName)
	if err != nil {
		fileLocation <- ""
		return
	}
	defer tempFile.Close()

	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		fileLocation <- ""
		return
	}

	tempFile.Write(fileBytes)

	fileLocation <- tempFile.Name()
}