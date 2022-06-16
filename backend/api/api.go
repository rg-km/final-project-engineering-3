package api

import (
	"fmt"
	"net/http"

	"github.com/rg-km/final-project-engineering-3/backend/repository"
)

type API struct {
	usersRepo            repository.UserRepository
	industryProfilesRepo repository.IndustryProfileRepository
	mux                  *http.ServeMux
}

func NewApi(usersRepo repository.UserRepository, industryProfilesRepo repository.IndustryProfileRepository) API {
	mux := http.NewServeMux()
	api := API{
		usersRepo,
		industryProfilesRepo,
		mux,
	}

	mux.Handle("/login", api.POST(http.HandlerFunc(api.login)))
	mux.Handle("/register", api.POST(http.HandlerFunc(api.register)))

	// API with AuthMiddleware and AdminMiddleware
	// API with AuthMiddleware and IndustryMiddleware
	mux.Handle("/industry/profile/edit", api.POST(api.AuthMiddleware(api.IndustryMiddleware(http.HandlerFunc(api.editIndustryProfile)))))

	// API with AuthMiddleware and ResearcherMiddleware

	return api
}

func (api *API) Handler() *http.ServeMux {
	return api.mux
}

func (api *API) Start() {
	fmt.Println("starting web server at http://localhost:8080/")
	http.ListenAndServe(":8080", api.Handler())
}
