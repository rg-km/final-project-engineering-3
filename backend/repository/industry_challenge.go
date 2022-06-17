package repository

import (
	"database/sql"
	"time"
)

type IndustryChallengeRepository struct {
	db *sql.DB
}

func NewIndustryChallengeRepository(db *sql.DB) *IndustryChallengeRepository {
	return &IndustryChallengeRepository{db: db}
}

func (icr *IndustryChallengeRepository) GetChallengeById(challengeId int) (*bool, error) {
	var sqlStatement string
	var challengeExists bool

	sqlStatement = `
		SELECT COUNT(*)
		FROM research_item
		WHERE id = ?
	`

	res := icr.db.QueryRow(sqlStatement, challengeId)
	err := res.Scan(&challengeExists)
	if err != nil {
		return nil, err
	}

	return &challengeExists, nil
}

func (icr *IndustryChallengeRepository) PostChallenge(challengeName string, details string, researchCategoryId int64, periodStart time.Time, periodEnd time.Time, maxFunding int64, guideFile string, quota int64, industryId int64) (*int64, error) {
	var sqlStatement string
	var lastId int64

	sqlStatement = `
		INSERT INTO research_item (name, details, research_category_id, period_start, period_end, max_funding, guide_file, quota, industry_id)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
	`

	res, err := icr.db.Exec(sqlStatement, challengeName, details, researchCategoryId, periodStart.Format("2006-01-02 15:04:05"), periodEnd.Format("2006-01-02 15:04:05"), maxFunding, guideFile, quota, industryId)
	if err != nil {
		return nil, err
	}

	lastId, err = res.LastInsertId()
	if err != nil {
		return nil, err
	}

	return &lastId, nil
}

func (icr *IndustryChallengeRepository) EditChallenge(challengeName string, details string, researchCategoryId int64, periodStart time.Time, periodEnd time.Time, maxFunding int64, guideFile string, quota int64, challengeId int) (*int64, error) {
	var sqlStatement string
	var lastIdAffected int64

	sqlStatement = `
		UPDATE research_item
		SET name = ?, details = ?, research_category_id = ?, period_start = ?, period_end = ?, max_funding = ?, guide_file = ?, quota = ?
		WHERE id = ?
		RETURNING id
	`

	res := icr.db.QueryRow(sqlStatement, challengeName, details, researchCategoryId, periodStart.Format("2006-01-02 15:04:05"), periodEnd.Format("2006-01-02 15:04:05"), maxFunding, guideFile, quota, challengeId)
	err := res.Scan(&lastIdAffected)
	if err != nil {
		return nil, err
	}

	return &lastIdAffected, nil
}
