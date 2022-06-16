package repository

import "database/sql"

type ResearcherProfileRepository struct {
	db *sql.DB
}

func NewResearcherProfileRepository(db *sql.DB) *ResearcherProfileRepository {
	return &ResearcherProfileRepository{db: db}
}

func (rpr *ResearcherProfileRepository) GetResearcherProfile(userId int64) (*ResearcherProfile, error) {
	var sqlStatement string
	var researcherProfile ResearcherProfile

	sqlStatement = `
		SELECT
			id,
			team_name,
			leader_name,
			phone_number,
			nidn,
			collage_name,
			address,
			bank_account_num,
			bank_name
		FROM researcher_profile WHERE user_id = ?
	`

	row := rpr.db.QueryRow(sqlStatement, userId)
	err := row.Scan(
		&researcherProfile.Id,
		&researcherProfile.TeamName,
		&researcherProfile.LeaderName,
		&researcherProfile.PhoneNumber,
		&researcherProfile.NIDN,
		&researcherProfile.CollegeName,
		&researcherProfile.Address,
		&researcherProfile.BankAccountNumber,
		&researcherProfile.BankName,
	)

	if err != nil {
		return nil, err
	}

	return &researcherProfile, nil
}