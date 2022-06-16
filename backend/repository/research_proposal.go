package repository

import "database/sql"

type ResearchProposalRepository struct {
	db *sql.DB
}

func NewResearchProposalRepository(db *sql.DB) *ResearchProposalRepository {
	return &ResearchProposalRepository{db: db}
}

func (rpr *ResearchProposalRepository) GetResearcherProposals(userId int64) (*[]ResearchProposal, error) {
	var sqlStatement string
	var researchProposals []ResearchProposal

	sqlStatement = `
		SELECT
			p.id,
			ri.name,
			ri.period_start,
			ri.period_end,
			ip.name,
			rc.name,
			fs.name
		FROM proposal p
		INNER JOIN research_proposal_review rpv ON p.id = rpv.proposal_id
		INNER JOIN research_item ri ON rpv.research_item_id = ri.id
		INNER JOIN industry_profile ip ON ri.industry_id = ip.id
		INNER JOIN research_category rc ON ri.research_category_id = rc.id
		INNER JOIN funding_status fs ON rpv.funding_status_id = fs.id
		INNER JOIN researcher_profile rp ON p.researcher_id = rp.id
		WHERE rp.user_id = ?
	`

	rows, err := rpr.db.Query(sqlStatement, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var researchProposal ResearchProposal
		err := rows.Scan(
			&researchProposal.Id,
			&researchProposal.ChallengeName,
			&researchProposal.PeriodStart,
			&researchProposal.PeriodEnd,
			&researchProposal.IndustryName,
			&researchProposal.ResearchCategory,
			&researchProposal.FundingStatus,
		)
		if err != nil {
			return nil, err
		}
		researchProposals = append(researchProposals, researchProposal)
	}
	return &researchProposals, nil
}
