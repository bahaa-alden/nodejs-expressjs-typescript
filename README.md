# cars

This repo is a Node.js application built with Express.js, MongoDB, Passport.js, and JWT authentication.

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/bahaa-alden/cars.git
   ```

2. **Install Dependencies**

   ```bash
   cd cars
   yarn install
   ```

3. **Set Up MongoDB**

   - Make sure MongoDB is installed and running on your machine.
   - If not installed, you can download and install it from MongoDB Official Website.
   - Start MongoDB service.

4. **Environment Variables**

   - Create a .env file in the root directory.
   - Add the following environment variables to the .env file:

   - ```makefile
     NODE_ENV=development/production
     PORT=3000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     JWT_ACCESS_EXPIRATION=jwt_expire_time
     ```

5. **Run the Application**

```bash
yarn serve
```

or

```bash
yarn watch
```

## Contributors

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bahaa-alden"><img src="https://avatars.githubusercontent.com/u/114233768?v=4" width="100px;" alt="Bahaa alden abdo"/><br /><sub><b>Bahaa alden abdo</b></sub></a><br /><a href="#maintenance-Shchepotin" title="Maintenance">🚧</a> <a href="#doc-Shchepotin" title="Documentation">📖</a> <a href="#code-Shchepotin" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/MahamdSirafi"><img src="https://mahamdsirafi.github.io/Portfolio/assets/img/person.jpg" width="100px;" alt="Mohammed Adel Seirafi"/><br /><sub><b>Mohammed Adel Seirafi</b></sub></a><br /><a href="#maintenance-Shchepotin" title="Maintenance">🚧</a> <a href="#doc-Shchepotin" title="Documentation">📖</a> <a href="#code-Shchepotin" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

## License

This project is licensed under the MIT License - see the LICENSE file for details.
