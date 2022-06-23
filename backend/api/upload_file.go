package api

import (
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"os"
	"path/filepath"
	"time"
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

func (api *API) uploadLogo(industryId int, handler multipart.FileHeader, file multipart.File, filePurpose string) (*string, error) {
	dir := fmt.Sprintf("temp-%s", filePurpose)

	currentTime := time.Now().Unix()
	filename := fmt.Sprintf("logo-%d-%v%s", industryId, currentTime, filepath.Ext(handler.Filename))
	fileLocation := filepath.Join(dir, filename)
	targetFile, err := os.OpenFile(fileLocation, os.O_WRONLY|os.O_CREATE, 06666)
	if err != nil {
		return nil, err
	}
	defer targetFile.Close()

	if _, err := io.Copy(targetFile, file); err != nil {
		return nil, err
	}

	return &fileLocation, nil
}
