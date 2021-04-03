import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@eshop.com',
        password: bcrypt.hashSync('12345678', 10),
        isAdmin: true,
    },
    {
        name: 'Huzaifa Khan',
        email: 'huzaifa@eshop.com',
        password: bcrypt.hashSync('12345678', 10),
    },
    {
        name: 'Waleed Khan',
        email: 'waleed@eshop.com',
        password: bcrypt.hashSync('12345678', 10),
    }
]
export default users;