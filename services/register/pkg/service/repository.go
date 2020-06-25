package service

import (
	"context"
	"database/sql"
	"strconv"

	"github.com/go-kit/kit/log"
)

// Repository interface
type Repository interface {
	CreateRecipient(ctx context.Context, recipient Recipient) (int64, error)
	GetRecipient(ctx context.Context, id int) (*Recipient, error)
	GetRecipientList(ctx context.Context) (*[]Recipient, error)
	CreateDonor(ctx context.Context, donor Donor) (*Donor, error)
	GetDonor(ctx context.Context, id int) (*Donor, error)
	GetDonorList(ctx context.Context) (*[]Donor, error)
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

func (repo *repository) CreateRecipient(ctx context.Context, recipient Recipient) (int64, error) {
	sql := `
	INSERT INTO recipient (id, blood_type_id, name, cell_numbers, email, photo_path, city_id, verified, public)
	VALUES (null, ?, ?, ?, ?, ?, ?, 0, ?);`
	stmt, err := repo.db.Prepare(sql)
	res, err := stmt.ExecContext(ctx, strconv.Itoa(recipient.BloodTypeID), recipient.Name, recipient.CellPhones, recipient.Email,
		recipient.PhotoPath, strconv.Itoa(recipient.CityID), recipient.Public)
	if err != nil {
		return 0, err
	}
	return res.LastInsertId() // Returns ID and err
}

func (repo *repository) GetRecipient(ctx context.Context, id int) (*Recipient, error) {
	return nil, nil
}

func (repo *repository) GetRecipientList(ctx context.Context) (*[]Recipient, error) {
	return nil, nil
}

func (repo *repository) CreateDonor(ctx context.Context, donor Donor) (*Donor, error) {
	return nil, nil
}

func (repo *repository) GetDonor(ctx context.Context, id int) (*Donor, error) {
	return nil, nil
}

func (repo *repository) GetDonorList(ctx context.Context) (*[]Donor, error) {
	return nil, nil
}
