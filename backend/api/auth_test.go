package api_test

import (
	"database/sql"
	"net/http/httptest"
	"strings"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	_ "github.com/mattn/go-sqlite3"

	"github.com/rg-km/final-project-engineering-3/backend/api"
	"github.com/rg-km/final-project-engineering-3/backend/repository"
)

var _ = Describe("Authentication", func() {
	Describe("/login", func() {
		When("username and password are correct", func() {
			It("should set jwt token to cookie and return username, role, and token", func() {
				wr := httptest.NewRecorder()

				bodyReader := strings.NewReader(`{"Username": "examplename", "Password": "secret"}`)

				req := httptest.NewRequest("POST", "/login", bodyReader)

				db, err := sql.Open("sqlite3", "../db/final-project-engineering-3.db")
				if err != nil {
					panic(err)
				}
				loginAPI := api.NewApi(
					*repository.NewUserRepository(db),
					*repository.NewIndustryProfileRepository(db),
					*repository.NewResearcherProfileRepository(db),
					*repository.NewResearchProposalRepository(db),
					*repository.NewIndustryChallengeRepository(db),
				)
				loginAPI.Handler().ServeHTTP(wr, req)

				Expect(wr.Code).To(Equal(200))

				cookies := wr.Result().Cookies()

				var isCookieTokenExist bool
				for _, c := range cookies {
					if c.Name == "token" {
						isCookieTokenExist = true
						break
					}
				}

				Expect(isCookieTokenExist).To(BeTrue())
			})
		})

		When("username is correct, but password is incorrect", func() {
			It("should return error", func() {
				wr := httptest.NewRecorder()

				bodyReader := strings.NewReader(`{"Username": "examplename", "Password": "wrongpassword"}`)

				req := httptest.NewRequest("POST", "/login", bodyReader)

				db, err := sql.Open("sqlite3", "../db/final-project-engineering-3.db")
				if err != nil {
					panic(err)
				}
				loginAPI := api.NewApi(
					*repository.NewUserRepository(db),
					*repository.NewIndustryProfileRepository(db),
					*repository.NewResearcherProfileRepository(db),
					*repository.NewResearchProposalRepository(db),
					*repository.NewIndustryChallengeRepository(db),
				)
				loginAPI.Handler().ServeHTTP(wr, req)

				Expect(wr.Code).To(Equal(401))
			})
		})

		When("password is correct, but username is incorrect", func() {
			It("should return error", func() {
				wr := httptest.NewRecorder()

				bodyReader := strings.NewReader(`{"Username": "wrongusername", "Password": "secret"}`)

				req := httptest.NewRequest("POST", "/login", bodyReader)

				db, err := sql.Open("sqlite3", "../db/final-project-engineering-3.db")
				if err != nil {
					panic(err)
				}
				loginAPI := api.NewApi(
					*repository.NewUserRepository(db),
					*repository.NewIndustryProfileRepository(db),
					*repository.NewResearcherProfileRepository(db),
					*repository.NewResearchProposalRepository(db),
					*repository.NewIndustryChallengeRepository(db),
				)
				loginAPI.Handler().ServeHTTP(wr, req)

				Expect(wr.Code).To(Equal(401))

			})
		})
	})
})
