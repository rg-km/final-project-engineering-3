package api

import (
	"fmt"
	"net/http"

	"github.com/rg-km/final-project-engineering-3/backend/repository"
)

type API struct {
	usersRepo            repository.UserRepository
	industryProfilesRepo repository.IndustryProfileRepository
	researcherProfileRepo repository.ResearcherProfileRepository
	researchProposalRepo repository.ResearchProposalRepository
	mux                  *http.ServeMux
}

func NewApi(usersRepo repository.UserRepository, industryProfilesRepo repository.IndustryProfileRepository, researcherProfileRepo repository.ResearcherProfileRepository, researchProposalRepo repository.ResearchProposalRepository) API {
	mux := http.NewServeMux()
	api := API{
		usersRepo,
		industryProfilesRepo,
		researcherProfileRepo,
		researchProposalRepo,
		mux,
	}

	mux.Handle("/login", api.POST(http.HandlerFunc(api.login)))
	mux.Handle("/register", api.POST(http.HandlerFunc(api.register)))

	// API with AuthMiddleware and AdminMiddleware
	// API with AuthMiddleware and IndustryMiddleware
	mux.Handle("/industry/profile/edit", api.POST(api.AuthMiddleware(api.IndustryMiddleware(http.HandlerFunc(api.editIndustryProfile)))))

	// API with AuthMiddleware and ResearcherMiddleware
	mux.Handle("/researcher/profile", api.GET(api.AuthMiddleware(api.ResearcherMiddleware(http.HandlerFunc(api.getResearcherProfile)))))
	mux.Handle("/researcher/proposal", api.GET(api.AuthMiddleware(api.ResearcherMiddleware(http.HandlerFunc(api.getResearcherProposalStatus)))))

	return api
}

func (api *API) Handler() *http.ServeMux {
	return api.mux
}

func (api *API) Start() {
	fmt.Println("starting web server at http://localhost:8080/")
	http.ListenAndServe(":8080", api.Handler())
}
