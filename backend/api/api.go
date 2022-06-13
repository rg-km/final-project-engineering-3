package api

import (
	"fmt"
	"net/http"

	"github.com/rg-km/final-project-engineering-3/backend/repository"
)

type API struct {
	usersRepo   repository.UserRepository
	exampleRepo repository.DashboardRepository
	mux         *http.ServeMux
}

func NewApi(usersRepo repository.UserRepository, exampleRepo repository.DashboardRepository) API {
	mux := http.NewServeMux()
	api := API{
		usersRepo,
		exampleRepo,
		mux,
	}

	mux.Handle("/login", api.POST(http.HandlerFunc(api.login)))

	// API with AuthMiddleware and IndustryMiddleware
	mux.Handle("/dashboard", api.GET(api.AuthMiddleware(api.IndustryMiddleware(http.HandlerFunc(api.dashboard)))))

	return api
}

func (api *API) Handler() *http.ServeMux {
	return api.mux
}

func (api *API) Start() {
	fmt.Println("starting web server at http://localhost:8080/")
	http.ListenAndServe(":8080", api.Handler())
}
