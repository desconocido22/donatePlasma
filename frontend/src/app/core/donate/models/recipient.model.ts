export class RecipientModel {
    id: number;
    blood_type_id: number;
    name: string;
    cell_phones: string;
    email: string;
    photo_path: string;
    city_id: number;
    public: boolean;
    verified?: boolean;
    compatible?: any[];
    created_at?: any;
    updated_at?: any;
    deleted_at?: any;

    public getPrefix() {
        return 'recipient';
    }



}
