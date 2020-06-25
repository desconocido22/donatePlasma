package service

import (
	"time"
)

// Recipient struct for recipients
type Recipient struct {
	ID          int       `json:"id,omitempty"`
	BloodTypeID int       `json:"blood_type_id"`
	Name        string    `json:"name"`
	CellPhones  string    `json:"cell_phones"`
	Email       string    `json:"email"`
	PhotoPath   string    `json:"photo_path"`
	CityID      int       `json:"city_id"`
	Public      bool      `json:"public"`
	Verified    bool      `json:"verified"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	DeletedAt   time.Time `json:"deleted_at"`
}

// Donor structure for donors
type Donor struct {
	ID          int       `json:"id,omitempty"`
	BloodTypeID int       `json:"blood_type_id"`
	Name        string    `json:"name"`
	Cell        string    `json:"cell"`
	Email       string    `json:"email"`
	CityID      int       `json:"city_id"`
	Verified    bool      `json:"verified"`
	Anonymous   bool      `json:"anonymous"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	DeletedAt   time.Time `json:"deleted_at"`
}
