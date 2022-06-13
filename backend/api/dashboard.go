package api

import (
	"encoding/json"
	"net/http"
)

type DashboardResponse struct {
	Username string `json:"username"`
}

func (api *API) dashboard(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)
	encoder := json.NewEncoder(w)

	username := r.Context().Value("username").(string)
	encoder.Encode(DashboardResponse{Username: username})
}
