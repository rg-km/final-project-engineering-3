package api

import (
	"encoding/json"
	"net/http"
)

type HelloWorldResponse struct {
	Message string `json:"message"`
}

func(api *API) HelloWorld(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)
	encoder := json.NewEncoder(w)

	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		encoder.Encode(ErrorResponse{Error: "Need GET Method!"})
		return
	}

	encoder.Encode(HelloWorldResponse{Message: "Hello, World!"})
}