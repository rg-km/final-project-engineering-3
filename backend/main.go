package main

import (
	"database/sql"

	"github.com/rg-km/final-project-engineering-3/backend/api"
	"github.com/rg-km/final-project-engineering-3/backend/repository"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db, err := sql.Open("sqlite3", "db/final-project-engineering-3.db")
	if err != nil {
		panic(err)
	}

	usersRepo := repository.NewUserRepository(db)
	industryProfilesRepo := repository.NewIndustryProfileRepository(db)
	researcherProfileRepo := repository.NewResearcherProfileRepository(db)

	mainAPI := api.NewApi(*usersRepo, *industryProfilesRepo, *researcherProfileRepo)
	mainAPI.Start()
}
