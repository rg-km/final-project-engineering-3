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

func (icr *IndustryChallengeRepository) GetChallengeById(challengeId int) (*ResearchChallengeItem, error) {
	var sqlStatement string
	var researchChallenge ResearchChallengeItem

	sqlStatement = `
		SELECT 
			ri.id,
			ri.name,
			ri.details,
			rc.name,
			ri.period_start,
			ri.period_end,
			ri.max_funding,
			ri.guide_file,
			ri.quota,
			ip.name
		FROM research_item ri
		INNER JOIN research_category rc ON ri.research_category_id = rc.id
		INNER JOIN industry_profile ip ON ri.industry_id = ip.id
		WHERE ri.id = ?
	`

	row := icr.db.QueryRow(sqlStatement, challengeId)
	err := row.Scan(
		&researchChallenge.Id,
		&researchChallenge.Name,
		&researchChallenge.Details,
		&researchChallenge.ResearchCategory,
		&researchChallenge.PeriodStart,
		&researchChallenge.PeriodEnd,
		&researchChallenge.MaxFunding,
		&researchChallenge.GuideFile,
		&researchChallenge.Quota,
		&researchChallenge.IndustryName,
	)

	if err != nil {
		return nil, err
	}

	return &researchChallenge, nil
}

func (icr *IndustryChallengeRepository) CheckChallengeById(challengeId int) (*bool, error) {
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

func (icr *IndustryChallengeRepository) DeleteChallenge(challengeId int) (*int64, error) {
	var sqlStatement string
	var lastIdAffected int64

	sqlStatement = `
		DELETE FROM research_item
		WHERE id = ?
		RETURNING id
	`

	res := icr.db.QueryRow(sqlStatement, challengeId)
	err := res.Scan(&lastIdAffected)
	if err != nil {
		return nil, err
	}

	return &lastIdAffected, nil
}
