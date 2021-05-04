
export interface IUser {
    name: {
        first: String,
        last: String
    },
    contact: {
        email: String,
        phone_number: String,
        password: String
    },
    access: {
        isAdmin: Boolean,
    }
}