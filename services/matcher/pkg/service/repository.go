package service

import (
	"context"
	"database/sql"
	"strconv"

	"github.com/go-kit/kit/log"
)

// Repository interface
type Repository interface {
	GetRecipientList(ctx context.Context, cityID *int64, bloodTypeID *int64) ([]Recipient, error)
}

type repository struct {
	db     *sql.DB
	logger log.Logger
}

// NewRepository creates a new repository instance
func NewRepository(db *sql.DB, logger log.Logger) Repository {
	return &repository{
		db:     db,
		logger: log.With(logger, "Repository", "sql"),
	}
}

// GetRecipientList get a list of verified and public recipients. TODO: Implement pagination
func (repo *repository) GetRecipientList(ctx context.Context, cityID *int64, bloodTypeID *int64) ([]Recipient, error) {
	var sql string
	sql = `SELECT id, blood_type_id, name, cell_numbers, email, photo_path, city_id, verified, public, created_at, updated_at, deleted_at,
			(SELECT GROUP_CONCAT(donor_blood_type_id SEPARATOR ',') as compatible_with FROM compatibility 
			WHERE recipient_blood_type_id = blood_type_id) as compatible_with
			FROM recipient WHERE public = 1 AND verified = 1 AND deleted_at IS NULL`
	if cityID != nil {
		sql = sql + " AND city_id = " + strconv.FormatInt(*cityID, 10)
	}
	if bloodTypeID != nil {
		sql = sql + " AND blood_type_id IN (SELECT recipient_blood_type_id FROM compatibility WHERE donor_blood_type_id = " +
			strconv.FormatInt(*bloodTypeID, 10) + ")"
	}

	rows, err := repo.db.QueryContext(ctx, sql)
	if err != nil {
		return nil, err
	}
	list := []Recipient{}
	for rows.Next() {
		var recipient Recipient
		err = rows.Scan(&recipient.ID, &recipient.BloodTypeID, &recipient.Name, &recipient.CellPhones,
			&recipient.Email, &recipient.PhotoPath, &recipient.CityID, &recipient.Verified, &recipient.Public,
			&recipient.CreatedAt, &recipient.UpdatedAt, &recipient.DeletedAt, &recipient.CompatibleWith)
		if err != nil {
			return nil, err
		}
		list = append(list, recipient)
	}
	return list, nil
}
