package service

import (
	"context"
	"strconv"
	"time"
)

// CreateDonor creates a new donor
func (repo *repository) CreateDonor(ctx context.Context, donor Donor) (int64, error) {
	sql := `
	INSERT INTO donor (id, blood_type_id, name, cell, email, city_id, verified, public)
	VALUES (null, ?, ?, ?, ?, ?, 0, ?);`
	stmt, err := repo.db.Prepare(sql)
	res, err := stmt.ExecContext(ctx, strconv.Itoa(donor.BloodTypeID), donor.Name, donor.Cell, donor.Email,
		strconv.Itoa(donor.CityID), donor.Public)
	if err != nil {
		return 0, err
	}
	return res.LastInsertId() // Returns ID and err
}

// GetDonorList get a list of verified and public donors. TODO: Implement pagination
func (repo *repository) GetDonorList(ctx context.Context, publicOnly bool) ([]Donor, error) {
	var sql string
	if publicOnly {
		sql = `SELECT * FROM donor WHERE public = 1 and verified = 1 and deleted_at IS NULL;`
	} else {
		sql = `SELECT * FROM donor;`
	}

	rows, err := repo.db.QueryContext(ctx, sql)
	if err != nil {
		return nil, err
	}
	list := []Donor{}
	for rows.Next() {
		var donor Donor
		err = rows.Scan(&donor.ID, &donor.BloodTypeID, &donor.Name, &donor.Cell,
			&donor.Email, &donor.CityID, &donor.Verified, &donor.Public,
			&donor.CreatedAt, &donor.UpdatedAt, &donor.DeletedAt)
		if err != nil {
			return nil, err
		}
		list = append(list, donor)
	}
	return list, nil
}

// UpdateDonor update a donor
func (repo *repository) UpdateDonor(ctx context.Context, donor Donor) (Donor, error) {
	sql := `
	UPDATE donor SET blood_type_id = ?, name = ?, cell = ?, email = ?, city_id = ?, public = ? WHERE id = ?;`
	stmt, err := repo.db.Prepare(sql)
	_, err = stmt.ExecContext(ctx, strconv.Itoa(donor.BloodTypeID), donor.Name, donor.Cell, donor.Email,
		strconv.Itoa(donor.CityID), donor.Public, donor.ID)
	if err != nil {
		return donor, err
	}
	return donor, nil
}

// UpdateDonor verify a donor
func (repo *repository) VerifyDonor(ctx context.Context, donorID int64, verified bool) error {
	sql := `
	UPDATE donor SET verified = ? WHERE id = ?;`
	stmt, err := repo.db.Prepare(sql)
	_, err = stmt.ExecContext(ctx, verified, donorID)
	if err != nil {
		return err
	}
	return nil
}

// PublicDonor set public flag for a donor
func (repo *repository) PublicDonor(ctx context.Context, donorID int64, public bool) error {
	sql := `
	UPDATE donor SET public = ? WHERE id = ?;`
	stmt, err := repo.db.Prepare(sql)
	_, err = stmt.ExecContext(ctx, public, donorID)
	if err != nil {
		return err
	}
	return nil
}

// DeleteDonor set delete a donor
func (repo *repository) DeleteDonor(ctx context.Context, donorID int64) error {
	sql := `
	UPDATE donor SET deleted_at = ? WHERE id = ?;`
	stmt, err := repo.db.Prepare(sql)
	_, err = stmt.ExecContext(ctx, time.Now(), donorID)
	if err != nil {
		return err
	}
	return nil
}

// ActivateDonor set activate a donor
func (repo *repository) ActivateDonor(ctx context.Context, donorID int64) error {
	sql := `
	UPDATE donor SET deleted_at = null WHERE id = ?;`
	stmt, err := repo.db.Prepare(sql)
	_, err = stmt.ExecContext(ctx, donorID)
	if err != nil {
		return err
	}
	return nil
}
