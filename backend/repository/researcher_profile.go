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

func (rpr *ResearcherProfileRepository) AddResearcherProfile(teamName string, leaderName string, phoneNumber string, nidn string, collageName string, address string, bankAccountNumber string, bankName string, userId int64) (*int64, error) {
	var sqlStatement string
	var lastId int64

	sqlStatement = `
		INSERT INTO researcher_profile (
			team_name,
			leader_name,
			phone_number,
			nidn,
			collage_name,
			address,
			bank_account_num,
			bank_name,
			user_id
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
	`

	res, err := rpr.db.Exec(sqlStatement, teamName, leaderName, phoneNumber, nidn, collageName, address, bankAccountNumber, bankName, userId)
	if err != nil {
		return nil, err
	}

	lastId, err = res.LastInsertId()
	if err != nil {
		return nil, err
	}

	return &lastId, nil
}
