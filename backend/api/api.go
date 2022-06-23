package api

import (
	"fmt"
	"net/http"

	"github.com/rg-km/final-project-engineering-3/backend/repository"
)

type API struct {
	usersRepo             repository.UserRepository
	industryProfilesRepo  repository.IndustryProfileRepository
	researcherProfileRepo repository.ResearcherProfileRepository
	researchProposalRepo  repository.ResearchProposalRepository
	industryChallengeRepo repository.IndustryChallengeRepository
	proposalReviewRepo    repository.ProposalReviewRepository
	mux                   *http.ServeMux
}

func NewApi(usersRepo repository.UserRepository, industryProfilesRepo repository.IndustryProfileRepository, researcherProfileRepo repository.ResearcherProfileRepository, researchProposalRepo repository.ResearchProposalRepository, industryChallengeRepo repository.IndustryChallengeRepository, proposalReviewRepo repository.ProposalReviewRepository) API {
	mux := http.NewServeMux()
	api := API{
		usersRepo,
		industryProfilesRepo,
		researcherProfileRepo,
		researchProposalRepo,
		industryChallengeRepo,
		proposalReviewRepo,
		mux,
	}

	mux.Handle("/login", api.POST(http.HandlerFunc(api.login)))
	mux.Handle("/register", api.POST(http.HandlerFunc(api.register)))

	mux.Handle("/industry/logo", api.GET(http.HandlerFunc(api.getIndustryLogo)))

	mux.Handle("/research/details", api.GET(http.HandlerFunc(api.getChallengeById)))
	mux.Handle("/research/guide-file", api.GET(http.HandlerFunc(api.downloadGuideFile)))
	mux.Handle("/proposal/files", api.GET(http.HandlerFunc(api.downloadProposalFile)))

	// API with AuthMiddleware
	mux.Handle("/logout", api.POST(api.AuthMiddleware(http.HandlerFunc(api.logout))))

	// API with AuthMiddleware and AdminMiddleware
	// API with AuthMiddleware and IndustryMiddleware
	mux.Handle("/industry/profile", api.GET(api.AuthMiddleware(api.IndustryMiddleware(http.HandlerFunc(api.getIndustryProfile)))))
	mux.Handle("/industry/profile/edit", api.PUT(api.AuthMiddleware(api.IndustryMiddleware(http.HandlerFunc(api.editIndustryProfile)))))
	mux.Handle("/industry/challenge/post", api.POST(api.AuthMiddleware(api.IndustryMiddleware(http.HandlerFunc(api.postChallenge)))))
	mux.Handle("/industry/challenge/edit", api.PUT(api.AuthMiddleware(api.IndustryMiddleware(http.HandlerFunc(api.editChallenge)))))
	mux.Handle("/industry/challenge/delete", api.DELETE(api.AuthMiddleware(api.IndustryMiddleware(http.HandlerFunc(api.deleteChallenge)))))
	mux.Handle("/industry/challenge/list", api.GET(api.AuthMiddleware(api.IndustryMiddleware(http.HandlerFunc(api.getChallengeByIndustryId)))))
	mux.Handle("/industry/challenge/review/challengers", api.GET(api.AuthMiddleware(api.IndustryMiddleware(http.HandlerFunc(api.getTheChallengers)))))
	mux.Handle("/industry/challenge/review/details/", api.GET(api.AuthMiddleware(api.IndustryMiddleware(http.HandlerFunc(api.getReviewrReviewDetails)))))
	mux.Handle("/industry/challenge/review/details/approval", api.PUT(api.AuthMiddleware(api.IndustryMiddleware(http.HandlerFunc(api.postApproval)))))

	// API with AuthMiddleware and ResearcherMiddleware
	mux.Handle("/researcher/profile", api.GET(api.AuthMiddleware(api.ResearcherMiddleware(http.HandlerFunc(api.getResearcherProfile)))))
	mux.Handle("/researcher/profile/add", api.POST(api.AuthMiddleware(api.ResearcherMiddleware(http.HandlerFunc(api.addResearcherProfile)))))
	mux.Handle("/researcher/proposal", api.GET(api.AuthMiddleware(api.ResearcherMiddleware(http.HandlerFunc(api.getResearcherProposalStatus)))))
	mux.Handle("/researcher/challenge/list", api.GET(api.AuthMiddleware(api.ResearcherMiddleware(http.HandlerFunc(api.getResearcherChallenges)))))
	mux.Handle("/researcher/challenge/apply", api.POST(api.AuthMiddleware(api.ResearcherMiddleware(http.HandlerFunc(api.applyResearchProposal)))))
	mux.Handle("/researcher/challenge/upload", api.POST(api.AuthMiddleware(api.ResearcherMiddleware(http.HandlerFunc(api.uploadFiles)))))
	mux.Handle("/researcher/challenge/details", api.GET(api.AuthMiddleware(api.ResearcherMiddleware(http.HandlerFunc(api.getChallengeById)))))

	return api
}

func (api *API) Handler() *http.ServeMux {
	return api.mux
}

func (api *API) Start() {
	fmt.Println("starting web server at http://localhost:8080/")
	http.ListenAndServe(":8080", api.Handler())
}
