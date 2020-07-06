package service

import (
	"context"
	"database/sql"
	"strconv"

	"github.com/go-kit/kit/log"
)

// Repository interface
type Repository interface {
	GetRecipientList(ctx context.Context, cityID *int64, bloodTypeID *int64, page int64, perPage int64) ([]Recipient, int64, error)
	CanReceiveFrom(ctx context.Context, bloodTypeID int64) ([]CompatibleBloodCount, error)
	CanDonateTo(ctx context.Context, bloodTypeID int64) ([]CompatibleBloodCount, error)
	getTotalRecipients(ctx context.Context, cityID *int64, bloodTypeID *int64) (int64, error)
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

// GetRecipientList get a list of verified and public recipients
func (repo *repository) GetRecipientList(ctx context.Context, cityID *int64, bloodTypeID *int64, page int64, perPage int64) ([]Recipient, int64, error) {
	start := (page - 1) * perPage
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
	sql = sql + " LIMIT " + strconv.FormatInt(start, 10) + ", " + strconv.FormatInt(perPage, 10)
	rows, err := repo.db.QueryContext(ctx, sql)
	if err != nil {
		return nil, 0, err
	}
	list := []Recipient{}
	for rows.Next() {
		var recipient Recipient
		err = rows.Scan(&recipient.ID, &recipient.BloodTypeID, &recipient.Name, &recipient.CellPhones,
			&recipient.Email, &recipient.PhotoPath, &recipient.CityID, &recipient.Verified, &recipient.Public,
			&recipient.CreatedAt, &recipient.UpdatedAt, &recipient.DeletedAt, &recipient.CompatibleWith)
		if err != nil {
			return nil, 0, err
		}
		list = append(list, recipient)
	}
	total, _ := repo.getTotalRecipients(ctx, cityID, bloodTypeID)
	return list, total, nil
}

// CanReceiveFrom returns donor counts for a recipient
func (repo *repository) CanReceiveFrom(ctx context.Context, bloodTypeID int64) ([]CompatibleBloodCount, error) {
	sql := `SELECT donor_blood_type_id, (SELECT count(id) FROM donor WHERE blood_type_id = donor_blood_type_id) as c 
		FROM compatibility WHERE recipient_blood_type_id = ` + strconv.FormatInt(bloodTypeID, 10)
	rows, err := repo.db.QueryContext(ctx, sql)
	if err != nil {
		return nil, err
	}
	list := []CompatibleBloodCount{}
	for rows.Next() {
		var count CompatibleBloodCount
		err = rows.Scan(&count.BloodTypeID, &count.Count)
		if err != nil {
			return nil, err
		}
		list = append(list, count)
	}
	return list, nil
}

// CanDonateTo returns recipient counts for a donor
func (repo *repository) CanDonateTo(ctx context.Context, bloodTypeID int64) ([]CompatibleBloodCount, error) {
	sql := `SELECT recipient_blood_type_id, (SELECT count(id) FROM recipient WHERE blood_type_id = recipient_blood_type_id) as c 
		FROM compatibility WHERE donor_blood_type_id= ` + strconv.FormatInt(bloodTypeID, 10)
	rows, err := repo.db.QueryContext(ctx, sql)
	if err != nil {
		return nil, err
	}
	list := []CompatibleBloodCount{}
	for rows.Next() {
		var count CompatibleBloodCount
		err = rows.Scan(&count.BloodTypeID, &count.Count)
		if err != nil {
			return nil, err
		}
		list = append(list, count)
	}
	return list, nil
}

// getTotalRecipients get a count of verified and public recipients
func (repo *repository) getTotalRecipients(ctx context.Context, cityID *int64, bloodTypeID *int64) (int64, error) {
	var sql string
	sql = `SELECT count(id) as c FROM recipient WHERE public = 1 AND verified = 1 AND deleted_at IS NULL`
	if cityID != nil {
		sql = sql + " AND city_id = " + strconv.FormatInt(*cityID, 10)
	}
	if bloodTypeID != nil {
		sql = sql + " AND blood_type_id IN (SELECT recipient_blood_type_id FROM compatibility WHERE donor_blood_type_id = " +
			strconv.FormatInt(*bloodTypeID, 10) + ")"
	}
	result, err := repo.db.QueryContext(ctx, sql)
	if err != nil {
		return 0, err
	}
	var count int64
	result.Next()
	err = result.Scan(&count)
	return count, nil
}
