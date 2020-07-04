package service

import (
	"database/sql"
)

// Recipient struct for recipients
type Recipient struct {
	ID             int64          `json:"id,omitempty"`
	BloodTypeID    int            `json:"blood_type_id"`
	Name           string         `json:"name"`
	CellPhones     string         `json:"cell_phones"`
	Email          string         `json:"email"`
	PhotoPath      string         `json:"photo_path"`
	CityID         int            `json:"city_id"`
	Public         bool           `json:"public"`
	Verified       bool           `json:"verified"`
	CreatedAt      sql.NullString `json:"created_at"`
	UpdatedAt      sql.NullString `json:"updated_at"`
	DeletedAt      sql.NullString `json:"deleted_at"`
	CompatibleWith string         `json:"compatible_with,omitempty"`
}

// Donor structure for donors
type Donor struct {
	ID          int64          `json:"id,omitempty"`
	BloodTypeID int            `json:"blood_type_id"`
	Name        string         `json:"name"`
	Cell        string         `json:"cell"`
	Email       string         `json:"email"`
	CityID      int            `json:"city_id"`
	Public      bool           `json:"public"`
	Verified    bool           `json:"verified"`
	CreatedAt   sql.NullString `json:"created_at"`
	UpdatedAt   sql.NullString `json:"updated_at"`
	DeletedAt   sql.NullString `json:"deleted_at"`
}
