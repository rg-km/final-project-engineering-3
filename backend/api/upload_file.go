package api

import (
	"fmt"
	"io/ioutil"
	"mime/multipart"
)

func (api *API) uploadFile(proposalId int, file multipart.File, filePurpose string, fileLocation chan<- string) {
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

func (api *API) uploadGuideFile(challengeId int, file multipart.File, filePurpose string) (string, error) {
	if file == nil {
		return "", nil
	}

	fileDir := fmt.Sprintf("temp-%s", filePurpose)
	fileName := fmt.Sprintf("%s-%d-*.pdf", filePurpose, challengeId)

	tempFile, err := ioutil.TempFile(fileDir, fileName)
	if err != nil {
		return "", err
	}
	defer tempFile.Close()

	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		return "", err
	}

	tempFile.Write(fileBytes)
	return tempFile.Name(), nil
}
